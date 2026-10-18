/* eslint-disable @typescript-eslint/no-require-imports */
// Node's built-in runner executes project TS through the existing TypeScript compiler.
// Every external call is mocked; this suite never sends email or contacts Redis.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const ts = require("typescript");
const originalLoad = Module._load;
Module._load = function (id, ...args) { return id === "server-only" ? {} : originalLoad.call(this, id, ...args); };
for (const extension of [".ts", ".tsx"]) {
  require.extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: filename,
  }).outputText, filename);
}

const { createContactHandler } = require("../app/api/contact/handler.ts");
const { renderContactEmail, summarizeContactMessage, getEmailConfiguration, sendContactEmail } = require("../app/api/contact/email.ts");
const { limitContactRequest } = require("../app/api/contact/rate-limit.ts");
const { validateContactPayload } = require("../app/lib/contact.ts");
const valid = { name: "Juan Perez", email: "juan@example.com", projectType: "Proyecto Motion Graphics", message: "Consulta sobre un motion graphic de un minuto.", website: "", submissionId: "4d7d21bb-c1d0-4b4f-86cb-3594f0bbaac8" };
function request(payload = valid, options = {}) {
  return new Request("https://www.burgosinmotion.com/api/contact", { method: "POST", headers: { origin: "https://www.burgosinmotion.com", "content-type": "application/json" }, body: JSON.stringify(payload), ...options });
}
function handler(send = async () => "sent", limit = async () => ({ allowed: true, retryAfter: 600 })) { return createContactHandler({ send, limit }); }
const envKeys = ["NODE_ENV", "VERCEL", "VERCEL_ENV", "RESEND_API_KEY", "CONTACT_EMAIL_MODE", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL", "CONTACT_TEST_TO_EMAIL", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "CONTACT_RATE_LIMIT_SALT"];
async function withEnv(values, run) {
  const before = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
  for (const key of envKeys) { if (values[key] === undefined) delete process.env[key]; else process.env[key] = values[key]; }
  try { return await run(); } finally { for (const key of envKeys) { if (before[key] === undefined) delete process.env[key]; else process.env[key] = before[key]; } }
}

test("valid payload is trimmed, sent once and returns no provider details", async () => {
  let sent;
  const response = await handler(async (payload) => { sent = payload; return "sent"; })(request({ ...valid, name: "  Juan Perez  ", message: ` ${valid.message} ` }));
  assert.equal(response.status, 200);
  assert.equal(sent.name, valid.name);
  assert.equal(sent.message, valid.message);
  assert.deepEqual(await response.json(), { ok: true });
});

for (const [label, change] of [
  ["empty name", { name: "   " }], ["long name", { name: "a".repeat(101) }],
  ["invalid email", { email: "juan@invalid" }], ["email header injection", { email: "juan@example.com\r\nBcc:a@example.com" }],
  ["invalid project type", { projectType: "arbitrary subject" }], ["empty message", { message: " " }],
  ["oversized message", { message: "a".repeat(5001) }], ["non-string name", { name: 42 }],
  ["missing submissionId", { submissionId: undefined }], ["invalid submissionId", { submissionId: "id" }],
  ["oversized submissionId", { submissionId: "a".repeat(300) }], ["injected recipient", { to: "attacker@example.com" }],
]) test(`rejects ${label} without contacting provider`, async () => {
  let calls = 0;
  const response = await handler(async () => { calls++; return "sent"; })(request({ ...valid, ...change }));
  assert.equal(response.status, 400);
  assert.equal(calls, 0);
});

test("honeypot returns indistinguishable success without limiter or email", async () => {
  const fail = async () => { throw new Error("Must not run"); };
  const response = await handler(fail, fail)(request({ ...valid, website: "bot.example", email: "invalid" }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
});

test("rejects malformed, non-JSON, foreign origin and unsupported methods", async () => {
  assert.equal((await handler()(request(valid, { body: "{" }))).status, 400);
  assert.equal((await handler()(request(valid, { headers: { origin: "https://evil.example", "content-type": "application/json" } }))).status, 403);
  assert.equal((await handler()(request(valid, { headers: { origin: "https://www.burgosinmotion.com", "content-type": "text/plain" } }))).status, 415);
  assert.equal((await handler()(new Request("https://www.burgosinmotion.com/api/contact"))).status, 405);
});

test("bounds request bytes even for a stream without Content-Length", async () => {
  const declared = request(valid, { headers: { origin: "https://www.burgosinmotion.com", "content-type": "application/json", "content-length": "40000" } });
  assert.equal((await handler()(declared)).status, 413);
  const stream = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array(40000)); controller.close(); } });
  assert.equal((await handler()(request(valid, { body: stream, duplex: "half" }))).status, 413);
});

test("rate limit and upstream failures return safe errors", async () => {
  const limited = await handler(async () => { throw new Error("Not called"); }, async () => ({ allowed: false, retryAfter: 127 }))(request());
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "127");
  for (const [send, status] of [[async () => "unavailable", 503], [async () => "failed", 502], [async () => { throw new Error("secret provider data"); }, 503]]) {
    const response = await handler(send)(request());
    assert.equal(response.status, status);
    assert(!JSON.stringify(await response.json()).includes("secret"));
  }
});

test("HTML template escapes user content and keeps plain text readable", () => {
  const result = renderContactEmail({ ...valid, name: "Juan <b> & Perez", email: "diego+prueba@gmail.com", message: '<script>alert("x")</script>\nOtra línea.' });
  assert(!result.html.includes("<script>"));
  assert(result.html.includes("&lt;script&gt;"));
  assert(result.html.includes("Juan &lt;b&gt; &amp; Perez"));
  assert.equal((result.html.match(/href="mailto:diego%2Bprueba@gmail\.com"/g) ?? []).length, 2);
  assert(result.html.includes('href="mailto:diego%2Bprueba@gmail.com" style="color:#087c8d;font-weight:bold">Responder a Juan &lt;b&gt; &amp; Perez →</a>'));
  assert(result.text.includes('<script>alert("x")</script>'));
  assert(result.html.includes("<br>Otra línea."));
  assert.equal(result.subject, 'Motion Graphics · <script>alert("x")</script> Otra línea. · Juan <b> & Perez');
});

test("subject summary uses the first useful sentence and normalizes whitespace", () => {
  assert.equal(summarizeContactMessage("Consulta breve."), "Consulta breve.");
  assert.equal(summarizeContactMessage("Quiero cotizar una animación. El proyecto tendrá más detalles después."), "Quiero cotizar una animación.");
  assert.equal(summarizeContactMessage("Quiero consultar\n\nel valor de motion graphics.\r\nTengo más detalles."), "Quiero consultar el valor de motion graphics.");
  assert.equal(summarizeContactMessage("¿Podrían cotizar una animación para capacitación? ¡Gracias!"), "¿Podrían cotizar una animación para capacitación?");
});

test("subject truncates on a word boundary by Unicode code point and removes CR/LF", () => {
  const summary = summarizeContactMessage("Quiero consultar el valor de una animación interactiva para capacitación corporativa con personajes y una duración aproximada de dos minutos.");
  assert(summary.endsWith("…"));
  assert(Array.from(summary).length <= 68);
  assert(!summary.slice(0, -1).endsWith(" "));
  assert.equal(summarizeContactMessage("😀áéíóú ñ ü ¿¡".repeat(10)).endsWith("…"), true);

  const rendered = renderContactEmail({ ...valid, name: "Diego\r\nBcc: attacker@example.com", message: "Mensaje\r\nBcc: attacker@example.com" });
  assert(!/[\r\n]/.test(rendered.subject));
  assert.equal(rendered.subject, "Motion Graphics · Mensaje Bcc: attacker@example.com · Diego Bcc: attacker@example.com");
});

test("invalid visitor email is rejected before sending or rendering an email", async () => {
  let sends = 0;
  const response = await handler(async () => { sends++; return "sent"; })(request({ ...valid, email: "not-an-email" }));
  assert.equal(response.status, 400);
  assert.equal(sends, 0);
});

test("configuration does not invent a key or assume a verified sender", () => {
  assert.equal(getEmailConfiguration({}), null);
  assert.equal(getEmailConfiguration({ RESEND_API_KEY: "test-only", NODE_ENV: "production", CONTACT_EMAIL_MODE: "test" }), null);
  assert.equal(getEmailConfiguration({ RESEND_API_KEY: "test-only", CONTACT_EMAIL_MODE: "live" }), null);
  const testConfig = getEmailConfiguration({ RESEND_API_KEY: "test-only", NODE_ENV: "development" });
  assert.equal(testConfig.from, "onboarding@resend.dev");
  assert.equal(testConfig.to, "delivered@resend.dev");
});

test("official SDK receives fixed routing, visitor Reply-To and a stable idempotency key", async (context) => {
  const requests = [];
  context.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    requests.push({ headers: new Headers(options.headers), body: JSON.parse(options.body) });
    return Response.json({ id: "mock-email-id" });
  });
  await withEnv({ NODE_ENV: "production", RESEND_API_KEY: "test-only-not-a-real-key", CONTACT_EMAIL_MODE: "live", CONTACT_FROM_EMAIL: "web@burgosinmotion.com" }, async () => {
    assert.equal(await sendContactEmail(valid), "sent");
    assert.equal(await sendContactEmail(valid), "sent");
  });
  assert.equal(requests.length, 2);
  assert.equal(requests[0].body.from, "Burgos in Motion <web@burgosinmotion.com>");
  assert.deepEqual([requests[0].body.to].flat(), ["hola@burgosinmotion.com"]);
  assert.deepEqual([requests[0].body.reply_to].flat(), [valid.email]);
  assert.equal(requests[0].body.subject, "Motion Graphics · Consulta sobre un motion graphic de un minuto. · Juan Perez");
  assert.equal((requests[0].body.html.match(/href="mailto:juan@example\.com"/g) ?? []).length, 2);
  assert.equal(requests[0].headers.get("idempotency-key"), `contact/${valid.submissionId}`);
  assert.equal(requests[0].headers.get("idempotency-key"), requests[1].headers.get("idempotency-key"));
});

test("production refuses to send without the shared rate limiter", async () => {
  await withEnv({ NODE_ENV: "production" }, async () => {
    let sends = 0;
    const response = await handler(async () => { sends++; return "sent"; }, limitContactRequest)(request());
    assert.equal(response.status, 503);
    assert.equal(sends, 0);
  });
});

test("Redis limiter sends an atomic expiring counter, hashes IP and enforces quota", async (context) => {
  let command;
  let count = 1;
  context.mock.method(globalThis, "fetch", async (_url, options) => { command = JSON.parse(options.body); return Response.json({ result: [count, 550] }); });
  await withEnv({ NODE_ENV: "production", VERCEL: "1", UPSTASH_REDIS_REST_URL: "https://redis.example", UPSTASH_REDIS_REST_TOKEN: "test-only", CONTACT_RATE_LIMIT_SALT: "s".repeat(32) }, async () => {
    const req = request(valid, { headers: { "x-vercel-forwarded-for": "203.0.113.7" } });
    assert.equal((await limitContactRequest(req)).allowed, true);
    assert.equal(command[0], "EVAL");
    assert(command[1].includes("EXPIRE"));
    assert.equal(command[4], "600");
    assert(!command[3].includes("203.0.113.7"));
    count = 6;
    assert.deepEqual(await limitContactRequest(req), { allowed: false, retryAfter: 550 });
  });
});

test("local memory quota exists only in development", async () => {
  await withEnv({ NODE_ENV: "development" }, async () => {
    for (let i = 0; i < 5; i++) assert.equal((await limitContactRequest(request())).allowed, true);
    assert.equal((await limitContactRequest(request())).allowed, false);
  });
});

// DOM tests use the real form and selector, mocking only external I/O and native dialog methods.
const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!doctype html><body></body>", { url: "http://localhost:3000", pretendToBeVisual: true });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, "navigator", { configurable: true, value: dom.window.navigator });
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.HTMLDialogElement.prototype.showModal = function () { this.open = true; };
dom.window.HTMLDialogElement.prototype.close = function () { this.open = false; };
const React = require("react");
const { act } = React;
const { createRoot } = require("react-dom/client");
const ContactForm = require("../app/components/ContactForm.tsx").default;
const { ContactMethodsProvider } = require("../app/components/ContactMethods.tsx");

async function mountForm(context) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  await act(async () => root.render(React.createElement(ContactMethodsProvider, null, React.createElement(ContactForm))));
  const form = container.querySelector("form");
  for (const key of ["name", "email", "projectType", "message"]) form.elements.namedItem(key).value = valid[key];
  context.after(async () => { await act(async () => root.unmount()); container.remove(); });
  const submit = () => form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
  return { container, form, submit, button: form.querySelector('button[type="submit"]') };
}

test("frontend shows loading, blocks double click and accidental resubmit after success", async (context) => {
  let resolve;
  let calls = 0;
  context.mock.method(globalThis, "fetch", () => { calls++; return new Promise((done) => { resolve = done; }); });
  const { container, form, submit, button } = await mountForm(context);
  await act(async () => { submit(); submit(); });
  assert.equal(calls, 1);
  assert.equal(button.disabled, true);
  assert.equal(form.getAttribute("aria-busy"), "true");
  assert(button.textContent.includes("Enviando"));
  await act(async () => resolve(Response.json({ ok: true })));
  assert.equal(button.disabled, true);
  assert.equal(form.getAttribute("aria-busy"), "false");
  assert(container.textContent.includes("Gracias, Juan Perez"));
  await act(async () => submit());
  assert.equal(calls, 1);
  await act(async () => [...container.querySelectorAll("button")].find((item) => item.textContent === "Escribir otra consulta").click());
  assert.equal(button.disabled, false);
  assert.equal(form.elements.namedItem("message").value, "");
});

test("frontend error preserves data, reuses the key on retry and renews it after editing", async (context) => {
  const payloads = [];
  context.mock.method(globalThis, "fetch", async (_url, options) => { payloads.push(JSON.parse(options.body)); return Response.json({ ok: false, internal: "must not be shown" }, { status: 502 }); });
  const { form, submit, container, button } = await mountForm(context);
  await act(async () => submit());
  assert.equal(button.disabled, false);
  assert.equal(form.elements.namedItem("message").value, valid.message);
  assert(container.textContent.includes("No pude enviar"));
  assert(!container.textContent.includes("must not be shown"));
  await act(async () => submit());
  assert.equal(payloads[0].submissionId, payloads[1].submissionId);
  form.elements.namedItem("message").value += " Nuevo detalle.";
  await act(async () => submit());
  assert.notEqual(payloads[1].submissionId, payloads[2].submissionId);
  assert(validateContactPayload(payloads[2]));
});

test("frontend network error offers the existing Gmail/mailto/copy alternatives with the draft", async (context) => {
  context.mock.method(globalThis, "fetch", async () => { throw new Error("network"); });
  let copied;
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (value) => { copied = value; } } });
  const { form, submit, container } = await mountForm(context);
  await act(async () => submit());
  assert(container.textContent.includes("No pude confirmar"));
  await act(async () => form.querySelector('button[aria-haspopup="dialog"]').click());
  const dialog = container.querySelector("dialog");
  assert.equal(dialog.open, true);
  const gmail = new URL(dialog.querySelector('a[href^="https://mail.google.com"]').href);
  assert.equal(gmail.searchParams.get("to"), "hola@burgosinmotion.com");
  assert(gmail.searchParams.get("body").includes(valid.message));
  const mailto = dialog.querySelector('a[href^="mailto:"]').href;
  assert.equal(new URL(mailto).searchParams.get("subject"), valid.projectType);
  await act(async () => [...dialog.querySelectorAll("button")].find((item) => item.textContent === "Copiar correo").click());
  assert.equal(copied, "hola@burgosinmotion.com");
  assert(dialog.textContent.includes("Correo copiado"));
});

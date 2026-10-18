import "server-only";
import { contactLimits, validateContactPayload, type ContactPayload } from "../../lib/contact";
import type { RateLimitResult } from "./rate-limit";
import type { SendResult } from "./email";

function reply(status: number, code?: string, retryAfter?: number) {
  return Response.json(code ? { ok: false, code } : { ok: true }, {
    status,
    headers: { "Cache-Control": "no-store", ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) },
  });
}

async function readPayload(request: Request): Promise<unknown> {
  const declared = request.headers.get("content-length");
  if (declared && Number(declared) > contactLimits.bodyBytes) throw new RangeError();
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > contactLimits.bodyBytes) { await reader.cancel(); throw new RangeError(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export function createContactHandler(dependencies: {
  limit: (request: Request) => Promise<RateLimitResult>;
  send: (payload: ContactPayload) => Promise<SendResult>;
}) {
  return async function handleContact(request: Request) {
    if (request.method !== "POST") return new Response(null, { status: 405, headers: { Allow: "POST" } });
    if (request.headers.get("origin") !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") return reply(403, "invalid_origin");
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return reply(415, "invalid_content_type");
    let raw: unknown;
    try { raw = await readPayload(request); } catch (error) { return reply(error instanceof RangeError ? 413 : 400, "invalid_payload"); }
    // A bot receives the same apparent success, without validation hints or any send.
    if (raw && typeof raw === "object" && !Array.isArray(raw) && "website" in raw && typeof raw.website === "string" && raw.website.trim()) return reply(200);
    const payload = validateContactPayload(raw);
    if (!payload) return reply(400, "invalid_payload");
    try {
      const result = await dependencies.limit(request);
      if (!result.allowed) return reply(429, "rate_limited", result.retryAfter);
      const sent = await dependencies.send(payload);
      if (sent === "unavailable") return reply(503, "unavailable");
      return sent === "sent" ? reply(200) : reply(502, "send_failed");
    } catch { return reply(503, "unavailable"); }
  };
}

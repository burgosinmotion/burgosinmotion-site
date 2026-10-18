import "server-only";
import { Resend } from "resend";
import { contactEmail, isContactEmail, type ContactPayload } from "../../lib/contact";

export type SendResult = "sent" | "unavailable" | "failed";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

function mailtoHref(email: string) {
  const [local, domain] = email.split("@");
  // Keep @ as the mailto address separator while encoding reserved local-part characters.
  return `mailto:${encodeURIComponent(local)}@${encodeURIComponent(domain)}`;
}

function normalizeHeaderText(value: string) {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/gu, " ").trim();
}

export function summarizeContactMessage(message: string, maxLength = 68) {
  const normalized = normalizeHeaderText(message);
  const firstSentence = normalized.match(/^.*?[.!?…](?=\s|$)/u)?.[0] ?? normalized;
  const sentence = Array.from(firstSentence).length >= 15 ? firstSentence : normalized;
  const characters = Array.from(sentence);
  if (characters.length <= maxLength) return sentence;

  const limit = Math.max(1, maxLength - 1);
  const truncated = characters.slice(0, limit).join("");
  const wordBoundary = truncated.lastIndexOf(" ");
  const clean = wordBoundary > 0 ? truncated.slice(0, wordBoundary) : truncated;
  return `${clean.trimEnd()}…`;
}

export function renderContactEmail(payload: ContactPayload) {
  const { email, projectType, message } = payload;
  const name = normalizeHeaderText(payload.name);
  const replyHref = escapeHtml(mailtoHref(email));
  const safeProjectType = normalizeHeaderText(projectType.replace("Proyecto ", ""));
  const summary = summarizeContactMessage(message);
  const subject = `${safeProjectType} · ${summary} · ${name}`;
  const text = `b. / BURGOS IN MOTION\n\nNUEVA CONSULTA\n${projectType}\n\n${name}\n${email}\n\nTIPO DE PROYECTO\n${projectType}\n\nMENSAJE\n${message}\n\nResponder a ${name}: ${email}\n\nburgosinmotion.com`;
  // Only escaped text enters this table-based template; no visitor HTML is rendered.
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;background:#f2f5f6;color:#18252a;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #dce5e8">
<tr><td style="padding:26px;background:#121719;color:#ffffff;font-size:18px;font-weight:bold">b<span style="color:#06b6d4">.</span> / BURGOS IN MOTION</td></tr>
<tr><td style="padding:30px 26px"><p style="margin:0;color:#087c8d;font-size:12px;letter-spacing:2px;font-weight:bold">NUEVA CONSULTA</p>
<h1 style="font-size:26px;line-height:1.3">${escapeHtml(projectType)}</h1><p style="font-size:18px;margin-bottom:8px;font-weight:bold">${escapeHtml(name)}</p>
<p style="margin-top:0;word-break:break-word"><a href="${replyHref}" style="color:#087c8d">${escapeHtml(email)}</a></p>
<hr style="border:0;border-top:1px solid #dce5e8;margin:26px 0"><h2 style="font-size:12px;letter-spacing:1px;color:#52656e">TIPO DE PROYECTO</h2><p>${escapeHtml(projectType)}</p>
<h2 style="font-size:12px;letter-spacing:1px;color:#52656e;margin-top:26px">MENSAJE</h2><p style="font-size:16px;line-height:1.7;word-break:break-word">${escapeHtml(message).replace(/\r?\n/g, "<br>")}</p>
<p style="margin-top:30px"><a href="${replyHref}" style="color:#087c8d;font-weight:bold">Responder a ${escapeHtml(name)} →</a></p></td></tr>
<tr><td style="padding:20px 26px;border-top:1px solid #dce5e8;font-size:12px;color:#52656e"><a href="https://www.burgosinmotion.com" style="color:#52656e">burgosinmotion.com</a></td></tr>
</table></td></tr></table></body></html>`;
  return { subject, text, html };
}

export function getEmailConfiguration(env: NodeJS.ProcessEnv = process.env) {
  if (!env.RESEND_API_KEY) return null;
  const mode = env.CONTACT_EMAIL_MODE ?? "test";
  if (mode !== "test" && mode !== "live") return null;
  // Test mode is allowed in local / Vercel Preview, never on Vercel Production.
  const production = env.VERCEL_ENV === "production" || (env.NODE_ENV === "production" && !env.VERCEL_ENV);
  if (production && mode !== "live") return null;
  const from = mode === "test" ? "onboarding@resend.dev" : env.CONTACT_FROM_EMAIL;
  const to = mode === "test" ? (env.CONTACT_TEST_TO_EMAIL ?? "delivered@resend.dev") : (env.CONTACT_TO_EMAIL ?? contactEmail);
  if (!from || !isContactEmail(from) || !isContactEmail(to)) return null;
  return { apiKey: env.RESEND_API_KEY, from, to };
}

export async function sendContactEmail(payload: ContactPayload): Promise<SendResult> {
  const config = getEmailConfiguration();
  if (!config) return "unavailable";
  try {
    const { data, error } = await new Resend(config.apiKey).emails.send({
      from: `Burgos in Motion <${config.from}>`,
      to: config.to,
      replyTo: payload.email,
      ...renderContactEmail(payload),
    }, { idempotencyKey: `contact/${payload.submissionId}` });
    return error || !data?.id ? "failed" : "sent";
  } catch {
    // Provider details, credentials and visitor data must never reach logs or clients.
    return "failed";
  }
}

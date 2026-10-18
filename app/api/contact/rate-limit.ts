import "server-only";
import { createHmac } from "node:crypto";
import { isIP } from "node:net";

export type RateLimitResult = { allowed: boolean; retryAfter: number };
const windowSeconds = 600;
const maxRequests = 5;
const localCounters = new Map<string, { count: number; expires: number }>();
const script = `local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return {count, redis.call('TTL', KEYS[1])}`;

export async function limitContactRequest(request: Request): Promise<RateLimitResult> {
  const env = process.env;
  // Vercel overwrites this header at its edge; do not trust arbitrary proxy headers elsewhere.
  const ip = env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() : "local";
  if (env.VERCEL === "1" && (!ip || !isIP(ip))) throw new Error("Contact limiter unavailable");
  const salt = env.CONTACT_RATE_LIMIT_SALT;
  const url = env.UPSTASH_REDIS_REST_URL;
  const token = env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token && salt && salt.length >= 32) {
    if (new URL(url).protocol !== "https:") throw new Error("Contact limiter unavailable");
    const key = `contact:rate:${createHmac("sha256", salt).update(ip ?? "local").digest("hex")}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", script, "1", key, String(windowSeconds)]),
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error("Contact limiter unavailable");
    const data = await response.json() as { result?: unknown; error?: unknown };
    const result = data.result;
    if (data.error || !Array.isArray(result) || result.length !== 2 || !result.every(Number.isInteger) || result[0] < 1 || result[1] < 0) throw new Error("Contact limiter unavailable");
    return { allowed: result[0] <= maxRequests, retryAfter: Math.max(1, result[1]) };
  }
  // This Map is deliberately restricted to local `next dev`; never a production safeguard.
  if (env.NODE_ENV !== "development" || env.VERCEL === "1") throw new Error("Contact limiter unavailable");
  const now = Date.now();
  for (const [key, counter] of localCounters) if (counter.expires <= now) localCounters.delete(key);
  const counter = localCounters.get("local") ?? { count: 0, expires: now + windowSeconds * 1000 };
  counter.count += 1;
  localCounters.set("local", counter);
  return { allowed: counter.count <= maxRequests, retryAfter: Math.max(1, Math.ceil((counter.expires - now) / 1000)) };
}

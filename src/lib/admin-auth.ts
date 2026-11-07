import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "tgh_admin";
const TTL_S = 60 * 60 * 24 * 7;

const secret = () => {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
};
const sha = (v: string) => createHash("sha256").update(v).digest();
const sign = (v: string, key: string) => createHmac("sha256", key).update(v).digest("base64url");

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD && secret());

export function passwordOk(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && timingSafeEqual(sha(input), sha(expected!));
}

// Best-effort per-instance limiter on password attempts.
const attempts = new Map<string, number[]>();
export async function tooManyAttempts() {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 8;
}

export async function startSession() {
  const key = secret();
  if (!key) throw new Error("ADMIN_SESSION_SECRET is not set.");
  const exp = String(Math.floor(Date.now() / 1000) + TTL_S);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp, key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: TTL_S,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  const key = secret();
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!key || !raw) return false;
  const [exp, sig] = raw.split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  const good = Buffer.from(sign(exp, key));
  const got = Buffer.from(sig);
  return good.length === got.length && timingSafeEqual(good, got);
}

/** Call at the top of every admin page and every server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin");
}

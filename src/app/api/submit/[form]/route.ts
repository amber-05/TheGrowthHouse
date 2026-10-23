import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { FORMS } from "@/config/forms";
import { validate } from "@/lib/forms";
import { insertSubmission, NotConfiguredError } from "@/lib/store";

export const runtime = "nodejs";

const MAX_BODY = 20_000;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
// Best-effort per-instance limiter. For multi-instance deployments use an
// external store (e.g. Upstash) or the platform's WAF rate limiting.
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request, ctx: { params: Promise<{ form: string }> }) {
  const { form } = await ctx.params;
  if (!Object.hasOwn(FORMS, form)) return NextResponse.json({ error: "Unknown form." }, { status: 404 });
  const config = FORMS[form as keyof typeof FORMS];

  // Same-origin only.
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  const text = await req.text();
  if (text.length > MAX_BODY) return NextResponse.json({ error: "Submission too large." }, { status: 413 });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
    if (typeof body !== "object" || body === null) throw new Error();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Store nothing.
  if (typeof body._hp === "string" && body._hp !== "") {
    return NextResponse.json({ ok: true });
  }

  const { errors, clean } = validate(config.fields, body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Please correct the highlighted fields.", fields: errors }, { status: 422 });
  }

  try {
    await insertSubmission(config.id, clean, {
      ipHash: createHash("sha256").update(ip + (process.env.SUPABASE_URL ?? "")).digest("hex").slice(0, 32),
      userAgent: req.headers.get("user-agent") ?? "",
    });
  } catch (e) {
    if (e instanceof NotConfiguredError) {
      console.error("[submit] Backend not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
      return NextResponse.json(
        { error: "Submissions are temporarily unavailable. Please try again later." },
        { status: 503 },
      );
    }
    console.error("[submit] store failed", e);
    return NextResponse.json({ error: "We could not save your submission. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

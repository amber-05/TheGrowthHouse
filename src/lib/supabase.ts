import "server-only";

export function sbConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

/**
 * Legacy service_role keys are JWTs and go in both headers. The newer sb_secret_ keys
 * are not JWTs and must only be sent as `apikey`.
 */
export function authHeaders(key: string): Record<string, string> {
  return key.startsWith("eyJ") ? { apikey: key, Authorization: `Bearer ${key}` } : { apikey: key };
}

type Init = Omit<RequestInit, "body"> & { body?: unknown; prefer?: string; tags?: string[]; revalidate?: number };

/**
 * PostgREST call using the service-role key (server only). Pass `tags` to cache the
 * response in Next's data cache; admin actions call revalidateTag("content") so edits
 * show on the live site immediately.
 */
export async function sb<T>(path: string, init: Init = {}): Promise<T> {
  const cfg = sbConfig();
  if (!cfg) throw new Error("Backend credentials are not set.");
  const { body, prefer, tags, revalidate, ...rest } = init;
  const res = await fetch(`${cfg.url}/rest/v1/${path}`, {
    ...rest,
    headers: {
      ...authHeaders(cfg.key),
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    ...(tags ? { next: { tags, revalidate: revalidate ?? 3600 } } : { cache: "no-store" as const }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw Object.assign(new Error(`Supabase ${res.status}: ${detail.slice(0, 200)}`), { status: res.status });
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

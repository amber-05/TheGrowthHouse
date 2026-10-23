import "server-only";
import type { Values } from "./forms";

/** Each workflow lands in its own table. See supabase/schema.sql. */
export const TABLES = {
  founder: "founder_applications",
  investor: "investor_applications",
  enquiry: "service_enquiries",
} as const;

export class NotConfiguredError extends Error {}

/**
 * Inserts a row via Supabase's REST API using the service-role key, which only
 * ever exists on the server. Tables have RLS enabled with no public policies,
 * so the browser (anon key) can never read or write them.
 */
export async function insertSubmission(
  form: keyof typeof TABLES,
  clean: Values,
  meta: { ipHash: string; userAgent: string },
) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new NotConfiguredError("Backend credentials are not set.");

  const { email, fullName, name } = clean as Record<string, string>;
  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${TABLES[form]}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: fullName || name || null,
      email: email || null,
      answers: clean,
      ip_hash: meta.ipHash,
      user_agent: meta.userAgent.slice(0, 300),
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase insert failed (${res.status})`);
}

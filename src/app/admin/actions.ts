"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { PHOTOS } from "@/config/photos";
import {
  adminConfigured,
  endSession,
  passwordOk,
  requireAdmin,
  startSession,
  tooManyAttempts,
} from "@/lib/admin-auth";
import { adminGetPost, CONTENT_TAG, isSlug, isUuid, type Media } from "@/lib/content";
import { authHeaders, sb, sbConfig } from "@/lib/supabase";

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

/** Make edits visible on the live site straight away (no redeploy needed). */
function publish() {
  revalidateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

// ---------------------------------------------------------------- session
export async function login(_prev: { error?: string } | null, form: FormData) {
  if (!adminConfigured()) return { error: "Admin is not configured on this deployment." };
  if (await tooManyAttempts()) return { error: "Too many attempts. Try again in a few minutes." };
  if (!passwordOk(String(form.get("password") ?? ""))) return { error: "Incorrect password." };
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin");
}

// ---------------------------------------------------------------- posts
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");

export async function savePost(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  const title = text(form, "title");
  const slug = slugify(text(form, "slug") || title);
  const back = (msg: string) => redirect(`/admin/posts/${id || "new"}?e=${encodeURIComponent(msg)}`);
  if (!title) back("A title is required.");
  if (!isSlug(slug)) back("Could not make a valid web address from the title. Enter a slug using letters and numbers.");

  const cover = text(form, "cover_url");
  const wantsPublished = form.get("published") === "on";
  const existing = id !== "new" && isUuid(id) ? await adminGetPost(id) : null;
  const row = {
    slug,
    title,
    excerpt: text(form, "excerpt").slice(0, 400),
    body: String(form.get("body") ?? "").slice(0, 100_000),
    cover_url: cover || null,
    published: wantsPublished,
    published_at: wantsPublished ? (existing?.published_at ?? new Date().toISOString()) : (existing?.published_at ?? null),
    updated_at: new Date().toISOString(),
  };

  let savedId = existing?.id;
  try {
    if (existing) {
      await sb(`posts?id=eq.${existing.id}`, { method: "PATCH", body: row });
    } else {
      const created = await sb<{ id: string }[]>("posts?select=id", { method: "POST", body: row, prefer: "return=representation" });
      savedId = created[0].id;
    }
  } catch (e) {
    if ((e as { status?: number }).status === 409) back("Another post already uses that slug.");
    console.error("[admin] savePost", e);
    back("Could not save the post. Check the Supabase tables exist (supabase/schema.sql).");
  }
  publish();
  redirect(`/admin/posts/${savedId}?saved=1`);
}

export async function deletePost(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  if (!isUuid(id)) return;
  await sb(`posts?id=eq.${id}`, { method: "DELETE" });
  publish();
  redirect("/admin/posts");
}

// ---------------------------------------------------------------- media
const TYPES: Record<string, { kind: "image" | "video"; ext: string }> = {
  "image/jpeg": { kind: "image", ext: "jpg" },
  "image/png": { kind: "image", ext: "png" },
  "image/webp": { kind: "image", ext: "webp" },
  "image/gif": { kind: "image", ext: "gif" },
  "image/avif": { kind: "image", ext: "avif" },
  "video/mp4": { kind: "video", ext: "mp4" },
  "video/webm": { kind: "video", ext: "webm" },
  "video/quicktime": { kind: "video", ext: "mov" },
};
const MAX_BYTES = 50 * 1024 * 1024;
const BUCKET = "media";

/**
 * Files go straight from the browser to Supabase Storage through a one-time signed URL,
 * so large videos never pass through (or hit the size limit of) a Vercel function.
 */
export async function prepareUpload(input: { name: string; type: string; size: number }) {
  await requireAdmin();
  const cfg = sbConfig();
  if (!cfg) return { error: "Backend credentials are not set." };
  const t = TYPES[input.type];
  if (!t) return { error: "Use JPG, PNG, WebP, GIF, AVIF, MP4, WebM or MOV files." };
  if (input.size > MAX_BYTES) return { error: "Files must be 50 MB or smaller." };

  const base = slugify(input.name.replace(/\.[^.]+$/, "")).slice(0, 40) || "file";
  const path = `${Date.now().toString(36)}-${randomBytes(3).toString("hex")}-${base}.${t.ext}`;
  const res = await fetch(`${cfg.url}/storage/v1/object/upload/sign/${BUCKET}/${path}`, {
    method: "POST",
    headers: { ...authHeaders(cfg.key), "Content-Type": "application/json" },
    body: "{}",
    cache: "no-store",
  });
  if (!res.ok) return { error: "Could not start the upload. Has the storage bucket been created?" };
  const { url } = (await res.json()) as { url: string };
  return { uploadUrl: `${cfg.url}/storage/v1${url}`, path, kind: t.kind };
}

export async function registerMedia(input: { path: string; kind: "image" | "video"; title: string }) {
  await requireAdmin();
  const cfg = sbConfig();
  if (!cfg || !/^[a-z0-9][a-z0-9.-]*$/.test(input.path) || !["image", "video"].includes(input.kind)) {
    return { error: "Invalid upload." };
  }
  try {
    await sb("media", {
      method: "POST",
      body: {
        kind: input.kind,
        path: input.path,
        url: `${cfg.url}/storage/v1/object/public/${BUCKET}/${input.path}`,
        title: input.title.slice(0, 120),
      },
    });
  } catch (e) {
    console.error("[admin] registerMedia", e);
    return { error: "Uploaded, but could not save the record." };
  }
  publish();
  return {};
}

export async function updateMedia(form: FormData) {
  await requireAdmin();
  const id = text(form, "id");
  if (!isUuid(id)) return;
  await sb(`media?id=eq.${id}`, {
    method: "PATCH",
    body: {
      title: text(form, "title").slice(0, 120),
      alt: text(form, "alt").slice(0, 300),
      caption: text(form, "caption").slice(0, 400),
      in_gallery: form.get("in_gallery") === "on",
    },
  });
  publish();
  redirect("/admin/media?saved=1");
}

export async function deleteMedia(form: FormData) {
  await requireAdmin();
  const cfg = sbConfig();
  const id = text(form, "id");
  if (!cfg || !isUuid(id)) return;
  const [m] = await sb<Media[]>(`media?select=*&id=eq.${id}&limit=1`);
  if (m) {
    // Drop slot overrides that point at this file so no page references a deleted image.
    await sb(`photo_slots?url=eq.${encodeURIComponent(m.url)}`, { method: "DELETE" });
    await sb(`posts?cover_url=eq.${encodeURIComponent(m.url)}`, { method: "PATCH", body: { cover_url: null } });
    await sb(`media?id=eq.${id}`, { method: "DELETE" });
    await fetch(`${cfg.url}/storage/v1/object/${BUCKET}/${m.path}`, {
      method: "DELETE",
      headers: authHeaders(cfg.key),
    }).catch(() => {});
  }
  publish();
  redirect("/admin/media");
}

// ---------------------------------------------------------------- photo slots
export async function setSlot(form: FormData) {
  await requireAdmin();
  const slot = text(form, "slot");
  const url = text(form, "url");
  if (!Object.hasOwn(PHOTOS, slot)) return;
  if (!url) {
    await sb(`photo_slots?slot=eq.${slot}`, { method: "DELETE" });
  } else {
    // Only accept files that are in the media library.
    const known = await sb<{ id: string }[]>(`media?select=id&url=eq.${encodeURIComponent(url)}&kind=eq.image&limit=1`);
    if (!known.length) return;
    await sb("photo_slots?on_conflict=slot", {
      method: "POST",
      prefer: "resolution=merge-duplicates",
      body: { slot, url, alt: text(form, "alt").slice(0, 300) || null, updated_at: new Date().toISOString() },
    });
  }
  publish();
  redirect("/admin/photos?saved=1");
}

import "server-only";
import { PHOTOS, type PhotoSlot } from "@/config/photos";
import { sb, sbConfig } from "./supabase";

export const CONTENT_TAG = "content";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  published: boolean;
  published_at: string | null;
  updated_at: string;
};
export type Media = {
  id: string;
  created_at: string;
  kind: "image" | "video";
  path: string;
  url: string;
  title: string;
  alt: string;
  caption: string;
  in_gallery: boolean;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const isUuid = (v: string) => UUID.test(v);
export const isSlug = (v: string) => SLUG.test(v) && v.length <= 80;

/** Public site reads never throw: if the backend is down or unset the page just shows nothing. */
async function safe<T>(fallback: T, run: () => Promise<T>): Promise<T> {
  if (!sbConfig()) return fallback;
  try {
    return await run();
  } catch (e) {
    console.error("[content]", e);
    return fallback;
  }
}

const LIST_COLS = "id,slug,title,excerpt,cover_url,published,published_at,updated_at";

// ---- public reads (cached, invalidated by admin edits)
export const listPublishedPosts = () =>
  safe<Omit<Post, "body">[]>([], () =>
    sb(`posts?select=${LIST_COLS}&published=eq.true&order=published_at.desc`, { tags: [CONTENT_TAG] }),
  );

export const getPublishedPost = (slug: string) =>
  safe<Post | null>(null, async () => {
    if (!isSlug(slug)) return null;
    const rows = await sb<Post[]>(`posts?select=*&slug=eq.${slug}&published=eq.true&limit=1`, { tags: [CONTENT_TAG] });
    return rows[0] ?? null;
  });

export const listGallery = () =>
  safe<Media[]>([], () => sb(`media?select=*&in_gallery=eq.true&order=created_at.desc`, { tags: [CONTENT_TAG] }));

async function slotOverrides() {
  return safe<Record<string, { url: string; alt: string | null }>>({}, async () => {
    const rows = await sb<{ slot: string; url: string; alt: string | null }[]>(`photo_slots?select=slot,url,alt`, {
      tags: [CONTENT_TAG],
    });
    return Object.fromEntries(rows.map((r) => [r.slot, r]));
  });
}

/** A photo slot's default config merged with any override set in the admin. */
export async function resolvePhoto(slot: PhotoSlot) {
  const base = PHOTOS[slot];
  const o = (await slotOverrides())[slot];
  return o ? { ...base, src: o.url, alt: o.alt || base.alt } : base;
}

// ---- admin reads (never cached)
export const adminListPosts = () => sb<Omit<Post, "body">[]>(`posts?select=${LIST_COLS}&order=created_at.desc`);
export const adminGetPost = async (id: string) =>
  isUuid(id) ? ((await sb<Post[]>(`posts?select=*&id=eq.${id}&limit=1`))[0] ?? null) : null;
export const adminListMedia = () => sb<Media[]>(`media?select=*&order=created_at.desc`);
export const adminSlotOverrides = async () =>
  Object.fromEntries(
    (await sb<{ slot: string; url: string; alt: string | null }[]>(`photo_slots?select=slot,url,alt`)).map((r) => [r.slot, r]),
  );

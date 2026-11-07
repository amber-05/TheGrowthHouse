import Link from "next/link";
import { notFound } from "next/navigation";
import { deletePost, savePost } from "../../actions";
import { requireAdmin } from "@/lib/admin-auth";
import { adminGetPost, adminListMedia, type Media, type Post } from "@/lib/content";

export default async function EditPost({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ e?: string; saved?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { e, saved } = await searchParams;
  const isNew = id === "new";
  const post: Post | null = isNew ? null : await adminGetPost(id).catch(() => null);
  if (!isNew && !post) notFound();
  const images: Media[] = await adminListMedia().then((m) => m.filter((x) => x.kind === "image")).catch(() => []);

  return (
    <>
      <div className="admin__head">
        <h1 className="h-lg">{isNew ? "New post" : "Edit post"}</h1>
        {post?.published && <Link href={`/blog/${post.slug}`} className="btn btn--ghost btn--sm" target="_blank">View live</Link>}
      </div>
      {saved && <p className="admin__ok" role="status">Saved. The change is live.</p>}
      {e && <p className="admin__error" role="alert">{e}</p>}

      <form action={savePost} className="admin__card admin__form">
        <input type="hidden" name="id" value={id} />
        <label className="admin__field">
          <span>Title</span>
          <input name="title" defaultValue={post?.title} required maxLength={160} />
        </label>
        <label className="admin__field">
          <span>Web address (slug)</span>
          <input name="slug" defaultValue={post?.slug} placeholder="Made from the title if left empty" maxLength={80} />
        </label>
        <label className="admin__field">
          <span>Short summary</span>
          <textarea name="excerpt" rows={2} defaultValue={post?.excerpt} maxLength={400} />
        </label>
        <label className="admin__field">
          <span>Cover image</span>
          <select name="cover_url" defaultValue={post?.cover_url ?? ""}>
            <option value="">No cover image</option>
            {images.map((m) => (
              <option key={m.id} value={m.url}>{m.title || m.path}</option>
            ))}
          </select>
        </label>
        <label className="admin__field">
          <span>Article</span>
          <textarea name="body" rows={18} defaultValue={post?.body} />
          <small>
            Blank line between paragraphs. <code>## Heading</code>, <code>### Subheading</code>, <code>- list item</code>,{" "}
            <code>**bold**</code>, <code>*italic*</code>, <code>[link text](https://…)</code>. For a photo or video, paste its
            line from the Photos &amp; videos page on its own line, e.g. <code>![Description](https://…)</code>.
          </small>
        </label>
        <label className="admin__check">
          <input type="checkbox" name="published" defaultChecked={post?.published} />
          <span>Published (visible on the website)</span>
        </label>
        <div className="btn-row">
          <button className="btn">Save</button>
        </div>
      </form>

      {post && (
        <form action={deletePost} className="admin__danger">
          <input type="hidden" name="id" value={post.id} />
          <button className="admin__link">Delete this post</button>
        </form>
      )}
    </>
  );
}

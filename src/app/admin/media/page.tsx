import { deleteMedia, updateMedia } from "../actions";
import { CopyButton, Uploader } from "./MediaTools";
import { requireAdmin } from "@/lib/admin-auth";
import { adminListMedia } from "@/lib/content";

export default async function AdminMedia({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const media = await adminListMedia().catch(() => null);
  return (
    <>
      <h1 className="h-lg">Photos &amp; videos</h1>
      {saved && <p className="admin__ok" role="status">Saved. The change is live.</p>}
      <Uploader />
      {media === null && <p className="admin__error">Could not load the library. Check the Supabase setup.</p>}
      {media?.length === 0 && <p>Nothing uploaded yet.</p>}
      <ul className="admin__list admin__media">
        {media?.map((m) => (
          <li key={m.id} className="admin__card">
            <div className="admin__thumb">
              {m.kind === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={m.alt} loading="lazy" />
              ) : (
                <video src={m.url} controls preload="metadata" playsInline />
              )}
            </div>
            <form action={updateMedia} className="admin__form">
              <input type="hidden" name="id" value={m.id} />
              <label className="admin__field"><span>Title</span><input name="title" defaultValue={m.title} maxLength={120} /></label>
              <label className="admin__field"><span>Description for screen readers (alt text)</span><input name="alt" defaultValue={m.alt} maxLength={300} /></label>
              <label className="admin__field"><span>Caption</span><input name="caption" defaultValue={m.caption} maxLength={400} /></label>
              <label className="admin__check"><input type="checkbox" name="in_gallery" defaultChecked={m.in_gallery} /><span>Show in the public gallery</span></label>
              <div className="btn-row">
                <button className="btn btn--sm">Save</button>
                <CopyButton text={`${m.kind === "image" ? `![${m.alt || m.title}]` : `![${m.title}]`}(${m.url})`} label="Copy for blog post" />
                <CopyButton text={m.url} label="Copy link" />
              </div>
            </form>
            <form action={deleteMedia} className="admin__danger">
              <input type="hidden" name="id" value={m.id} />
              <button className="admin__link">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}

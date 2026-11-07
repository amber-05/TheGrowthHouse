import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { adminListPosts } from "@/lib/content";

export default async function AdminPosts() {
  await requireAdmin();
  const posts = await adminListPosts().catch(() => null);
  return (
    <>
      <div className="admin__head">
        <h1 className="h-lg">Blog posts</h1>
        <Link href="/admin/posts/new" className="btn btn--sm">New post</Link>
      </div>
      {posts === null && <p className="admin__error">Could not load posts. Check the Supabase setup.</p>}
      {posts?.length === 0 && <p>No posts yet.</p>}
      <ul className="admin__list">
        {posts?.map((p) => (
          <li key={p.id} className="admin__card admin__row">
            <div>
              <Link href={`/admin/posts/${p.id}`}><strong>{p.title}</strong></Link>
              <small>/blog/{p.slug}</small>
            </div>
            <span className={`admin__badge${p.published ? " is-live" : ""}`}>{p.published ? "Published" : "Draft"}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

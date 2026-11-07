import Link from "next/link";
import LoginForm from "./LoginForm";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { sbConfig } from "@/lib/supabase";

export default async function AdminHome() {
  if (!adminConfigured()) {
    return (
      <div className="admin__card">
        <h1 className="h-lg">Admin isn’t set up yet</h1>
        <p>
          Add <code>ADMIN_PASSWORD</code> and <code>ADMIN_SESSION_SECRET</code> (at least 32 random characters) to the
          Vercel environment variables, then redeploy. See <code>.env.example</code>.
        </p>
      </div>
    );
  }
  if (!(await isAdmin())) return <LoginForm />;

  return (
    <>
      <h1 className="h-lg">Site admin</h1>
      {!sbConfig() && (
        <p className="admin__error">
          <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> are not set, so nothing can be saved.
        </p>
      )}
      <div className="admin__tiles">
        <Link href="/admin/posts" className="admin__card admin__tile">
          <strong>Blog posts</strong>
          <span>Write, edit, publish or unpublish articles.</span>
        </Link>
        <Link href="/admin/media" className="admin__card admin__tile">
          <strong>Photos &amp; videos</strong>
          <span>Upload files, edit captions, choose what shows in the gallery.</span>
        </Link>
        <Link href="/admin/photos" className="admin__card admin__tile">
          <strong>Page photos</strong>
          <span>Swap the pictures used across the home, club and services pages.</span>
        </Link>
      </div>
      <p className="admin__hint">Changes go live on the website the moment you save. No redeploy is needed.</p>
    </>
  );
}

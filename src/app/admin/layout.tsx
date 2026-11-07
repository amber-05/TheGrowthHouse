import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "./actions";
import { isAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const signedIn = await isAdmin();
  return (
    <div className="admin">
      <div className="container">
        {signedIn && (
          <nav className="admin__bar" aria-label="Admin">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/posts">Blog posts</Link>
            <Link href="/admin/media">Photos &amp; videos</Link>
            <Link href="/admin/photos">Page photos</Link>
            <form action={logout}>
              <button className="admin__link" type="submit">Sign out</button>
            </form>
          </nav>
        )}
        {children}
      </div>
    </div>
  );
}

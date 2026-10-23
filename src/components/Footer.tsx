import Link from "next/link";
import { NAV, SITE } from "@/config/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-brand">
              Build bigger.<br /><em>Grow together.</em>
            </p>
            <p style={{ marginTop: "1.25rem", maxWidth: "26rem", fontSize: ".95rem" }}>
              {SITE.description}
            </p>
            {SITE.contactEmail && (
              <p style={{ marginTop: "1rem", fontSize: ".95rem" }}>
                <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
              </p>
            )}
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Apply</h4>
            <ul>
              <li><Link href="/founders-club#apply">Founders Club</Link></li>
              <li><Link href="/investors-club#apply">Investors Club</Link></li>
              <li><Link href="/other-services">Enquire about a service</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-base footer-legal">
          <span>© {new Date().getFullYear()} The Growth House. All rights reserved.</span>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

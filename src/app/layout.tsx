import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import PaperTear from "@/components/PaperTear";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/config/site";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Great businesses aren’t built alone`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  openGraph: { type: "website", siteName: SITE.name, title: SITE.name, description: SITE.description, url: "/" },
  twitter: { card: "summary", title: SITE.name, description: SITE.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#F5F2E9" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{var force=/[?&]intro=1/.test(location.search);if((!force&&sessionStorage.getItem('tg-tear'))||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('no-tear')}else{d.classList.add('tear-wait');setTimeout(function(){d.classList.remove('tear-wait')},8000)}}catch(e){d.classList.add('no-tear')}})()`,
          }}
        />
        <noscript><style>{`.tear{display:none}`}</style></noscript>
        <PaperTear />
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import PaperTear from "@/components/PaperTear";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/config/site";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${SITE.name} — Build bigger. Grow together.`, template: `%s — ${SITE.name}` },
  description: SITE.description,
};

export const viewport: Viewport = { themeColor: "#F5F4ED" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{var force=/[?&]intro=1/.test(location.search);if((!force&&sessionStorage.getItem('tg-tear'))||matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('no-tear')}else{d.style.setProperty('--intro','1.9s');d.classList.add('tear-wait');setTimeout(function(){d.classList.remove('tear-wait')},8000)}}catch(e){d.classList.add('no-tear')}})()`,
          }}
        />
        <noscript><style>{`.tear{display:none}`}</style></noscript>
        <PaperTear />
        <a className="skip-link" href="#main">Skip to content</a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

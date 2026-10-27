import Image from "next/image";
import { COMPANIES } from "@/config/site";

/** Static line of the companies already listed in src/config/site.ts, linked to their own sites. */
export default function CompanyStrip() {
  return (
    <ul className="companies" aria-label="Companies">
      {COMPANIES.map((c) => {
        const logo = c.images.find((i) => i?.contain);
        return (
          <li key={c.name}>
            <a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`${c.name} (opens in a new tab)`}>
              {logo && <Image src={logo.src} alt="" width={120} height={48} />}
              <span>{c.name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Use" };

export default function Terms() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        By using this website you agree to these terms. If you do not agree, please do not use the
        site.
      </p>

      <h2>About this website</h2>
      <p>
        The Growth House is a business community connecting founders, investors and experienced
        business leaders. The information on this website is general and is provided for
        information only.
      </p>

      <h2>No advice, no guarantees</h2>
      <p>
        Nothing on this website is financial, investment, legal or tax advice, or an offer to buy
        or sell any security. Membership, guidance, introductions and services are not a promise
        of funding, investment, growth or any particular result. You are responsible for your own
        business and investment decisions and should take independent professional advice where
        appropriate.
      </p>

      <h2>Applications and enquiries</h2>
      <p>
        Submitting an application or enquiry does not create a membership or a service agreement.
        Applications are reviewed and may be accepted or declined at our discretion. Information
        you submit must be accurate and you must have the right to share it. How we handle it is
        described in our <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not misuse the website, attempt to gain unauthorised access, or interfere with its operation.</li>
        <li>Do not submit false, misleading or unlawful information, or information about others without their permission.</li>
        <li>Do not use automated tools to submit forms or collect content.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        The content, design and branding of this website belong to The Growth House or its
        licensors. You may view and share pages for personal, non-commercial use, but may not
        copy or reuse them otherwise without our permission.
      </p>

      <h2>Liability</h2>
      <p>
        We work to keep this website accurate and available but provide it &ldquo;as is&rdquo;.
        To the extent permitted by law, we are not liable for losses arising from your use of the
        website or reliance on its content.
      </p>

      <h2>Changes and governing law</h2>
      <p>
        We may update these terms from time to time; the date above shows the latest version.
        The governing law and jurisdiction will be confirmed by The Growth House&rsquo;s legal
        adviser.
      </p>
    </LegalPage>
  );
}

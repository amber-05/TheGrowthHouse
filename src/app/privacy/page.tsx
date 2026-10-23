import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  const contact = SITE.contactEmail ? (
    <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
  ) : (
    "the contact details published on this website"
  );

  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what personal information The Growth House collects through this
        website, why we collect it, and the choices you have. We have tried to keep it short and
        plain.
      </p>

      <h2>What we collect</h2>
      <p>We only collect information you choose to send us through our forms:</p>
      <ul>
        <li><strong>Founders Club and Investors Club applications:</strong> your name, email, phone, location, business or professional background, links you share (such as a website or LinkedIn), and your answers to the questions on the form.</li>
        <li><strong>Service enquiries:</strong> your name, company, email, phone, the service you are interested in, your business stage (optional) and your description of what you need.</li>
        <li><strong>Technical data:</strong> when you submit a form we also store your browser&rsquo;s user-agent string and a one-way hash of your IP address. We use these only to detect spam and abuse.</li>
      </ul>
      <p>We do not currently use advertising or analytics cookies on this website.</p>

      <h2>How we use it</h2>
      <ul>
        <li>To review your application or enquiry and to reply to you.</li>
        <li>To keep the website and our forms secure and free from spam.</li>
        <li>To meet legal obligations where they apply.</li>
      </ul>
      <p>We do not sell your personal information. We do not use it for marketing unless you have separately agreed to that.</p>

      <h2>Who can see it</h2>
      <p>
        Submissions are stored in a private database that is not accessible from the public
        website. Access is limited to authorised people at The Growth House who need it to
        respond to you. We use infrastructure and hosting providers to run the website and store
        data on our behalf, and they process it only to provide those services. Where we introduce
        you to a member, mentor or investor, we will ask you first.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep your information for as long as needed to consider your application or enquiry and
        to maintain a record of our relationship with you. You can ask us to delete it at any time
        (see below), unless we are required to keep it by law.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access the personal information we
        hold about you, correct it, delete it, object to or restrict how we use it, withdraw your
        consent, or receive a copy of it. To exercise any of these rights, contact us using the
        details below and we will respond within a reasonable time.
      </p>

      <h2>Security</h2>
      <p>
        We use access controls, encrypted connections and a locked-down database to protect your
        information. No system is perfectly secure, so please avoid sending sensitive information
        (such as government ID numbers or financial account details) through our forms.
      </p>

      <h2>Children</h2>
      <p>This website is intended for adults and is not directed at children.</p>

      <h2>Changes to this policy</h2>
      <p>If we change this policy, we will update the date at the top of this page.</p>

      <h2>Contact</h2>
      <p>Questions or requests about your information? Reach us at {contact}.</p>
    </LegalPage>
  );
}

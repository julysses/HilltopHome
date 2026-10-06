import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms governing your use of the Hilltop Home Co. website.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <div className="container-page py-16">
      <h1 className="mb-2 text-3xl font-extrabold uppercase tracking-wide text-text sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mb-10 text-sm text-text/50">Effective Date: October 6, 2026</p>

      <div className="mx-auto flex max-w-2xl flex-col gap-8 text-text/80">
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">Acceptance of Terms</h2>
          <p>
            By using this website and submitting information through our forms, you agree to
            these Terms of Service and our Privacy Policy.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">Hilltop Home Co. Property Inquiry Updates</h2>
          <p>Hilltop Home Co. is a DBA of The Jays Dallas, LLC. If you select the optional, initially unchecked SMS box on our offer form, you agree to recurring automated texts about your property inquiry, offer updates, appointment reminders and closing updates. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase or receiving an offer. Providing a number alone does not enroll you; SMS consent does not authorize AI calls or unrelated marketing.</p>
          <p className="mt-3">Reply <strong>STOP</strong> to unsubscribe or <strong>HELP</strong> for help. Contact <a href="tel:+12147010100" className="underline">(214) 701-0100</a> or <a href="mailto:julio@hilltophome.co" className="underline">julio@hilltophome.co</a>. Carriers are not liable for delayed or undelivered messages. See our <a href="/privacy-policy" className="underline">Privacy Policy</a> for how we protect mobile information and consent records.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">No Obligation</h2>
          <p>
            Submitting the Get an Offer form does not obligate you to sell your property to us,
            and does not obligate us to purchase it. Any offer we make is subject to further
            review and mutual agreement.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">No Guaranteed Offer Amount</h2>
          <p>
            Information submitted through our website is used to provide a preliminary estimate.
            Final offer amounts are determined after further evaluation of the property and are
            not guaranteed by anything shown on this site.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">Accuracy of Information</h2>
          <p>
            You agree to provide accurate information about yourself and the property when using
            our forms. We rely on this information to evaluate your submission.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">Limitation of Liability</h2>
          <p>
            This website and its contents are provided &quot;as is&quot; without warranties of
            any kind. Hilltop Home Co. is not liable for any damages arising from your use of
            this site.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">Governing Law</h2>
          <p>These terms are governed by the laws of the State of Texas.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">Contact Us</h2>
          <p>
            Questions about these terms can be directed to us using the contact information
            listed on our site.
          </p>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Hilltop Home Co. collects, uses, and protects your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="container-page py-16">
      <h1 className="mb-2 text-3xl font-extrabold uppercase tracking-wide text-text sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mb-10 text-sm text-text/50">Effective Date: October 6, 2026</p>

      <div className="mx-auto flex max-w-2xl flex-col gap-8 text-text/80">
        <p>Hilltop Home Co. is a DBA of The Jays Dallas, LLC.</p>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">Information We Collect</h2>
          <p>
            When you submit our Get an Offer form, we collect the information you provide,
            including your name, phone number, email address (if given), property address,
            details about your situation and timeline, and any notes about the property&apos;s
            condition. We also collect technical information such as the page you submitted the
            form from and UTM/campaign parameters, to understand how visitors find our site. We retain your SMS choice, the disclosure version and text, source form URL and receipt time.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">How We Use Your Information</h2>
          <p>
            We use the information you provide to evaluate your property, follow up on your
            inquiry, and, if you consent, to contact you by phone, text, or email about your
            submission.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">Who We Share It With</h2>
          <p>
            We share information with service providers who help us operate, including Twilio
            (for SMS and call delivery) and our email delivery provider. Mobile information,
            SMS opt-in data and consent are not sold or shared with third parties or affiliates
            for marketing or promotional purposes. Messaging service providers may process
            them only to operate the program. We do not send form contact details or SMS
            consent to advertising providers.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">SMS Communications &amp; Opt-Out</h2>
          <p>
            The optional checkbox enrolls you in Hilltop Home Co. Property Inquiry Updates: recurring automated texts about your inquiry, offers, appointments and closing. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase or receiving an offer. SMS consent does not authorize AI calls or unrelated marketing. You can
            opt out at any time by replying STOP to any message. Reply HELP for assistance.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">Data Retention</h2>
          <p>
            We retain your information for as long as needed to respond to your inquiry and
            maintain accurate business records, or as required by law.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-bold text-text">Contact Us</h2>
          <p>
            If you have questions about this policy or want to request that your information be
            deleted, contact us using the phone number or contact method listed on our site.
          </p>
        </section>
      </div>
    </div>
  );
}

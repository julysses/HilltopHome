import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_TEL } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about selling your house to Hilltop Home Co. — repairs, timelines, fees, probate, and foreclosure.",
  path: "/faq",
});

const FAQS = [
  {
    q: "Do I need to fix anything before selling?",
    a: "No. We buy houses in as-is condition — that includes homes that need major repairs, have deferred maintenance, or have tenants currently living in them. You don't need to clean, repair, or stage anything.",
  },
  {
    q: "How fast can you actually close?",
    a: "We can close in as little as 7 days once we agree on an offer. If you need more time, we'll work around your schedule — there's no pressure to close faster than works for you.",
  },
  {
    q: "Are there any fees or commissions?",
    a: "No. There are no agent commissions and no closing costs charged to you. The cash offer we make is the amount you receive.",
  },
  {
    q: "What if the house is in probate or I inherited it?",
    a: "We work with inherited and probate properties regularly. We can walk you through the process and work with your timeline, including situations where probate is still in progress.",
  },
  {
    q: "What if I'm behind on taxes or in foreclosure?",
    a: "We've helped homeowners in these exact situations. Reach out as soon as you can — the sooner we talk, the more options are usually available.",
  },
  {
    q: "How is this different from a big national iBuyer?",
    a: "We're a local DFW team, not an algorithm or a call center. You'll talk to a real person who knows the area, and offers are based on a direct conversation about your house and your situation.",
  },
  {
    q: "Is my information kept private?",
    a: "Yes. We only use your information to evaluate and follow up on your inquiry. See our Privacy Policy for full details on what we collect and how it's used.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-page py-16">
      <h1 className="mb-4 text-center text-3xl font-extrabold uppercase tracking-wide text-text sm:text-4xl">
        Frequently Asked Questions
      </h1>
      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-8">
        {FAQS.map((item) => (
          <div key={item.q}>
            <h2 className="mb-1 text-lg font-bold text-text">{item.q}</h2>
            <p className="text-text/70">{item.a}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-2xl text-center">
        <p className="mb-4 text-text/70">
          Still have questions? Call or text us at{" "}
          <a href={`tel:${OWNER_PHONE_TEL}`} className="font-semibold text-primary">
            {OWNER_PHONE_DISPLAY}
          </a>
          .
        </p>
        <Button href="/get-an-offer">Get My Cash Offer</Button>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How It Works",
  description:
    "Selling to Hilltop Home Co. in four simple steps — tell us about your house, we reach out fast, a quick walkthrough, and you pick your closing date.",
  path: "/how-it-works",
});

const STEPS = [
  {
    title: "1. Tell Us About Your House",
    body: "Fill out our short Get an Offer form — property address, a bit about your situation, and how you'd like us to reach you. It takes about two minutes, and there's no obligation.",
  },
  {
    title: "2. We'll Call Or Text You Back — Fast",
    body: "A real person from our team reviews your info and reaches out, usually the same day and always within 24 hours. No call centers, no scripts.",
  },
  {
    title: "3. Walkthrough Or Virtual Look",
    body: "We'll take a look at the property — in person or virtually, whatever's easier for you. No need to clean up, make repairs, or stage anything.",
  },
  {
    title: "4. Pick Your Closing Date",
    body: "If our cash offer works for you, you choose the timeline. Close in as little as 7 days, or on a date further out that fits your plans.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="container-page py-16">
      <h1 className="mb-4 text-center text-3xl font-extrabold uppercase tracking-wide text-text sm:text-4xl">
        How It Works
      </h1>
      <p className="mx-auto mb-12 max-w-xl text-center text-text/70">
        Selling your house shouldn&apos;t be complicated. Here&apos;s exactly what happens when
        you work with Hilltop Home Co.
      </p>
      <div className="mx-auto flex max-w-2xl flex-col gap-8">
        {STEPS.map((step) => (
          <div key={step.title}>
            <h2 className="mb-1 text-lg font-bold text-text">{step.title}</h2>
            <p className="text-text/70">{step.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button href="/get-an-offer">Get My Cash Offer</Button>
      </div>
    </div>
  );
}

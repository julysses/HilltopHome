import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustSignals } from "@/components/home/TrustSignals";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { GetOfferForm } from "@/components/forms/GetOfferForm/GetOfferForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "We Buy Houses in DFW, As-Is, For Cash",
  description:
    "Hilltop Home Co. buys houses across the Dallas-Fort Worth area as-is, for cash. No repairs, no fees, no obligation.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <ProcessSection />
      <section id="get-an-offer" className="bg-surface-subtle py-16">
        <div className="container-page">
          <h2 className="mb-8 text-center text-2xl font-extrabold uppercase tracking-wide text-text sm:text-3xl">
            Get Your Cash Offer
          </h2>
          <GetOfferForm variant="embedded" />
        </div>
      </section>
      <FaqTeaser />
    </>
  );
}

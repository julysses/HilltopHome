import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Hilltop Home Co. is a local Dallas-Fort Worth team buying houses as-is, for cash — direct conversations, fair offers, no pressure.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <h1 className="mb-6 text-center text-3xl font-extrabold uppercase tracking-wide text-text sm:text-4xl">
        About Hilltop Home Co.
      </h1>
      <div className="mx-auto flex max-w-2xl flex-col gap-6 text-text/80">
        <p>
          Hilltop Home Co. buys houses across the Dallas-Fort Worth area, as-is, for cash.
          We&apos;re not a national franchise or an algorithm — we&apos;re a local team that
          talks to sellers directly, makes a fair offer based on your house and your timeline,
          and closes on a date that works for you.
        </p>
        <p>
          Whether you&apos;re dealing with a property that needs repairs, an inherited house
          you&apos;d rather not manage, a tenant situation that&apos;s become a headache, or you
          just need to sell quickly for personal reasons, we keep the process simple: tell us
          about the house, get a fair cash offer, and close whenever it works for you.
        </p>
        <p>
          There&apos;s no obligation to accept any offer we make, and no pressure — we&apos;d
          rather earn your trust with a straightforward conversation than push you into a
          decision.
        </p>
      </div>
      <div className="mt-12 text-center">
        <Button href="/get-an-offer">Get My Cash Offer</Button>
      </div>
    </div>
  );
}

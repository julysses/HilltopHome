import type { Metadata } from "next";
import { GetOfferForm } from "@/components/forms/GetOfferForm/GetOfferForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Get an Offer",
  description:
    "Tell us about your property and get a fair cash offer from Hilltop Home Co. No repairs, no fees, no obligation.",
  path: "/get-an-offer",
});

export default function GetAnOfferPage() {
  return (
    <div className="container-page py-12 sm:py-16">
      <GetOfferForm variant="standalone" />
    </div>
  );
}

import { Header } from "@/components/layout/Header";
import { FooterFull } from "@/components/layout/FooterFull";
import { Button } from "@/components/ui/Button";

// Next's global not-found only renders inside the root layout, not nested
// route-group layouts, so it imports the full-nav chrome directly.
export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <div className="container-page flex flex-col items-center gap-6 py-24 text-center">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide text-primary sm:text-4xl">
            That Page Doesn&apos;t Exist
          </h1>
          <p className="max-w-md text-text/70">
            Looking to sell your house fast? Tell us about your property and we&apos;ll get back
            to you with a cash offer.
          </p>
          <Button href="/get-an-offer">Get an Offer</Button>
        </div>
      </main>
      <FooterFull />
    </>
  );
}

import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="bg-surface-subtle">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center sm:py-24">
        <h1 className="max-w-3xl text-3xl font-extrabold uppercase leading-tight tracking-wide text-text sm:text-5xl">
          Sell Your DFW House <span className="text-primary">As-Is, For Cash</span>
        </h1>
        <p className="max-w-xl text-base text-text/70 sm:text-lg">
          No repairs. No agent fees. No showings. Get a fair cash offer on your house and close
          on your timeline — as fast as 7 days, or whenever works for you.
        </p>
        <Button href="#get-an-offer" className="text-base">
          Get My Cash Offer
        </Button>
      </div>
    </section>
  );
}

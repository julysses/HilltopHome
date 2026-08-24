import Link from "next/link";

const TEASER_FAQS = [
  { q: "Do I need to fix anything before selling?", a: "No — we buy houses in any condition, as-is." },
  { q: "Are there any fees or commissions?", a: "None. No agent commissions, no closing costs, nothing out of pocket." },
  { q: "How fast can you close?", a: "As fast as 7 days, or on whatever timeline works best for you." },
];

export function FaqTeaser() {
  return (
    <section className="container-page py-16">
      <h2 className="mb-8 text-center text-2xl font-extrabold uppercase tracking-wide text-text sm:text-3xl">
        Common Questions
      </h2>
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        {TEASER_FAQS.map((item) => (
          <div key={item.q}>
            <h3 className="font-bold text-text">{item.q}</h3>
            <p className="text-sm text-text/70">{item.a}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/faq" className="text-sm font-semibold text-primary hover:underline">
          Read the full FAQ →
        </Link>
      </div>
    </section>
  );
}

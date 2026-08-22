import Link from "next/link";

const STEPS = [
  { step: "1", title: "Tell Us About Your House", body: "Fill out our short form — takes about 2 minutes." },
  { step: "2", title: "We Call Or Text You Back", body: "A real person reaches out, usually the same day." },
  { step: "3", title: "Quick Walkthrough", body: "No repairs, no cleaning, no staging needed." },
  { step: "4", title: "Pick Your Closing Date", body: "Cash offer, your timeline, close when you're ready." },
];

export function ProcessSection() {
  return (
    <section className="bg-surface-subtle py-16">
      <div className="container-page">
        <h2 className="mb-10 text-center text-2xl font-extrabold uppercase tracking-wide text-text sm:text-3xl">
          How It Works
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.step} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-extrabold text-white">
                {s.step}
              </div>
              <h3 className="font-bold text-text">{s.title}</h3>
              <p className="text-sm text-text/70">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/how-it-works" className="text-sm font-semibold text-primary hover:underline">
            See the full process →
          </Link>
        </div>
      </div>
    </section>
  );
}

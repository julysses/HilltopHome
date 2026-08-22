const SIGNALS = [
  { title: "Local DFW Team", body: "We're not a national call center — we're local, and we talk to sellers directly." },
  { title: "No Fees, No Commissions", body: "The offer we make is the amount you get. No agent commissions, no closing costs." },
  { title: "Any Condition", body: "Repairs needed, tenants in place, fire damage — we buy houses as-is." },
  { title: "Your Timeline", body: "Close in as little as 7 days, or on whatever schedule works for you." },
];

export function TrustSignals() {
  return (
    <section className="container-page py-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {SIGNALS.map((signal) => (
          <div key={signal.title} className="flex flex-col gap-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-primary">
              {signal.title}
            </h3>
            <p className="text-sm text-text/70">{signal.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

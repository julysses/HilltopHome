const signals = [
 {title:"As-Is",body:"No repairs. No hassle.",path:"M20 3H11L3 11l10 10 8-8V4Z M16 7h.01"},
 {title:"No Agent Commissions",body:"Keep more of what’s yours.",path:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20 M15 8c-4-3-8 3-3 4s1 7-3 4 M12 5v14"},
 {title:"Your Timeline",body:"Close when it works for you.",path:"M4 5h16v16H4Z M4 10h16 M8 2v6 M16 2v6 M8 14h1 M14 14h1 M8 17h1"},
];
export function TrustSignals() { return <section className="hilltop-trust"><div className="container-page hilltop-trust-grid">{signals.map(s=><div className="hilltop-trust-item" key={s.title}><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={s.path}/></svg><div><h2>{s.title}</h2><p>{s.body}</p></div></div>)}</div></section>; }

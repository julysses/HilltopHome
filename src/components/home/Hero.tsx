import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
export function Hero() {
 return <section className="hilltop-hero"><div className="container-page hilltop-hero-grid"><div className="hilltop-hero-copy"><p className="hilltop-eyebrow">Local homebuyers. Brighter tomorrows.</p><h1>A simpler sale.<br/><span>A fresh start.</span></h1><p className="hilltop-description">Sell your DFW home as-is, on your timeline.<br className="desktop-break"/>Local people. Straight answers.</p><div className="hilltop-actions"><Button href="#get-an-offer">Get My Cash Offer</Button><Link href="/how-it-works">How it works <span aria-hidden="true">→</span></Link></div></div><div className="hilltop-photo"><Image src="/images/hilltop-exterior.webp" alt="Welcoming brick home with a curved front walk and mature oak tree" fill priority sizes="(max-width: 800px) 100vw, 42vw"/><span className="hilltop-photo-mark" aria-hidden="true">H.</span></div></div></section>;
}

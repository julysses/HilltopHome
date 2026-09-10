import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
export function Hero() {
  return <section className="hilltop-hero"><div className="container-page hilltop-hero-grid">
    <div className="hilltop-hero-copy"><p className="hilltop-eyebrow">Your local DFW home buyer</p><h1>Your house.<br />Your timeline.<br /><span>A fresh start.</span></h1><p className="hilltop-description">Sell your DFW house as-is, for cash. No repairs, no showings, and no pressure. Just a local team ready to help you move forward.</p><div className="hilltop-actions"><Button href="#get-an-offer">Get My Cash Offer</Button><Link href="/how-it-works">How it works</Link></div><p className="hilltop-reassurance">No obligation. No agent commissions.</p></div>
    <div className="hilltop-photo"><Image src="/images/dfw-home.webp" alt="Welcoming brick house with a tree-shaded lawn" fill priority sizes="(max-width: 800px) 100vw, 45vw" className="object-cover" /><span className="hilltop-photo-mark" aria-hidden="true">H.</span><div className="hilltop-photo-caption"><strong>Home is personal.</strong><span>Selling it should feel that way, too.</span></div></div>
  </div></section>;
}

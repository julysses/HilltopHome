import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import {
  FOOTER_LEGAL_LINKS,
  NAV_LINKS,
  OWNER_PHONE_DISPLAY,
  OWNER_PHONE_TEL,
} from "@/lib/constants";

export function FooterFull() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/10 bg-surface-subtle">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Logo variant="footer" />
          <p className="text-sm text-text/70">
            We buy houses across the Dallas-Fort Worth area, as-is, for cash.
          </p>
          <a href={`tel:${OWNER_PHONE_TEL}`} className="text-sm font-semibold text-text">
            {OWNER_PHONE_DISPLAY}
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wide text-text/50">Company</h3>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-text hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wide text-text/50">Get Started</h3>
          <Link href="/get-an-offer" className="text-sm text-text hover:text-primary">
            Get an Offer
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wide text-text/50">Legal</h3>
          {FOOTER_LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-text hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-black/10 py-6 text-center text-xs text-text/50">
        © {year} Hilltop Home Co. All rights reserved. By texting us, you agree to receive
        messages about your inquiry — reply STOP to opt out.
      </div>
    </footer>
  );
}

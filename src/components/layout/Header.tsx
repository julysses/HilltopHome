import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo variant="header" />
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-text hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button href="/get-an-offer" className="px-3 py-2 text-sm sm:px-6 sm:py-3">
            Get an Offer
          </Button>
        </div>
      </div>
      <details className="hilltop-mobile-nav lg:hidden">
        <summary>Explore Hilltop</summary>
        <nav aria-label="Mobile navigation">{NAV_LINKS.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
      </details>
    </header>
  );
}


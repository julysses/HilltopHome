import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, OWNER_PHONE_DISPLAY, OWNER_PHONE_TEL } from "@/lib/constants";

export function Header() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo variant="header" />
        <nav className="hidden items-center gap-6 md:flex">
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
          <a
            href={`tel:${OWNER_PHONE_TEL}`}
            className="hidden text-sm font-semibold text-text hover:text-primary sm:block"
          >
            {OWNER_PHONE_DISPLAY}
          </a>
          <Button href="/get-an-offer" className="px-4 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm">
            Get an Offer
          </Button>
        </div>
      </div>
    </header>
  );
}

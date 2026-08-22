import Link from "next/link";
import { FOOTER_LEGAL_LINKS } from "@/lib/constants";

export function FooterMinimal() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/10 bg-surface-subtle py-6">
      <div className="container-page flex flex-col items-center gap-2 text-center text-xs text-text/50">
        <p>
          © {year} Hilltop Home Co. By texting us, you agree to receive messages about your
          inquiry — reply STOP to opt out.
        </p>
        <div className="flex gap-4">
          {FOOTER_LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

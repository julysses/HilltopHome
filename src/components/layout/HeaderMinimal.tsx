import { Logo } from "@/components/brand/Logo";
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_TEL } from "@/lib/constants";

export function HeaderMinimal() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo variant="header" />
        <a
          href={`tel:${OWNER_PHONE_TEL}`}
          className="text-sm font-semibold text-text hover:text-primary"
        >
          {OWNER_PHONE_DISPLAY}
        </a>
      </div>
    </header>
  );
}

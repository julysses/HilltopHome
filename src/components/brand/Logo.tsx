import clsx from "clsx";
import Link from "next/link";
type LogoProps = { variant?: "header" | "footer"; className?: string };
export function Logo({ variant = "header", className }: LogoProps) {
  return <Link href="/" aria-label="Hilltop Home Co. home" className={clsx("hilltop-logo", `hilltop-logo--${variant}`, className)}>
    <span className="hilltop-mark" aria-hidden="true">H.</span><span className="hilltop-wordmark">Hilltop Home Co.</span>
  </Link>;
}

import clsx from "clsx";
import Link from "next/link";

type LogoProps = {
  variant?: "header" | "footer";
  className?: string;
};

const SIZE_CLASSES: Record<NonNullable<LogoProps["variant"]>, string> = {
  header: "text-xl sm:text-2xl",
  footer: "text-lg",
};

/**
 * v1 wordmark: a CSS/text recreation of the filed logo (crimson, all-caps,
 * wide tracking, no icon). The real vectorized SVG hasn't been added to the
 * repo yet.
 *
 * TODO(logo-swap): once /public/logo.svg (or similar) is added, replace the
 * <span> below with an <Image src="/logo.svg" .../> (or inline <svg>). Keep
 * this component's name and props identical so every call site (Header,
 * FooterFull, HeaderMinimal, FooterMinimal) needs no changes.
 */
export function Logo({ variant = "header", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={clsx(
        "font-sans font-extrabold uppercase tracking-[0.08em] text-primary",
        SIZE_CLASSES[variant],
        className,
      )}
    >
      Hilltop Home Co.
    </Link>
  );
}

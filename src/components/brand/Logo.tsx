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
 * The Hilltop Home Co. wordmark — crimson, bold all-caps, wide tracking, no
 * icon. This CSS text rendering is the final logo treatment (confirmed
 * against the brand reference), not a placeholder for a raster/vector file.
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

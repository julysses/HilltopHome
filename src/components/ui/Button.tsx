import clsx from "clsx";
import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary",
  secondary:
    "bg-white text-primary border-2 border-primary hover:bg-surface-subtle focus-visible:outline-primary",
  ghost: "bg-transparent text-text hover:bg-surface-subtle focus-visible:outline-text",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  children: React.ReactNode;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className } = props;
  const classes = clsx(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  const { variant: _variant, className: _className, href: _href, ...rest } =
    props as ButtonAsButton;
  return <button className={classes} {...rest} />;
}

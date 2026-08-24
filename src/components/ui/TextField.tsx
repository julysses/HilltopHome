import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
  hint?: string;
};

export function TextField({ label, id, error, hint, className, ...rest }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-text">
        {label}
      </label>
      <input
        id={id}
        className={clsx(
          "rounded-md border px-4 py-3 text-base text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary",
          error ? "border-primary" : "border-black/15",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...rest}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-text/60">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-semibold text-primary">
          {error}
        </p>
      )}
    </div>
  );
}

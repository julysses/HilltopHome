import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
  error?: string;
};

export function TextArea({ label, id, error, className, ...rest }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-text">
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        className={clsx(
          "rounded-md border px-4 py-3 text-base text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary",
          error ? "border-primary" : "border-black/15",
          className,
        )}
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error && <p className="text-xs font-semibold text-primary">{error}</p>}
    </div>
  );
}

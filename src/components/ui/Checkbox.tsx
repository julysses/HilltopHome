import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  id: string;
};

export function Checkbox({ label, id, className, ...rest }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={clsx("flex cursor-pointer items-start gap-3 text-sm text-text", className)}
    >
      <input
        id={id}
        type="checkbox"
        className="mt-1 h-5 w-5 flex-shrink-0 rounded border-black/30 text-primary focus:ring-2 focus:ring-primary"
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}

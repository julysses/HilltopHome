"use client";

import { CONFIRMATION_MESSAGE } from "@/lib/constants";

export function ConfirmationState({ message }: { message?: string }) {

  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-extrabold text-white">
        ✓
      </div>
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-text">
        Thanks — We&apos;ve Got Your Info
      </h2>
      <p className="max-w-sm text-text/70">{message || CONFIRMATION_MESSAGE}</p>
    </div>
  );
}

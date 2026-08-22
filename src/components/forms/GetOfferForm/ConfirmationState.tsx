"use client";

import { useEffect } from "react";
import { trackLeadEvent } from "@/components/analytics/trackLeadEvent";
import { CONFIRMATION_MESSAGE } from "@/lib/constants";

export function ConfirmationState() {
  useEffect(() => {
    trackLeadEvent();
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl font-extrabold text-white">
        ✓
      </div>
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-text">
        Thanks — We&apos;ve Got Your Info
      </h2>
      <p className="max-w-sm text-text/70">{CONFIRMATION_MESSAGE}</p>
    </div>
  );
}

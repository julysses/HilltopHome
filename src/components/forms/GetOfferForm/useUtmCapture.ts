"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import type { FormAction } from "./formReducer";

export function useUtmCapture(dispatch: React.Dispatch<FormAction>) {
  const searchParams = useSearchParams();

  useEffect(() => {
    dispatch({
      type: "SET_UTM",
      utm_source: searchParams.get("utm_source") ?? undefined,
      utm_campaign: searchParams.get("utm_campaign") ?? undefined,
      utm_medium: searchParams.get("utm_medium") ?? undefined,
      landing_page_url: typeof window !== "undefined" ? window.location.href : undefined,
    });
    // Captured once on mount — UTM params shouldn't change mid-form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

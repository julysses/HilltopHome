"use client";

import { browserAttribution } from "@/lib/attribution";
import { useEffect } from "react";
import type { FormAction } from "./formReducer";

export function useUtmCapture(dispatch: React.Dispatch<FormAction>) {
  useEffect(() => {
    dispatch({
      type: "SET_UTM",
      ...browserAttribution(),
      landing_page_url: window.location.origin + window.location.pathname,
    });
  }, [dispatch]);
}

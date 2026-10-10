"use client";

import { useEffect } from "react";
import { browserAttribution } from "@/lib/attribution";

export function AttributionCapture() {
  useEffect(() => { browserAttribution(); }, []);
  return null;
}

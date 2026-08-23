import type { Metadata } from "next";
import { SITE_NAME } from "./constants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hilltophome.co";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}

export const SITE_URL_BASE = SITE_URL;

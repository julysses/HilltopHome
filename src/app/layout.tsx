import type { Metadata } from "next";
import localFont from "next/font/local";
import { SITE_NAME } from "@/lib/constants";
import { SITE_URL_BASE } from "@/lib/seo";
import "./globals.css";
import { AttributionCapture } from "@/components/AttributionCapture";

const inter = localFont({
  src: "./fonts/Inter-latin.woff2",
  weight: "400 800",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL_BASE),
  title: {
    default: `${SITE_NAME} — We Buy Houses in DFW, As-Is, For Cash`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Hilltop Home Co. buys houses across the Dallas-Fort Worth area as-is, for cash. No repairs, no fees, no obligation — get a fair cash offer on your timeline.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AttributionCapture />
        {children}
      </body>
    </html>
  );
}

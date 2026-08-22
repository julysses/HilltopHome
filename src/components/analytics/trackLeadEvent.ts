export function trackLeadEvent() {
  if (typeof window === "undefined") return;
  const fbq = (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq;
  if (typeof fbq === "function") {
    fbq("track", "Lead");
  }
}

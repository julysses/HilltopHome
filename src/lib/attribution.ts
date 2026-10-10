export const ATTRIBUTION_KEY = "intake:first-touch:v1";
export type Attribution = { utm_source?: string; utm_medium?: string; utm_campaign?: string };
type SessionStore = Pick<Storage, "getItem" | "setItem">;
const fields = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function cleanAttribution(value: unknown): Attribution {
  const result: Attribution = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return result;
  for (const key of fields) {
    const tag = (value as Record<string, unknown>)[key];
    if (typeof tag === "string" && tag.trim() && tag.length <= 200 && !/[\u0000-\u001f\u007f]/.test(tag)) result[key] = tag.trim();
  }
  return result;
}

// Keep the first landing's tags for this browser tab, including a direct visit.
// Attribution failures must never prevent someone from submitting an inquiry.
export function firstTouch(storage: SessionStore | null, href: string): Attribution {
  let current: Attribution = {};
  try {
    const params = new URL(href).searchParams;
    current = cleanAttribution(Object.fromEntries(fields.map(key => [key, params.get(key)])));
    const saved = storage?.getItem(ATTRIBUTION_KEY);
    if (saved) {
      try {
        const parsed: unknown = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return cleanAttribution(parsed);
      } catch { /* Replace malformed optional attribution with this landing. */ }
    }
    storage?.setItem(ATTRIBUTION_KEY, JSON.stringify(current));
  } catch { /* Current landing tags remain usable when storage is unavailable. */ }
  return current;
}

export function browserAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  let storage: SessionStore | null = null;
  try { storage = window.sessionStorage; } catch { /* Attribution is optional. */ }
  return firstTouch(storage, window.location.href);
}

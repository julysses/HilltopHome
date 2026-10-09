import { toSubmitPayload, type FormState, type GetOfferSubmitPayload } from "./types";
import { validateAll } from "./validation";

export const PENDING_INQUIRY_KEY = "hilltop:pending-inquiry:v1";
export const UNCERTAIN_INQUIRY_MESSAGE = "We could not confirm your inquiry. Your original answers are saved in this tab. Retry this inquiry, or call us before submitting another.";
export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export type PendingInquiry = { version: 1; snapshot: FormState; payload: GetOfferSubmitPayload; created_at: string };
type Storage = Pick<globalThis.Storage, "getItem" | "setItem" | "removeItem">;

export function savePendingInquiry(storage: Storage, state: FormState, reference: string): PendingInquiry {
  if (storage.getItem(PENDING_INQUIRY_KEY) !== null) throw new Error("A previous inquiry still needs confirmation");
  if (!UUID_PATTERN.test(reference) || Object.keys(validateAll(state)).length) throw new Error("Invalid inquiry");
  const snapshot = { ...state, status: "editing" as const, errors: {}, submitErrorMessage: undefined };
  const draft: PendingInquiry = { version: 1, snapshot, payload: { ...toSubmitPayload(snapshot), request_id: reference }, created_at: new Date().toISOString() };
  // Persist before dispatch. If storage is unavailable, no network request is made.
  const serialized = JSON.stringify(draft);
  storage.setItem(PENDING_INQUIRY_KEY, serialized);
  if (storage.getItem(PENDING_INQUIRY_KEY) !== serialized) throw new Error("Unable to preserve inquiry");
  return JSON.parse(serialized) as PendingInquiry;
}

export function readPendingInquiry(storage: Storage): PendingInquiry | null {
  const saved = storage.getItem(PENDING_INQUIRY_KEY);
  if (!saved) return null;
  const draft = JSON.parse(saved) as PendingInquiry;
  if (draft.version !== 1 || !draft.snapshot || !draft.payload ||
      !UUID_PATTERN.test(draft.payload.request_id || "") || !Number.isFinite(Date.parse(draft.created_at)) ||
      typeof draft.snapshot.sms_opt_in !== "boolean" || Object.keys(validateAll(draft.snapshot)).length ||
      JSON.stringify(draft.payload) !== JSON.stringify({ ...toSubmitPayload(draft.snapshot), request_id: draft.payload.request_id })) {
    throw new Error("The previous inquiry cannot be recovered. Contact us before submitting again.");
  }
  return draft;
}

export function receiptMatches(result: unknown, draft: PendingInquiry): result is { success: true; submission_id: string; processing_status: "processed"; message?: string } {
  if (!result || typeof result !== "object") return false;
  const receipt = result as Record<string, unknown>;
  return receipt.success === true && receipt.processing_status === "processed" && receipt.submission_id === draft.payload.request_id;
}

export function clearPendingInquiry(storage: Storage, draft: PendingInquiry) {
  // Never clear another tab/render's newer inquiry.
  const current = readPendingInquiry(storage);
  if (current?.payload.request_id === draft.payload.request_id) {
    storage.removeItem(PENDING_INQUIRY_KEY);
    if (storage.getItem(PENDING_INQUIRY_KEY) !== null) throw new Error("Unable to clear saved inquiry");
  }
}

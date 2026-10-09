"use client";

import { Suspense, useEffect, useReducer, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { formReducer, initialFormState } from "./formReducer";
import { useUtmCapture } from "./useUtmCapture";
import { validateAll } from "./validation";
import { clearPendingInquiry, readPendingInquiry, receiptMatches, savePendingInquiry, UNCERTAIN_INQUIRY_MESSAGE, type PendingInquiry } from "./pendingInquiry";
import { PropertyContactSection } from "./PropertyContactSection";
import { MotivationTimelineSection } from "./MotivationTimelineSection";
import { ConditionOccupancySection } from "./ConditionOccupancySection";
import { ConsentSection } from "./ConsentSection";
import { ConfirmationState } from "./ConfirmationState";
import { SubmitError } from "./SubmitError";

type GetOfferFormProps = {
  variant?: "embedded" | "standalone";
};

function GetOfferFormInner({ variant = "embedded" }: GetOfferFormProps) {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const [confirmationMessage, setConfirmationMessage] = useState<string>();
  const [pending, setPending] = useState<PendingInquiry | null>(null);
  const [ready, setReady] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const draftRef = useRef<PendingInquiry | null>(null);
  const busy = useRef(false);
  useUtmCapture(dispatch);

  useEffect(() => {
    try {
      const draft = readPendingInquiry(window.sessionStorage);
      if (draft) {
        draftRef.current = draft;
        setPending(draft);
        dispatch({ type: "RESTORE_PENDING", state: draft.snapshot });
        dispatch({ type: "SUBMIT_ERROR", message: UNCERTAIN_INQUIRY_MESSAGE });
      }
    } catch {
      setBlocked(true);
      dispatch({ type: "SUBMIT_ERROR", message: "This browser cannot recover a previous inquiry. Please call us before submitting again." });
    } finally { setReady(true); }
  }, []);

  async function handleSubmit() {
    if (busy.current || blocked || !ready) return;
    const isFirstAttempt = draftRef.current === null;
    if (isFirstAttempt) {
      const errors = validateAll(state);
      if (Object.keys(errors).length > 0) {
        dispatch({ type: "SET_ERRORS", errors });
        return;
      }
    }

    busy.current = true;
    let draft = draftRef.current;
    if (!draft) {
      try {
        draft = savePendingInquiry(window.sessionStorage, state, crypto.randomUUID());
        draftRef.current = draft;
        setPending(draft);
      } catch {
        busy.current = false;
        setBlocked(true);
        dispatch({ type: "SUBMIT_ERROR", message: "This browser could not save your inquiry safely. Please call us for help." });
        return;
      }
    }

    dispatch({ type: "SUBMIT_START" });

    try {
      const res = await fetch("/api/get-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft.payload),
        signal: AbortSignal.timeout(40_000),
      });

      if (!res.ok) {
        // Only a first, definite pre-write validation rejection releases editing.
        // A retry may refer to an inquiry saved before its acknowledgement was lost.
        if (isFirstAttempt && (res.status === 400 || res.status === 422)) {
          clearPendingInquiry(window.sessionStorage, draft);
          draftRef.current = null;
          setPending(null);
          dispatch({ type: "SUBMIT_ERROR", message: "Please check your answers and try again. Reload the page if the form has changed." });
          return;
        }
        throw new Error(`Request failed with status ${res.status}`);
      }

      const json: unknown = await res.json();
      if (!receiptMatches(json, draft)) throw new Error("Submission was not accepted");
      setConfirmationMessage(json.message);
      try { clearPendingInquiry(window.sessionStorage, draft); } catch {
        // Durable acknowledgement is still success. A retained draft can safely replay.
      }
      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch {
      dispatch({ type: "SUBMIT_ERROR", message: UNCERTAIN_INQUIRY_MESSAGE });
    } finally { busy.current = false; }
  }

  if (state.status === "success") {
    return <ConfirmationState message={confirmationMessage} />;
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-lg border border-black/10 bg-white p-6 shadow-sm sm:p-8">
      {variant === "standalone" && (
        <h1 className="mb-6 text-2xl font-extrabold uppercase tracking-wide text-text sm:text-3xl">
          Get Your Cash Offer
        </h1>
      )}

      {pending && <p role="status" className="mb-6 text-sm text-text/70">Your submitted answers are locked while we confirm receipt. Retrying uses the same inquiry.</p>}
      <fieldset disabled={!ready || blocked || pending !== null} className="flex flex-col gap-8">
        <PropertyContactSection state={state} dispatch={dispatch} />
        <hr className="border-black/10" />
        <MotivationTimelineSection state={state} dispatch={dispatch} />
        <hr className="border-black/10" />
        <ConditionOccupancySection state={state} dispatch={dispatch} />
        <hr className="border-black/10" />
        <ConsentSection state={state} dispatch={dispatch} />
      </fieldset>

      {state.status === "error" && state.submitErrorMessage && (
        <div className="mt-6">
          <SubmitError message={state.submitErrorMessage} onRetry={handleSubmit} disabled={blocked || !ready} />
        </div>
      )}

      <div className="mt-8">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!ready || blocked || state.status === "submitting"}
          className="w-full"
        >
          {state.status === "submitting" ? "Submitting..." : pending ? "Retry Saved Inquiry" : "Get My Offer"}
        </Button>
      </div>
    </div>
  );
}

export function GetOfferForm(props: GetOfferFormProps) {
  return (
    <Suspense fallback={null}>
      <GetOfferFormInner {...props} />
    </Suspense>
  );
}

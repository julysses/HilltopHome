"use client";

import { Suspense, useReducer, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SUBMIT_ERROR_MESSAGE } from "@/lib/constants";
import { formReducer, initialFormState } from "./formReducer";
import { useUtmCapture } from "./useUtmCapture";
import { validateAll } from "./validation";
import { toSubmitPayload } from "./types";
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
  useUtmCapture(dispatch);

  async function handleSubmit() {
    const errors = validateAll(state);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    dispatch({ type: "SUBMIT_START" });

    try {
      const res = await fetch("/api/get-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toSubmitPayload(state)),
        signal: AbortSignal.timeout(40_000),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const json = (await res.json()) as { success?: boolean; message?: string };
      if (json.success !== true) throw new Error("Submission was not accepted");
      setConfirmationMessage(json.message);
      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch {
      dispatch({ type: "SUBMIT_ERROR", message: SUBMIT_ERROR_MESSAGE });
    }
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

      <div className="flex flex-col gap-8">
        <PropertyContactSection state={state} dispatch={dispatch} />
        <hr className="border-black/10" />
        <MotivationTimelineSection state={state} dispatch={dispatch} />
        <hr className="border-black/10" />
        <ConditionOccupancySection state={state} dispatch={dispatch} />
        <hr className="border-black/10" />
        <ConsentSection state={state} dispatch={dispatch} />
      </div>

      {state.status === "error" && state.submitErrorMessage && (
        <div className="mt-6">
          <SubmitError message={state.submitErrorMessage} onRetry={handleSubmit} />
        </div>
      )}

      <div className="mt-8">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={state.status === "submitting"}
          className="w-full"
        >
          {state.status === "submitting" ? "Submitting..." : "Get My Offer"}
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

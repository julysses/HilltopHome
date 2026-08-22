"use client";

import { Suspense, useReducer, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SUBMIT_ERROR_MESSAGE } from "@/lib/constants";
import { formReducer, initialFormState } from "./formReducer";
import { useUtmCapture } from "./useUtmCapture";
import { validateAll } from "./validation";
import { toSubmitPayload } from "./types";
import { StepProgress } from "./StepProgress";
import { StepAddressContact } from "./StepAddressContact";
import { StepMotivationTimeline } from "./StepMotivationTimeline";
import { StepConditionOccupancy } from "./StepConditionOccupancy";
import { StepPriceConsent } from "./StepPriceConsent";
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
      dispatch({ type: "NEXT_STEP" }); // re-runs current step's validation to surface errors
      return;
    }

    dispatch({ type: "SUBMIT_START" });

    try {
      const res = await fetch("/api/get-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toSubmitPayload(state)),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const json = (await res.json()) as { message?: string };
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
        <h1 className="mb-2 text-2xl font-extrabold uppercase tracking-wide text-text sm:text-3xl">
          Get Your Cash Offer
        </h1>
      )}
      <StepProgress step={state.step} />

      {state.step === 1 && <StepAddressContact state={state} dispatch={dispatch} />}
      {state.step === 2 && <StepMotivationTimeline state={state} dispatch={dispatch} />}
      {state.step === 3 && <StepConditionOccupancy state={state} dispatch={dispatch} />}
      {state.step === 4 && <StepPriceConsent state={state} dispatch={dispatch} />}

      {state.status === "error" && state.submitErrorMessage && (
        <div className="mt-4">
          <SubmitError message={state.submitErrorMessage} onRetry={handleSubmit} />
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        {state.step > 1 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => dispatch({ type: "PREV_STEP" })}
            disabled={state.status === "submitting"}
          >
            Back
          </Button>
        ) : (
          <span />
        )}

        {state.step < 4 ? (
          <Button type="button" onClick={() => dispatch({ type: "NEXT_STEP" })}>
            Continue
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={state.status === "submitting"}>
            {state.status === "submitting" ? "Submitting..." : "Get My Offer"}
          </Button>
        )}
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

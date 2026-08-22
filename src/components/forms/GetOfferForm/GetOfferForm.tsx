"use client";

import { Suspense, useReducer } from "react";
import { Button } from "@/components/ui/Button";
import { websiteLeadIntakeUrl } from "@/lib/edgeFunctionUrl";
import { SUBMIT_ERROR_MESSAGE } from "@/lib/constants";
import { formReducer, initialFormState } from "./formReducer";
import { useUtmCapture } from "./useUtmCapture";
import { validateAll } from "./validation";
import { toLeadPayload } from "./types";
import { StepProgress } from "./StepProgress";
import { StepAddress } from "./StepAddress";
import { StepSituation } from "./StepSituation";
import { StepTimeline } from "./StepTimeline";
import { StepContact } from "./StepContact";
import { ConfirmationState } from "./ConfirmationState";
import { SubmitError } from "./SubmitError";

type GetOfferFormProps = {
  variant?: "embedded" | "standalone";
};

function GetOfferFormInner({ variant = "embedded" }: GetOfferFormProps) {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  useUtmCapture(dispatch);

  async function handleSubmit() {
    const errors = validateAll(state);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "NEXT_STEP" }); // re-runs current step's validation to surface errors
      return;
    }

    dispatch({ type: "SUBMIT_START" });
    const url = websiteLeadIntakeUrl();

    if (!url) {
      dispatch({
        type: "SUBMIT_ERROR",
        message: SUBMIT_ERROR_MESSAGE,
      });
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}`,
        },
        body: JSON.stringify(toLeadPayload(state)),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch {
      dispatch({ type: "SUBMIT_ERROR", message: SUBMIT_ERROR_MESSAGE });
    }
  }

  if (state.status === "success") {
    return <ConfirmationState />;
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-lg border border-black/10 bg-white p-6 shadow-sm sm:p-8">
      {variant === "standalone" && (
        <h1 className="mb-2 text-2xl font-extrabold uppercase tracking-wide text-text sm:text-3xl">
          Get Your Cash Offer
        </h1>
      )}
      <StepProgress step={state.step} />

      {state.step === 1 && <StepAddress state={state} dispatch={dispatch} />}
      {state.step === 2 && <StepSituation state={state} dispatch={dispatch} />}
      {state.step === 3 && <StepTimeline state={state} dispatch={dispatch} />}
      {state.step === 4 && <StepContact state={state} dispatch={dispatch} />}

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

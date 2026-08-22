import { Checkbox } from "@/components/ui/Checkbox";
import { SITUATIONS } from "@/lib/constants";
import type { FormAction } from "./formReducer";
import type { FormState } from "./types";

export function StepSituation({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-text">
        What&apos;s your situation?
      </h2>
      <p className="text-sm text-text/60">Select all that apply.</p>
      <fieldset className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <legend className="sr-only">Situation</legend>
        {SITUATIONS.map((situation) => (
          <Checkbox
            key={situation}
            id={`situation-${situation}`}
            label={situation}
            checked={state.situations.includes(situation)}
            onChange={() => dispatch({ type: "TOGGLE_SITUATION", value: situation })}
          />
        ))}
      </fieldset>
      {state.errors.situations && (
        <p className="text-xs font-semibold text-primary">{state.errors.situations}</p>
      )}
    </div>
  );
}

import { RadioGroup } from "@/components/ui/RadioGroup";
import { TextArea } from "@/components/ui/TextArea";
import { TIMELINES } from "@/lib/constants";
import type { FormAction } from "./formReducer";
import type { FormState } from "./types";

export function StepTimeline({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-text">
        What&apos;s your timeline?
      </h2>
      <RadioGroup
        name="timeline"
        legend="Timeline"
        options={TIMELINES.map((t) => ({ value: t, label: t }))}
        value={state.timeline}
        onChange={(value) => dispatch({ type: "SET_FIELD", field: "timeline", value })}
        error={state.errors.timeline}
      />
      <TextArea
        id="condition_notes"
        label="Anything else about the property? (optional)"
        placeholder="Repairs needed, occupancy, anything we should know..."
        value={state.condition_notes}
        onChange={(e) =>
          dispatch({ type: "SET_FIELD", field: "condition_notes", value: e.target.value })
        }
      />
    </div>
  );
}

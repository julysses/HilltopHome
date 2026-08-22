import { RadioGroup } from "@/components/ui/RadioGroup";
import { MOTIVATIONS, TIMELINES } from "@/lib/constants";
import type { FormAction } from "./formReducer";
import type { FormState } from "./types";

export function StepMotivationTimeline({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-text">
        Why Are You Looking To Sell?
      </h2>
      <RadioGroup
        name="motivation"
        legend="Why are you looking to sell?"
        options={MOTIVATIONS}
        value={state.motivation}
        onChange={(value) => dispatch({ type: "SET_FIELD", field: "motivation", value })}
        error={state.errors.motivation}
      />
      <RadioGroup
        name="timeline"
        legend="When do you need to close?"
        options={TIMELINES}
        value={state.timeline}
        onChange={(value) => dispatch({ type: "SET_FIELD", field: "timeline", value })}
        error={state.errors.timeline}
      />
    </div>
  );
}

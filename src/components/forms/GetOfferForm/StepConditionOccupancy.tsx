import { RadioGroup } from "@/components/ui/RadioGroup";
import { CONDITIONS, OCCUPANCIES } from "@/lib/constants";
import type { FormAction } from "./formReducer";
import type { FormState } from "./types";

export function StepConditionOccupancy({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-text">
        Property Condition
      </h2>
      <RadioGroup
        name="condition"
        legend="What condition is the property in?"
        options={CONDITIONS}
        value={state.condition}
        onChange={(value) => dispatch({ type: "SET_FIELD", field: "condition", value })}
        error={state.errors.condition}
      />
      <RadioGroup
        name="occupancy"
        legend="Is the property currently occupied?"
        options={OCCUPANCIES}
        value={state.occupancy}
        onChange={(value) => dispatch({ type: "SET_FIELD", field: "occupancy", value })}
        error={state.errors.occupancy}
      />
    </div>
  );
}

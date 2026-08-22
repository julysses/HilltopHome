import { TextField } from "@/components/ui/TextField";
import type { FormAction } from "./formReducer";
import type { FormState } from "./types";

export function StepAddress({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-text">
        What&apos;s the property address?
      </h2>
      <TextField
        id="property_address"
        label="Property Address"
        placeholder="123 Main St, Garland, TX"
        value={state.property_address}
        error={state.errors.property_address}
        onChange={(e) =>
          dispatch({ type: "SET_FIELD", field: "property_address", value: e.target.value })
        }
        autoComplete="street-address"
      />
    </div>
  );
}

import { Checkbox } from "@/components/ui/Checkbox";
import { SMS_CONSENT_COPY } from "@/lib/constants";
import type { FormAction } from "./formReducer";
import type { FormState } from "./types";

export function ConsentSection({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-text">Almost Done</h2>
      <Checkbox
        id="sms_opt_in"
        label={SMS_CONSENT_COPY}
        checked={state.sms_opt_in}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "sms_opt_in", value: e.target.checked })}
      />
      {state.errors.sms_opt_in && (
        <p className="text-xs font-semibold text-primary">{state.errors.sms_opt_in}</p>
      )}
    </div>
  );
}

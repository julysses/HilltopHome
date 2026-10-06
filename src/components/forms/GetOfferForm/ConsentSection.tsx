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
      <p className="text-sm text-text/70">Text messages are optional. You can request an offer without checking this box. This choice does not authorize AI calls or unrelated marketing.</p>
      <p className="text-sm text-text/70"><a className="underline" href="/privacy-policy">Privacy Policy</a>{" · "}<a className="underline" href="/terms-of-service">SMS Terms &amp; Conditions</a>{" · "}<a className="underline" href="tel:+12147010100">Help: (214) 701-0100</a></p>
      {state.errors.sms_opt_in && (
        <p className="text-xs font-semibold text-primary">{state.errors.sms_opt_in}</p>
      )}
    </div>
  );
}

import { Checkbox } from "@/components/ui/Checkbox";
import { TextField } from "@/components/ui/TextField";
import { CONTACT_PREFERENCES, SMS_CONSENT_COPY } from "@/lib/constants";
import type { FormAction } from "./formReducer";
import type { FormState } from "./types";

export function StepContact({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-text">
        How can we reach you?
      </h2>
      <TextField
        id="name"
        label="Full Name"
        value={state.name}
        error={state.errors.name}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
        autoComplete="name"
      />
      <TextField
        id="phone"
        label="Phone Number"
        type="tel"
        value={state.phone}
        error={state.errors.phone}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })}
        autoComplete="tel"
      />
      <TextField
        id="email"
        label="Email (optional)"
        type="email"
        value={state.email}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
        autoComplete="email"
      />

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold text-text">Preferred Contact Method</legend>
        <div className="flex flex-wrap gap-4">
          {CONTACT_PREFERENCES.map((pref) => (
            <Checkbox
              key={pref}
              id={`contact-pref-${pref}`}
              label={pref}
              checked={state.contact_preference.includes(pref)}
              onChange={() => dispatch({ type: "TOGGLE_CONTACT_PREF", value: pref })}
            />
          ))}
        </div>
      </fieldset>

      <Checkbox
        id="sms_consent"
        label={SMS_CONSENT_COPY}
        checked={state.sms_consent}
        onChange={(e) =>
          dispatch({ type: "SET_FIELD", field: "sms_consent", value: e.target.checked })
        }
      />
      {state.errors.sms_consent && (
        <p className="text-xs font-semibold text-primary">{state.errors.sms_consent}</p>
      )}
    </div>
  );
}

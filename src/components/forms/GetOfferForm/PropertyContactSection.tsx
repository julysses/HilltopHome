import { RadioGroup } from "@/components/ui/RadioGroup";
import { TextField } from "@/components/ui/TextField";
import { PRICE_RANGES } from "@/lib/constants";
import type { FormAction } from "./formReducer";
import type { FormState } from "./types";

export function PropertyContactSection({
  state,
  dispatch,
}: {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-text">
        Tell Us About The Property
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
      <TextField
        id="first_name"
        label="Your First Name"
        value={state.first_name}
        error={state.errors.first_name}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "first_name", value: e.target.value })}
        autoComplete="given-name"
      />
      <TextField
        id="last_name"
        label="Your Last Name (optional)"
        value={state.last_name}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "last_name", value: e.target.value })}
        autoComplete="family-name"
      />
      <TextField
        id="phone"
        label="Best Phone Number"
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
      <RadioGroup
        name="expected_range"
        legend="What price range are you expecting? (optional)"
        options={PRICE_RANGES}
        value={state.expected_range}
        onChange={(value) => dispatch({ type: "SET_FIELD", field: "expected_range", value })}
      />
    </div>
  );
}

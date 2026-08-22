type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  name: string;
  legend: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function RadioGroup({ name, legend, options, value, onChange, error }: RadioGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-semibold text-text">{legend}</legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`${name}-${option.value}`}
            className="flex cursor-pointer items-center gap-3 text-sm text-text"
          >
            <input
              id={`${name}-${option.value}`}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-5 w-5 text-primary focus:ring-2 focus:ring-primary"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="text-xs font-semibold text-primary">{error}</p>}
    </fieldset>
  );
}

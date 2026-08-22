import type { StepId } from "./types";

const STEP_LABELS: Record<StepId, string> = {
  1: "Address",
  2: "Situation",
  3: "Timeline",
  4: "Contact",
};

export function StepProgress({ step }: { step: StepId }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-text/50">
        Step {step} of 4 — {STEP_LABELS[step]}
      </p>
      <div className="flex gap-2">
        {([1, 2, 3, 4] as StepId[]).map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-black/10"}`}
          />
        ))}
      </div>
    </div>
  );
}

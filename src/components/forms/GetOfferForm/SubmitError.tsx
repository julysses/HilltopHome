import { Button } from "@/components/ui/Button";

export function SubmitError({ message, onRetry, disabled = false }: { message: string; onRetry: () => void; disabled?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-md border border-primary/30 bg-primary/5 p-6 text-center">
      <p className="font-semibold text-primary">{message}</p>
      <Button type="button" onClick={onRetry} disabled={disabled}>
        Try Again
      </Button>
    </div>
  );
}

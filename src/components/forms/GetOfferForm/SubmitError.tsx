import { Button } from "@/components/ui/Button";

export function SubmitError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-md border border-primary/30 bg-primary/5 p-6 text-center">
      <p className="font-semibold text-primary">{message}</p>
      <Button type="button" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}

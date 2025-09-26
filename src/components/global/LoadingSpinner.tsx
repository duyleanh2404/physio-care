import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type LoadingSpinnerProps = {
  className?: string;
  size: number;
};

export function LoadingSpinner({ className, size }: LoadingSpinnerProps) {
  return (
    <div className={cn(className ?? className)}>
      <Loader2 className={`size-${size} animate-spin text-primary`} />
    </div>
  );
}

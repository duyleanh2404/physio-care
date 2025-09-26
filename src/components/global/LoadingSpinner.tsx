import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex justify-center items-center", className ?? className)}
    >
      <Loader2 className="size-10 animate-spin text-primary" />
    </div>
  );
}

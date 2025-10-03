"use client";

import { toast } from "sonner";
import { Icon } from "@iconify/react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type ToastType = "success" | "error" | "warning";

export function Toast(type: ToastType, message: string, onAction?: () => void) {
  toast.custom((t) => {
    const bgColor =
      type === "success"
        ? "bg-emerald-50 dark:bg-emerald-950/90 border-emerald-400/30"
        : type === "error"
        ? "bg-rose-50 dark:bg-rose-950/90 border-rose-400/30"
        : "bg-amber-50 dark:bg-amber-950/90 border-amber-400/30";

    const textColor =
      type === "success"
        ? "text-emerald-900 dark:text-emerald-50"
        : type === "error"
        ? "text-rose-900 dark:text-rose-50"
        : "text-amber-900 dark:text-amber-50";

    const iconColor =
      type === "success"
        ? "text-emerald-600 dark:text-emerald-400"
        : type === "error"
        ? "text-rose-600 dark:text-rose-400"
        : "text-amber-600 dark:text-amber-400";

    const iconBgColor =
      type === "success"
        ? "bg-emerald-100 dark:bg-emerald-900/50"
        : type === "error"
        ? "bg-rose-100 dark:bg-rose-900/50"
        : "bg-amber-100 dark:bg-amber-900/50";

    const iconName =
      type === "success"
        ? "mdi:check-circle-outline"
        : type === "error"
        ? "mdi:close-circle-outline"
        : "mdi:alert-circle-outline";

    const closeIcon = "mdi:close";

    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border px-3 py-2 shadow-sm backdrop-blur-sm",
          bgColor
        )}
      >
        <div className={cn("p-1.5 rounded-full", iconBgColor)}>
          <Icon width={20} height={20} icon={iconName} className={iconColor} />
        </div>

        <p className={cn("text-sm font-medium flex-grow", textColor)}>{message}</p>

        {onAction && (
          <button
            type="button"
            onClick={() => {
              onAction();
              toast.dismiss(t);
            }}
            className="text-sm font-semibold underline"
          >
            Action
          </button>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="p-0"
          onClick={() => toast.dismiss(t)}
        >
          <Icon width={16} height={16} icon={closeIcon} className={textColor} />
        </Button>
      </div>
    );
  });
}

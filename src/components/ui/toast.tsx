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
        ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400/60 dark:from-emerald-950/90 dark:to-teal-950/90 dark:border-emerald-500/50"
        : type === "error"
          ? "bg-gradient-to-br from-rose-50 to-pink-50 border-rose-400/60 dark:from-rose-950/90 dark:to-pink-950/90 dark:border-rose-500/50"
          : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400/60 dark:from-amber-950/90 dark:to-orange-950/90 dark:border-amber-500/50";

    const textColor =
      type === "success"
        ? "text-emerald-900 dark:text-emerald-50"
        : type === "error"
          ? "text-rose-900 dark:text-rose-50"
          : "text-amber-900 dark:text-amber-50";

    const linkColor =
      type === "success"
        ? "text-emerald-700 hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100"
        : type === "error"
          ? "text-rose-700 hover:text-rose-900 dark:text-rose-300 dark:hover:text-rose-100"
          : "text-amber-700 hover:text-amber-900 dark:text-amber-300 dark:hover:text-amber-100";

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
    // </CHANGE>

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
          "w-full rounded-lg border-2 px-4 py-3 shadow-xl backdrop-blur-sm",
          bgColor,
        )}
      >
        <div className="flex gap-3">
          <div className="flex grow gap-3">
            <div className={cn("shrink-0 rounded-full p-1.5", iconBgColor)}>
              <Icon
                width={20}
                height={20}
                icon={iconName}
                className={cn("shrink-0", iconColor)}
              />
            </div>

            <div className="flex grow justify-between gap-6 items-center">
              <p className={cn("text-sm font-medium", textColor)}>{message}</p>

              <div className="text-sm whitespace-nowrap flex gap-3">
                {onAction && (
                  <button
                    type="button"
                    onClick={() => {
                      onAction();
                      toast.dismiss(t);
                    }}
                    className={cn(
                      "hover:underline font-semibold transition-colors",
                      linkColor,
                    )}
                  >
                    Action
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => toast.dismiss(t)}
                  className={cn(
                    "hover:underline cursor-pointer font-medium transition-colors",
                    linkColor,
                  )}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            aria-label="Close banner"
            onClick={() => toast.dismiss(t)}
            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
          >
            <Icon
              width={18}
              height={18}
              icon={closeIcon}
              className={cn(
                "opacity-50 transition-all duration-200 group-hover:opacity-100 group-hover:rotate-90",
                textColor,
              )}
            />
          </Button>
        </div>
      </div>
    );
  });
}

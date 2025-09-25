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
        ? "bg-green-50 border-green-300"
        : type === "error"
          ? "bg-red-50 border-red-300"
          : "bg-yellow-50 border-yellow-300";

    const textColor =
      type === "success"
        ? "text-green-800"
        : type === "error"
          ? "text-red-800"
          : "text-yellow-800";

    const iconName =
      type === "success"
        ? "mdi:check-circle-outline"
        : type === "error"
          ? "mdi:close-circle-outline"
          : "mdi:alert-circle-outline";

    const closeIcon = "mdi:close";

    return (
      <div
        className={cn("w-full rounded-md border px-4 py-3 shadow-lg", bgColor)}
      >
        <div className="flex gap-2">
          <div className="flex grow gap-2">
            <Icon
              width={20}
              height={20}
              icon={iconName}
              className={cn("shrink-0", textColor)}
            />

            <div className="flex grow justify-between gap-6">
              <p className={cn("text-sm", textColor)}>{message}</p>

              <div className="text-sm whitespace-nowrap flex gap-2">
                {onAction && (
                  <button
                    type="button"
                    onClick={() => {
                      onAction();
                      toast.dismiss(t);
                    }}
                    className="hover:underline"
                  >
                    Action
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => toast.dismiss(t)}
                  className="hover:underline cursor-pointer"
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
            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent transition-smooth"
          >
            <Icon
              width={16}
              height={16}
              icon={closeIcon}
              className="opacity-60 transition-opacity group-hover:opacity-100"
            />
          </Button>
        </div>
      </div>
    );
  });
}

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input"> & { type?: string }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const isPassword = type === "password";

  return (
    <div className="relative w-full">
      <input
        type={isPassword && showPassword ? "text" : type}
        spellCheck={false}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-smooth",
          isPassword ? "pr-10" : "",
          className,
        )}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {showPassword ? (
            <Icon icon="lucide:eye-off" className="size-4" />
          ) : (
            <Icon icon="lucide:eye" className="size-4" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };

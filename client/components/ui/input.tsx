import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `
        flex
        h-11
        w-full

        rounded-lg
        border
        border-input

        bg-card
        px-4

        text-sm
        text-foreground

        placeholder:text-muted-foreground

        shadow-sm

        transition-all
        duration-200

        outline-none

        hover:border-ring/40

        focus:border-ring
        focus:ring-2
        focus:ring-ring/20

        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:bg-muted

        file:border-0
        file:bg-transparent
        file:text-sm
        file:font-medium

        autofill:bg-card
        `,
        className
      )}
      {...props}
    />
  );
}

export { Input };
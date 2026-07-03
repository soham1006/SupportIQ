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
        rounded-xl
        border
        border-border
        bg-card
        px-4
        text-[15px]
        text-foreground
        placeholder:text-muted-foreground
        transition-all
        duration-200
        outline-none

        focus:border-primary
        focus:ring-2
        focus:ring-primary/15

        disabled:cursor-not-allowed
        disabled:opacity-50

        file:border-0
        file:bg-transparent
        file:text-sm
        file:font-medium
        `,
        className
      )}
      {...props}
    />
  );
}

export { Input };
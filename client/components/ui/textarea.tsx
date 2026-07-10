import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `
        flex
        w-full
        min-h-[140px]
        resize-y

        rounded-lg
        border
        border-input

        bg-card

        px-4
        py-3

        text-sm
        leading-7
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
        disabled:bg-muted
        disabled:opacity-50
        `,
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
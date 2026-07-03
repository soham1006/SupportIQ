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
        min-h-[120px]
        w-full
        resize-y
        rounded-xl
        border
        border-border
        bg-card
        px-4
        py-3
        text-[15px]
        leading-7
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
        `,
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
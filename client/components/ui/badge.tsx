import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `
  inline-flex
  items-center
  justify-center
  rounded-full
  border
  px-3
  py-1
  text-xs
  font-semibold
  tracking-wide
  transition-all
  duration-200
  `,
  {
    variants: {
      variant: {
        default:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

        secondary:
          "border-border bg-muted text-muted-foreground",

        destructive:
          "border-red-500/20 bg-red-500/10 text-red-400",

        outline:
          "border-border bg-transparent text-foreground",

        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:bg-muted",

        link:
          "border-none bg-transparent p-0 text-primary underline-offset-4 hover:underline",

        success:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",

        warning:
          "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",

        info:
          "border-sky-500/20 bg-sky-500/10 text-sky-400",

        neutral:
          "border-slate-700 bg-slate-800 text-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      className={cn(
        badgeVariants({ variant }),
        className
      )}
      {...props}
    />
  );
}

export {
  Badge,
  badgeVariants,
};
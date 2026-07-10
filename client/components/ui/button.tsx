import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
group/button
inline-flex
items-center
justify-center
shrink-0
whitespace-nowrap
rounded-lg
text-sm
font-medium
transition-all
duration-200
outline-none
select-none

focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2

disabled:pointer-events-none
disabled:opacity-50

active:translate-y-px

[&_svg]:pointer-events-none
[&_svg]:shrink-0
[&_svg]:size-4
`,
  {
    variants: {
      variant: {
        default: `
bg-primary
text-primary-foreground
border
border-primary

hover:brightness-110
hover:shadow-md
`,

        secondary: `
bg-secondary
text-secondary-foreground
border
border-border

hover:bg-accent
hover:text-accent-foreground
`,

        outline: `
bg-card
text-foreground
border
border-border

hover:bg-accent
hover:border-ring
`,

        ghost: `
bg-transparent
text-muted-foreground

hover:bg-accent
hover:text-foreground
`,

        destructive: `
bg-destructive
text-white
border
border-destructive

hover:opacity-90
`,

        link: `
bg-transparent
text-primary
underline-offset-4

hover:underline
`,
      },

      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-4",
        lg: "h-11 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
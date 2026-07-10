import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `
inline-flex
items-center
justify-center

rounded-full

border

px-2.5
py-1

text-xs
font-medium

transition-colors
`,
  {
    variants: {
      variant: {
        default: `
bg-primary/10
text-primary
border-primary/15
`,

        secondary: `
bg-secondary
text-secondary-foreground
border-border
`,

        outline: `
bg-card
text-foreground
border-border
`,

        ghost: `
bg-transparent
text-muted-foreground
border-transparent
hover:bg-muted
`,

        destructive: `
bg-red-500/10
text-red-700
border-red-300
dark:text-red-300
dark:border-red-800
`,

        success: `
bg-emerald-500/10
text-emerald-700
border-emerald-300
dark:text-emerald-300
dark:border-emerald-800
`,

        warning: `
bg-amber-500/10
text-amber-700
border-amber-300
dark:text-amber-300
dark:border-amber-800
`,

        info: `
bg-sky-500/10
text-sky-700
border-sky-300
dark:text-sky-300
dark:border-sky-800
`,

        neutral: `
bg-muted
text-muted-foreground
border-border
`,

        link: `
border-none
bg-transparent
p-0

text-primary

hover:underline
`,
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
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
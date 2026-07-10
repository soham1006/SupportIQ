import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        `
        relative
        overflow-hidden

        rounded-lg

        border
        border-border/40

        bg-muted/70

        animate-pulse

        before:absolute
        before:inset-0

        before:-translate-x-full
        before:animate-[shimmer_2s_infinite]

        before:bg-gradient-to-r
        before:from-transparent
        before:via-background/50
        before:to-transparent
        `,
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
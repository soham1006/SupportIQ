"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        `
        group/avatar
        relative

        flex
        shrink-0

        overflow-hidden

        rounded-full

        border
        border-border

        bg-card

        shadow-sm

        select-none

        size-8
        data-[size=sm]:size-6
        data-[size=lg]:size-10
        `,
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        `
        aspect-square
        size-full

        rounded-full

        object-cover
        `,
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        `
        flex
        size-full
        items-center
        justify-center

        rounded-full

        bg-muted

        text-sm
        font-medium
        text-muted-foreground

        group-data-[size=sm]/avatar:text-xs
        `,
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        `
        absolute
        bottom-0
        right-0
        z-10

        inline-flex
        items-center
        justify-center

        rounded-full

        border-2
        border-background

        bg-primary
        text-primary-foreground

        shadow-sm

        select-none
        `,

        "group-data-[size=sm]/avatar:size-2",
        "group-data-[size=sm]/avatar:[&>svg]:hidden",

        "group-data-[size=default]/avatar:size-2.5",
        "group-data-[size=default]/avatar:[&>svg]:size-2",

        "group-data-[size=lg]/avatar:size-3",
        "group-data-[size=lg]/avatar:[&>svg]:size-2.5",

        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        `
        group/avatar-group

        flex

        -space-x-3

        *:data-[slot=avatar]:ring-2
        *:data-[slot=avatar]:ring-background
        `,
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        `
        relative

        flex
        shrink-0

        items-center
        justify-center

        rounded-full

        border
        border-border

        bg-muted

        text-sm
        font-medium
        text-muted-foreground

        ring-2
        ring-background

        size-8

        group-has-data-[size=sm]/avatar-group:size-6
        group-has-data-[size=lg]/avatar-group:size-10

        [&>svg]:size-4
        group-has-data-[size=sm]/avatar-group:[&>svg]:size-3
        group-has-data-[size=lg]/avatar-group:[&>svg]:size-5
        `,
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
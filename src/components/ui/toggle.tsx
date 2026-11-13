"use client";

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import {
  controlSurfaceClassName,
  controlDisabledClassName,
} from "@/lib/control-surface";
import { cn } from "@/lib/utils";

export const toggleVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-normal text-base text-foreground outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 data-pressed:not-disabled:not-data-disabled:active:bg-selected-pressed focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 data-pressed:bg-[color:var(--selected,var(--accent))] data-pressed:text-[color:var(--selected-foreground,var(--accent-foreground))] sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 min-w-9 px-[calc(--spacing(2)-1px)] sm:h-8 sm:min-w-8",
        lg: "h-10 min-w-10 px-[calc(--spacing(2.5)-1px)] sm:h-9 sm:min-w-9",
        sm: "h-8 min-w-8 px-[calc(--spacing(1.5)-1px)] sm:h-7 sm:min-w-7",
      },
      variant: {
        default:
          "border-transparent not-data-pressed:not-disabled:not-data-disabled:hover:bg-accent not-data-pressed:not-disabled:not-data-disabled:active:bg-accent-pressed",
        secondary: [
          "[--control-disabled-border:transparent] border-transparent bg-secondary text-secondary-foreground not-data-pressed:not-disabled:not-data-disabled:hover:bg-(--secondary-hover,var(--secondary)) not-data-pressed:not-disabled:not-data-disabled:active:bg-secondary-pressed not-disabled:not-data-disabled:active:shadow-none",
          controlSurfaceClassName,
          controlDisabledClassName,
        ],
      },
    },
  },
);

export function Toggle({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.Props &
  VariantProps<typeof toggleVariants>): React.ReactElement {
  return (
    <TogglePrimitive
      className={cn(toggleVariants({ className, size, variant }))}
      data-slot="toggle"
      {...props}
    />
  );
}

export { TogglePrimitive };

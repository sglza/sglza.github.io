"use client";

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import type React from "react";
import {
  controlSurfaceClassName,
  controlPressableClassName,
  controlDisabledClassName,
} from "@/lib/control-surface";
import { cn } from "@/lib/utils";

export function RadioGroup({
  className,
  ...props
}: RadioGroupPrimitive.Props): React.ReactElement {
  return (
    <RadioGroupPrimitive
      className={cn("flex flex-col gap-3", className)}
      data-slot="radio-group"
      {...props}
    />
  );
}

export function Radio({
  className,
  ...props
}: RadioPrimitive.Root.Props): React.ReactElement {
  return (
    <RadioPrimitive.Root
      className={cn(
        "size-4.5 before:inset-0 sm:size-4 relative inline-flex shrink-0 items-center justify-center rounded-full border border-input bg-(--control-background,var(--background)) transition-shadow outline-none not-dark:bg-clip-padding before:pointer-events-none before:absolute before:rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive-border focus-visible:aria-invalid:border-destructive-border-strong focus-visible:aria-invalid:ring-destructive-border-strong not-disabled:not-data-disabled:not-data-checked:hover:bg-accent not-disabled:not-data-disabled:active:bg-accent-pressed data-checked:bg-primary data-checked:not-disabled:not-data-disabled:active:bg-primary-pressed data-checked:[--control-surface:var(--control-solid-surface)] data-checked:[--control-edge-top:var(--control-solid-edge-top)] data-checked:[--control-edge-bottom:var(--control-solid-edge-bottom)] data-checked:[--control-disabled-border:var(--primary)] data-disabled:cursor-not-allowed data-disabled:opacity-64 dark:aria-invalid:ring-destructive-border-strong",
        controlSurfaceClassName,
        controlPressableClassName,
        controlDisabledClassName,
        className,
      )}
      data-slot="radio"
      {...props}
    >
      <RadioPrimitive.Indicator
        className="inset-0 before:size-2 sm:before:size-1.5 absolute flex items-center justify-center rounded-full before:rounded-full before:bg-primary-foreground data-unchecked:hidden"
        data-slot="radio-indicator"
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroupPrimitive, RadioPrimitive, Radio as RadioGroupItem };

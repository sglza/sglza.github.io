"use client";

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import type React from "react";
import {
  controlSurfaceClassName,
  controlPressableClassName,
  controlDisabledClassName,
} from "@/lib/control-surface";
import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props): React.ReactElement {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "size-4.5 before:inset-0 sm:size-4 relative inline-flex shrink-0 items-center justify-center rounded-[.25rem] border border-input bg-(--control-background,var(--background)) ring-ring transition-shadow outline-none not-dark:bg-clip-padding before:pointer-events-none before:absolute before:rounded-[3px] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive-border focus-visible:aria-invalid:border-destructive-border-strong focus-visible:aria-invalid:ring-destructive-border-strong not-disabled:not-data-disabled:not-data-checked:hover:bg-accent not-disabled:not-data-disabled:active:bg-accent-pressed data-checked:bg-primary data-checked:not-disabled:not-data-disabled:active:bg-primary-pressed data-checked:[--control-surface:var(--control-solid-surface)] data-checked:[--control-edge-top:var(--control-solid-edge-top)] data-checked:[--control-edge-bottom:var(--control-solid-edge-bottom)] data-checked:[--control-disabled-border:var(--primary)] data-disabled:cursor-not-allowed data-disabled:opacity-64 dark:aria-invalid:ring-destructive-border-strong",
        controlSurfaceClassName,
        controlPressableClassName,
        controlDisabledClassName,
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="inset-0 absolute flex items-center justify-center rounded-[.25rem] text-primary-foreground data-indeterminate:text-foreground data-unchecked:hidden"
        data-slot="checkbox-indicator"
        render={(
          props: React.ComponentProps<"span">,
          state: CheckboxPrimitive.Indicator.State,
        ) => (
          <span {...props}>
            {state.indeterminate ? (
              <svg
                aria-hidden="true"
                className="size-3.5 sm:size-3"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.252 12h13.496" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="size-3.5 sm:size-3"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
              </svg>
            )}
          </span>
        )}
      />
    </CheckboxPrimitive.Root>
  );
}

export { CheckboxPrimitive };

"use client";

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import type * as React from "react";
import {
  controlSwitchTrackClassName,
  controlSwitchThumbClassName,
} from "@/lib/control-surface";
import { cn } from "@/lib/utils";

export type SwitchProps = SwitchPrimitive.Root.Props;

/** A control that toggles between on and off. */
export function Switch({
  className,
  ...props
}: SwitchProps): React.ReactElement {
  return (
    <SwitchPrimitive.Root
      className={cn(
        controlSwitchTrackClassName,
        "[--thumb-size:--spacing(5)] sm:[--thumb-size:--spacing(4)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:cursor-not-allowed data-disabled:opacity-64",
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "in-[[role=switch]:active,[data-slot=label]:active,[data-slot=field-label]:active]:not-in-data-disabled:scale-x-110 in-[[role=switch]:active,[data-slot=label]:active,[data-slot=field-label]:active]:not-in-data-disabled:rounded-[var(--thumb-size)/calc(var(--thumb-size)*1.1)] data-checked:origin-[var(--thumb-size)_50%] data-checked:translate-x-[calc(var(--thumb-size)-4px)] rtl:data-checked:origin-left rtl:data-checked:-translate-x-[calc(var(--thumb-size)-4px)]",
          controlSwitchThumbClassName,
        )}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { SwitchPrimitive };

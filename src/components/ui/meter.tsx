"use client";

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import * as React from "react";
import { cn } from "@/lib/utils";

const MeterRangeContext = React.createContext<number | null>(null);

export function Meter({
  className,
  children,
  min = 0,
  max = 100,
  ...props
}: MeterPrimitive.Root.Props): React.ReactElement {
  return (
    <MeterRangeContext.Provider value={max - min}>
      <MeterPrimitive.Root
        className={cn("gap-2 flex w-full flex-col", className)}
        min={min}
        max={max}
        {...props}
      >
        {children ? (
          children
        ) : (
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        )}
      </MeterPrimitive.Root>
    </MeterRangeContext.Provider>
  );
}

export function MeterLabel({
  className,
  ...props
}: MeterPrimitive.Label.Props): React.ReactElement {
  return (
    <MeterPrimitive.Label
      className={cn("font-medium text-sm text-foreground", className)}
      data-slot="meter-label"
      {...props}
    />
  );
}

export function MeterTrack({
  className,
  ...props
}: MeterPrimitive.Track.Props): React.ReactElement {
  return (
    <MeterPrimitive.Track
      className={cn(
        "h-2 flex w-full overflow-hidden bg-muted-alpha",
        className,
      )}
      data-slot="meter-track"
      {...props}
    />
  );
}

export function MeterIndicator({
  className,
  ...props
}: MeterPrimitive.Indicator.Props): React.ReactElement {
  return (
    <MeterPrimitive.Indicator
      className={cn("bg-primary transition-all duration-500", className)}
      data-slot="meter-indicator"
      {...props}
    />
  );
}

export function MeterSegment({
  className,
  style,
  value,
  ...props
}: React.ComponentProps<"div"> & {
  /** The amount of the root's range occupied by this segment. */
  value: number;
}): React.ReactElement {
  const range = React.useContext(MeterRangeContext);

  if (range === null) {
    throw new Error("MeterSegment must be used within Meter.");
  }

  const percentage = range > 0 ? (value / range) * 100 : 0;
  const width = Math.max(
    0,
    Math.min(100, Number.isNaN(percentage) ? 0 : percentage),
  );

  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-full shrink-0 bg-primary transition-[width] duration-500 motion-reduce:transition-none",
        className,
      )}
      data-slot="meter-segment"
      style={{ width: `${width}%`, ...style }}
      {...props}
    />
  );
}

export function MeterValue({
  className,
  ...props
}: MeterPrimitive.Value.Props): React.ReactElement {
  return (
    <MeterPrimitive.Value
      className={cn("text-sm text-foreground tabular-nums", className)}
      data-slot="meter-value"
      {...props}
    />
  );
}

export { MeterPrimitive };

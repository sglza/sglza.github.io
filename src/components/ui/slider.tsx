"use client";

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import * as React from "react";
import { controlThumbClassName } from "@/lib/control-surface";
import { cn } from "@/lib/utils";

export function Slider({
  className,
  getAriaLabel,
  children,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props &
  Pick<SliderPrimitive.Thumb.Props, "getAriaLabel">): React.ReactElement {
  const _values = React.useMemo(() => {
    if (value !== undefined) {
      return Array.isArray(value) ? value : [value];
    }
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [min];
  }, [value, defaultValue, min]);

  return (
    <SliderPrimitive.Root
      className={cn("data-[orientation=horizontal]:w-full", className)}
      defaultValue={defaultValue}
      max={max}
      min={min}
      thumbAlignment="edge"
      value={value}
      {...props}
    >
      {children}
      <SliderPrimitive.Control
        className="data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:px-3 data-[orientation=horizontal]:py-3 flex touch-none items-center select-none data-disabled:pointer-events-none data-disabled:opacity-64 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col"
        data-slot="slider-control"
      >
        <SliderPrimitive.Track
          className="data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5 relative grow select-none before:absolute before:rounded-full before:bg-muted-alpha data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full"
          data-slot="slider-track"
        >
          <SliderPrimitive.Indicator
            className="data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5 rounded-full bg-primary select-none"
            data-slot="slider-indicator"
          />
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              className={cn(
                "size-5 before:inset-0 sm:size-4 relative block shrink-0 rounded-full border border-input transition-[box-shadow,scale] outline-none select-none not-dark:bg-clip-padding before:absolute before:rounded-full has-focus-visible:ring-[3px] has-focus-visible:ring-ring data-dragging:scale-120 dark:has-focus-visible:ring-ring",
                controlThumbClassName,
              )}
              data-slot="slider-thumb"
              getAriaLabel={getAriaLabel}
              index={index}
              key={String(index)}
            />
          ))}
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export function SliderValue({
  className,
  ...props
}: SliderPrimitive.Value.Props): React.ReactElement {
  return (
    <SliderPrimitive.Value
      className={cn("text-sm flex justify-end", className)}
      data-slot="slider-value"
      {...props}
    />
  );
}

export { SliderPrimitive };

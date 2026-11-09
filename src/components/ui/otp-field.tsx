"use client";

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field";
import type * as React from "react";
import {
  controlNativeInputSurfaceClassName,
  controlDisabledClassName,
} from "@/lib/control-surface";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export function OTPField({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Root> & {
  size?: "default" | "lg";
}): React.ReactElement {
  return (
    <OTPFieldPrimitive.Root
      className={cn(
        "flex items-center gap-2 has-disabled:opacity-64 has-disabled:**:data-[slot=otp-field-input]:shadow-none has-disabled:**:data-[slot=otp-field-input]:inset-shadow-none",
        className,
      )}
      data-size={size}
      data-slot="otp-field"
      {...props}
    />
  );
}

export function OTPFieldInput({
  className,
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Input>): React.ReactElement {
  return (
    <OTPFieldPrimitive.Input
      className={cn(
        "in-[[data-slot=otp-field][data-size=lg]]:size-10 size-9 min-w-0 in-[[data-slot=otp-field][data-size=lg]]:text-lg text-base in-[[data-slot=otp-field][data-size=lg]]:leading-10 leading-9 sm:in-[[data-slot=otp-field][data-size=lg]]:size-9 sm:size-8 sm:in-[[data-slot=otp-field][data-size=lg]]:text-base sm:text-sm sm:in-[[data-slot=otp-field][data-size=lg]]:leading-9 sm:leading-8 relative rounded-lg border border-input bg-(--control-background,var(--background)) text-center text-foreground ring-ring-soft transition-shadow outline-none not-dark:bg-clip-padding focus-visible:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring-soft aria-invalid:border-destructive-border aria-invalid:focus-visible:border-destructive-border-strong aria-invalid:focus-visible:ring-destructive-border-strong dark:aria-invalid:focus-visible:ring-destructive-border-strong",
        controlNativeInputSurfaceClassName,
        controlDisabledClassName,
        className,
      )}
      data-slot="otp-field-input"
      spellCheck={false}
      {...props}
    />
  );
}

export function OTPFieldSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>): React.ReactElement {
  return (
    <OTPFieldPrimitive.Separator
      render={
        <Separator
          className={cn(
            "rounded-full bg-border data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-3",
            className,
          )}
          orientation="horizontal"
          {...props}
        />
      }
    />
  );
}

export { OTPFieldPrimitive };

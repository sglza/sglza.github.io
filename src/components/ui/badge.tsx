"use client";

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import {
  controlInteractiveSurfaceClassName,
  controlSolidSurfaceClassName,
} from "@/lib/control-surface";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm border border-transparent font-medium outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-3.5 sm:[&_svg:not([class*='size-'])]:size-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [button&,a&]:cursor-pointer [button&,a&]:pointer-coarse:after:absolute [button&,a&]:pointer-coarse:after:size-full [button&,a&]:pointer-coarse:after:min-h-11 [button&,a&]:pointer-coarse:after:min-w-11",
    controlInteractiveSurfaceClassName,
  ],
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default:
          "h-5.5 min-w-5.5 px-[calc(--spacing(1)-1px)] text-sm sm:h-4.5 sm:min-w-4.5 sm:text-xs",
        lg: "h-6.5 min-w-6.5 px-[calc(--spacing(1.5)-1px)] text-base sm:h-5.5 sm:min-w-5.5 sm:text-sm",
        sm: "h-5 min-w-5 px-[calc(--spacing(1)-1px)] text-xs sm:h-4 sm:min-w-4 sm:text-[.625rem]",
      },
      variant: {
        default: [
          "bg-primary text-primary-foreground [button&,a&]:hover:bg-(--primary-hover,color-mix(in_oklab,var(--primary)_90%,transparent)) [button&,a&]:not-disabled:not-data-disabled:active:bg-primary-pressed [button&,a&]:data-pressed:bg-primary-pressed",
          controlSolidSurfaceClassName,
        ],
        destructive: [
          "bg-destructive text-destructive-contrast [button&,a&]:hover:bg-destructive-hover [button&,a&]:not-disabled:not-data-disabled:active:bg-destructive-pressed [button&,a&]:data-pressed:bg-destructive-pressed",
          controlSolidSurfaceClassName,
        ],
        error: "bg-destructive-soft-alpha text-destructive-foreground-alpha",
        info: "bg-info-soft-alpha text-info-foreground-alpha",
        outline:
          "border-input bg-background text-foreground [button&,a&]:hover:bg-accent [button&,a&]:not-disabled:not-data-disabled:active:bg-accent-pressed [button&,a&]:data-pressed:bg-accent-pressed ",
        secondary:
          "bg-secondary-alpha text-secondary-foreground-alpha [button&,a&]:hover:bg-secondary-hover-alpha [button&,a&]:not-disabled:not-data-disabled:active:bg-secondary-pressed-alpha [button&,a&]:data-pressed:bg-secondary-pressed-alpha",
        success: "bg-success-soft-alpha text-success-foreground-alpha",
        warning: "bg-warning-soft-alpha text-warning-foreground-alpha",
      },
    },
  },
);

export interface BadgeProps extends useRender.ComponentProps<"span"> {
  variant?: VariantProps<typeof badgeVariants>["variant"];
  size?: VariantProps<typeof badgeVariants>["size"];
}

export function Badge({
  className,
  variant,
  size,
  render,
  ...props
}: BadgeProps): React.ReactElement {
  const defaultProps = {
    className: cn(badgeVariants({ className, size, variant })),
    "data-slot": "badge",
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  controlButtonSurfaceClassName,
  controlOutlineSurfaceClassName,
  controlSolidSurfaceClassName,
  controlPressableClassName,
  controlDisabledClassName,
} from "@/lib/control-surface";

// Kept out of the "use client" button module so Server Components can call
// buttonVariants() to style links and other elements.
const buttonVariantStyles = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-normal text-base outline-none transition-shadow in-data-[slot=input-group]:shadow-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 data-loading:select-none data-loading:text-transparent sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-[calc(--spacing(3)-1px)] sm:h-8",
        icon: "size-9 sm:size-8",
        "icon-lg": "size-10 sm:size-9",
        "icon-sm": "size-8 sm:size-7",
        "icon-xl":
          "size-11 sm:size-10 [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4.5",
        "icon-xs":
          "size-7 rounded-md before:rounded-[calc(var(--radius-md)-1px)] sm:size-6 not-in-data-[slot=input-group]:[&_svg:not([class*='size-'])]:size-4 sm:not-in-data-[slot=input-group]:[&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 px-[calc(--spacing(3.5)-1px)] sm:h-9",
        sm: "h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:h-7",
        xl: "h-11 px-[calc(--spacing(4)-1px)] text-lg sm:h-10 sm:text-base [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4.5",
        xs: "h-7 gap-1 rounded-md px-[calc(--spacing(2)-1px)] text-sm before:rounded-[calc(var(--radius-md)-1px)] sm:h-6 sm:text-xs [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
      },
      variant: {
        default: [
          "border-primary bg-primary text-primary-foreground hover:bg-(--primary-hover,color-mix(in_oklab,var(--primary)_90%,transparent)) not-disabled:not-data-disabled:active:bg-primary-pressed data-pressed:bg-primary-pressed *:data-[slot=button-loading-indicator]:text-primary-foreground",
          controlButtonSurfaceClassName,
          controlSolidSurfaceClassName,
          controlPressableClassName,
          controlDisabledClassName,
        ],
        destructive: [
          "border-destructive bg-destructive text-destructive-contrast hover:bg-destructive-hover not-disabled:not-data-disabled:active:bg-destructive-pressed data-pressed:bg-destructive-pressed *:data-[slot=button-loading-indicator]:text-destructive-contrast",
          controlButtonSurfaceClassName,
          controlSolidSurfaceClassName,
          controlPressableClassName,
          controlDisabledClassName,
        ],
        "destructive-outline": [
          "[--control-disabled-border:var(--destructive-border)] border-destructive-border bg-transparent text-destructive-foreground hover:bg-destructive-subtle not-disabled:not-data-disabled:active:bg-destructive-soft data-pressed:bg-destructive-soft *:data-[slot=button-loading-indicator]:text-foreground",
          controlOutlineSurfaceClassName,
          controlPressableClassName,
          controlDisabledClassName,
        ],
        ghost:
          "border-transparent text-foreground hover:bg-accent not-disabled:not-data-disabled:active:bg-accent-pressed data-pressed:bg-accent-pressed *:data-[slot=button-loading-indicator]:text-foreground",
        link: "border-transparent text-foreground underline-offset-4 hover:underline data-pressed:underline *:data-[slot=button-loading-indicator]:text-foreground",
        outline: [
          "border-input bg-transparent text-foreground hover:bg-accent not-disabled:not-data-disabled:active:bg-accent-pressed data-pressed:bg-accent-pressed *:data-[slot=button-loading-indicator]:text-foreground",
          controlOutlineSurfaceClassName,
          controlPressableClassName,
          controlDisabledClassName,
        ],
        secondary: [
          "[--control-disabled-border:transparent] border-transparent bg-secondary text-secondary-foreground hover:bg-secondary-hover not-disabled:not-data-disabled:active:bg-secondary-pressed data-pressed:bg-secondary-pressed *:data-[slot=button-loading-indicator]:text-secondary-foreground",
          controlButtonSurfaceClassName,
          controlPressableClassName,
          controlDisabledClassName,
        ],
      },
    },
  },
);

// Links call this helper directly, so merge overrides here as well as in Button.
export function buttonVariants(
  ...args: Parameters<typeof buttonVariantStyles>
) {
  return cn(buttonVariantStyles(...args));
}

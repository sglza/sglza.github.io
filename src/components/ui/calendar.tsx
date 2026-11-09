"use client";

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { type DateLib, DayPicker } from "@daypicker/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
} from "lucide-react";
import type * as React from "react";
import {
  controlSurfaceClassName,
  controlSolidSurfaceClassName,
  controlDisabledClassName,
  controlFieldClassName,
  controlPressableClassName,
} from "@/lib/control-surface";
import { cn } from "@/lib/utils";

const buttonClassNames =
  "relative flex size-(--cell-size) text-base sm:text-sm items-center justify-center rounded-lg text-foreground not-in-data-selected:hover:bg-accent not-in-data-selected:not-disabled:not-data-disabled:active:bg-accent-pressed disabled:pointer-events-none disabled:opacity-64 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0";

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  mode = "single",
  ...props
}: React.ComponentProps<typeof DayPicker>): React.ReactElement {
  const defaultClassNames = {
    button_next: buttonClassNames,
    button_previous: buttonClassNames,
    caption_label:
      "text-base sm:text-sm font-medium flex items-center gap-2 h-full",
    day: "size-(--cell-size) text-sm py-px",
    day_button: cn(
      buttonClassNames,
      "border",
      controlSurfaceClassName,
      controlSolidSurfaceClassName,
      controlDisabledClassName,
      controlPressableClassName,
      "in-data-selected:not-disabled:not-data-disabled:active:bg-primary-pressed in-[.range-middle]:in-data-selected:not-disabled:not-data-disabled:active:bg-selected-pressed",
      "not-in-data-selected:border-transparent not-in-data-selected:bg-none not-in-data-selected:shadow-none not-in-data-selected:inset-shadow-none not-in-data-selected:before:opacity-0 in-[.range-middle]:border-transparent in-[.range-middle]:bg-none in-[.range-middle]:shadow-none in-[.range-middle]:inset-shadow-none in-[.range-middle]:before:opacity-0 in-data-disabled:bg-none in-data-disabled:shadow-none in-data-disabled:inset-shadow-none",
      "in-data-disabled:pointer-events-none in-[.range-middle]:rounded-none in-[.range-end:not(.range-start)]:rounded-s-none in-[.range-start:not(.range-end)]:rounded-e-none in-[.range-middle]:in-data-selected:bg-[color:var(--selected,var(--accent))] in-data-selected:bg-primary in-[.range-middle]:in-data-selected:text-[color:var(--selected-foreground,var(--foreground))] in-data-disabled:text-muted-foreground in-data-outside:text-muted-foreground in-data-selected:in-data-outside:text-primary-foreground in-data-selected:text-primary-foreground in-data-disabled:line-through outline-none in-[[data-selected]:not(.range-middle)]:transition-[border-radius,box-shadow] focus-visible:z-1 focus-visible:ring-[3px] focus-visible:ring-ring",
    ),
    dropdown: "absolute bg-popover inset-0 opacity-0",
    dropdown_root: cn(
      "bg-(--control-background,var(--background)) relative has-[select:active]:bg-accent-pressed has-[select:active]:shadow-none has-focus:border-ring has-focus:ring-ring-soft has-focus:ring-[3px] border border-input rounded-lg px-[calc(--spacing(3)-1px)] h-9 sm:h-8 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-me-1",
      controlSurfaceClassName,
      controlFieldClassName,
    ),
    dropdowns:
      "w-full flex items-center text-base sm:text-sm justify-center h-(--cell-size) gap-1.5 *:[span]:font-medium",
    hidden: "invisible",
    month: "w-full",
    month_caption:
      "relative mx-(--cell-size) px-1 mb-1 flex h-(--cell-size) items-center justify-center z-2",
    months: "relative flex flex-col sm:flex-row gap-2",
    nav: "absolute top-0 flex w-full justify-between z-1",
    outside:
      "text-muted-foreground data-selected:bg-[color:var(--selected,var(--accent))]/50 data-selected:text-muted-foreground",
    range_end: "range-end",
    range_middle: "range-middle",
    range_start: "range-start",
    today:
      "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-1 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-primary [&[data-selected]:not(.range-middle)>*]:after:bg-background [&[data-disabled]>*]:after:bg-muted-solid",
    week_number:
      "size-(--cell-size) p-0 text-xs font-medium text-muted-foreground",
    weekday: "size-(--cell-size) p-0 text-xs font-medium text-muted-foreground",
  };
  const mergedClassNames: typeof defaultClassNames = Object.keys(
    defaultClassNames,
  ).reduce(
    (acc, key) => {
      const userClass = classNames?.[key as keyof typeof classNames];
      const baseClass =
        defaultClassNames[key as keyof typeof defaultClassNames];

      acc[key as keyof typeof defaultClassNames] = userClass
        ? cn(baseClass, userClass)
        : baseClass;

      return acc;
    },
    { ...defaultClassNames } as typeof defaultClassNames,
  );

  const defaultComponents = {
    Chevron: ({
      className,
      orientation,
      ...props
    }: {
      className?: string;
      orientation?: "left" | "right" | "up" | "down";
    }): React.ReactElement => {
      if (orientation === "left") {
        return (
          <ChevronLeftIcon
            className={cn(className, "rtl:rotate-180")}
            {...props}
            aria-hidden="true"
          />
        );
      }

      if (orientation === "right") {
        return (
          <ChevronRightIcon
            className={cn(className, "rtl:rotate-180")}
            {...props}
            aria-hidden="true"
          />
        );
      }

      return (
        <ChevronsUpDownIcon
          className={className}
          {...props}
          aria-hidden="true"
        />
      );
    },
  };

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  };

  const dayPickerProps = {
    className: cn(
      "w-fit [--cell-size:--spacing(10)] sm:[--cell-size:--spacing(9)]",
      className,
    ),
    classNames: mergedClassNames,
    components: mergedComponents,
    "data-slot": "calendar",
    formatters: {
      formatMonthDropdown: (month: Date, dateLib: DateLib) =>
        dateLib.format(month, "LLL"),
    } as React.ComponentProps<typeof DayPicker>["formatters"],
    mode,
    showOutsideDays,
    ...props,
  };

  return (
    <DayPicker
      {...(dayPickerProps as React.ComponentProps<typeof DayPicker>)}
    />
  );
}

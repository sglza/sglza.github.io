"use client";

// Adapted from coss ui (https://coss.com/ui), MIT License,
// Copyright (c) 2025 coss.com and Origin UI.
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  type SegmentedControlSize,
  segmentedControlIndicatorSurfaceClassName,
  segmentedControlItemLayoutClassName,
  segmentedControlItemSizeClassNames,
} from "@/components/ui/segmented-control";

type TabsVariant = "default" | "underline";
type TabsSize = SegmentedControlSize;

const TabsListContext: React.Context<TabsSize> =
  React.createContext<TabsSize>("default");

export function Tabs({
  className,
  ...props
}: TabsPrimitive.Root.Props): React.ReactElement {
  return (
    <TabsPrimitive.Root
      className={cn(
        "gap-2 flex flex-col data-[orientation=vertical]:flex-row",
        className,
      )}
      data-slot="tabs"
      {...props}
    />
  );
}

export function TabsList({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: TabsPrimitive.List.Props & {
  size?: TabsSize;
  variant?: TabsVariant;
}): React.ReactElement {
  return (
    <TabsPrimitive.List
      className={cn(
        "gap-x-0.5 relative z-0 flex w-fit items-center justify-center text-muted-foreground",
        "data-[orientation=vertical]:flex-col",
        variant === "default"
          ? "p-0.5 rounded-lg bg-muted-alpha text-muted-foreground"
          : "data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-tab]:hover:bg-accent",
        className,
      )}
      data-size={size}
      data-slot="tabs-list"
      data-variant={variant}
      {...props}
    >
      <TabsListContext.Provider value={size}>
        {children}
      </TabsListContext.Provider>
      <TabsPrimitive.Indicator
        className={cn(
          "bottom-0 left-0 ease-in-out absolute h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) transition-[width,translate] duration-200 motion-reduce:transition-none",
          variant === "underline"
            ? "data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 z-10 bg-primary data-[orientation=horizontal]:translate-y-px data-[orientation=vertical]:-translate-x-px"
            : cn("-z-1", segmentedControlIndicatorSurfaceClassName),
        )}
        data-slot="tab-indicator"
      />
    </TabsPrimitive.List>
  );
}

export function TabsTab({
  className,
  size,
  ...props
}: TabsPrimitive.Tab.Props & {
  size?: TabsSize;
}): React.ReactElement {
  const contextSize: TabsSize = React.useContext(TabsListContext);
  const resolvedSize: TabsSize = size ?? contextSize;

  return (
    <TabsPrimitive.Tab
      className={cn(
        "font-normal text-base sm:text-sm relative flex shrink-0 grow cursor-pointer items-center justify-center rounded-md border border-transparent whitespace-nowrap transition-[color,background-color,box-shadow] outline-none hover:text-muted-foreground not-data-active:not-disabled:not-data-disabled:hover:bg-secondary-hover focus-visible:ring-2 focus-visible:ring-ring not-data-active:not-disabled:not-data-disabled:active:bg-accent-pressed in-data-[variant=default]:not-data-active:not-disabled:not-data-disabled:hover:bg-muted-alpha/50 in-data-[variant=default]:not-data-active:not-disabled:not-data-disabled:active:bg-muted-alpha data-active:text-(--selected-foreground,var(--foreground)) data-disabled:pointer-events-none data-disabled:opacity-64 data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        segmentedControlItemLayoutClassName,
        segmentedControlItemSizeClassNames[resolvedSize],
        className,
      )}
      data-size={resolvedSize}
      data-slot="tabs-tab"
      {...props}
    />
  );
}

export function TabsPanel({
  className,
  ...props
}: TabsPrimitive.Panel.Props): React.ReactElement {
  return (
    <TabsPrimitive.Panel
      className={cn("flex-1 outline-none", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export {
  TabsPrimitive,
  TabsTab as TabsTrigger,
  TabsPanel as TabsContent,
  type TabsSize,
  type TabsVariant,
};

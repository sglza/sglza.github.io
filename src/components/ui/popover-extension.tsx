"use client";

import type React from "react";
import { useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PopoverPrimitive } from "@/components/ui/popover";

export * from "@/components/ui/popover";

type SpotlightGeometry = {
  clipPath: React.CSSProperties["clipPath"];
  height: number;
  left: number;
  radius: number;
  top: number;
  width: number;
};

function getSpotlightGeometry(
  target: HTMLElement,
  padding: number,
  radius: number,
): SpotlightGeometry {
  const rect = target.getBoundingClientRect();
  const left = rect.left - padding;
  const top = rect.top - padding;
  const right = rect.right + padding;
  const bottom = rect.bottom + padding;
  const width = right - left;
  const height = bottom - top;
  const cutoutRadius = Math.max(0, Math.min(radius, width / 2, height / 2));

  if (cutoutRadius === 0) {
    // Mirrors Base UI's InternalBackdrop cutout so the visual and interaction
    // backdrops use the same viewport coordinate system.
    return {
      clipPath: `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${left}px ${top}px,${left}px ${bottom}px,${right}px ${bottom}px,${right}px ${top}px,${left}px ${top}px)`,
      height,
      left,
      radius: cutoutRadius,
      top,
      width,
    };
  }

  const outerPath = `M 0 0 H ${window.innerWidth} V ${window.innerHeight} H 0 Z`;
  const innerPath = [
    `M ${left + cutoutRadius} ${top}`,
    `H ${right - cutoutRadius}`,
    `Q ${right} ${top} ${right} ${top + cutoutRadius}`,
    `V ${bottom - cutoutRadius}`,
    `Q ${right} ${bottom} ${right - cutoutRadius} ${bottom}`,
    `H ${left + cutoutRadius}`,
    `Q ${left} ${bottom} ${left} ${bottom - cutoutRadius}`,
    `V ${top + cutoutRadius}`,
    `Q ${left} ${top} ${left + cutoutRadius} ${top}`,
    "Z",
  ].join(" ");

  return {
    clipPath: `path(evenodd, "${outerPath} ${innerPath}")`,
    height,
    left,
    radius: cutoutRadius,
    top,
    width,
  };
}

type PopoverBackdropProps = PopoverPrimitive.Backdrop.Props & {
  portalProps?: PopoverPrimitive.Portal.Props;
};

/** A dimming layer for COSS popovers, kept separate from the registry file. */
export function PopoverBackdrop({
  className,
  portalProps,
  ...props
}: PopoverBackdropProps): React.ReactElement {
  return (
    <PopoverPrimitive.Portal {...portalProps}>
      <PopoverPrimitive.Backdrop
        className={cn(
          "fixed inset-0 z-40 bg-black/32 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
          className,
        )}
        data-slot="popover-backdrop"
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

type PopoverSpotlightProps = Omit<
  PopoverPrimitive.Backdrop.Props,
  "children" | "render"
> & {
  /** Backdrop blur in CSS pixels. */
  blur?: number;
  /** Adds a soft ring around the spotlight cutout. */
  halo?: boolean;
  haloClassName?: string;
  padding?: number;
  portalProps?: PopoverPrimitive.Portal.Props;
  /** Corner radius of the cutout in CSS pixels. */
  radius?: number;
  targetRef: React.RefObject<HTMLElement | null>;
};

/**
 * A popover backdrop with a click-through cutout around its target.
 * The cutout follows the target when it moves, resizes, or scrolls.
 */
export function PopoverSpotlight({
  blur = 0,
  className,
  halo = false,
  haloClassName,
  padding = 0,
  portalProps,
  radius = 0,
  style,
  targetRef,
  ...props
}: PopoverSpotlightProps): React.ReactElement {
  const [geometry, setGeometry] = useState<SpotlightGeometry>();

  useLayoutEffect(() => {
    const target = targetRef.current;

    if (!target) {
      return;
    }

    let animationFrame = 0;

    const measure = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        setGeometry(getSpotlightGeometry(target, padding, radius));
      });
    };

    setGeometry(getSpotlightGeometry(target, padding, radius));

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(target);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, {
      capture: true,
      passive: true,
    });
    window.visualViewport?.addEventListener("resize", measure);
    window.visualViewport?.addEventListener("scroll", measure);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, { capture: true });
      window.visualViewport?.removeEventListener("resize", measure);
      window.visualViewport?.removeEventListener("scroll", measure);
    };
  }, [padding, radius, targetRef]);

  const spotlightStyle = (state: PopoverPrimitive.Backdrop.State) => {
    const customStyle = typeof style === "function" ? style(state) : style;
    const backdropFilter = blur > 0 ? `blur(${blur}px)` : undefined;

    return {
      backdropFilter,
      WebkitBackdropFilter: backdropFilter,
      ...customStyle,
      clipPath: geometry?.clipPath,
    };
  };

  return (
    <PopoverPrimitive.Portal {...portalProps}>
      <>
        <PopoverPrimitive.Backdrop
          className={cn(
            "fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0",
            className,
          )}
          data-slot="popover-spotlight"
          style={spotlightStyle}
          {...props}
        />
        {halo && geometry ? (
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none fixed z-40 animate-in fade-in shadow-[inset_0_0_0_1px_--alpha(var(--color-white)/18%),0_0_0_1px_--alpha(var(--color-white)/80%),0_0_0_4px_--alpha(var(--color-white)/14%),0_0_20px_--alpha(var(--color-white)/24%)] transition-[top,left,width,height,border-radius,opacity] duration-200 motion-reduce:animate-none",
              haloClassName,
            )}
            data-slot="popover-spotlight-halo"
            style={{
              borderRadius: geometry.radius,
              height: geometry.height,
              left: geometry.left,
              top: geometry.top,
              width: geometry.width,
            }}
          />
        ) : null}
      </>
    </PopoverPrimitive.Portal>
  );
}

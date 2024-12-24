"use client";

import type { PropsWithChildren } from "react";
import {
  AnimationControls,
  cubicBezier,
  motion,
  Target,
  TargetAndTransition,
  VariantLabels,
} from "framer-motion";

const TRANSITION = {
  type: "tween",
  duration: 1,
  ease: cubicBezier(0.645, 0.045, 0.355, 1),
};

interface TextTransitionProps {
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | AnimationControls | TargetAndTransition;
  delay?: number;
}

export const TextTransition = ({
  children = "Lorem ipsum",
  initial = { opacity: 0, width: 0 },
  animate = { opacity: 1, width: "auto" },
  delay = 0,
}: PropsWithChildren<TextTransitionProps>) => {
  return (
    <div className="flex w-fit overflow-hidden">
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ ...TRANSITION, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

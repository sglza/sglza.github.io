"use client";

import { PropsWithChildren, useRef } from "react";
import { motion, useInView } from "motion/react";

export const Appear = ({ children }: PropsWithChildren) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView && { opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

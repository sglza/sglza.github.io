import { useState, useRef, useEffect, ComponentProps } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedHeightProps {
  padding?: string;
}

export const AnimatedHeight = ({
  padding,
  className,
  children,
}: AnimatedHeightProps & ComponentProps<"div">) => {
  const elementRef = useRef(null);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();
        setHeight(rect.height);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      transition={{ type: "spring", duration: 0.7, bounce: 0 }}
      className={cn("overflow-hidden", className)}
    >
      <div ref={elementRef} className={padding}>
        {children}
      </div>
    </motion.div>
  );
};

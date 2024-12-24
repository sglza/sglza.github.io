"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  MdOutlineAdd,
  MdOutlineDiamond,
  MdOutlineRemove,
} from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import NumberFlow from "@number-flow/react";

import { Button } from "./ui/button";
import { AnimatedHeight } from "./animated-height";

const PLAN_AMOUNTS = [1, 10, 30, 100];
const PLAN_PRICES = [5, 25, 75, 0];

export const PricingCard = () => {
  const [planIndex, setPlanIndex] = useState(0);

  const planAmount = PLAN_AMOUNTS[planIndex];
  const planPrice = PLAN_PRICES[planIndex];
  const supposedPlanPrice = planAmount * PLAN_PRICES[0];

  const actionCopy = (() => {
    if (planIndex === 0) {
      return "Buy";
    }
    if (planIndex === PLAN_AMOUNTS.length - 1) {
      return "Contact us";
    }
    return "Subscribe";
  })();

  const handleChangePlan = (newValue: number) => {
    if (newValue < 0 || newValue >= PLAN_AMOUNTS.length) return;
    setPlanIndex(newValue);
  };

  return (
    <div className="relative w-fit">
      <AnimatedHeight
        padding="p-6"
        className="relative w-72 h-fit border border-black/25 rounded-[1.25rem]"
      >
        <div className="relative flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-extrabold text-primary">Advanced</h3>
          </div>
          <div className="border-t border-black/10" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[2rem] font-bold">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={planPrice > 0 ? "price" : "customize"}
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0)" }}
                      exit={{ opacity: 0, filter: "blur(4px)" }}
                      transition={{ type: "spring", duration: 0.5 }}
                    >
                      {planPrice > 0 ? (
                        <NumberFlow prefix="$" value={planPrice} />
                      ) : (
                        "Custom plan"
                      )}
                    </motion.span>
                  </AnimatePresence>
                </span>
                {planIndex < PLAN_AMOUNTS.length - 1 && (
                  <motion.span
                    layout
                    transition={{ type: "spring", bounce: 0.2 }}
                    className="text-base"
                  >
                    USD
                  </motion.span>
                )}
              </div>
              <AnimatePresence mode="popLayout" initial={false}>
                {planIndex > 0 && planIndex < PLAN_AMOUNTS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
                    className="flex items-center gap-1"
                  >
                    <p className="text-s line-through">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={supposedPlanPrice}
                          initial={{ opacity: 1, filter: "blur(2px)" }}
                          animate={{ opacity: 1, filter: "blur(0)" }}
                          exit={{
                            opacity: 0,
                            filter: "blur(2px)",
                            transition: { duration: 0.2 },
                          }}
                          transition={{ type: "tween", duration: 0.7 }}
                          className="overflow-hidden"
                        >
                          $ {supposedPlanPrice}
                        </motion.span>
                      </AnimatePresence>
                    </p>
                    <motion.span
                      layout
                      transition={{ type: "spring", bounce: 0.2 }}
                      className="text-xs"
                    >
                      USD
                    </motion.span>
                    <motion.p
                      layout
                      className="text-xs px-1.5 py-1 rounded-full bg-[#D3FFD5]"
                    >
                      {((1 - planPrice / supposedPlanPrice) * 100).toFixed(0)}%
                      OFF
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.p layout className="text-xs">
                {planIndex === 0 ? "Pay once" : "Billed monthly"}
              </motion.p>
            </div>
            <motion.div layout className="flex flex-col gap-3">
              <p className="font-bold text-xs uppercase">
                Fully detailed report
              </p>
              <p className="text-sm">
                Ideal for users who require key data for a more detailed
                analysis.
              </p>
            </motion.div>
            <motion.div
              layout
              className="flex items-center justify-between text-primary"
            >
              <p className="text-sm">Amount</p>
              <div className="flex items-center gap-3">
                <Button
                  className="rounded-full w-9 active:scale-95"
                  onClick={() => handleChangePlan(planIndex - 1)}
                  disabled={planIndex === 0}
                >
                  <MdOutlineRemove />
                </Button>
                <div className="font-semibold w-8 text-center">
                  {planAmount}
                </div>
                <Button
                  className="rounded-full w-9 active:scale-95"
                  onClick={() => handleChangePlan(planIndex + 1)}
                  disabled={planIndex === PLAN_AMOUNTS.length - 1}
                >
                  <MdOutlineAdd />
                </Button>
              </div>
            </motion.div>
          </div>
          <motion.div layout className="flex flex-col gap-4">
            <div className="border-t border-black/10" />
            <Button
              className="relative w-full overflow-hidden self-end transition-all gap-0 active:scale-[.99]"
              onClick={() =>
                toast("Action triggered", {
                  description: "This is an example :)",
                })
              }
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.span
                  key={actionCopy}
                  initial={{
                    width: 0,
                    filter: "blur(4px)",
                    opacity: 0,
                  }}
                  animate={{
                    width: "auto",
                    filter: "blur(0)",
                    opacity: 1,
                  }}
                  exit={{
                    width: 0,
                    filter: "blur(4px)",
                    opacity: 0,
                  }}
                  className="overflow-hidden"
                  transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                >
                  {actionCopy}
                </motion.span>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </AnimatedHeight>
      <AnimatePresence>
        {planIndex > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
            className="flex items-center gap-1 absolute rounded-full px-2.5 py-1 font-semibold text-xs bg-primary text-white right-4 -top-3"
          >
            <MdOutlineDiamond /> Recommended
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PricingCard;

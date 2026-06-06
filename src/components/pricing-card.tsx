"use client";

import { useState } from "react";
import {
  MdOutlineAdd,
  MdOutlineDiamond,
  MdOutlineRemove,
} from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
import NumberFlow from "@number-flow/react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardPanel } from "./ui/card";
import { toastManager } from "./ui/toast";
import { AnimatedHeight } from "./animated-height";

const PLANS = [
  { amount: "10", numericAmount: 10, price: 25 },
  { amount: "30", numericAmount: 30, price: 64 },
  { amount: "50", numericAmount: 50, price: 94 },
  { amount: "∞", numericAmount: null, price: null },
] as const;

export const PricingCard = () => {
  const [planIndex, setPlanIndex] = useState(0);

  const plan = PLANS[planIndex];
  const planAmount = plan.amount;
  const planPrice = plan.price;
  const baseUnitPrice = PLANS[0].price / PLANS[0].numericAmount;
  const supposedPlanPrice =
    plan.numericAmount === null ? null : plan.numericAmount * baseUnitPrice;
  const isCustomPlan = plan.numericAmount === null;

  const actionCopy = isCustomPlan ? "Contact us" : "Subscribe";

  const handleChangePlan = (newValue: number) => {
    if (newValue < 0 || newValue >= PLANS.length) return;
    setPlanIndex(newValue);
  };

  return (
    <div className="relative w-fit">
      <Card className="w-72 overflow-visible">
        <CardPanel className="p-0">
          <AnimatedHeight padding="p-6" className="relative h-fit">
            <div className="relative flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-primary">
                  Advanced
                </h3>
              </div>
              <div className="border-t border-border" />
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[2rem] font-bold">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={isCustomPlan ? "custom" : "price"}
                          initial={{ opacity: 0, filter: "blur(4px)" }}
                          animate={{ opacity: 1, filter: "blur(0)" }}
                          exit={{ opacity: 0, filter: "blur(4px)" }}
                          transition={{ type: "spring", duration: 0.5 }}
                        >
                          {planPrice === null ? (
                            "Enterprise"
                          ) : (
                            <NumberFlow prefix="$" value={planPrice} />
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    {!isCustomPlan && (
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
                    {planIndex > 0 &&
                      !isCustomPlan &&
                      supposedPlanPrice !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.3 },
                          }}
                          exit={{
                            opacity: 0,
                            y: -10,
                            transition: { duration: 0.1 },
                          }}
                          className="flex items-center gap-1"
                        >
                          <p className="text-s line-through">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span
                                key={supposedPlanPrice}
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0)" }}
                                exit={{
                                  opacity: 0,
                                  filter: "blur(4px)",
                                }}
                                transition={{ type: "spring", duration: 0.5 }}
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
                          <motion.p layout>
                            <Badge variant="success">
                              {(
                                (1 -
                                  (planPrice ?? 0) / (supposedPlanPrice ?? 0)) *
                                100
                              ).toFixed(0)}
                              % OFF
                            </Badge>
                          </motion.p>
                        </motion.div>
                      )}
                  </AnimatePresence>
                  <motion.p layout className="text-muted-foreground text-xs">
                    Billed monthly
                  </motion.p>
                </div>
                <motion.div layout className="flex flex-col gap-3">
                  <p className="font-bold text-xs uppercase">Credit bundles</p>
                  <p className="text-muted-foreground text-sm">
                    Choose a monthly credit bundle for your team, or move to
                    unlimited with a custom plan.
                  </p>
                </motion.div>
                <motion.div
                  layout
                  className="flex items-center justify-between text-primary"
                >
                  <p className="text-sm">Amount</p>
                  <div className="flex items-center gap-1">
                    <Button
                      className="w-9 rounded-full active:scale-95"
                      size="icon"
                      type="button"
                      onClick={() => handleChangePlan(planIndex - 1)}
                      disabled={planIndex === 0}
                      aria-label="Decrease amount"
                    >
                      <MdOutlineRemove aria-hidden="true" />
                    </Button>
                    <div className="w-8 text-center font-semibold">
                      {planAmount}
                    </div>
                    <Button
                      className="w-9 rounded-full active:scale-95"
                      size="icon"
                      type="button"
                      onClick={() => handleChangePlan(planIndex + 1)}
                      disabled={planIndex === PLANS.length - 1}
                      aria-label="Increase amount"
                    >
                      <MdOutlineAdd aria-hidden="true" />
                    </Button>
                  </div>
                </motion.div>
              </div>
              <motion.div layout className="flex flex-col gap-4">
                <div className="border-t border-border" />
                <Button
                  className="relative w-full self-end gap-0 overflow-hidden transition-all active:scale-[.99]"
                  type="button"
                  onClick={() =>
                    toastManager.add({
                      title: "Action triggered",
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
        </CardPanel>
      </Card>
      <AnimatePresence>
        {planIndex > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.1 } }}
            className="absolute right-4 -top-3"
          >
            <Badge>
              <MdOutlineDiamond aria-hidden="true" />
              Recommended
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PricingCard;

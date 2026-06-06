"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdOutlineCheck,
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentVerySatisfied,
} from "react-icons/md";
import { usePrevious } from "@uidotdev/usehooks";

import { cn } from "@/lib/utils";
import { toastManager } from "@/components/ui/toast";
import { Card, CardPanel } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { AnimatedHeight } from "./animated-height";

const SELECTION_STATES = {
  Unselected: -1,
  Low: 0,
  Adequate: 1,
  High: 2,
} as const;

export const SURVEY_OPTIONS: {
  value: SelectionState;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: 0,
    label: "Not great",
    icon: (
      <MdOutlineSentimentDissatisfied className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
    ),
  },
  {
    value: 1,
    label: "Okay",
    icon: (
      <MdOutlineCheck className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
    ),
  },
  {
    value: 2,
    label: "Loved it",
    icon: (
      <MdOutlineSentimentVerySatisfied className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
    ),
  },
];

type SelectionState = (typeof SELECTION_STATES)[keyof typeof SELECTION_STATES];

export const DynamicForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectionState>(
    SELECTION_STATES.Unselected,
  );
  const [reason, setReason] = useState<string>();

  const previousSelected = usePrevious(selected);
  const isUnselected = selected === SELECTION_STATES.Unselected;
  const isAdequate = selected === SELECTION_STATES.Adequate;

  const handleSelectOption = (option: SelectionState) => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setSelected(option);
  };

  const handleChangeReason = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReason(event.target.value);
  };

  return (
    <div className="w-fit max-w-full">
      <Card className="w-fit max-w-full">
        <CardPanel className="p-0">
          <AnimatedHeight padding="p-4">
            <div className="flex w-full flex-col gap-2">
              <h3 className="font-semibold text-sm">
                How was your experience with this page?
              </h3>
              <div className="flex justify-between gap-2">
                {SURVEY_OPTIONS?.map(({ label, value, icon }) => (
                  <Button
                    key={label}
                    variant={selected === value ? "default" : "ghost"}
                    onClick={() => handleSelectOption(value)}
                  >
                    <span aria-hidden="true">{icon}</span>
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <AnimatePresence initial={false} mode="popLayout">
                {!isUnselected && !isAdequate && (
                  <motion.div
                    layout
                    exit={{
                      opacity: 0,
                      scale: 0,
                    }}
                    className="mt-3 flex flex-col gap-2"
                  >
                    <motion.div
                      transition={{
                        type: "spring",
                        duration: 0.4,
                        bounce: 0.2,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                        transition: { delay: 0.05 },
                      }}
                    >
                      <Textarea
                        name="reason"
                        value={reason}
                        className="min-h-32"
                        placeholder={
                          selected === SELECTION_STATES.Low
                            ? "What could we improve?"
                            : "What stood out to you?"
                        }
                        onChange={handleChangeReason}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              {!isUnselected && (
                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    duration: 0.7,
                    bounce: 0.15,
                    delay:
                      previousSelected === SELECTION_STATES.Unselected &&
                      !isAdequate
                        ? 0.2
                        : 0,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(isAdequate && "mt-3")}
                >
                  <Button
                    className="w-full"
                    type="button"
                    onClick={() =>
                      toastManager.add({
                        title: "Action triggered",
                        description: "This is an example :)",
                      })
                    }
                  >
                    Submit
                  </Button>
                </motion.div>
              )}
            </div>
          </AnimatedHeight>
        </CardPanel>
      </Card>
    </div>
  );
};

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdOutlineCheck,
  MdOutlineSentimentDissatisfied,
  MdOutlineSentimentVerySatisfied,
} from "react-icons/md";
import { usePrevious } from "@uidotdev/usehooks";

import { toastManager } from "@/components/ui/toast";
import { Card, CardPanel } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { AnimatedHeight } from "./animated-height";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

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
    label: "Bad",
    icon: (
      <MdOutlineSentimentDissatisfied className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
    ),
  },
  {
    value: 1,
    label: "Good",
    icon: (
      <MdOutlineCheck className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
    ),
  },
  {
    value: 2,
    label: "Great",
    icon: (
      <MdOutlineSentimentVerySatisfied className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
    ),
  },
];

type SelectionState = (typeof SELECTION_STATES)[keyof typeof SELECTION_STATES];

export const DynamicForm = () => {
  const [selected, setSelected] = useState<SelectionState>(
    SELECTION_STATES.Unselected,
  );
  const [reason, setReason] = useState<string>();

  const previousSelected = usePrevious(selected);
  const isUnselected = selected === SELECTION_STATES.Unselected;
  const isAdequate = selected === SELECTION_STATES.Adequate;

  const handleSelectOption = (groupValue: string[]) => {
    const nextValue = groupValue[0];

    if (nextValue === undefined) {
      setSelected(SELECTION_STATES.Unselected);
      return;
    }

    setSelected(Number(nextValue) as SelectionState);
  };

  const handleChangeReason = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReason(event.target.value);
  };

  return (
    <div className="w-fit max-w-full">
      <Card className="w-72 max-w-full">
        <CardPanel className="p-0">
          <AnimatedHeight padding="p-4">
            <div className="flex w-full flex-col gap-4">
              <h3 className="text-base">How was your experience?</h3>

              <div className="flex flex-col gap-3">
                <ToggleGroup
                  aria-label="Experience feedback"
                  className="w-full"
                  value={isUnselected ? [] : [String(selected)]}
                  onValueChange={handleSelectOption}
                  variant="outline"
                >
                  {SURVEY_OPTIONS?.map(({ label, value, icon }) => (
                    <ToggleGroupItem
                      key={label}
                      className="flex-1"
                      value={String(value)}
                    >
                      <span aria-hidden="true">{icon}</span>
                      {label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>

                <AnimatePresence initial={false} mode="popLayout">
                  {!isUnselected && !isAdequate && (
                    <motion.div
                      layout
                      exit={{
                        opacity: 0,
                        scale: 0,
                      }}
                      className="flex flex-col gap-2"
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
            </div>
          </AnimatedHeight>
        </CardPanel>
      </Card>
    </div>
  );
};

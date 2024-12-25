"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdOutlineArrowDownward,
  MdOutlineArrowUpward,
  MdOutlineCheck,
} from "react-icons/md";
import { usePrevious } from "@uidotdev/usehooks";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
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
    label: "Low",
    icon: (
      <MdOutlineArrowDownward className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
    ),
  },
  {
    value: 1,
    label: "Adequate",
    icon: (
      <MdOutlineCheck className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
    ),
  },
  {
    value: 2,
    label: "High",
    icon: (
      <MdOutlineArrowUpward className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
    ),
  },
];

type SelectionState = (typeof SELECTION_STATES)[keyof typeof SELECTION_STATES];

export const DynamicForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectionState>(
    SELECTION_STATES.Unselected
  );

  const [amountString, setAmountString] = useState<string>();
  const [reason, setReason] = useState<string>();

  const previousSelected = usePrevious(selected);

  const { isUnselected, isAdequate } = useMemo(() => {
    return {
      isUnselected: selected === SELECTION_STATES.Unselected,
      isAdequate: selected === SELECTION_STATES.Adequate,
    };
  }, [selected]);

  const handleSelectOption = (option: SelectionState) => {
    if (!isOpen) {
      setIsOpen(true);
    }
    setSelected(option);
  };

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]|\$|,/g, "").trim();
    const valueAsNumber = parseInt(value, 10);
    if (valueAsNumber > 100_000_000_000) {
      return;
    }
    setAmountString(value);
  };

  const handleChangeReason = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReason(event.target.value);
  };

  return (
    <AnimatedHeight padding="p-3" className="rounded-2xl border bg-white">
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-semibold text-sm">
          What did you think of our quoted price?
        </h3>
        <div className="flex justify-between gap-2">
          {SURVEY_OPTIONS?.map(({ label, value, icon }) => (
            <Button
              key={label}
              variant={selected === value ? "default" : "ghost"}
              onClick={() => handleSelectOption(value)}
            >
              {icon}
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
              className="flex flex-col gap-2 mt-3"
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
                  transition: { delay: 0.1 },
                }}
              >
                <Input
                  name="amount"
                  value={amountString}
                  placeholder="What amount did you expect?"
                  onChange={handleChangeAmount}
                />
              </motion.div>
              <motion.div
                transition={{
                  type: "spring",
                  duration: 0.4,
                  bounce: 0.2,
                  delay: 0.1,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, transition: { delay: 0 } }}
              >
                <Textarea
                  name="reason"
                  value={reason}
                  className="min-h-32"
                  placeholder={`Why do you consider it to be ${SURVEY_OPTIONS[
                    selected
                  ]?.label.toLowerCase()}?`}
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
                previousSelected === SELECTION_STATES.Unselected && !isAdequate
                  ? 0.2
                  : 0,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(isAdequate && "mt-3")}
          >
            <Button
              className="w-full"
              onClick={() =>
                toast("Action triggered", {
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
  );
};

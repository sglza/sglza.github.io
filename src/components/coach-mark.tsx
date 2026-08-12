"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { DeploymentDetailsCard } from "@/components/deployment-details-card";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverSpotlight,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover-extension";
import { deploymentTourSteps } from "@/lib/deployment-tour";

export function CoachMark(): React.ReactElement {
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const logsRef = useRef<HTMLButtonElement | null>(null);
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const domainsRef = useRef<HTMLDivElement | null>(null);
  const visitRef = useRef<HTMLButtonElement | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [tourOpen, setTourOpen] = useState(false);

  const targetRefs = [
    statusRef,
    domainsRef,
    sourceRef,
    logsRef,
    visitRef,
  ] as const;
  const step = deploymentTourSteps[stepIndex];
  const isLastStep = stepIndex === deploymentTourSteps.length - 1;

  return (
    <div className="relative flex min-h-80 w-full flex-col px-4 pt-16 pb-4">
      <Popover
        modal
        onOpenChange={setTourOpen}
        onOpenChangeComplete={(open) => {
          if (!open) {
            startButtonRef.current?.focus();
          }
        }}
        open={tourOpen}
      >
        <PopoverTrigger
          className="absolute top-4 left-4"
          onClick={() => setStepIndex(0)}
          ref={startButtonRef}
          render={<Button size="sm" />}
        >
          <PlayIcon aria-hidden="true" />
          Start tour
        </PopoverTrigger>

        <DeploymentDetailsCard
          className="my-auto"
          targetRefs={{
            domains: domainsRef,
            logs: logsRef,
            source: sourceRef,
            status: statusRef,
            visit: visitRef,
          }}
        />

        <PopoverSpotlight
          className="transition-[clip-path,opacity] duration-250 ease-in-out motion-reduce:transition-none"
          halo
          haloClassName="duration-250 ease-in-out motion-reduce:transition-none"
          padding={step.padding}
          radius={step.radius}
          targetRef={targetRefs[stepIndex]}
        />
        <PopoverPopup
          align={step.align}
          anchor={targetRefs[stepIndex]}
          className="w-72 duration-250 ease-in-out motion-reduce:transition-none"
          positionerClassName="duration-250 ease-in-out motion-reduce:transition-none"
          side={step.side}
          sideOffset={12 + step.padding}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Step {stepIndex + 1} of {deploymentTourSteps.length}
              </p>
              <PopoverTitle>{step.title}</PopoverTitle>
              <PopoverDescription>{step.description}</PopoverDescription>
            </div>
            <div className="flex items-center justify-between gap-3">
              <PopoverClose render={<Button size="sm" variant="ghost" />}>
                Skip
              </PopoverClose>
              <div className="flex items-center gap-1">
                {stepIndex > 0 ? (
                  <Button
                    onClick={() => setStepIndex((index) => index - 1)}
                    size="sm"
                    variant="ghost"
                  >
                    <ChevronLeftIcon aria-hidden="true" />
                    Back
                  </Button>
                ) : null}
                {isLastStep ? (
                  <PopoverClose render={<Button size="sm" />}>
                    Finish
                  </PopoverClose>
                ) : (
                  <Button
                    onClick={() => setStepIndex((index) => index + 1)}
                    size="sm"
                  >
                    Next
                    <ChevronRightIcon aria-hidden="true" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </PopoverPopup>
      </Popover>
      <p className="mt-3 text-center text-muted-foreground text-xs">
        Click the &quot;Start tour&quot; button to see this example.
      </p>
    </div>
  );
}

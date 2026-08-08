"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Clock3Icon,
  ExternalLinkIcon,
  EyeIcon,
  GitBranchIcon,
  GitCommitHorizontalIcon,
  ListIcon,
  PlayIcon,
  Share2Icon,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverSpotlight,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover-extension";

const tourSteps = [
  {
    align: "start",
    description:
      "Check that the latest deployment finished successfully before reviewing the details.",
    key: "status",
    padding: 8,
    radius: 8,
    side: "bottom",
    title: "Confirm deployment status",
  },
  {
    align: "start",
    description:
      "Use the generated domain for this preview or the stable project domain shared by deployments.",
    key: "domains",
    padding: 8,
    radius: 8,
    side: "top",
    title: "Find the deployment URLs",
  },
  {
    align: "start",
    description:
      "Review the branch and commit to confirm exactly which changes were deployed.",
    key: "source",
    padding: 8,
    radius: 8,
    side: "top",
    title: "Verify the source",
  },
  {
    align: "center",
    description:
      "Open the build output to inspect each step or troubleshoot a failed deployment.",
    key: "logs",
    padding: 0,
    radius: 10,
    side: "bottom",
    title: "Inspect the build logs",
  },
  {
    align: "end",
    description:
      "Open the latest preview in a new tab and verify the deployed changes firsthand.",
    key: "visit",
    padding: 0,
    radius: 10,
    side: "bottom",
    title: "Visit the preview",
  },
] as const;

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
  const step = tourSteps[stepIndex];
  const isLastStep = stepIndex === tourSteps.length - 1;

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

        <Card className="my-auto w-full max-w-3xl self-center overflow-hidden rounded-xl">
          <div className="flex flex-col gap-3 border-b px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-semibold text-sm">Deployment details</p>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Share2Icon aria-hidden="true" />
                Share
              </Button>
              <Button ref={logsRef} size="sm" variant="outline">
                <ListIcon aria-hidden="true" />
                Logs
              </Button>
              <Button ref={visitRef} size="sm">
                <ExternalLinkIcon aria-hidden="true" />
                Visit
              </Button>
            </div>
          </div>

          <CardPanel className="p-4 pt-4">
            <dl className="grid content-start grid-cols-2 gap-x-5 gap-y-5 text-sm sm:grid-cols-4">
              <div className="flex min-w-0 flex-col gap-1.5">
                <dt className="text-muted-foreground">Created</dt>
                <dd className="flex min-w-0 items-center gap-2">
                  <Avatar className="size-5">
                    <AvatarImage
                      alt="sglza's GitHub avatar"
                      src="https://github.com/sglza.png?size=64"
                    />
                    <AvatarFallback className="text-[.625rem]">
                      SG
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate font-medium">sglza</span>
                  <span className="shrink-0 text-muted-foreground">4m ago</span>
                </dd>
              </div>
              <div
                className="flex min-w-0 flex-col gap-1.5 rounded-md"
                ref={statusRef}
              >
                <dt className="text-muted-foreground">Status</dt>
                <dd className="flex items-center gap-2">
                  <span className="size-2 shrink-0 rounded-full bg-success" />
                  <span className="font-medium">Ready</span>
                  <span className="text-muted-foreground">Latest</span>
                </dd>
              </div>
              <div className="flex min-w-0 flex-col gap-1.5">
                <dt className="text-muted-foreground">Duration</dt>
                <dd className="flex items-center gap-2">
                  <Clock3Icon
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                  <span className="font-medium">42s</span>
                </dd>
              </div>
              <div className="flex min-w-0 flex-col gap-1.5">
                <dt className="text-muted-foreground">Environment</dt>
                <dd className="flex items-center gap-2">
                  <EyeIcon
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                  <span className="font-medium">Preview</span>
                </dd>
              </div>
              <div
                className="col-span-2 flex min-w-0 flex-col gap-1.5 rounded-md"
                ref={domainsRef}
              >
                <dt className="text-muted-foreground">Domains</dt>
                <dd className="flex min-w-0 flex-col gap-1.5 text-xs">
                  <span className="flex min-w-0 items-center gap-2">
                    <GitBranchIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground"
                    />
                    <span className="truncate">sglza.xyz</span>
                  </span>
                  <span className="flex min-w-0 items-center gap-2">
                    <GitCommitHorizontalIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground"
                    />
                    <span className="truncate">sglza.github.io</span>
                  </span>
                </dd>
              </div>
              <div
                className="col-span-2 flex min-w-0 flex-col gap-1.5 rounded-md"
                ref={sourceRef}
              >
                <dt className="text-muted-foreground">Source</dt>
                <dd className="flex min-w-0 flex-col gap-1.5 font-mono text-xs">
                  <span className="flex min-w-0 items-center gap-2">
                    <GitBranchIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground"
                    />
                    <span className="truncate">feat/popover-coach-mark</span>
                  </span>
                  <span className="flex min-w-0 items-center gap-2">
                    <GitCommitHorizontalIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground"
                    />
                    <span className="truncate">
                      a3f91c2 Add popover coach mark example
                    </span>
                  </span>
                </dd>
              </div>
            </dl>
          </CardPanel>
        </Card>

        <PopoverSpotlight
          halo
          padding={step.padding}
          radius={step.radius}
          targetRef={targetRefs[stepIndex]}
        />
        <PopoverPopup
          align={step.align}
          anchor={targetRefs[stepIndex]}
          className="w-72"
          side={step.side}
          sideOffset={12 + step.padding}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Step {stepIndex + 1} of {tourSteps.length}
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

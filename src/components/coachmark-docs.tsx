"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { CheckIcon, CircleDashedIcon, CopyIcon } from "lucide-react";
import { FaGithub, FaMarkdown } from "react-icons/fa6";
import { Coachmark } from "coachmark";

import { DeploymentDetailsCard } from "@/components/deployment-details-card";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider, SliderValue } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import {
  BASIC_SOURCE,
  CSS_MODULE_BASIC_SOURCE,
  CSS_MODULE_FADE_SOURCE,
  CSS_MODULE_MOVE_SOURCE,
  CSS_MODULE_SOURCE,
  CSS_MODULE_VIEWPORT_SOURCE,
  DEFAULT_PLAYGROUND_CONFIG,
  FADE_SOURCE,
  MOVE_SOURCE,
  VIEWPORT_CONFIG,
  VIEWPORT_SOURCE,
  createPlaygroundSource,
  type PlaygroundConfig,
  type StylingMode,
  type TourMotion,
} from "@/lib/coachmark-docs";
import { deploymentTourSteps } from "@/lib/deployment-tour";
import tourStyles from "./coachmark-tour.module.css";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

const CodeViewer = dynamic(
  () =>
    import("@/components/coachmark-code-viewer").then(
      (module) => module.CoachmarkCodeViewer,
    ),
  {
    loading: () => (
      <div
        aria-hidden="true"
        className="h-136 animate-pulse rounded-xl border bg-muted/50 motion-reduce:animate-none"
      />
    ),
    ssr: false,
  },
);

const sections = [
  ["getting-started", "Getting started"],
  ["animating-the-coach-marks", "Animating the coach marks"],
  ["detached-triggers", "Detached triggers"],
  ["animating-the-content", "Animating the content"],
  ["out-of-view-targets", "Out of view targets"],
  ["playground", "Playground"],
] as const;

const transitionOptions = [
  { label: "None", value: "none" },
  { label: "Fade", value: "fade" },
  { label: "Move", value: "move" },
] as const;

const sideOptions = [
  { label: "Auto", value: "auto" },
  { label: "Top", value: "top" },
  { label: "Right", value: "right" },
  { label: "Bottom", value: "bottom" },
  { label: "Left", value: "left" },
] as const;

const alignOptions = [
  { label: "Auto", value: "auto" },
  { label: "Start", value: "start" },
  { label: "Center", value: "center" },
  { label: "End", value: "end" },
] as const;

const installCommands = {
  bun: "bun add coachmark",
  npm: "npm install coachmark",
  pnpm: "pnpm add coachmark",
  yarn: "yarn add coachmark",
} as const;

type SectionId = "introduction" | (typeof sections)[number][0];
type PackageManager = keyof typeof installCommands;

export function CoachmarkDocs() {
  const [stylingMode, setStylingMode] = useState<StylingMode>("tailwind");
  const [activeSection, setActiveSection] = useState<SectionId>("introduction");
  const [showSidebarTitle, setShowSidebarTitle] = useState(false);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heroTitle = heroTitleRef.current;
    if (!heroTitle) return;

    const titleObserver = new IntersectionObserver(
      ([entry]) => setShowSidebarTitle(!entry.isIntersecting),
      { threshold: 0 },
    );
    titleObserver.observe(heroTitle);

    return () => titleObserver.disconnect();
  }, []);

  useEffect(() => {
    const sectionElements = ["introduction", ...sections.map(([id]) => id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) -
              Math.abs(second.boundingClientRect.top),
          )[0];

        if (activeEntry) {
          setActiveSection(activeEntry.target.id as SectionId);
        }
      },
      { rootMargin: "-18% 0px -72% 0px" },
    );

    sectionElements.forEach((section) => sectionObserver.observe(section));
    return () => sectionObserver.disconnect();
  }, []);

  return (
    <div className="min-h-dvh bg-background">
      <PageHeader backHref="/" backLabel="Home" />
      <main className="mx-auto w-full max-w-7xl px-4 pt-10 pb-24 sm:px-8 sm:pt-14 lg:px-12">
        <div className="xl:grid xl:grid-cols-[11rem_minmax(0,48rem)] xl:justify-center xl:gap-12 2xl:gap-16">
          <aside className="hidden xl:block">
            <nav
              aria-label="On this page"
              className="sticky top-28 text-xs leading-7 text-muted-foreground"
            >
              <a
                aria-current={
                  activeSection === "introduction" ? "location" : undefined
                }
                aria-hidden={!showSidebarTitle}
                className={cn(
                  "mb-2 block transition-opacity duration-150 ease-out motion-reduce:transition-none",
                  activeSection === "introduction" &&
                    "font-medium text-foreground",
                  showSidebarTitle
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
                )}
                href="#"
                onClick={(event) => handleIndexClick(event)}
                tabIndex={showSidebarTitle ? undefined : -1}
              >
                Coachmark
              </a>
              <ul>
                {sections.map(([id, label]) => (
                  <li key={id}>
                    <a
                      aria-current={
                        activeSection === id ? "location" : undefined
                      }
                      className={cn(
                        "block transition-colors duration-150 ease hover:text-foreground motion-reduce:transition-none",
                        activeSection === id && "font-medium text-foreground",
                      )}
                      href={`#${id}`}
                      onClick={(event) => handleIndexClick(event, id)}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="mx-auto min-w-0 max-w-3xl xl:mx-0">
            <header id="introduction" className="scroll-mt-10">
              <h1
                className="text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-5xl"
                ref={heroTitleRef}
              >
                Coachmark
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-xl leading-8 text-muted-foreground sm:text-2xl sm:leading-9">
                An accessible, unstyled React primitive for product tours, built
                on top of Base UI.
              </p>
              <p className="mt-6 max-w-2xl text-pretty leading-7">
                When I looked for a way to build product tours, I couldn&apos;t
                find anything that fit my needs. <br /> So I built Coachmark.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <Button
                  render={
                    <a
                      href="https://github.com/sglza/coachmark"
                      rel="noopener noreferrer"
                      target="_blank"
                    />
                  }
                  variant="outline"
                >
                  <FaGithub aria-hidden="true" />
                  GitHub
                </Button>
                <Button render={<a href="/coachmark.md" />} variant="outline">
                  <FaMarkdown aria-hidden="true" />
                  View as Markdown
                </Button>
              </div>
            </header>

            <ArticleDivider />

            <section className="scroll-mt-10" id="getting-started">
              <h2 className="text-balance text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                Getting started
              </h2>
              <p className="mt-4 max-w-2xl text-pretty leading-7 text-muted-foreground">
                To get started you just need to add Coachmark to your React
                project.
              </p>

              <div className="mt-4 space-y-5">
                <InstallCommand />
                <p className="mt-8 max-w-2xl text-pretty leading-7 text-muted-foreground">
                  The composition of Coachmark is very similar to that of the
                  Popover in Base UI, and it&apos;s no coincidence. But
                  you&apos;ll also notice there are a couple of extra parts to
                  the component anatomy, like{" "}
                  <InlineCode>Coachmark.Step</InlineCode> and{" "}
                  <InlineCode>Coachmark.Stepper</InlineCode>. These exist
                  because unlike a regular Popover, a product tour requires an
                  explicit order and continuity.
                  <br />
                  <br /> Here&apos;s a basic example:
                </p>
                <TourDemo
                  config={{
                    arrow: false,
                    backdrop: true,
                    motion: "none",
                    side: "auto",
                    viewport: false,
                  }}
                  label="Basic coachmark tour"
                  stylingMode={stylingMode}
                />
                <ExampleCode
                  cssSource={CSS_MODULE_BASIC_SOURCE}
                  onStylingModeChange={setStylingMode}
                  stylingMode={stylingMode}
                  tailwindSource={BASIC_SOURCE}
                />
              </div>
            </section>

            <ArticleDivider />

            <section className="scroll-mt-10" id="animating-the-coach-marks">
              <h2 className="text-balance text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                Animating the coach marks
              </h2>
              <p className="mt-4 max-w-2xl text-pretty leading-7 text-muted-foreground">
                Coachmark exposes motion states on the backdrop, positioner, and
                popup. Use those data attributes to define enter, exit, and step
                transitions. This example uses opacity.
              </p>
              <div className="mt-8 space-y-5">
                <TourDemo
                  config={{
                    arrow: false,
                    backdrop: true,
                    motion: "fade",
                    side: "auto",
                    viewport: false,
                  }}
                  label="Fading coachmark tour"
                  stylingMode={stylingMode}
                />
                <ExampleCode
                  cssPreviousSource={CSS_MODULE_BASIC_SOURCE}
                  cssSource={CSS_MODULE_FADE_SOURCE}
                  onStylingModeChange={setStylingMode}
                  stylingMode={stylingMode}
                  tailwindPreviousSource={BASIC_SOURCE}
                  tailwindSource={FADE_SOURCE}
                />
              </div>
            </section>

            <ArticleDivider />

            <section className="scroll-mt-10" id="detached-triggers">
              <h2 className="text-balance text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                Detached triggers
              </h2>
              <p className="mt-4 max-w-2xl text-pretty leading-7 text-muted-foreground">
                This is probably why you&apos;re here. This is also the main
                thing that I was searching for when looking at existing
                solutions, and it&apos;s arguably the main reason why I built
                this on top of Base UI. Each step provides a target ref to the
                positioner. Coachmark forwards the active target to Base
                UI&apos;s anchor prop, allowing the same popup to smoothly
                reposition when the step changes.
              </p>
              <div className="mt-8 space-y-5">
                <TourDemo
                  config={{
                    arrow: false,
                    backdrop: true,
                    motion: "move",
                    side: "auto",
                    viewport: false,
                  }}
                  label="Moving coachmark tour"
                  stylingMode={stylingMode}
                />
                <ExampleCode
                  cssPreviousSource={CSS_MODULE_FADE_SOURCE}
                  cssSource={CSS_MODULE_MOVE_SOURCE}
                  onStylingModeChange={setStylingMode}
                  stylingMode={stylingMode}
                  tailwindPreviousSource={FADE_SOURCE}
                  tailwindSource={MOVE_SOURCE}
                />
              </div>
            </section>

            <ArticleDivider />

            <section className="scroll-mt-10" id="animating-the-content">
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Animating the content
              </h2>
              <p className="mt-4 max-w-2xl text-pretty leading-7 text-muted-foreground">
                <InlineCode>Coachmark.Viewport</InlineCode>
                {"  "}extends Base UI&apos;s{" "}
                <InlineCode>Popover.Viewport</InlineCode>
                {"  "} which allows us to create content transitions between
                steps. It&apos;s only really needed for displaying content
                transitions.
              </p>
              <div className="mt-8 space-y-5">
                <TourDemo
                  config={VIEWPORT_CONFIG}
                  label="Content-transitioning coachmark tour"
                  stylingMode={stylingMode}
                />
                <ExampleCode
                  cssPreviousSource={CSS_MODULE_MOVE_SOURCE}
                  cssSource={CSS_MODULE_VIEWPORT_SOURCE}
                  onStylingModeChange={setStylingMode}
                  stylingMode={stylingMode}
                  tailwindPreviousSource={MOVE_SOURCE}
                  tailwindSource={VIEWPORT_SOURCE}
                />
              </div>
            </section>

            <ArticleDivider />

            <section className="scroll-mt-10" id="out-of-view-targets">
              <h2 className="text-balance text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                Out of view targets
              </h2>
              <p className="mt-4 max-w-2xl text-pretty leading-7 text-muted-foreground">
                It&apos;s not recommended to include targets that are out of
                view because it can be disorienting to the user. That being
                said, it&apos;s a situation that Coachmark handles automatically
                for you. When the next target is outside the visible area, the
                current coach mark is concealed, the next target is scrolled
                into view, and the next step is shown. This works with the page
                as well as nested scroll containers. You can use the{" "}
                <InlineCode>scrollIntoView</InlineCode> prop to modify the
                scroll behavior or disable it to make it instant.
              </p>
              <div className="mt-8">
                <OffscreenTargetsDemo stylingMode={stylingMode} />
              </div>
            </section>

            <ArticleDivider />

            <PlaygroundSection
              onStylingModeChange={setStylingMode}
              stylingMode={stylingMode}
            />
          </article>
        </div>
      </main>
    </div>
  );
}

function handleIndexClick(
  event: MouseEvent<HTMLAnchorElement>,
  targetId?: string,
) {
  if (
    event.button !== 0 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  ) {
    return;
  }

  event.preventDefault();
  const shouldSkipMotion =
    event.detail === 0 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!targetId) {
    window.scrollTo({
      behavior: shouldSkipMotion ? "auto" : "smooth",
      top: 0,
    });
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    return;
  }

  const target = document.getElementById(targetId);
  if (!target) return;

  target.scrollIntoView({
    behavior: shouldSkipMotion ? "auto" : "smooth",
    block: "start",
  });
  window.history.pushState(null, "", `#${targetId}`);
}

function ExampleCode({
  cssPreviousSource,
  cssSource,
  onStylingModeChange,
  stylingMode,
  tailwindPreviousSource,
  tailwindSource,
}: {
  cssPreviousSource?: string;
  cssSource: string;
  onStylingModeChange: (mode: StylingMode) => void;
  stylingMode: StylingMode;
  tailwindPreviousSource?: string;
  tailwindSource: string;
}) {
  const files =
    stylingMode === "css-modules"
      ? [
          {
            code: cssSource,
            filename: "tour.tsx",
            previousCode: cssPreviousSource,
          },
          {
            code: CSS_MODULE_SOURCE,
            filename: "tour.module.css",
          },
        ]
      : [
          {
            code: tailwindSource,
            filename: "tour.tsx",
            previousCode: tailwindPreviousSource,
          },
        ];

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm font-medium">Implementation</p>
        <StylingModeControl
          onChange={onStylingModeChange}
          value={stylingMode}
        />
      </div>
      <CodeViewer files={files} />
    </div>
  );
}

function StylingModeControl({
  onChange,
  value,
}: {
  onChange: (mode: StylingMode) => void;
  value: StylingMode;
}) {
  return (
    <ToggleGroup
      aria-label="Code styling approach"
      onValueChange={(values) => {
        const nextValue = values[0] as StylingMode | undefined;
        if (nextValue) onChange(nextValue);
      }}
      size="sm"
      value={[value]}
      variant="outline"
    >
      <ToggleGroupItem value="tailwind">Tailwind</ToggleGroupItem>
      <ToggleGroupItem value="css-modules">CSS Modules</ToggleGroupItem>
    </ToggleGroup>
  );
}

function PlaygroundSection({
  onStylingModeChange,
  stylingMode,
}: {
  onStylingModeChange: (mode: StylingMode) => void;
  stylingMode: StylingMode;
}) {
  const [config, setConfig] = useState(DEFAULT_PLAYGROUND_CONFIG);
  const source = useMemo(
    () => createPlaygroundSource(config, stylingMode),
    [config, stylingMode],
  );
  const files = useMemo(
    () =>
      stylingMode === "css-modules"
        ? [
            {
              code: source,
              filename: "tour.tsx",
              previousCode: CSS_MODULE_VIEWPORT_SOURCE,
            },
            {
              code: CSS_MODULE_SOURCE,
              filename: "tour.module.css",
            },
          ]
        : [
            {
              code: source,
              filename: "tour.tsx",
              previousCode: VIEWPORT_SOURCE,
            },
          ],
    [source, stylingMode],
  );
  const update = <Key extends keyof PlaygroundConfig>(
    key: Key,
    value: PlaygroundConfig[Key],
  ) => setConfig((current) => ({ ...current, [key]: value }));

  return (
    <section id="playground" className="scroll-mt-10">
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
        Playground
      </h2>
      <p className="mt-4 max-w-2xl text-pretty leading-7 text-muted-foreground">
        The goal of Coachmark is for you to make it your own. Below are some
        controls for you to get a feel of what you could do with it.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border bg-muted/25">
        <div className="grid gap-5 border-b p-4 sm:grid-cols-3">
          <PlaygroundSelectControl
            items={transitionOptions}
            label="Transition"
            onChange={(value) => update("motion", value)}
            value={config.motion}
          />
          <PlaygroundSelectControl
            items={sideOptions}
            label="Side"
            onChange={(value) => update("side", value)}
            value={config.side}
          />
          <PlaygroundSelectControl
            items={alignOptions}
            label="Align"
            onChange={(value) => update("align", value)}
            value={config.align ?? "auto"}
          />
          <div className="grid gap-5 sm:col-span-3 sm:grid-cols-2">
            <PlaygroundSliderControl
              label="Side offset"
              max={64}
              min={-64}
              onChange={(value) => update("sideOffset", value)}
              value={config.sideOffset ?? 0}
            />
            <PlaygroundSliderControl
              label="Align offset"
              max={64}
              min={-64}
              onChange={(value) => update("alignOffset", value)}
              value={config.alignOffset ?? 0}
            />
            <PlaygroundSliderControl
              label="Padding"
              max={48}
              min={0}
              onChange={(value) => update("padding", value)}
              value={config.padding ?? 0}
            />
            <PlaygroundSliderControl
              label="Radius"
              max={48}
              min={0}
              onChange={(value) => update("radius", value)}
              value={config.radius ?? 0}
            />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 sm:col-span-3">
            <SwitchControl
              checked={config.backdrop}
              label="Spotlight"
              onCheckedChange={(checked) => update("backdrop", checked)}
            />
            <SwitchControl
              checked={config.arrow}
              label="Arrow"
              onCheckedChange={(checked) => update("arrow", checked)}
            />
            <SwitchControl
              checked={config.viewport}
              disabled={config.motion !== "move"}
              label="Viewport transition"
              onCheckedChange={(checked) => update("viewport", checked)}
            />
          </div>
        </div>
        <TourDemo
          config={config}
          label="Interactive coachmark playground"
          stylingMode={stylingMode}
        />
      </div>

      <div className="mt-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <p className="text-sm font-medium">Live diff</p>
          <StylingModeControl
            onChange={onStylingModeChange}
            value={stylingMode}
          />
        </div>
        <CodeViewer files={files} />
      </div>
    </section>
  );
}

const deploymentActivity = [
  {
    detail: "Commit a3f91c2 received",
    key: "queued",
    label: "Deployment queued",
    status: "complete",
    time: "10:42:04",
  },
  {
    detail: "Build machine assigned",
    key: "assigned",
    label: "Build initialized",
    status: "complete",
    time: "10:42:07",
  },
  {
    detail: "Dependencies restored from cache",
    key: "dependencies",
    label: "Dependencies installed",
    status: "complete",
    time: "10:42:11",
  },
  {
    detail: "Next.js production build",
    key: "building",
    label: "Application built",
    status: "complete",
    time: "10:42:29",
  },
  {
    detail: "12 of 18 assets uploaded",
    key: "assets",
    label: "Uploading outputs",
    status: "running",
    time: "18s elapsed",
  },
  {
    detail: "Waiting for outputs",
    key: "propagating",
    label: "Propagate deployment",
    status: "pending",
  },
  {
    detail: "Available after propagation",
    key: "ready",
    label: "Deployment ready",
    status: "pending",
  },
] as const;

function DeploymentStatusBadge({
  status,
}: {
  status: (typeof deploymentActivity)[number]["status"];
}) {
  if (status === "complete") {
    return (
      <Badge size="sm" variant="success">
        Done
      </Badge>
    );
  }

  if (status === "running") {
    return (
      <Badge size="sm" variant="warning">
        Pending
      </Badge>
    );
  }

  return (
    <Badge size="sm" variant="secondary">
      <CircleDashedIcon aria-hidden="true" />
      Queued
    </Badge>
  );
}

function OffscreenTargetsDemo({ stylingMode }: { stylingMode: StylingMode }) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const queuedRef = useRef<HTMLLIElement>(null);
  const readyRef = useRef<HTMLLIElement>(null);
  const targetRefs = {
    queued: queuedRef,
    ready: readyRef,
  };
  const steps = [
    {
      description:
        "The first target is already visible at the top of the activity log.",
      key: "queued",
      title: "Deployment queued",
    },
    {
      description:
        "This target started outside the scroll area. Coachmark scrolled it into view before positioning this step.",
      key: "ready",
      title: "Deployment ready",
    },
  ] as const;

  const resetScrollPosition = () => {
    scrollAreaRef.current
      ?.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]')
      ?.scrollTo({ top: 0 });
  };

  return (
    <div
      aria-label="Offscreen target coachmark tour"
      className="relative p-4 sm:p-6"
    >
      <Coachmark.Root
        key={stylingMode}
        scrollIntoView={{ behavior: "smooth", block: "center" }}
      >
        <div className="mb-3 flex items-center">
          <Coachmark.Trigger
            onClick={resetScrollPosition}
            render={<Button size="sm" />}
          >
            Start tour
          </Coachmark.Trigger>
        </div>

        <Coachmark.Backdrop className={getBackdropClass("move", stylingMode)} />

        {steps.map((step) => (
          <Coachmark.Step
            key={step.key}
            spotlightPadding={4}
            spotlightRadius={14}
            target={targetRefs[step.key]}
          >
            <Coachmark.Positioner
              align="center"
              className={getPositionerClass("move", false, stylingMode)}
              side="right"
              sideOffset={16}
            >
              <Coachmark.Popup
                className={getPopupClass("move", false, "compact", stylingMode)}
              >
                <TourContent
                  arrow={false}
                  description={step.description}
                  stylingMode={stylingMode}
                  title={step.title}
                  viewport={false}
                />
              </Coachmark.Popup>
            </Coachmark.Positioner>
          </Coachmark.Step>
        ))}

        <div className="overflow-hidden rounded-xl border bg-muted/25">
          <div className="flex items-center justify-between gap-4 border-b px-4 py-3">
            <p className="min-w-0 truncate text-sm font-medium">
              Deployment activity
            </p>
          </div>
          <ScrollArea className="h-72" ref={scrollAreaRef} scrollbarGutter>
            <ol className="flex flex-col gap-2 p-4">
              {deploymentActivity.map((activity) => {
                const targetRef =
                  activity.key === "queued"
                    ? queuedRef
                    : activity.key === "ready"
                      ? readyRef
                      : undefined;

                return (
                  <li
                    className={cn(
                      "flex min-h-16 items-start justify-between gap-4 rounded-lg border bg-background p-3",
                      activity.status === "running" &&
                        "border-info/24 bg-info/4",
                      activity.status === "pending" && "bg-muted/30",
                    )}
                    key={activity.key}
                    ref={targetRef}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{activity.label}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {activity.detail}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <DeploymentStatusBadge status={activity.status} />
                      {"time" in activity ? (
                        activity.status === "complete" ? (
                          <time
                            className="font-mono text-[11px] tabular-nums text-muted-foreground"
                            dateTime={activity.time}
                          >
                            {activity.time}
                          </time>
                        ) : (
                          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                            {activity.time}
                          </span>
                        )
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </ScrollArea>
        </div>
      </Coachmark.Root>
    </div>
  );
}

function TourDemo({
  config,
  label,
  stylingMode,
}: {
  config: PlaygroundConfig;
  label: string;
  stylingMode: StylingMode;
}) {
  const statusRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLButtonElement>(null);
  const visitRef = useRef<HTMLButtonElement>(null);
  const viewportEnabled = config.motion === "move" && config.viewport;
  const targetRefs = {
    domains: domainsRef,
    logs: logsRef,
    source: sourceRef,
    status: statusRef,
    visit: visitRef,
  };

  return (
    <div className="relative p-4 sm:p-6" aria-label={label}>
      <Coachmark.Root key={JSON.stringify([config, stylingMode])}>
        <div className="mb-3 flex items-center">
          <Coachmark.Trigger render={<Button size="sm" />}>
            Start tour
          </Coachmark.Trigger>
        </div>

        {config.backdrop ? (
          <Coachmark.Backdrop
            className={getBackdropClass(config.motion, stylingMode)}
          />
        ) : null}

        {deploymentTourSteps.map((step) => (
          <Coachmark.Step
            key={step.key}
            spotlightPadding={config.padding ?? step.padding}
            spotlightRadius={config.radius ?? step.radius}
            target={targetRefs[step.key]}
          >
            <Coachmark.Positioner
              align={
                config.align === undefined || config.align === "auto"
                  ? step.align
                  : config.align
              }
              alignOffset={config.alignOffset}
              className={getPositionerClass(
                config.motion,
                viewportEnabled,
                stylingMode,
              )}
              side={config.side === "auto" ? step.side : config.side}
              sideOffset={config.sideOffset ?? 12 + step.padding}
            >
              <Coachmark.Popup
                className={getPopupClass(
                  config.motion,
                  viewportEnabled,
                  step.size,
                  stylingMode,
                )}
              >
                <TourContent
                  arrow={config.arrow}
                  description={step.description}
                  title={step.title}
                  viewport={viewportEnabled}
                  stylingMode={stylingMode}
                />
              </Coachmark.Popup>
            </Coachmark.Positioner>
          </Coachmark.Step>
        ))}

        <DeploymentDetailsCard targetRefs={targetRefs} />
      </Coachmark.Root>
    </div>
  );
}

function TourContent({
  arrow,
  description,
  stylingMode,
  title,
  viewport,
}: {
  arrow: boolean;
  description: string;
  stylingMode: StylingMode;
  title: string;
  viewport: boolean;
}) {
  const content = (
    <div
      className={
        stylingMode === "css-modules" ? tourStyles.Content : "grid gap-3"
      }
    >
      <Coachmark.Stepper
        className={
          stylingMode === "css-modules"
            ? tourStyles.Stepper
            : "text-[0.68rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase"
        }
      >
        {({ stepCount, stepIndex }) => `Step ${stepIndex + 1} of ${stepCount}`}
      </Coachmark.Stepper>
      <div className="grid gap-1.5">
        <Coachmark.Title
          className={
            stylingMode === "css-modules"
              ? tourStyles.Title
              : "text-base font-semibold"
          }
        >
          {title}
        </Coachmark.Title>
        <Coachmark.Description
          className={
            stylingMode === "css-modules"
              ? tourStyles.Description
              : "text-sm leading-5 text-muted-foreground"
          }
        >
          {description}
        </Coachmark.Description>
      </div>
      <div
        className={
          stylingMode === "css-modules"
            ? tourStyles.Actions
            : "mt-1 flex items-center justify-between gap-3"
        }
      >
        <Coachmark.Close render={<Button size="sm" variant="ghost" />}>
          Skip
        </Coachmark.Close>
        <div
          className={
            stylingMode === "css-modules"
              ? tourStyles.Navigation
              : "flex items-center gap-1"
          }
        >
          <Coachmark.Previous render={<Button size="sm" variant="ghost" />}>
            Back
          </Coachmark.Previous>
          <Coachmark.Next render={<Button size="sm" />}>
            {({ isLastStep }) => (isLastStep ? "Finish" : "Next")}
          </Coachmark.Next>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {arrow ? (
        <Coachmark.Arrow
          className={
            stylingMode === "css-modules" ? tourStyles.Arrow : arrowClassName
          }
        />
      ) : null}
      {viewport ? (
        <Coachmark.Viewport
          className={
            stylingMode === "css-modules"
              ? tourStyles.Viewport
              : viewportClassName
          }
        >
          {content}
        </Coachmark.Viewport>
      ) : (
        content
      )}
    </>
  );
}

function SwitchControl({
  checked,
  disabled = false,
  label,
  onCheckedChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-2 text-sm",
        disabled && "text-muted-foreground",
      )}
    >
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
      {label}
    </label>
  );
}

function PlaygroundSelectControl<Value extends string>({
  items,
  label,
  onChange,
  value,
}: {
  items: readonly { label: string; value: Value }[];
  label: string;
  onChange: (value: Value) => void;
  value: Value;
}) {
  return (
    <div>
      <span className="mb-2 block text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <Select
        aria-label={label}
        items={items}
        onValueChange={(nextValue) => onChange(nextValue as Value)}
        value={value}
      >
        <SelectTrigger size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  );
}

function PlaygroundSliderControl({
  label,
  max,
  min,
  onChange,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <Slider
      aria-label={label}
      max={max}
      min={min}
      onValueChange={(nextValue) =>
        onChange(Array.isArray(nextValue) ? nextValue[0] : nextValue)
      }
      value={value}
    >
      <div className="mb-2 flex items-center justify-between gap-2 text-xs font-medium text-muted-foreground">
        <span>{label}</span>
        <SliderValue />
      </div>
    </Slider>
  );
}

function InstallCommand() {
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");
  const [copied, setCopied] = useState(false);
  const command = installCommands[packageManager];
  const copy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium">Install</p>
        <ToggleGroup
          aria-label="Package manager"
          onValueChange={(values) => {
            const nextPackageManager = values[0] as PackageManager | undefined;
            if (nextPackageManager) {
              setPackageManager(nextPackageManager);
              setCopied(false);
            }
          }}
          size="sm"
          value={[packageManager]}
          variant="outline"
        >
          <ToggleGroupItem value="pnpm">pnpm</ToggleGroupItem>
          <ToggleGroupItem value="npm">npm</ToggleGroupItem>
          <ToggleGroupItem value="yarn">yarn</ToggleGroupItem>
          <ToggleGroupItem value="bun">bun</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center justify-between gap-4 rounded-xl border bg-code px-4 py-3 text-code-foreground shadow-xs">
        <code className="min-w-0 overflow-x-auto text-sm">{command}</code>
        <Button
          aria-label={
            copied ? "Install command copied" : "Copy install command"
          }
          onClick={copy}
          size="icon-sm"
          variant="ghost"
        >
          {copied ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <CopyIcon aria-hidden="true" />
          )}
        </Button>
      </div>
    </div>
  );
}

function ArticleDivider() {
  return <Separator className="my-12 sm:my-16" />;
}

function InlineCode({ children }: { children: string }) {
  return (
    <Badge variant="secondary" render={<code />} size="lg">
      {children}
    </Badge>
  );
}

function getBackdropClass(motion: TourMotion, stylingMode: StylingMode) {
  if (stylingMode === "css-modules") {
    return cn(
      tourStyles.Backdrop,
      motion === "fade" && tourStyles.transitionFade,
      motion === "move" && tourStyles.transitionMove,
    );
  }

  return cn(
    "fixed inset-0 z-60 bg-black/48 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none",
    motion === "fade" &&
      "[transition:opacity_180ms_ease-out] data-[motion-state=entering]:[--coachmark-cutout-path:none] data-[motion-state=exiting]:[--coachmark-cutout-path:none] data-[motion-state=repositioning]:[--coachmark-cutout-path:none]",
    motion === "move" &&
      "[transition:clip-path_240ms_ease-in-out,opacity_180ms_ease-out] data-concealed:transition-none",
  );
}

function getPositionerClass(
  motion: TourMotion,
  viewport: boolean,
  stylingMode: StylingMode,
) {
  if (stylingMode === "css-modules") {
    return cn(
      tourStyles.Positioner,
      motion === "fade" && tourStyles.transitionFade,
      motion === "move" && tourStyles.transitionMove,
      viewport && tourStyles.withViewport,
    );
  }

  return cn(
    "z-70 motion-reduce:transition-none",
    motion === "fade" &&
      "[transition:opacity_180ms_ease-out] data-[motion-state=entering]:opacity-0 data-[motion-state=exiting]:opacity-0 data-[motion-state=repositioning]:opacity-0",
    motion === "move" &&
      "[transition:top_240ms_ease-in-out,left_240ms_ease-in-out,transform_240ms_ease-in-out,opacity_180ms_ease-out] [&[data-concealed][data-motion-state=repositioning]]:transition-none",
    viewport &&
      "h-(--positioner-height,max-content) w-(--positioner-width,max-content)",
  );
}

function getPopupClass(
  motion: TourMotion,
  viewport: boolean,
  size: "compact" | "large" | "medium",
  stylingMode: StylingMode,
) {
  if (stylingMode === "css-modules") {
    return cn(
      tourStyles.Popup,
      size === "compact" && tourStyles.sizeCompact,
      size === "medium" && tourStyles.sizeMedium,
      size === "large" && tourStyles.sizeLarge,
      motion === "fade" && tourStyles.transitionFade,
      motion === "move" && tourStyles.transitionMove,
      viewport && tourStyles.withViewport,
    );
  }

  return cn(
    "relative box-border flex max-w-[calc(100vw-2rem)] origin-(--transform-origin) flex-col rounded-xl border bg-popover text-popover-foreground shadow-xl motion-reduce:transition-none",
    size === "compact" &&
      "[--coachmark-step-width:min(17rem,calc(100vw-2rem))]",
    size === "medium" && "[--coachmark-step-width:min(20rem,calc(100vw-2rem))]",
    size === "large" && "[--coachmark-step-width:min(23rem,calc(100vw-2rem))]",
    viewport
      ? "h-(--popup-height,auto) w-(--popup-width,var(--coachmark-step-width))"
      : "w-[min(19rem,calc(100vw-2rem))] p-4",
    motion === "fade" &&
      "[transition:opacity_180ms_ease-out] data-starting-style:opacity-0 data-ending-style:opacity-0 data-[motion-state=entering]:opacity-0 data-[motion-state=exiting]:opacity-0 data-[motion-state=repositioning]:opacity-0",
    motion === "move" &&
      (viewport
        ? "[transition:width_240ms_ease-in-out,height_240ms_ease-in-out,opacity_180ms_ease-out,transform_180ms_ease-out] data-starting-style:[transform:scale(0.97)] data-starting-style:opacity-0 data-ending-style:[transform:scale(0.97)] data-ending-style:opacity-0"
        : "[transition:opacity_180ms_ease-out,transform_180ms_ease-out] data-starting-style:[transform:scale(0.97)] data-starting-style:opacity-0 data-ending-style:[transform:scale(0.97)] data-ending-style:opacity-0"),
  );
}

const arrowClassName =
  "relative h-2 w-4 overflow-hidden before:absolute before:bottom-0 before:left-1/2 before:size-[0.707rem] before:rounded-[1px] before:border before:border-border before:bg-popover before:content-[''] before:transform-[translate(-50%,50%)_rotate(45deg)] data-[side=top]:-bottom-2 data-[side=top]:rotate-180 data-[side=bottom]:-top-2 data-[side=left]:-right-3 data-[side=left]:rotate-90 data-[side=right]:-left-3 data-[side=right]:-rotate-90";

const viewportClassName =
  "relative min-h-0 min-w-0 flex-1 overflow-clip p-4 [--coachmark-current-x:0] [--coachmark-current-y:0] [--coachmark-previous-x:0] [--coachmark-previous-y:0] data-[activation-direction~=right]:[--coachmark-current-x:0.5rem] data-[activation-direction~=right]:[--coachmark-previous-x:-0.5rem] data-[activation-direction~=left]:[--coachmark-current-x:-0.5rem] data-[activation-direction~=left]:[--coachmark-previous-x:0.5rem] data-[activation-direction~=down]:[--coachmark-current-y:0.5rem] data-[activation-direction~=down]:[--coachmark-previous-y:-0.5rem] data-[activation-direction~=up]:[--coachmark-current-y:-0.5rem] data-[activation-direction~=up]:[--coachmark-previous-y:0.5rem] *:data-current:w-full *:data-previous:absolute *:data-previous:inset-0 *:data-previous:p-4 *:data-current:[transition:opacity_240ms_ease-in-out,transform_240ms_ease-in-out] *:data-previous:[transition:opacity_240ms_ease-in-out,transform_240ms_ease-in-out] [&>[data-current][data-starting-style]]:transform-[translate(var(--coachmark-current-x),var(--coachmark-current-y))] [&>[data-current][data-starting-style]]:opacity-0 [&>[data-previous][data-ending-style]]:transform-[translate(var(--coachmark-previous-x),var(--coachmark-previous-y))] [&>[data-previous][data-ending-style]]:opacity-0 motion-reduce:*:data-current:transition-none motion-reduce:*:data-previous:transition-none";

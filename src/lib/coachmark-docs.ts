export type TourMotion = "fade" | "move" | "none";

export type StylingMode = "css-modules" | "tailwind";

export type PlaygroundConfig = {
  align?: "auto" | "center" | "end" | "start";
  alignOffset?: number;
  arrow: boolean;
  backdrop: boolean;
  motion: TourMotion;
  padding?: number;
  radius?: number;
  side: "auto" | "bottom" | "left" | "right" | "top";
  sideOffset?: number;
  viewport: boolean;
};

const BASIC_CONFIG: PlaygroundConfig = {
  arrow: false,
  backdrop: true,
  motion: "none",
  side: "auto",
  viewport: false,
};

const FADE_CONFIG: PlaygroundConfig = {
  ...BASIC_CONFIG,
  motion: "fade",
};

const MOVE_CONFIG: PlaygroundConfig = {
  ...BASIC_CONFIG,
  motion: "move",
};

export const VIEWPORT_CONFIG: PlaygroundConfig = {
  ...MOVE_CONFIG,
  viewport: true,
};

export const DEFAULT_PLAYGROUND_CONFIG: PlaygroundConfig = {
  ...VIEWPORT_CONFIG,
  align: "auto",
  alignOffset: 0,
  padding: 8,
  radius: 8,
  sideOffset: 12,
};

type PreviewClassNames = {
  actions: string;
  arrow: string;
  backdrop: string;
  body: string;
  content: string;
  description: string;
  navigation: string;
  popup: string;
  positioner: string;
  stepper: string;
  title: string;
  viewport: string;
};

const tailwindBase = {
  actions: "mt-1 flex items-center justify-between gap-3",
  arrow:
    "relative h-2 w-4 overflow-hidden before:absolute before:bottom-0 before:left-1/2 before:size-[calc(0.5rem*1.414)] before:rounded-[1px] before:border before:border-border before:bg-popover before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)] data-[side=top]:-bottom-2 data-[side=top]:rotate-180 data-[side=bottom]:-top-2 data-[side=left]:-right-3 data-[side=left]:rotate-90 data-[side=right]:-left-3 data-[side=right]:-rotate-90",
  backdrop:
    "fixed inset-0 z-60 bg-black/48 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none",
  body: "grid gap-1.5",
  content: "grid gap-3",
  description: "text-sm leading-5 text-muted-foreground",
  navigation: "flex items-center gap-1",
  popup:
    "relative box-border flex max-w-[calc(100vw-2rem)] origin-(--transform-origin) flex-col rounded-xl border bg-popover text-popover-foreground shadow-xl motion-reduce:transition-none",
  positioner: "z-70 motion-reduce:transition-none",
  stepper:
    "text-[0.68rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase",
  title: "text-base font-semibold",
  viewport:
    "relative min-h-0 min-w-0 flex-1 overflow-clip p-4 [--coachmark-current-x:0] [--coachmark-current-y:0] [--coachmark-previous-x:0] [--coachmark-previous-y:0] data-[activation-direction~=right]:[--coachmark-current-x:0.5rem] data-[activation-direction~=right]:[--coachmark-previous-x:-0.5rem] data-[activation-direction~=left]:[--coachmark-current-x:-0.5rem] data-[activation-direction~=left]:[--coachmark-previous-x:0.5rem] data-[activation-direction~=down]:[--coachmark-current-y:0.5rem] data-[activation-direction~=down]:[--coachmark-previous-y:-0.5rem] data-[activation-direction~=up]:[--coachmark-current-y:-0.5rem] data-[activation-direction~=up]:[--coachmark-previous-y:0.5rem] [&>[data-current]]:w-full [&>[data-previous]]:absolute [&>[data-previous]]:inset-0 [&>[data-previous]]:p-4 [&>[data-current]]:[transition:opacity_240ms_ease-in-out,transform_240ms_ease-in-out,filter_240ms_ease-in-out] [&>[data-previous]]:[transition:opacity_240ms_ease-in-out,transform_240ms_ease-in-out,filter_240ms_ease-in-out] [&>[data-current][data-starting-style]]:[transform:translate(var(--coachmark-current-x),var(--coachmark-current-y))] [&>[data-current][data-starting-style]]:opacity-0 [&>[data-current][data-starting-style]]:[filter:blur(3px)] [&>[data-previous][data-ending-style]]:[transform:translate(var(--coachmark-previous-x),var(--coachmark-previous-y))] [&>[data-previous][data-ending-style]]:opacity-0 [&>[data-previous][data-ending-style]]:[filter:blur(3px)] motion-reduce:[&>[data-current]]:transition-none motion-reduce:[&>[data-previous]]:transition-none",
} as const;

const tailwindTransitions = {
  fade: {
    backdrop:
      "[transition:opacity_180ms_ease-out] data-[motion-state=entering]:[--coachmark-cutout-path:none] data-[motion-state=exiting]:[--coachmark-cutout-path:none] data-[motion-state=repositioning]:[--coachmark-cutout-path:none]",
    popup:
      "[transition:opacity_180ms_ease-out] data-starting-style:opacity-0 data-ending-style:opacity-0 data-[motion-state=entering]:opacity-0 data-[motion-state=exiting]:opacity-0 data-[motion-state=repositioning]:opacity-0",
    positioner:
      "[transition:opacity_180ms_ease-out] data-[motion-state=entering]:opacity-0 data-[motion-state=exiting]:opacity-0 data-[motion-state=repositioning]:opacity-0",
  },
  move: {
    backdrop:
      "[transition:clip-path_240ms_ease-in-out,opacity_180ms_ease-out] data-concealed:transition-none",
    popup:
      "[transition:opacity_180ms_ease-out,transform_180ms_ease-out] data-starting-style:[transform:scale(0.97)] data-starting-style:opacity-0 data-ending-style:[transform:scale(0.97)] data-ending-style:opacity-0",
    positioner:
      "[transition:top_240ms_ease-in-out,left_240ms_ease-in-out,transform_240ms_ease-in-out,opacity_180ms_ease-out] [&[data-concealed][data-motion-state=repositioning]]:transition-none",
  },
} as const;

function getPreviewClassNames(
  config: PlaygroundConfig,
  stylingMode: StylingMode,
): PreviewClassNames {
  const viewportEnabled = config.motion === "move" && config.viewport;

  if (stylingMode === "css-modules") {
    const transition =
      config.motion === "none"
        ? ""
        : config.motion === "fade"
          ? "transitionFade"
          : "transitionMove";
    const viewport = viewportEnabled ? "withViewport" : "";

    return {
      actions: viewportEnabled ? "Actions ViewportActions" : "Actions",
      arrow: "Arrow",
      backdrop: joinClasses("Backdrop", transition),
      body: "Body",
      content: "Content",
      description: "Description",
      navigation: "Navigation",
      popup: joinClasses("Popup", "sizeMedium", transition, viewport),
      positioner: joinClasses("Positioner", transition, viewport),
      stepper: "Stepper",
      title: "Title",
      viewport: "Viewport",
    };
  }

  const transition =
    config.motion === "none" ? null : tailwindTransitions[config.motion];
  const popupTransition = viewportEnabled
    ? "[transition:width_240ms_ease-in-out,height_240ms_ease-in-out,opacity_180ms_ease-out,transform_180ms_ease-out] data-starting-style:[transform:scale(0.97)] data-starting-style:opacity-0 data-ending-style:[transform:scale(0.97)] data-ending-style:opacity-0"
    : transition?.popup;

  return {
    actions: viewportEnabled
      ? "flex items-center justify-between gap-3 p-4 pt-0"
      : tailwindBase.actions,
    arrow: tailwindBase.arrow,
    backdrop: joinClasses(tailwindBase.backdrop, transition?.backdrop),
    body: tailwindBase.body,
    content: tailwindBase.content,
    description: tailwindBase.description,
    navigation: tailwindBase.navigation,
    popup: joinClasses(
      tailwindBase.popup,
      !viewportEnabled && "w-[min(19rem,calc(100vw-2rem))] p-4",
      popupTransition,
      viewportEnabled &&
        "h-[var(--popup-height,auto)] w-[var(--popup-width,var(--coachmark-step-width))]",
    ),
    positioner: joinClasses(
      tailwindBase.positioner,
      transition?.positioner,
      viewportEnabled &&
        "h-[var(--positioner-height,max-content)] w-[var(--positioner-width,max-content)]",
    ),
    stepper: tailwindBase.stepper,
    title: tailwindBase.title,
    viewport: tailwindBase.viewport,
  };
}

export function createPlaygroundSource(
  config: PlaygroundConfig,
  stylingMode: StylingMode = "tailwind",
): string {
  const viewportEnabled = config.motion === "move" && config.viewport;
  const classes = getPreviewClassNames(config, stylingMode);
  const writer = new SourceWriter();

  writer.line('import { type Ref, useRef } from "react";');
  writer.line('import { Coachmark } from "coachmark";');
  writer.line('import { cn } from "@/lib/utils";');
  if (stylingMode === "css-modules") {
    writer.line('import styles from "./tour.module.css";');
  }
  writer.blank();
  writer.line("export function ProductTour() {");
  writer.line("const statusRef = useRef<HTMLDivElement>(null);", 1);
  writer.line("const domainsRef = useRef<HTMLDivElement>(null);", 1);
  writer.line("const sourceRef = useRef<HTMLDivElement>(null);", 1);
  writer.line("const logsRef = useRef<HTMLButtonElement>(null);", 1);
  writer.line("const visitRef = useRef<HTMLButtonElement>(null);", 1);
  writer.line("const targetRefs = {", 1);
  writer.line("domains: domainsRef,", 2);
  writer.line("logs: logsRef,", 2);
  writer.line("source: sourceRef,", 2);
  writer.line("status: statusRef,", 2);
  writer.line("visit: visitRef,", 2);
  writer.line("};", 1);
  writer.blank();
  writer.line("return (", 1);
  writer.line("<Coachmark.Root>", 2);
  writer.line("<Coachmark.Trigger>Start tour</Coachmark.Trigger>", 3);

  if (config.backdrop) {
    writer.line("<Coachmark.Backdrop", 3);
    writeClassNameProp(writer, classes.backdrop, stylingMode, 4);
    writer.line("/>", 3);
  }

  writer.blank();
  writer.line("{deploymentTourSteps.map((step) => (", 3);
  writer.line("<Coachmark.Step", 4);
  writer.line("key={step.key}", 5);
  writer.line(
    config.padding === undefined
      ? "spotlightPadding={step.padding}"
      : `spotlightPadding={${config.padding}}`,
    5,
  );
  writer.line(
    config.radius === undefined
      ? "spotlightRadius={step.radius}"
      : `spotlightRadius={${config.radius}}`,
    5,
  );
  writer.line("target={targetRefs[step.key]}", 5);
  writer.line(">", 4);
  writer.line("<Coachmark.Positioner", 5);
  writer.line(
    config.align === undefined || config.align === "auto"
      ? "align={step.align}"
      : `align="${config.align}"`,
    6,
  );
  if (config.alignOffset !== undefined) {
    writer.line(`alignOffset={${config.alignOffset}}`, 6);
  }
  writeClassNameProp(writer, classes.positioner, stylingMode, 6);
  writer.line(
    config.side === "auto" ? "side={step.side}" : `side="${config.side}"`,
    6,
  );
  writer.line(
    config.sideOffset === undefined
      ? "sideOffset={12 + step.padding}"
      : `sideOffset={${config.sideOffset}}`,
    6,
  );
  writer.line(">", 5);
  writer.line("<Coachmark.Popup", 6);
  writeClassNameProp(writer, classes.popup, stylingMode, 7);
  writer.line(">", 6);

  if (config.arrow) {
    writer.line("<Coachmark.Arrow", 7);
    writeClassNameProp(writer, classes.arrow, stylingMode, 8);
    writer.line("/>", 7);
  }

  if (viewportEnabled) {
    writer.line("<Coachmark.Viewport", 7);
    writeClassNameProp(writer, classes.viewport, stylingMode, 8);
    writer.line(">", 7);
  }

  const contentLevel = viewportEnabled ? 8 : 7;
  writer.line("<div", contentLevel);
  writeClassNameProp(writer, classes.content, stylingMode, contentLevel + 1);
  writer.line(">", contentLevel);
  writer.line("<Coachmark.Stepper", contentLevel + 1);
  writeClassNameProp(writer, classes.stepper, stylingMode, contentLevel + 2);
  writer.line(">", contentLevel + 1);
  writer.line(
    "{({ stepCount, stepIndex }) => `Step ${stepIndex + 1} of ${stepCount}`}",
    contentLevel + 2,
  );
  writer.line("</Coachmark.Stepper>", contentLevel + 1);
  writer.line("<div", contentLevel + 1);
  writeClassNameProp(writer, classes.body, stylingMode, contentLevel + 2);
  writer.line(">", contentLevel + 1);
  writer.line("<Coachmark.Title", contentLevel + 2);
  writeClassNameProp(writer, classes.title, stylingMode, contentLevel + 3);
  writer.line(">{step.title}</Coachmark.Title>", contentLevel + 2);
  writer.line("<Coachmark.Description", contentLevel + 2);
  writeClassNameProp(
    writer,
    classes.description,
    stylingMode,
    contentLevel + 3,
  );
  writer.line(">", contentLevel + 2);
  writer.line("{step.description}", contentLevel + 3);
  writer.line("</Coachmark.Description>", contentLevel + 2);
  writer.line("</div>", contentLevel + 1);

  if (!viewportEnabled) {
    writeTourActions(writer, classes, stylingMode, contentLevel + 1);
  }

  writer.line("</div>", contentLevel);

  if (viewportEnabled) {
    writer.line("</Coachmark.Viewport>", 7);
    writeTourActions(writer, classes, stylingMode, 7);
  }

  writer.line("</Coachmark.Popup>", 6);
  writer.line("</Coachmark.Positioner>", 5);
  writer.line("</Coachmark.Step>", 4);
  writer.line("))}", 3);
  writer.blank();
  writer.line("<DeploymentDetailsCard targetRefs={targetRefs} />", 3);
  writer.line("</Coachmark.Root>", 2);
  writer.line(");", 1);
  writer.line("}");

  return [
    writer.toString(),
    DEPLOYMENT_DETAILS_CARD_SOURCE,
    DEPLOYMENT_TOUR_STEPS_SOURCE,
  ].join("\n\n");
}

function writeTourActions(
  writer: SourceWriter,
  classes: PreviewClassNames,
  stylingMode: StylingMode,
  level: number,
) {
  writer.line("<div", level);
  writeClassNameProp(writer, classes.actions, stylingMode, level + 1);
  writer.line(">", level);
  writer.line("<Coachmark.Close>Skip</Coachmark.Close>", level + 1);
  writer.line("<div", level + 1);
  writeClassNameProp(writer, classes.navigation, stylingMode, level + 2);
  writer.line(">", level + 1);
  writer.line("<Coachmark.Previous>Back</Coachmark.Previous>", level + 2);
  writer.line("<Coachmark.Next>", level + 2);
  writer.line(
    '{({ isLastStep }) => (isLastStep ? "Finish" : "Next")}',
    level + 3,
  );
  writer.line("</Coachmark.Next>", level + 2);
  writer.line("</div>", level + 1);
  writer.line("</div>", level);
}

const DEPLOYMENT_DETAILS_CARD_SOURCE = `type DeploymentDetailsTargetRefs = {
  domains: Ref<HTMLDivElement>;
  logs: Ref<HTMLButtonElement>;
  source: Ref<HTMLDivElement>;
  status: Ref<HTMLDivElement>;
  visit: Ref<HTMLButtonElement>;
};

function DeploymentDetailsCard({
  targetRefs,
}: {
  targetRefs: DeploymentDetailsTargetRefs;
}) {
  return (
    <section aria-labelledby="deployment-details-title">
      <header>
        <h2 id="deployment-details-title">Deployment details</h2>
        <button ref={targetRefs.logs} type="button">
          Logs
        </button>
        <button ref={targetRefs.visit} type="button">
          Visit
        </button>
      </header>

      <dl>
        <div ref={targetRefs.status}>
          <dt>Status</dt>
          <dd>Ready</dd>
        </div>
        <div ref={targetRefs.domains}>
          <dt>Domains</dt>
          <dd>preview.example.com</dd>
        </div>
        <div ref={targetRefs.source}>
          <dt>Source</dt>
          <dd>
            <code>feat/product-tour</code>
          </dd>
        </div>
      </dl>
    </section>
  );
}`;

const DEPLOYMENT_TOUR_STEPS_SOURCE = `const deploymentTourSteps = [
  {
    align: "start",
    description: "Check that the latest deployment finished successfully.",
    key: "status",
    padding: 8,
    radius: 8,
    side: "bottom",
    title: "Confirm deployment status",
  },
  {
    align: "start",
    description: "Find the generated domain for this preview deployment.",
    key: "domains",
    padding: 8,
    radius: 8,
    side: "top",
    title: "Find the deployment URL",
  },
  {
    align: "start",
    description: "Review the branch to confirm what was deployed.",
    key: "source",
    padding: 8,
    radius: 8,
    side: "top",
    title: "Verify the source",
  },
  {
    align: "center",
    description: "Open the build output to inspect each deployment step.",
    key: "logs",
    padding: 2,
    radius: 12,
    side: "bottom",
    title: "Inspect the build logs",
  },
  {
    align: "end",
    description: "Open the latest preview and verify the deployed changes.",
    key: "visit",
    padding: 2,
    radius: 12,
    side: "bottom",
    title: "Visit the preview",
  },
] as const;`;

function writeClassNameProp(
  writer: SourceWriter,
  value: string,
  stylingMode: StylingMode,
  level: number,
) {
  if (!value) return;

  if (stylingMode === "css-modules") {
    const classNames = value.split(" ");
    if (classNames.length === 1) {
      writer.line(`className={styles.${value}}`, level);
      return;
    }

    writer.line("className={cn(", level);
    for (const className of classNames) {
      writer.line(`styles.${className},`, level + 1);
    }
    writer.line(")}", level);
    return;
  }

  const lines = wrapTokens(value.split(" "), 72);
  if (lines.length === 1) {
    writer.line(`className=${JSON.stringify(lines[0])}`, level);
    return;
  }

  writer.line("className={cn(", level);
  for (const line of lines) {
    writer.line(`${JSON.stringify(line)},`, level + 1);
  }
  writer.line(")}", level);
}

function joinClasses(...values: Array<false | null | string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function wrapTokens(tokens: string[], maxLength: number) {
  const lines: string[] = [];
  let line = "";

  for (const token of tokens) {
    if (line && line.length + token.length + 1 > maxLength) {
      lines.push(line);
      line = token;
    } else {
      line = line ? `${line} ${token}` : token;
    }
  }

  if (line) lines.push(line);
  return lines;
}

class SourceWriter {
  private readonly lines: string[] = [];

  blank() {
    this.lines.push("");
  }

  line(value: string, level = 0) {
    this.lines.push(`${"  ".repeat(level)}${value}`);
  }

  toString() {
    return this.lines.join("\n");
  }
}

export const CSS_MODULE_SOURCE = `.Backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgb(0 0 0 / 48%);
}

.Backdrop[data-starting-style],
.Backdrop[data-ending-style] {
  opacity: 0;
}

.Positioner {
  z-index: 70;
}

.Popup {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: min(19rem, calc(100vw - 2rem));
  max-width: calc(100vw - 2rem);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem;
  background: var(--popover);
  color: var(--popover-foreground);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 14%);
  transform-origin: var(--transform-origin);
}

.Popup.sizeCompact {
  --coachmark-step-width: min(17rem, calc(100vw - 2rem));
}

.Popup.sizeMedium {
  --coachmark-step-width: min(20rem, calc(100vw - 2rem));
}

.Popup.sizeLarge {
  --coachmark-step-width: min(23rem, calc(100vw - 2rem));
}

.Backdrop.transitionFade,
.Positioner.transitionFade,
.Popup.transitionFade {
  transition: opacity 180ms ease-out;
}

.Backdrop.transitionFade:is(
    [data-motion-state="entering"],
    [data-motion-state="exiting"],
    [data-motion-state="repositioning"]
  ) {
  --coachmark-cutout-path: none;
}

.Positioner.transitionFade:is(
    [data-motion-state="entering"],
    [data-motion-state="exiting"],
    [data-motion-state="repositioning"]
  ),
.Popup.transitionFade:is(
    [data-starting-style],
    [data-ending-style],
    [data-motion-state="entering"],
    [data-motion-state="exiting"],
    [data-motion-state="repositioning"]
  ) {
  opacity: 0;
}

.Backdrop.transitionMove {
  transition:
    clip-path 240ms ease-in-out,
    opacity 180ms ease-out;
}

.Positioner.transitionMove {
  transition:
    top 240ms ease-in-out,
    left 240ms ease-in-out,
    transform 240ms ease-in-out,
    opacity 180ms ease-out;
}

.Positioner.transitionMove[data-concealed][data-motion-state="repositioning"] {
  transition: none;
}

.Popup.transitionMove {
  transition:
    opacity 180ms ease-out,
    transform 180ms ease-out;
}

.Popup.transitionMove:is([data-starting-style], [data-ending-style]) {
  opacity: 0;
  transform: scale(0.97);
}

.Positioner.withViewport {
  width: var(--positioner-width, max-content);
  height: var(--positioner-height, max-content);
}

.Popup.withViewport {
  width: var(--popup-width, var(--coachmark-step-width));
  height: var(--popup-height, auto);
  padding: 0;
  transition:
    width 240ms ease-in-out,
    height 240ms ease-in-out,
    opacity 180ms ease-out,
    transform 180ms ease-out;
}

.Viewport {
  --coachmark-current-x: 0;
  --coachmark-current-y: 0;
  --coachmark-previous-x: 0;
  --coachmark-previous-y: 0;
  position: relative;
  min-width: 0;
  min-height: 0;
  flex: 1;
  overflow: clip;
  padding: 1rem;
}

.Viewport[data-activation-direction~="right"] {
  --coachmark-current-x: 0.5rem;
  --coachmark-previous-x: -0.5rem;
}

.Viewport[data-activation-direction~="left"] {
  --coachmark-current-x: -0.5rem;
  --coachmark-previous-x: 0.5rem;
}

.Viewport[data-activation-direction~="down"] {
  --coachmark-current-y: 0.5rem;
  --coachmark-previous-y: -0.5rem;
}

.Viewport[data-activation-direction~="up"] {
  --coachmark-current-y: -0.5rem;
  --coachmark-previous-y: 0.5rem;
}

.Viewport > [data-current],
.Viewport > [data-previous] {
  width: 100%;
  transition:
    opacity 240ms ease-in-out,
    transform 240ms ease-in-out,
    filter 240ms ease-in-out;
}

.Viewport > [data-previous] {
  position: absolute;
  inset: 0;
  padding: 1rem;
}

.Viewport > [data-current][data-starting-style] {
  filter: blur(3px);
  opacity: 0;
  transform: translate(
    var(--coachmark-current-x),
    var(--coachmark-current-y)
  );
}

.Viewport > [data-previous][data-ending-style] {
  filter: blur(3px);
  opacity: 0;
  transform: translate(
    var(--coachmark-previous-x),
    var(--coachmark-previous-y)
  );
}

.Arrow {
  position: relative;
  width: 1rem;
  height: 0.5rem;
  overflow: hidden;
}

.Arrow::before {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: calc(0.5rem * 1.414);
  height: calc(0.5rem * 1.414);
  border: 1px solid var(--border);
  border-radius: 1px;
  background: var(--popover);
  content: "";
  transform: translate(-50%, 50%) rotate(45deg);
}

.Arrow[data-side="top"] {
  bottom: -0.5rem;
  transform: rotate(180deg);
}

.Arrow[data-side="bottom"] {
  top: -0.5rem;
}

.Arrow[data-side="left"] {
  right: -0.75rem;
  transform: rotate(90deg);
}

.Arrow[data-side="right"] {
  left: -0.75rem;
  transform: rotate(-90deg);
}

.Content {
  display: grid;
  gap: 0.75rem;
}

.Body {
  display: grid;
  gap: 0.375rem;
}

.Stepper {
  color: var(--muted-foreground);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.Title {
  font-size: 1rem;
  font-weight: 600;
}

.Description {
  color: var(--muted-foreground);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.Actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.ViewportActions {
  margin-top: 0;
  padding: 0 1rem 1rem;
}

.Navigation {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

@media (prefers-reduced-motion: reduce) {
  .Backdrop,
  .Positioner,
  .Popup,
  .Viewport > [data-current],
  .Viewport > [data-previous] {
    transition: none;
  }
}`;

export const BASIC_SOURCE = createPlaygroundSource(BASIC_CONFIG);
export const FADE_SOURCE = createPlaygroundSource(FADE_CONFIG);
export const MOVE_SOURCE = createPlaygroundSource(MOVE_CONFIG);
export const VIEWPORT_SOURCE = createPlaygroundSource(VIEWPORT_CONFIG);

export const CSS_MODULE_BASIC_SOURCE = createPlaygroundSource(
  BASIC_CONFIG,
  "css-modules",
);
export const CSS_MODULE_FADE_SOURCE = createPlaygroundSource(
  FADE_CONFIG,
  "css-modules",
);
export const CSS_MODULE_MOVE_SOURCE = createPlaygroundSource(
  MOVE_CONFIG,
  "css-modules",
);
export const CSS_MODULE_VIEWPORT_SOURCE = createPlaygroundSource(
  VIEWPORT_CONFIG,
  "css-modules",
);

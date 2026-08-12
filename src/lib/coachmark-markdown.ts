import {
  BASIC_SOURCE,
  DEFAULT_PLAYGROUND_CONFIG,
  FADE_SOURCE,
  MOVE_SOURCE,
  VIEWPORT_SOURCE,
  createPlaygroundSource,
} from "@/lib/coachmark-docs";

function codeBlock(language: string, source: string) {
  return `\`\`\`${language}\n${source}\n\`\`\``;
}

export function createCoachmarkMarkdown() {
  return [
    "# Coachmark",
    "An accessible, unstyled React primitive for product tours, built on top of Base UI.",
    "When I looked for a way to build product tours, I couldn't find anything that fit my needs.  \nSo I built Coachmark.",
    "[GitHub](https://github.com/sglza/coachmark)",
    "## Getting started",
    "To get started you just need to add Coachmark to your React project.",
    codeBlock("sh", "pnpm add coachmark"),
    "The composition of Coachmark is very similar to that of the Popover in Base UI, and it's no coincidence. But you'll also notice there are a couple of extra parts to the component anatomy, like `Coachmark.Step` and `Coachmark.Stepper`. These exist because unlike a regular Popover, a product tour requires an explicit order and continuity.\n\nHere's a basic example:",
    codeBlock("tsx", BASIC_SOURCE),
    "## Animating the coach marks",
    "Coachmark exposes motion states on the backdrop, positioner, and popup. Use those data attributes to define enter, exit, and step transitions. This example uses opacity.",
    codeBlock("tsx", FADE_SOURCE),
    "## Detached triggers",
    "This is probably why you're here. This is also the main thing that I was searching for when looking at existing solutions, and it's arguably the main reason I built this on top of Base UI. Each step provides a target ref to the positioner. Coachmark forwards the active target to Base UI's anchor prop, allowing the same popup to smoothly reposition when the step changes.",
    codeBlock("tsx", MOVE_SOURCE),
    "## Animating the content",
    "`Coachmark.Viewport` extends Base UI's `Popover.Viewport` which allows us to create content transitions between steps. It's only really needed for displaying content transitions.",
    codeBlock("tsx", VIEWPORT_SOURCE),
    "## Out of view targets",
    "It's not recommended to include targets that are out of view because it can be disorienting to the user. That being said, it's a situation that Coachmark handles automatically for you. When the next target is outside the visible area, the current coach mark is concealed, the next target is scrolled into view, and the next step is shown. This works with the page as well as nested scroll containers. You can use the `scrollIntoView` prop to modify the scroll behavior or disable it to make it instant.",
    "## Playground",
    "The goal of Coachmark is for you to make it your own. Below are some controls for you to get a feel of what you could do with it.",
    codeBlock(
      "tsx",
      createPlaygroundSource(DEFAULT_PLAYGROUND_CONFIG, "tailwind"),
    ),
    "",
  ].join("\n\n");
}

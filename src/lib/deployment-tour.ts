export const deploymentTourSteps = [
  {
    align: "start",
    description:
      "Check that the latest deployment finished successfully before reviewing the details.",
    key: "status",
    padding: 8,
    radius: 8,
    side: "bottom",
    size: "compact",
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
    size: "medium",
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
    size: "large",
    title: "Verify the source",
  },
  {
    align: "center",
    description:
      "Open the build output to inspect each step or troubleshoot a failed deployment.",
    key: "logs",
    padding: 2,
    radius: 12,
    side: "bottom",
    size: "compact",
    title: "Inspect the build logs",
  },
  {
    align: "end",
    description:
      "Open the latest preview in a new tab and verify the deployed changes firsthand.",
    key: "visit",
    padding: 2,
    radius: 12,
    side: "bottom",
    size: "medium",
    title: "Visit the preview",
  },
] as const;

export type DeploymentTourTarget = (typeof deploymentTourSteps)[number]["key"];

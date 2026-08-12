import {
  Clock3Icon,
  ExternalLinkIcon,
  EyeIcon,
  GitBranchIcon,
  GitCommitHorizontalIcon,
  GlobeIcon,
  ListIcon,
  Share2Icon,
} from "lucide-react";
import type { Ref } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardPanel } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type DeploymentDetailsTargetRefs = {
  domains?: Ref<HTMLDivElement>;
  logs?: Ref<HTMLButtonElement>;
  source?: Ref<HTMLDivElement>;
  status?: Ref<HTMLDivElement>;
  visit?: Ref<HTMLButtonElement>;
};

export function DeploymentDetailsCard({
  className,
  targetRefs,
}: {
  className?: string;
  targetRefs?: DeploymentDetailsTargetRefs;
}) {
  return (
    <Card
      className={cn(
        "w-full max-w-3xl self-center overflow-hidden",
        className,
      )}
    >
      <div className="flex flex-col gap-3 border-b px-4 py-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-sm">Deployment details</p>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Share2Icon aria-hidden="true" />
            Share
          </Button>
          <Button ref={targetRefs?.logs} size="sm" variant="outline">
            <ListIcon aria-hidden="true" />
            Logs
          </Button>
          <Button ref={targetRefs?.visit} size="sm">
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
                <AvatarFallback className="text-[.625rem]">SG</AvatarFallback>
              </Avatar>
              <span className="truncate font-medium">sglza</span>
              <span className="shrink-0 text-muted-foreground">4m ago</span>
            </dd>
          </div>
          <div
            className="flex min-w-0 flex-col gap-1.5 rounded-md"
            ref={targetRefs?.status}
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
            ref={targetRefs?.domains}
          >
            <dt className="text-muted-foreground">Domains</dt>
            <dd className="flex min-w-0 flex-col gap-1.5 text-xs">
              <span className="flex min-w-0 items-center gap-2">
                <GlobeIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground"
                />
                <span className="truncate">sglza.xyz</span>
              </span>
              <span className="flex min-w-0 items-center gap-2">
                <GlobeIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-muted-foreground"
                />
                <span className="truncate">sglza.github.io</span>
              </span>
            </dd>
          </div>
          <div
            className="col-span-2 flex min-w-0 flex-col gap-1.5 rounded-md"
            ref={targetRefs?.source}
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
  );
}

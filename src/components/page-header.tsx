import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

type PageHeaderProps = {
  backHref?: string;
  backLabel?: string;
};

export function PageHeader({ backHref, backLabel = "Back" }: PageHeaderProps) {
  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-between gap-3 px-4 pt-4 sm:px-8 sm:pt-6 lg:px-12">
        <div className="min-w-0 flex-1">
          {backHref ? (
            <Button
              render={<Link href={backHref} transitionTypes={["nav-back"]} />}
              size="sm"
              variant="ghost"
            >
              <ArrowLeftIcon aria-hidden="true" />
              {backLabel}
            </Button>
          ) : null}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

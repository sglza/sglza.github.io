import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { AtSignIcon } from "lucide-react";
import { ArrowLeftIcon } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type PageHeaderProps = {
  backHref?: string;
  backLabel?: string;
};

const CONTACT_LINKS = {
  email: "mailto:santiago.g.angeles@gmail.com",
  twitter: "https://x.com/sglzaa",
} as const;

export function PageHeader({ backHref, backLabel = "Back" }: PageHeaderProps) {
  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 pt-4 sm:px-8 sm:pt-6 lg:px-12">
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
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              aria-label="Open X profile"
              render={
                <a
                  href={CONTACT_LINKS.twitter}
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
              size="icon"
              variant="outline"
            >
              <FaXTwitter aria-hidden="true" />
            </Button>
            <Button
              aria-label="Send email"
              render={<a href={CONTACT_LINKS.email} />}
              size="icon"
              variant="outline"
            >
              <AtSignIcon aria-hidden="true" />
            </Button>
          </div>
          <Separator orientation="vertical" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

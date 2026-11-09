import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { AtSignIcon, Undo2 } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button-variants";
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
            <Link
              className={buttonVariants({ size: "sm", variant: "ghost" })}
              href={backHref}
              transitionTypes={["nav-back"]}
            >
              <Undo2 aria-hidden="true" />
              {backLabel}
            </Link>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              aria-label="Open X profile"
              className={buttonVariants({ size: "icon", variant: "outline" })}
              href={CONTACT_LINKS.twitter}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaXTwitter aria-hidden="true" />
            </a>
            <a
              aria-label="Send email"
              className={buttonVariants({ size: "icon", variant: "outline" })}
              href={CONTACT_LINKS.email}
            >
              <AtSignIcon aria-hidden="true" />
            </a>
          </div>
          <Separator orientation="vertical" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

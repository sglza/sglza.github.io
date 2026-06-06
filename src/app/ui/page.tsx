import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Frame, FramePanel } from "@/components/ui/frame";
import { DynamicForm } from "@/components/dynamic-form";
import { PricingCard } from "@/components/pricing-card";

export default function UI() {
  return (
    <PageTransition>
      <div className="flex items-start justify-center min-h-[100dvh] p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-start max-w-screen-lg w-full">
          <div className="flex w-full flex-col items-start gap-4">
            <Button
              render={
                <Link href="/" transitionTypes={["nav-back"]} />
              }
              size="sm"
              variant="ghost"
            >
              <ArrowLeftIcon aria-hidden="true" />
              Back Home
            </Button>
          </div>
          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-[200px,auto]">
            <p className="whitespace-nowrap font-semibold">
              Dynamic pricing card
            </p>
            <Frame className="w-full">
              <FramePanel className="flex min-h-[28rem] items-center justify-center p-8 md:p-10">
                <PricingCard />
              </FramePanel>
            </Frame>
            <p className="whitespace-nowrap font-semibold">
              Dynamic survey form
            </p>
            <Frame className="w-full">
              <FramePanel className="flex min-h-[28rem] items-center justify-center p-8 md:p-10">
                <DynamicForm />
              </FramePanel>
            </Frame>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}

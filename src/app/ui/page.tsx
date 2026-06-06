import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { Frame, FramePanel } from "@/components/ui/frame";
import { DynamicForm } from "@/components/dynamic-form";
import { PricingCard } from "@/components/pricing-card";

export default function UI() {
  return (
    <PageTransition>
      <div className="min-h-dvh">
        <PageHeader backHref="/" backLabel="Back Home" />
        <main className="mx-auto w-full max-w-5xl px-4 pt-8 pb-16 sm:px-8 sm:pt-10 sm:pb-20 lg:px-12">
          <div className="grid w-full grid-cols-1 gap-8 md:gap-y-4 md:grid-cols-[200px,auto] md:gap-x-10">
            <div className="flex flex-col gap-1 md:pt-4">
              <p className="font-semibold">Dynamic pricing card</p>
              <p className="text-sm text-muted-foreground">
                A plan selector that updates pricing, savings, and CTA copy in
                place.
              </p>
            </div>
            <div className="w-full">
              <div className="flex justify-center sm:hidden">
                <PricingCard />
              </div>
              <Frame className="hidden w-full sm:block">
                <FramePanel className="flex min-h-125 items-center justify-center p-6 sm:p-8 md:p-10">
                  <PricingCard />
                </FramePanel>
              </Frame>
            </div>
            <div className="flex flex-col gap-1 pt-12">
              <p className="font-semibold">Dynamic survey form</p>
              <p className="text-sm text-muted-foreground">
                A feedback form where neutral responses submit directly and
                stronger reactions ask for more detail.
              </p>
            </div>
            <div className="w-full">
              <div className="flex justify-center sm:hidden">
                <DynamicForm />
              </div>
              <Frame className="hidden w-full sm:block">
                <FramePanel className="flex min-h-100 items-center justify-center p-6 sm:p-8 md:p-10">
                  <DynamicForm />
                </FramePanel>
              </Frame>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}

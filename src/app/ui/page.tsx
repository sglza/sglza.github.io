import { Card, CardHeader } from "@/components/ui/card";
import { TextTransition } from "@/components/text-transition";
import { PricingCard } from "@/components/pricing-card";
import { Appear } from "@/components/appear";

export default function UI() {
  return (
    <div className="flex items-start justify-center min-h-[100dvh] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start max-w-screen-lg w-full">
        <TextTransition>
          <p className="whitespace-nowrap font-bold text-2xl">UI</p>
        </TextTransition>
        <div className="grid grid-cols-1 md:grid-cols-[200px,auto] gap-8 w-full">
          <Appear>
            <p className="font-semibold whitespace-nowrap">
              Dynamic pricing card
            </p>
          </Appear>
          <Appear>
            <Card className="flex flex-col items-center justify-center w-full">
              <CardHeader className="py-16">
                <PricingCard />
              </CardHeader>
            </Card>
          </Appear>
        </div>
      </main>
    </div>
  );
}

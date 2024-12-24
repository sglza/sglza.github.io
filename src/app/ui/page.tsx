import { Card, CardHeader } from "@/components/ui/card";
import { TextTransition } from "@/components/text-transition";
import { PricingCard } from "@/components/pricing-card";

export default function UI() {
  return (
    <div className="flex items-start justify-center min-h-[100dvh] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start max-w-screen-lg w-full">
        <TextTransition>
          <p className="whitespace-nowrap font-bold text-2xl">UI</p>
        </TextTransition>
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <p className="font-semibold whitespace-nowrap">
            Dynamic pricing card
          </p>
          <Card className="flex flex-col items-center justify-center w-full">
            <CardHeader className="py-16">
              <PricingCard />
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
}

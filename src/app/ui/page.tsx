import { TextTransition } from "@/components/text-transition";

export default function UI() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start max-w-screen-lg w-full">
        <TextTransition>
          <p className="whitespace-nowrap">UI</p>
        </TextTransition>
      </main>
    </div>
  );
}

import { TextTransition } from "@/components/text-transition";

export default function UI() {
  return (
    <div className="flex items-start justify-center min-h-[100dvh] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start max-w-screen-lg w-full">
        <TextTransition>
          <p className="whitespace-nowrap font-bold text-2xl">UI</p>
        </TextTransition>
        <TextTransition
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.2}
        >
          <p className="whitespace-nowrap">Dynamic pricing card</p>
        </TextTransition>
        <TextTransition
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.2}
        >
          <p className="whitespace-nowrap">Dynamic form</p>
        </TextTransition>
      </main>
    </div>
  );
}

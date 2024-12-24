import Link from "next/link";

import { Age } from "@/components/age";
import { TextTransition } from "@/components/text-transition";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start max-w-screen-lg w-full">
        <TextTransition>
          <p className="whitespace-nowrap">¡Hola! I&apos;m Santiago.</p>
        </TextTransition>
        <TextTransition
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.5}
        >
          <p>Most people call me Santi.</p>
          <div>
            <span>I&apos;ve been working as a Frontend Engineer @ </span>
            <a
              className="font-bold underline underline-offset-4"
              href="https://dd360.mx/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DD360
            </a>{" "}
            <span>for the past </span>
            <span className="inline-flex w-24 max-w-24 overflow-hidden bg-clip-text text-transparent bg-gradient-to-l from-white to-black">
              <Age beggining={1699250400000} />
            </span>{" "}
            <span>years.</span>
          </div>
        </TextTransition>
        <TextTransition
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.5}
        >
          <p>
            I like to experiment creating beautiful web components, you can
            check some of them out{" "}
            <Link href="/ui" className="font-bold underline underline-offset-4">
              here
            </Link>
            .
          </p>
        </TextTransition>
        <TextTransition
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          delay={0.5}
        >
          <p>
            I also like to to go bouldering, hiking, and spending time with the
            people I love.
          </p>
        </TextTransition>
      </main>
    </div>
  );
}

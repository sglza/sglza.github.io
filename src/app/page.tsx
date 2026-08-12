import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import boulderingImage from "../../public/bouldering.webp";
import hikingImage from "../../public/hiking.webp";
import marceImage from "../../public/marce.webp";
import surfingImage from "../../public/surfing.webp";

import { Age } from "@/components/age";
import { PageHeader } from "@/components/page-header";
import { PageTransition } from "@/components/page-transition";
import { TextTransition } from "@/components/text-transition";
import { Badge } from "@/components/ui/badge";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/components/ui/preview-card";

type PersonalHighlight = {
  caption: string;
  image: StaticImageData;
  imageAlt: string;
  secondaryImage?: StaticImageData;
  secondaryImageAlt?: string;
  trigger: string;
};

const personalHighlights: readonly PersonalHighlight[] = [
  {
    caption: "Me and my girlfriend Marce at my best friend's wedding.",
    image: marceImage,
    imageAlt: "A personal photo with someone I love.",
    trigger: "people I love",
  },
  {
    caption:
      "Hiking at La Malinche, and my first time surfing in Puerto Escondido.",
    image: hikingImage,
    imageAlt: "A hiking view on the trail.",
    secondaryImage: surfingImage,
    secondaryImageAlt: "My first time surfing in Puerto Escondido.",
    trigger: "spend time outside",
  },
  {
    caption:
      "My first time bouldering on natural rock, at Parque Nacional Los Dinamos in Mexico City.",
    image: boulderingImage,
    imageAlt: "A bouldering session on the wall.",
    trigger: "bouldering",
  },
];

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-dvh">
        <PageHeader />
        <main className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-5xl px-4 pt-8 pb-16 sm:min-h-[calc(100dvh-6rem)] sm:px-8 sm:pt-10 sm:pb-20 lg:px-12">
          <div className="flex w-full flex-col items-start gap-8">
            <TextTransition>
              <p className="whitespace-nowrap">¡Hola! I&apos;m Santiago.</p>
            </TextTransition>
            <TextTransition
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              delay={0.5}
              className="overflow-visible"
            >
              <p>Most people call me Santi.</p>
              <div>
                <span>I&apos;ve been working as a Frontend Engineer @ </span>
                <a
                  className="font-semibold underline underline-offset-4"
                  href="https://monopolio.com.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  monopolio.com.mx
                </a>{" "}
                <span>for the past </span>
                <span className="inline-flex w-24 max-w-24 overflow-hidden bg-linear-to-l from-background to-foreground bg-clip-text text-transparent mr-0.5 tabular-nums">
                  <Age beggining={1699250400000} />
                </span>{" "}
                <span>years.</span>
              </div>
            </TextTransition>
            <TextTransition
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              delay={0.5}
              className="overflow-visible"
            >
              <p>
                I like to experiment creating beautiful web components, you can
                check some of them out{" "}
                <Link
                  href="/ui"
                  className="font-semibold underline underline-offset-4"
                  transitionTypes={["nav-forward"]}
                >
                  here
                </Link>
                .
              </p>
            </TextTransition>
            <TextTransition
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              delay={0.5}
              className="overflow-visible"
            >
              <p>
                I also like to go{" "}
                <HighlightPreviewCard highlight={personalHighlights[2]} />,{" "}
                <HighlightPreviewCard highlight={personalHighlights[1]} />, and
                be with the{" "}
                <HighlightPreviewCard highlight={personalHighlights[0]} />.
              </p>
            </TextTransition>
            <TextTransition
              initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              delay={0.5}
              className="w-full overflow-visible [&>div]:w-full"
            >
              <section
                aria-labelledby="writing-heading"
                className="w-full pt-4"
              >
                <h2 id="writing-heading" className="font-semibold">
                  Writing
                </h2>
                <ul className="mt-3 w-full">
                  <li>
                    <Link
                      className="text-sm -mx-3 flex w-[calc(100%+1.5rem)] items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors duration-150 ease hover:bg-muted/70 motion-reduce:transition-none"
                      href="/coachmark"
                      transitionTypes={["nav-forward"]}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-2">
                          Coachmark
                          <Badge
                            aria-label="Writing status: new"
                            size="sm"
                            variant="success"
                          >
                            New
                          </Badge>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          A accessible, unstyled React primitive for product
                          tours, built on top of Base UI.
                        </span>
                      </div>
                      <time
                        className="text-sm tabular-nums text-muted-foreground"
                        dateTime="2026"
                      >
                        2026
                      </time>
                    </Link>
                  </li>
                </ul>
              </section>
            </TextTransition>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}

function HighlightPreviewCard({ highlight }: { highlight: PersonalHighlight }) {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        className="inline font-medium underline decoration-border underline-offset-4 transition-colors hover:text-foreground/80 cursor-pointer"
        render={<button type="button" />}
      >
        {highlight.trigger}
      </PreviewCardTrigger>
      <PreviewCardPopup className="w-80 flex-col p-2" sideOffset={12}>
        <div className="relative aspect-4/3 overflow-hidden rounded-[calc(var(--radius)-4px)] border border-border/70 bg-linear-to-br from-muted/80 via-background to-muted/30">
          {highlight.secondaryImage ? (
            <div className="grid h-full grid-cols-2 gap-px bg-border/70">
              <div className="relative overflow-hidden">
                <Image
                  alt={highlight.imageAlt}
                  className="h-full w-full object-cover"
                  placeholder="blur"
                  src={highlight.image}
                  unoptimized
                  preload
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
              </div>
              <div className="relative overflow-hidden">
                <Image
                  alt={highlight.secondaryImageAlt ?? ""}
                  className="h-full w-full object-cover"
                  placeholder="blur"
                  src={highlight.secondaryImage}
                  unoptimized
                  preload
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </div>
          ) : (
            <>
              <Image
                alt={highlight.imageAlt}
                className="h-full w-full object-cover"
                placeholder="blur"
                src={highlight.image}
                unoptimized
                preload
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </>
          )}
        </div>
        <div className="px-2 pt-2 pb-1 text-pretty">
          <p className="text-muted-foreground text-sm">{highlight.caption}</p>
        </div>
      </PreviewCardPopup>
    </PreviewCard>
  );
}

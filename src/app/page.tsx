import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import boulderingImage from "../../public/bouldering.jpeg";
import hikingImage from "../../public/hiking.jpeg";
import marceImage from "../../public/marce.jpeg";
import surfingImage from "../../public/surfing.jpeg";

import { Age } from "@/components/age";
import { PageTransition } from "@/components/page-transition";
import { TextTransition } from "@/components/text-transition";
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
      <div className="flex items-center justify-center min-h-[100dvh] p-8 pb-20 gap-16 sm:p-20">
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
              <span className="inline-flex w-24 max-w-24 overflow-hidden bg-gradient-to-l from-background to-foreground bg-clip-text text-transparent">
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
              <Link
                href="/ui"
                className="font-bold underline underline-offset-4"
                transitionTypes={["nav-forward"]}
              >
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
              I also like to go{" "}
              <HighlightPreviewCard highlight={personalHighlights[2]} />,{" "}
              <HighlightPreviewCard highlight={personalHighlights[1]} />, and be
              with the{" "}
              <HighlightPreviewCard highlight={personalHighlights[0]} />.
            </p>
          </TextTransition>
        </main>
      </div>
    </PageTransition>
  );
}

function HighlightPreviewCard({
  highlight,
}: {
  highlight: PersonalHighlight;
}) {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        className="inline font-medium underline decoration-border underline-offset-4 transition-colors hover:text-foreground/80"
        render={<button type="button" />}
      >
        {highlight.trigger}
      </PreviewCardTrigger>
      <PreviewCardPopup className="w-80 flex-col p-2" sideOffset={12}>
        <div className="relative aspect-4/3 overflow-hidden rounded-md border border-border/70 bg-linear-to-br from-muted/80 via-background to-muted/30">
          {highlight.secondaryImage ? (
            <div className="grid h-full grid-cols-2 gap-px bg-border/70">
              <div className="relative overflow-hidden">
                <Image
                  alt={highlight.imageAlt}
                  className="h-full w-full object-cover"
                  placeholder="blur"
                  src={highlight.image}
                  unoptimized
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
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </>
          )}
        </div>
        <div className="px-2 pt-3 pb-1">
          <p className="text-muted-foreground text-sm">{highlight.caption}</p>
        </div>
      </PreviewCardPopup>
    </PreviewCard>
  );
}

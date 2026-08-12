import type { Metadata } from "next";

import { CoachmarkDocs } from "@/components/coachmark-docs";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Coachmark — Accessible React product tours",
  description:
    "Build accessible, composable React product tours and animate each layer progressively with Coachmark.",
};

export default function CoachmarkPage() {
  return (
    <PageTransition>
      <CoachmarkDocs />
    </PageTransition>
  );
}

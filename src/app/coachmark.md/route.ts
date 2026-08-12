import { createCoachmarkMarkdown } from "@/lib/coachmark-markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(createCoachmarkMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

"use client";

import { File, MultiFileDiff } from "@pierre/diffs/react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export type CoachmarkCodeFile = {
  code: string;
  filename: string;
  previousCode?: string;
};

type CoachmarkCodeViewerProps =
  | {
      code: string;
      filename?: string;
      files?: never;
      previousCode?: string;
    }
  | {
      code?: never;
      filename?: never;
      files: readonly CoachmarkCodeFile[];
      previousCode?: never;
    };

export function CoachmarkCodeViewer(props: CoachmarkCodeViewerProps) {
  const { resolvedTheme } = useTheme();
  const files: readonly CoachmarkCodeFile[] =
    props.files ?? [
      {
        code: props.code,
        filename: props.filename ?? "tour.tsx",
        previousCode: props.previousCode,
      },
    ];
  const options = useMemo(
    () => ({
      diffIndicators: "bars" as const,
      diffStyle: "unified" as const,
      disableLineNumbers: true,
      expandUnchanged: true,
      overflow: "scroll" as const,
      stickyHeader: true,
      themeType:
        resolvedTheme === "dark" ? ("dark" as const) : ("light" as const),
    }),
    [resolvedTheme],
  );

  return (
    <ScrollArea
      aria-label={files.length === 1 ? `${files[0].filename} code` : "Code files"}
      className="min-h-136 max-h-136 rounded-xl border text-code-foreground shadow-xs **:data-[slot=scroll-area-viewport]:max-h-136"
      containVerticalOverscroll={false}
      role="region"
      scrollFade
    >
      {files.map((file) =>
        file.previousCode === undefined ? (
          <File
            disableWorkerPool
            file={{ contents: file.code, name: file.filename }}
            key={`${file.filename}:${file.code}`}
            options={options}
            renderHeaderMetadata={() => (
              <CopyCodeButton code={file.code} filename={file.filename} />
            )}
          />
        ) : (
          <MultiFileDiff
            disableWorkerPool
            key={`${file.filename}:${file.previousCode}:${file.code}`}
            newFile={{ contents: file.code, name: file.filename }}
            oldFile={{ contents: file.previousCode, name: file.filename }}
            options={options}
            renderHeaderMetadata={() => (
              <CopyCodeButton code={file.code} filename={file.filename} />
            )}
          />
        ),
      )}
    </ScrollArea>
  );
}

function CopyCodeButton({ code, filename }: { code: string; filename: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <Button
      aria-label={copied ? `${filename} copied` : `Copy ${filename}`}
      className="text-code-foreground hover:bg-code-foreground/10"
      onClick={copy}
      size="xs"
      variant="ghost"
    >
      {copied ? (
        <CheckIcon aria-hidden="true" />
      ) : (
        <CopyIcon aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

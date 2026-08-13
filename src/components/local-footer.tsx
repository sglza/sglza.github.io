"use client";

import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { useEffect, useRef, useState } from "react";

import styles from "./local-footer.module.css";

const PUEBLA_TIME = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/Mexico_City",
});

const HOUR_FORMAT = { useGrouping: false } as const;
const MINUTE_FORMAT = { minimumIntegerDigits: 2, useGrouping: false } as const;

type LocalTime = {
  dateTime: string;
  hour: number;
  label: string;
  minute: number;
  period: string;
};

function getPueblaTime(): LocalTime {
  const now = new Date();
  let hour = 0;
  let minute = 0;
  let period = "";

  for (const part of PUEBLA_TIME.formatToParts(now)) {
    if (part.type === "hour") hour = Number(part.value);
    if (part.type === "minute") minute = Number(part.value);
    if (part.type === "dayPeriod") period = part.value;
  }

  return {
    dateTime: now.toISOString(),
    hour,
    label: PUEBLA_TIME.format(now),
    minute,
    period,
  };
}

export function LocalFooter() {
  const [localTime, setLocalTime] = useState<LocalTime>(getPueblaTime);
  const [isPuffing, setIsPuffing] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    let intervalId: number | undefined;

    const millisecondsUntilNextMinute = 60_000 - (Date.now() % 60_000) + 50;
    const timeoutId = window.setTimeout(() => {
      setLocalTime(getPueblaTime());
      intervalId = window.setInterval(
        () => setLocalTime(getPueblaTime()),
        60_000,
      );
    }, millisecondsUntilNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const puff = () => {
    setIsPuffing(false);
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = window.requestAnimationFrame(() => {
      setIsPuffing(true);
      frameRef.current = null;
    });
  };

  return (
    <footer className="w-full px-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-t border-border/70 py-4 text-xs text-muted-foreground sm:py-5">
        <p className="flex items-center gap-1.5">
          <span>Puebla, México</span>
          <span aria-hidden="true">·</span>
          <time
            aria-label={localTime.label}
            dateTime={localTime.dateTime}
            suppressHydrationWarning
          >
            <NumberFlowGroup>
              <span
                aria-hidden="true"
                className="inline-flex items-baseline tabular-nums"
              >
                <NumberFlow
                  continuous
                  format={HOUR_FORMAT}
                  trend={1}
                  value={localTime.hour}
                />
                <span>:</span>
                <NumberFlow
                  continuous
                  format={MINUTE_FORMAT}
                  trend={1}
                  value={localTime.minute}
                />
                <span className="ml-1">{localTime.period}</span>
              </span>
            </NumberFlowGroup>
          </time>
        </p>

        <button
          aria-label="A tiny view of Popocatépetl and Iztaccíhuatl. Make Popo puff."
          className={styles.volcano}
          data-puffing={isPuffing ? "" : undefined}
          onClick={puff}
          title="Popocatépetl and Iztaccíhuatl volcanoes"
          type="button"
        >
          <span aria-hidden="true" className={styles.asciiScene}>
            <span className={styles.asciiMark}>
              <svg className={styles.asciiSvg} viewBox="0 0 48 18">
                <path
                  className={styles.asciiStroke}
                  d="M1 16 5 9.5M6.25 8 9 3.5 11.75 8M13.25 9.5 17.25 16M18 16h3.25M22 16h3.25M26 16l4-6.5M31.5 8H35M36 8h3.5M40 9.5l4 6.5M44.75 16H48"
                />
              </svg>
            </span>
            <span
              className={styles.smoke}
              onAnimationEnd={() => setIsPuffing(false)}
            >
              <svg className={styles.smokeGlyph} viewBox="0 0 6 6">
                <circle className={styles.smokeRing} cx="3" cy="3" r="2" />
              </svg>
            </span>
          </span>
        </button>
      </div>
    </footer>
  );
}

"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import useSound from "use-sound";

import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const [playLightswitchOn] = useSound("/lightswitch_on.mp3", {
    playbackRate: 1.05,
    preload: true,
    volume: 0.35,
  });
  const [playLightswitchOff] = useSound("/lightswitch_off.mp3", {
    playbackRate: 0.98,
    preload: true,
    volume: 0.4,
  });

  const handleCheckedChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");

    if (!mounted) {
      return;
    }

    if (checked) {
      playLightswitchOn();
      return;
    }

    playLightswitchOff();
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <Toggle
        aria-label={
          isDark || !mounted ? "Switch to light theme" : "Switch to dark theme"
        }
        className="bg-background/85 backdrop-blur-md"
        onPressedChange={handleCheckedChange}
        pressed={isDark}
        size="default"
        variant="outline"
      >
        {isDark || !mounted ? (
          <SunIcon aria-hidden="true" />
        ) : (
          <MoonIcon aria-hidden="true" />
        )}
      </Toggle>
    </div>
  );
}

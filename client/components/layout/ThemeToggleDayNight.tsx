import { useEffect, useMemo, useRef, useState } from "react";
import lottie, { type AnimationItem } from "lottie-web";
import { applyTheme, getStoredTheme, getSystemTheme, setStoredTheme, type ThemeMode } from "@/utils/theme";

const dayNightAnimationUrl = new URL("../../assets/day-night.lottie", import.meta.url).href;

export default function ThemeToggleDayNight() {
  const initialMode = useMemo<ThemeMode>(() => {
    const stored = getStoredTheme();
    return stored ?? getSystemTheme();
  }, []);

  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    applyTheme(mode);
    setStoredTheme(mode);
  }, [mode]);

  useEffect(() => {
    const onStorage = () => {
      const stored = getStoredTheme();
      if (stored) setMode(stored);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animation = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: dayNightAnimationUrl,
    });

    animationRef.current = animation;

    return () => {
      animation.destroy();
      animationRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!animationRef.current) return;

    animationRef.current.setDirection(mode === "night" ? 1 : -1);
    animationRef.current.play();
  }, [mode]);

  return (
    <button
      type="button"
      className="tfc-theme-toggle"
      aria-label={`Switch to ${mode === "day" ? "night" : "day"} mode`}
      aria-pressed={mode === "night"}
      onClick={() => setMode((m) => (m === "day" ? "night" : "day"))}
      data-mode={mode}
    >
      <span className="tfc-theme-toggle__lottie" aria-hidden="true">
        <div ref={containerRef} className="tfc-theme-toggle__anim" />
      </span>
    </button>
  );
}


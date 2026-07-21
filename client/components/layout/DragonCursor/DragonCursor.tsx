import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import styles from "./DragonCursor.module.css";

type Vec2 = { x: number; y: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error legacy
    navigator.msMaxTouchPoints > 0
  );
}

export default function DragonCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Mouse positions + smooth interpolation
  const mouseRef = useRef<Vec2>({ x: 0, y: 0 });
  const posRef = useRef<Vec2>({ x: 0, y: 0 });

  // Threat-style moving line (no multi-point tail)
  const tailSvgRef = useRef<SVGSVGElement | null>(null);
  const tailLineRef = useRef<SVGLineElement | null>(null);
  // Keep a small lag behind the cursor for the “moving threat” line
  const lagRef = useRef<Vec2>({ x: 0, y: 0 });





  const prefers = useMemo(() => prefersReducedMotion, [prefersReducedMotion]);




  useEffect(() => {
    if (isTouchDevice()) return;
    if (prefers) return;
    setEnabled(true);
  }, [prefers]);

  useEffect(() => {
    if (!enabled) return;

    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "none";
    document.body.classList.add("dragon-cursor-hidden");

    const onMove = (e: PointerEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    // Init positions
    const initPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    posRef.current = { ...initPos };
    lagRef.current = { ...initPos };
    const update = () => {
      const mp = mouseRef.current;

      // Smooth follow: strong lerp for buttery feel
      posRef.current.x = lerp(posRef.current.x, mp.x, 0.15);
      posRef.current.y = lerp(posRef.current.y, mp.y, 0.15);

      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }

      // Lag position to create a “moving threat” line behind the dot
      lagRef.current.x = lerp(lagRef.current.x, mp.x, 0.12);
      lagRef.current.y = lerp(lagRef.current.y, mp.y, 0.12);

      // Draw a single moving line segment (in local coords centered on dot)
      if (tailLineRef.current) {
        const x1 = 0;
        const y1 = 0;
        const x2 = lagRef.current.x - posRef.current.x;
        const y2 = lagRef.current.y - posRef.current.y;

        tailLineRef.current.setAttribute("x1", `${x1}`);
        tailLineRef.current.setAttribute("y1", `${y1}`);
        tailLineRef.current.setAttribute("x2", `${x2}`);
        tailLineRef.current.setAttribute("y2", `${y2}`);
      }

      // Subtle fade based on lag distance (keeps it light, not a tail)
      const fx = lagRef.current.x - posRef.current.x;
      const fy = lagRef.current.y - posRef.current.y;
      const dist = Math.hypot(fx, fy);
      const alpha = Math.min(1, dist / 20);
      if (tailSvgRef.current) tailSvgRef.current.style.opacity = `${0.15 + alpha * 0.35}`;


      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => {
      document.body.style.cursor = prevCursor;
      document.body.classList.remove("dragon-cursor-hidden");
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={overlayRef}
      className={styles.dragonCursorOverlay}
      aria-hidden="true"
    >
      {/* Small dot */}
      <div className={styles.dragonCursorDot} />

      {/* Threat-style moving line */}
      <svg
        ref={tailSvgRef}
        className={styles.dragonCursorTailLine}
        width="400"
        height="400"
        viewBox="-200 -200 400 400"
        style={{ opacity: 0 }}
      >
        <defs>
          <linearGradient id="threat-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(192,132,252,0.0)" />
            <stop offset="35%" stopColor="rgba(192,132,252,0.35)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.65)" />
          </linearGradient>
        </defs>
        <line
          ref={tailLineRef}
          x1="0"
          y1="0"
          x2="0"
          y2="0"
          stroke="url(#threat-grad)"
          strokeWidth={2}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 8px rgba(139,92,246,0.35))" }}
        />
      </svg>

    </div>
  );
}
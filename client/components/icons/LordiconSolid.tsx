import { useEffect, useRef, useState } from "react";
import { Player as LordiconPlayer } from "@lordicon/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type LordiconSolidProps = {
  /** Lordicon animation JSON url */
  src: string;
  /** Pixel size for square icon */
  size?: number;
  /** Loop animation */
  loop?: boolean;
  /** @deprecated kept for API compatibility; Lordicon React player does not expose loop prop in this repo typings */

  /** Play on hover (if loop=false) */
  hover?: boolean;
  /** Extra className */
  className?: string;
  /** Accessibility label */
  ariaLabel?: string;
};

type LordiconPlayerHandle = {
  playFromBeginning: () => void;
  play: () => void;
  pause: () => void;
};

function LordiconSolid({ src, size = 44, loop = false, hover = false, className, ariaLabel }: LordiconSolidProps) {
  const prefersReduced = usePrefersReducedMotion();
  const [animationData, setAnimationData] = useState<unknown | null>(null);
  const playerRef = useRef<LordiconPlayerHandle | null>(null);

  useEffect(() => {
    let active = true;
    setAnimationData(null);

    fetch(src)
      .then((r) => r.json())
      .then((data) => {
        if (active) setAnimationData(data);
      })
      .catch(() => {
        if (active) setAnimationData(null);
      });

    return () => {
      active = false;
    };
  }, [src]);

  const onEnter = () => {
    if (prefersReduced) return;
    try {
      if (!playerRef.current) return;
      playerRef.current.playFromBeginning();
      if (loop) playerRef.current.play();
    } catch {
      // ignore
    }
  };

  const onLeave = () => {
    if (prefersReduced) return;
    try {
      if (playerRef.current && !loop) playerRef.current.pause();
    } catch {
      // ignore
    }
  };

  return (
    <div
      style={{ width: size, height: size, display: "inline-block" }}
      className={className}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
      onMouseEnter={hover ? onEnter : undefined}
      onMouseLeave={hover ? onLeave : undefined}
    >
      {animationData ? (
        <LordiconPlayer
          ref={playerRef as unknown as never}
          icon={animationData as never}
          size={size}
        />
      ) : (

        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

export default LordiconSolid;



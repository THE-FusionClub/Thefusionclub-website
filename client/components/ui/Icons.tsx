import React, { useEffect, useRef, useState } from "react";
import { Player as LordiconPlayer } from "@lordicon/react";

type IconProps = {
  size?: number;
  className?: string;
  loop?: boolean;
  hover?: boolean;
};

const ICON_MAP: Record<string, string> = {
  wave: "https://cdn.lordicon.com/ayhtotha.json",
  lightning: "https://cdn.lordicon.com/igpbsrza.json",
  heart: "https://cdn.lordicon.com/ajkxzzfb.json",
  link: "https://cdn.lordicon.com/kiynvdns.json",
  pin: "https://cdn.lordicon.com/puvaffet.json",
  target: "https://cdn.lordicon.com/puvaffet.json",
  lock: "https://cdn.lordicon.com/zzcjjxew.json",
  satellite: "https://cdn.lordicon.com/udwhdpod.json",
  waveOcean: "https://cdn.lordicon.com/ayhtotha.json",
  factory: "https://cdn.lordicon.com/qduilmpq.json",
  robot: "https://cdn.lordicon.com/nocovwne.json",
  construction: "https://cdn.lordicon.com/ssvybplt.json",
  rocket: "https://cdn.lordicon.com/kiynvdns.json",
  calendar: "https://cdn.lordicon.com/pnhskdva.json",
};

function LordIcon({ src, size = 20, loop = false, hover = true, className }: { src: string; size?: number; loop?: boolean; hover?: boolean; className?: string }) {
  const [animationData, setAnimationData] = useState<unknown | null>(null);
  const playerRef = useRef<any | null>(null);

  useEffect(() => {
    let active = true;
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
    try {
      if (playerRef.current) {
        playerRef.current.playFromBeginning();
        if (loop) playerRef.current.play();
      }
    } catch {}
  };

  const onLeave = () => {
    try {
      if (playerRef.current && !loop) playerRef.current.pause();
    } catch {}
  };

  return (
    <div
      style={{ width: size, height: size, display: "inline-block" }}
      className={className}
      onMouseEnter={hover ? onEnter : undefined}
      onMouseLeave={hover ? onLeave : undefined}
    >
      {animationData ? (
          <LordiconPlayer ref={playerRef as unknown as never} icon={animationData as never} size={size} />
      ) : (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}

export function WaveIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.wave} size={size} loop={loop} hover={hover} className={className} />;
}

export function LightningIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.lightning} size={size} loop={loop} hover={hover} className={className} />;
}

export function HeartIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.heart} size={size} loop={loop} hover={hover} className={className} />;
}

export function LinkIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.link} size={size} loop={loop} hover={hover} className={className} />;
}

export function PinIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.pin} size={size} loop={loop} hover={hover} className={className} />;
}

export function TargetIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.target} size={size} loop={loop} hover={hover} className={className} />;
}

export function LockIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.lock} size={size} loop={loop} hover={hover} className={className} />;
}

export function SatelliteIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.satellite} size={size} loop={loop} hover={hover} className={className} />;
}

export function WaveOceanIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.waveOcean} size={size} loop={loop} hover={hover} className={className} />;
}

export function FactoryIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.factory} size={size} loop={loop} hover={hover} className={className} />;
}

export function RobotIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.robot} size={size} loop={loop} hover={hover} className={className} />;
}

export function ConstructionIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.construction} size={size} loop={loop} hover={hover} className={className} />;
}

export function RocketIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.rocket} size={size} loop={loop} hover={hover} className={className} />;
}

export function CalendarIcon({ size = 20, className, loop = false, hover = true }: IconProps) {
  return <LordIcon src={ICON_MAP.calendar} size={size} loop={loop} hover={hover} className={className} />;
}
import { useEffect, useRef, useState } from "react";
import { Player as LordiconPlayer } from "@lordicon/react";
import { CalendarIcon } from "@/components/ui/Icons";

export const iconMap: Record<string, { icon: string; color?: string }> = {
  target: { icon: "https://cdn.lordicon.com/puvaffet.json", color: "#2563eb" },
  lock: { icon: "https://cdn.lordicon.com/zzcjjxew.json", color: "#7c3aed" },
  satellite: { icon: "https://cdn.lordicon.com/udwhdpod.json", color: "#0f766e" },
  wave: { icon: "https://cdn.lordicon.com/ayhtotha.json", color: "#0284c7" },
  factory: { icon: "https://cdn.lordicon.com/qduilmpq.json", color: "#ea580c" },
  robot: { icon: "https://cdn.lordicon.com/nocovwne.json", color: "#9333ea" },
  construction: { icon: "https://cdn.lordicon.com/ssvybplt.json", color: "#f59e0b" },
  rocket: { icon: "https://cdn.lordicon.com/kiynvdns.json", color: "#dc2626" },
  calendar: { icon: "https://cdn.lordicon.com/pnhskdva.json", color: "#4f46e5" },
};

export function EventIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  const iconData = iconMap[icon];
  const [animationData, setAnimationData] = useState<unknown | null>(null);
  const playerRef = useRef<LordiconPlayer | null>(null);

  useEffect(() => {
    if (!iconData) return;
    let active = true;
    fetch(iconData.icon)
      .then((response) => response.json())
      .then((data) => { if (active) setAnimationData(data); })
      .catch(() => { if (active) setAnimationData(null); });
    return () => { active = false; };
  }, [iconData]);

  if (!iconData) {
    return <CalendarIcon size={size} />;
  }

  return (
    <div className="inline-flex items-center justify-center" style={{ width: size, height: size }}
      onMouseEnter={() => playerRef.current?.playFromBeginning()}>
      {animationData ? (
        <LordiconPlayer ref={playerRef} icon={animationData as never} size={size} colorize={iconData.color} />
      ) : (
        <CalendarIcon size={size} />
      )}
    </div>
  );
}
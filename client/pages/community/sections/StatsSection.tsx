import { useMemo } from "react";
import { useScrollReveal } from "@/utils/useScrollReveal";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function AnimatedSectionTitle({ text }: { text: string }) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.3, triggerOnce: true });
  const prefersReduced = usePrefersReducedMotion();

  return (
    <h2 ref={ref as any} className="c-sectionTitle">
      {prefersReduced ? (
        text
      ) : (
        text.split("").map((char, i) => (
          <span
            key={i}
            className={`c-letter ${isInView ? "is-visible" : ""}`}
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))
      )}
    </h2>
  );
}

function StatsCard({ title, value, suffix }: { title: string; value: number; suffix: string }) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, rootMargin: "0px 0px -80px 0px", triggerOnce: true });
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div ref={ref as any} className={`c-statsCard reveal ${isInView ? "is-visible" : ""}`}>
      <div className="c-statsValue">
        <AnimatedCounter value={value} suffix={suffix} isInView={isInView} prefersReduced={prefersReduced} />
      </div>
      <div className="c-statsTitle">{title}</div>
    </div>
  );
}

export default function StatsSection() {
  const stats = useMemo(() => [
    { title: "Community Members", value: 8000, suffix: "+" },
    { title: "Events", value: 25, suffix: "+" },
    { title: "Workshops", value: 150, suffix: "+" },
    { title: "Partners", value: 50, suffix: "+" },
    { title: "Social Reach", value: 100, suffix: "K+" },
  ], []);

  return (
    <section className="c-section c-stats">
      <div className="c-sectionInner">
        <AnimatedSectionTitle text="Community in Numbers" />
        <div className="c-statsGrid">
          {stats.map((s) => (
            <StatsCard key={s.title} title={s.title} value={s.value} suffix={s.suffix} />
          ))}
        </div>
      </div>
    </section>
  );
}
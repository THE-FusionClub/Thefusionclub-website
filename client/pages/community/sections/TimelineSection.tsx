import { useMemo } from "react";
import { useScrollReveal } from "@/utils/useScrollReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const journey = [
  { year: "2023", title: "Community Started", detail: "The first cohort, the first stories, the first momentum. A small group of builders came together." },
  { year: "2024", title: "First Workshop", detail: "Hands-on learning sessions that brought together developers, designers, and product thinkers." },
  { year: "2024", title: "Hackathon", detail: "Our first 48-hour build sprint — prototypes, presentations, and prizes." },
  { year: "2025", title: "Bootcamp", detail: "An intensive multi-week program covering full-stack development and design." },
  { year: "2025", title: "National Meetup", detail: "Builders from across the country gathered for a weekend of collaboration and celebration." },
  { year: "2026", title: "Growing National Community", detail: "A wider network of creators building in public, with chapters across multiple cities." },
];

type TimelineItemData = { year: string; title: string; detail: string };

function TimelineItem({ item, index }: { item: TimelineItemData; index: number }) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, triggerOnce: true });
  const side = index % 2 === 0 ? "left" : "right";

  return (
    <div className={`c-timelineItem ${side}`}>
      <div className="c-timelineDot" aria-hidden="true" />
      <div ref={ref as any} className={`c-timelineCard reveal ${isInView ? "is-visible" : ""}`}>
        <div className="c-timelineYear">{item.year}</div>
        <div className="c-timelineTitle">{item.title}</div>
        <div className="c-timelineDetail">{item.detail}</div>
      </div>
    </div>
  );
}

function AnimatedSectionTitle({ text }: { text: string }) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.3, triggerOnce: true });
  const prefersReduced = usePrefersReducedMotion();

  return (
    <h2 ref={ref as any} className="c-sectionTitle">
      {prefersReduced ? (
        text
      ) : (
        text.split("").map((char, i) => (
          <span key={i} className={`c-letter ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: `${i * 30}ms` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))
      )}
    </h2>
  );
}

export default function TimelineSection() {
  return (
    <section className="c-section">
      <div className="c-sectionInner">
        <AnimatedSectionTitle text="Our Journey" />
        <div className="c-timeline" aria-label="Community timeline">
          <div className="c-timelineLine" aria-hidden="true" />
          {journey.map((j, idx) => (
            <TimelineItem key={`${j.year}-${idx}`} item={j} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
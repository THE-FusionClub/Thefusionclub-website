import React, { useEffect, useMemo, useState } from "react";
import "./CommunityHighlightsBackgroundCarousel.css";

type Slide = {
  id: string;
  image: string;
  label: string;
};

export default function CommunityHighlightsBackgroundCarousel() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "s1",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80",
        label: "Community stories",
      },
      {
        id: "s2",
        image:
          "https://images.unsplash.com/photo-1522071820081-82c8b0c1b6cf?auto=format&fit=crop&w=1800&q=80",
        label: "Collaboration moments",
      },
      {
        id: "s3",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80",
        label: "Workshops in motion",
      },
      {
        id: "s4",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80",
        label: "Builders at play",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) return;

    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(t);
  }, [slides.length]);

  return (
    <section className="chbc-wrap" aria-label="Community highlights background">
      <div className="chbc-bg" aria-hidden="true">
        {slides.map((s, idx) => (
          <div
            key={s.id}
            className={`chbc-slide ${idx === active ? "is-active" : ""}`}
          >
            <img className="chbc-img" src={s.image} alt={s.label} />
          </div>
        ))}
        <div className="chbc-overlay" />
      </div>

      <div className="chbc-inner" aria-hidden="true">
        <div className="chbc-leftGlow" />
        <div className="chbc-rightGlow" />
        <div className="chbc-titles">
          <div className="chbc-kicker">DONE THIS</div>
          <div className="chbc-title">COUNTLESS TIMES BEFORE</div>
        </div>
        <div className="chbc-dots">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`chbc-dot ${idx === active ? "is-active" : ""}`}
              aria-label={`Background slide ${idx + 1}`}
              aria-current={idx === active}
              onClick={() => setActive(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


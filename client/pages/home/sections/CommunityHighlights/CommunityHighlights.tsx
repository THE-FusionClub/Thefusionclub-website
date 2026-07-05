import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CommunityHighlights.css";

type SecondaryCard = {
  id: string;
  category: "Instagram" | "YouTube" | "LinkedIn";
  title: string;
  description: string;
  image: string;
};

type FeaturedVideo = {
  title: string;
  embedUrl: string;
  thumbnail: string;
  stats: Array<{ label: string; value: string }>;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function CommunityHighlights() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const featured = useMemo<FeaturedVideo>(
    () => ({
      title: "Community in motion",
      embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0&modestbranding=1",
      thumbnail:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
      stats: [
        { label: "Likes", value: "12.4K" },
        { label: "Views", value: "98.1K" },
      ],
    }),
    []
  );

  const secondary = useMemo<SecondaryCard[]>(
    () => [
      {
        id: "c1",
        category: "Instagram",
        title: "Behind the scenes",
        description:
          "Builders, mentors, and the tiny details that make the magic work.",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "c2",
        category: "YouTube",
        title: "Workshops that ship",
        description: "Fast iteration cycles—designed for momentum, not meetings.",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "c3",
        category: "LinkedIn",
        title: "Culture, engineered",
        description:
          "A premium community built around clarity, growth, and craft.",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: "c4",
        category: "YouTube",
        title: "Cohorts in cinematic motion",
        description: "Reels, recaps, and stories—made to feel alive.",
        image:
          "https://images.unsplash.com/photo-1522071820081-82c8b0c1b6cf?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    []
  );

  const [glowVisible, setGlowVisible] = useState(false);

  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const setVars = () => {
      el.style.setProperty("--ch-cx", `${current.current.x}px`);
      el.style.setProperty("--ch-cy", `${current.current.y}px`);
    };

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.14;
      current.current.y += dy * 0.14;
      setVars();
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);

    target.current.x = x;
    target.current.y = y;

    if (!glowVisible) setGlowVisible(true);

    if (reducedMotion) {
      el.style.setProperty("--ch-cx", `${x}px`);
      el.style.setProperty("--ch-cy", `${y}px`);
    }
  };

  const onPointerLeave = () => setGlowVisible(false);

  return (
    <section
      ref={(n) => {
        sectionRef.current = n;
      }}
      className="ch-section"
      aria-label="Community Highlights"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="ch-bgLines" aria-hidden="true" />
      <div className="ch-dots" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className={`ch-dot ch-dot--${i % 6}`} />
        ))}
      </div>
      <div
        className={`ch-cursorGlow ${glowVisible ? "is-visible" : ""}`}
        aria-hidden="true"
      />

      <div className="ch-inner">
        <div className="ch-top">
          {/* Left: Header */}
          <div className="ch-hero">
            <div className="ch-headingGlow" aria-hidden="true" />
            <div className="ch-label">COMMUNITY HIGHLIGHTS</div>
            <h2 className="ch-heading">
              DONE THIS <span className="ch-headingCount">COUNTLESS</span> TIMES BEFORE.
            </h2>
            <p className="ch-description">
              Premium stories from builders, workshops, and moments that keep TFC Community moving.
            </p>
          </div>

          {/* Right: Featured video */}
          <div className="ch-rightFeatured" aria-label="Featured video">
            <div className="ch-featuredCard" role="group" aria-label="Featured video card">
              <div className="ch-featuredMedia">
                <img
                  className="ch-featuredPoster"
                  src={featured.thumbnail}
                  alt={featured.title}
                  loading="lazy"
                />

                <div className="ch-featuredViewport" aria-hidden="true">
                  <iframe
                    title={featured.title}
                    src={featured.embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <button
                  type="button"
                  className="ch-play"
                  aria-label="Play featured video"
                >
                  <span className="ch-playInner" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 6.5L16.5 11L8 15.5V6.5Z" fill="#0B0B10" />
                    </svg>
                  </span>
                </button>

                <div className="ch-statsChips" aria-hidden="true">
                  {featured.stats.map((s) => (
                    <div key={s.label} className="ch-chip">
                      <span className="ch-chipValue">{s.value}</span>
                      <span className="ch-chipLabel">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ch-featuredFooter">
                <div className="ch-featuredTitle">{featured.title}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary */}
        <div className="ch-grid" aria-label="More community highlights">
          {secondary.map((item) => (
            <article key={item.id} className="ch-card" aria-label={item.title}>
              <div className="ch-cardMedia">
                <img
                  className="ch-cardImg"
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
                <div className="ch-cardLightSweep" aria-hidden="true" />
              </div>

              <div className="ch-cardBody">
                <div className="ch-categoryPill">{item.category}</div>
                <div className="ch-cardTitle">{item.title}</div>
                <div className="ch-cardDesc">{item.description}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="ch-footerCta">
          <Link
            to="/community"
            className="ch-ctaBtn"
            aria-label="See all community"
          >
            <span>See all community</span>
            <span className="ch-ctaArrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>


      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            .ch-playInner { animation: none !important; }
          }
        `}
      </style>
    </section>
  );
}


import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CommunityHighlights.css";

type Platform = "Instagram" | "LinkedIn" | "YouTube";

type SecondaryCard = {
  id: string;
  platform: Platform;
  title: string;
  description: string;
  image: string;
  url: string;
};

type FeaturedCard = {
  id: string;
  platform: Platform;
  title: string;
  // External link that should open on click
  url: string;
  // iframe src (only used when embeddable is true)
  embedUrl: string;
  // Some platforms (e.g. LinkedIn) block iframe embedding via
  // X-Frame-Options, so we fall back to poster image + click-through.
  embeddable: boolean;
  thumbnail: string;
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

// BUG FIX: Instagram permalinks don't embed as-is — they need an
// explicit /embed path, and any query string must be stripped first.
function toInstagramEmbedUrl(permalink: string) {
  const clean = permalink.split("?")[0].replace(/\/$/, "");
  return `${clean}/embed`;
}

// BUG FIX: YouTube "watch?v=" links don't work inside an iframe —
// they need the dedicated /embed/VIDEO_ID form.
function toYouTubeEmbedUrl(watchUrl: string) {
  try {
    const u = new URL(watchUrl);
    const id = u.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : watchUrl;
  } catch {
    return watchUrl;
  }
}

const IG_PERMALINK = "https://www.instagram.com/p/DaZaLmmTIIi/?hl=en";
const LINKEDIN_URL =
  "https://www.linkedin.com/company/the-fusion-club-page/posts/?feedView=all";
const YT_WATCH_URL = "https://www.youtube.com/watch?v=qC77KnfRzd4&list=LL&index=1";

export default function CommunityHighlights() {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const fadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver for fade-up scroll animations
  useEffect(() => {
    if (reducedMotion) return;
    const els = fadeRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reducedMotion]);

  const [activeFilter, setActiveFilter] = useState<"All" | Platform>("All");

  const featuredCards = useMemo<FeaturedCard[]>(
    () => [
      {
        id: "f-ig",
        platform: "Instagram",
        title: "Community in motion",
        url: IG_PERMALINK,
        embedUrl: toInstagramEmbedUrl(IG_PERMALINK),
        embeddable: true,
        thumbnail: "/assets/community/L-1.png",
      },
      {
        id: "f-ln",
        platform: "LinkedIn",
        title: "Community in motion",
        url: LINKEDIN_URL,
        // LinkedIn blocks iframe embedding (X-Frame-Options), so we
        // never try to render it in an iframe — poster + click-through only.
        embedUrl: LINKEDIN_URL,
        embeddable: false,
        thumbnail: "/assets/community/L-2.png",
      },
      {
        id: "f-yt",
        platform: "YouTube",
        title: "Community in motion",
        url: YT_WATCH_URL,
        embedUrl: toYouTubeEmbedUrl(YT_WATCH_URL),
        embeddable: true,
        // BUG FIX: this used to reuse the Instagram thumbnail (L-1.png).
        // Point this at a real, distinct YouTube thumbnail asset.
        thumbnail: "/assets/community/L-3.png",
      },
    ],
    []
  );

  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [isFeaturedHovering, setIsFeaturedHovering] = useState(false);

  // Auto-rotate. Restarts its 5.2s countdown whenever featuredIdx changes
  // (including manual dot clicks) and pauses while hovered or when the
  // user prefers reduced motion.
  useEffect(() => {
    if (reducedMotion || isFeaturedHovering) return;

    const t = window.setInterval(() => {
      setFeaturedIdx((i) => (i + 1) % featuredCards.length);
    }, 5200);

    return () => window.clearInterval(t);
  }, [featuredCards.length, reducedMotion, featuredIdx, isFeaturedHovering]);

  const featured = featuredCards[featuredIdx];

  const secondary = useMemo<SecondaryCard[]>(
    () => [
      {
        id: "s-instagram",
        platform: "Instagram",
        title: "Instagram Highlight",
        description: "Behind-the-scenes community moments.",
        image: "/assets/logo.png",
        url: IG_PERMALINK,
      },
      {
        id: "s-linkedin",
        platform: "LinkedIn",
        title: "LinkedIn Highlight",
        description: "Company updates & community-first posts.",
        image: "/assets/logo.png",
        url: LINKEDIN_URL,
      },
      {
        id: "s-youtube",
        platform: "YouTube",
        title: "YouTube Highlight",
        description: "Recaps & stories from the TFC community.",
        image: "/assets/logo.png",
        url: YT_WATCH_URL,
      },
    ],
    []
  );

  const [glowVisible, setGlowVisible] = useState(false);

  const handleFeaturedOpen = () => {
    window.open(featured.url, "_blank", "noopener,noreferrer");
  };

  const handleFeaturedPlay = () => {
    handleFeaturedOpen();
  };

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
      <div className="ch-bgGlow" aria-hidden="true" />
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
            <div ref={(el) => { fadeRefs.current[0] = el; }} className="ch-fadeUp ch-delay-1">
              <div className="ch-headingGlow" aria-hidden="true" />
              <div className="ch-label">COMMUNITY HIGHLIGHTS</div>
              <h2 className="ch-heading">
                DONE THIS <span className="ch-headingCount">COUNTLESS</span> TIMES BEFORE.
              </h2>
              <p className="ch-description">
                Premium stories from builders, workshops, and moments that keep TFC Community moving.
              </p>
            </div>
          </div>

          {/* Right: Featured carousel */}
          <div className="ch-rightFeatured">
            <div ref={(el) => { fadeRefs.current[1] = el; }} className="ch-fadeUp ch-delay-2">
            <div
              className="ch-featuredCard"
              role="group"
              aria-label="Featured video card"
              onMouseEnter={() => setIsFeaturedHovering(true)}
              onMouseLeave={() => setIsFeaturedHovering(false)}
            >
              <div className="ch-featuredMedia">
                <img
                  className="ch-featuredPoster"
                  src={featured.thumbnail}
                  alt={featured.title}
                  loading="lazy"
                />

                {/* BUG FIX: only render the iframe for platforms that
                    actually allow embedding (Instagram/YouTube). LinkedIn
                    blocks this, so it just shows the poster image. */}
                {featured.embeddable && (
                  <div className="ch-featuredViewport" aria-hidden="true">
                    <iframe
                      title={featured.title}
                      src={featured.embedUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                <button
                  type="button"
                  className="ch-play"
                  aria-label="Open featured post"
                  onClick={handleFeaturedPlay}
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
              </div>

              <div className="ch-featuredFooter">
                <div className="ch-featuredTitle">{featured.title}</div>
              </div>

              {/* Carousel dots — click to jump to a slide, also resets
                  the auto-rotate timer so it doesn't immediately flip again */}
              <div
                className="ch-featuredDots"
                role="tablist"
                aria-label="Featured carousel navigation"
              >
                {featuredCards.map((card, idx) => (
                  <button
                    key={card.id}
                    type="button"
                    className={`ch-featuredDot ${idx === featuredIdx ? "is-active" : ""}`}
                    aria-label={`Show ${card.platform} featured post`}
                    aria-selected={idx === featuredIdx}
                    role="tab"
                    onClick={() => setFeaturedIdx(idx)}
                  />
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs + Secondary */}
        <div ref={(el) => { fadeRefs.current[2] = el; }} className="ch-fadeUp ch-delay-3 ch-filterRow" role="tablist" aria-label="Community highlights filter">
          {(["All", "Instagram", "LinkedIn", "YouTube"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`ch-filterTab ${tab === activeFilter ? "is-active" : ""}`}
              onClick={() => setActiveFilter(tab)}
              role="tab"
              aria-selected={tab === activeFilter}
            >
              {tab}
            </button>
          ))}
        </div>

        <div ref={(el) => { fadeRefs.current[3] = el; }} className="ch-fadeUp ch-delay-4 ch-grid" aria-label="More community highlights">
          {(activeFilter === "All"
            ? secondary
            : secondary.filter((c) => c.platform === activeFilter)
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              className="ch-card"
              aria-label={item.title}
              onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
            >
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
                <div className="ch-categoryPill">{item.platform}</div>
                <div className="ch-cardTitle">{item.title}</div>
                <div className="ch-cardDesc">{item.description}</div>
              </div>
            </button>
          ))}
        </div>

        <div ref={(el) => { fadeRefs.current[4] = el; }} className="ch-fadeUp ch-delay-5 ch-footerCta">
          <Link to="/community" className="ch-ctaBtn" aria-label="See all community">
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
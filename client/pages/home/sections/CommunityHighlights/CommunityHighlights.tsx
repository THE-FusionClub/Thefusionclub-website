import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/utils/useScrollReveal";
import { HeartIcon, LinkIcon, PinIcon } from "@/components/ui/Icons";
import "./CommunityHighlights.css";

type Platform = "Instagram" | "YouTube" | "LinkedIn";

type VideoItem = {
  id: string;
  title: string;
  platform: Platform;
  duration: string;
  thumbnail: string;
  videoUrl: string; // embed url
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

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

export default function CommunityHighlights() {
  const reducedMotion = usePrefersReducedMotion();

  const videos: VideoItem[] = useMemo(
    () => [
      {
        id: "v1",
        title: "How we build stories",
        platform: "Instagram",
        duration: "0:48",
        thumbnail:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
        videoUrl:
          "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
      },
      {
        id: "v2",
        title: "Reels from the community",
        platform: "YouTube",
        duration: "1:06",
        thumbnail:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
        videoUrl:
          "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0&modestbranding=1",
      },
      {
        id: "v3",
        title: "Moments that last",
        platform: "LinkedIn",
        duration: "0:57",
        thumbnail:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
        videoUrl:
          "https://www.youtube.com/embed/jfKfPfyJRdk?rel=0&modestbranding=1",
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [glowVisible, setGlowVisible] = useState(false);

  // Cursor glow smoothing
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Featured auto-advance
  useEffect(() => {
    if (reducedMotion) return;
    const t = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % videos.length);
    }, 5200);
    return () => window.clearInterval(t);
  }, [reducedMotion, videos.length]);

  // Entrance animations trigger
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const setVars = () => {
      if (!el) return;
      el.style.setProperty("--ch-cx", `${current.current.x}px`);
      el.style.setProperty("--ch-cy", `${current.current.y}px`);
    };

    const tick = () => {
      // Smooth interpolation (no lagging while staying subtle)
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.15;
      current.current.y += dy * 0.15;
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

  const onPointerLeave = () => {
    setGlowVisible(false);
  };

  // Preview carousel swipe
  const previewWrapRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({ dragging: false, startX: 0, startScroll: 0 });

  const onPreviewPointerDown = (e: React.PointerEvent) => {
    const wrap = previewWrapRef.current;
    if (!wrap) return;

    dragRef.current.dragging = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startScroll = wrap.scrollLeft;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  const onPreviewPointerMove = (e: React.PointerEvent) => {
    const wrap = previewWrapRef.current;
    if (!wrap) return;
    if (!dragRef.current.dragging) return;

    const dx = e.clientX - dragRef.current.startX;
    wrap.scrollLeft = dragRef.current.startScroll - dx;
  };

  const onPreviewPointerUp = () => {
    dragRef.current.dragging = false;
  };

  const selected = videos[activeIndex];

  const FeaturedArrows = ({
    onPrev,
    onNext,
  }: {
    onPrev: () => void;
    onNext: () => void;
  }) => {
    return (
      <>
        {/* <button
          type="button"
          className="ch-arrow ch-arrow--left"
          aria-label="Previous featured video"
          onClick={onPrev}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11.5 3.5L6.5 8.5L11.5 13.5"
              stroke="#7F22FE"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button> */}
        <button
          type="button"
          className="ch-arrow ch-arrow--right"
          aria-label="Next featured video"
          onClick={onNext}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M6.5 3.5L11.5 8.5L6.5 13.5"
              stroke="#7F22FE"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </>
    );
  };

  return (
    <section
      ref={(n) => {
        sectionRef.current = n;
      }}
      className="ch-section"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-label="Community Highlights"
      style={{
        // keep glow scoped and fade out when leaving
        // (CSS uses opacity transition on the .is-visible class)
      }}
    >
      {/* decorative dots */}
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
        <div className={`ch-hero ${isInView ? "is-in" : ""}`}>
          <div className="ch-label">COMMUNITY HIGHLIGHTS</div>

          <h2 className="ch-heading">
            <span className="ch-heading-strong">DONE THIS</span>
            <br />
            <span className="ch-heading-accent">COUNTLESS TIMES BEFORE.</span>
          </h2>

          <p className="ch-description">
            Every event tells a story. Every reel captures unforgettable moments.
            Explore a glimpse of the experiences that make TFC Community unique.
          </p>
        </div>

        <div className={`ch-featuredWrap ${isInView ? "is-in" : ""}`}>
          <div className="ch-featured" role="region" aria-label="Featured videos">
            <div className="ch-featuredCard">
              <div className="ch-featuredMedia">
                <div className="ch-featuredViewport">
                  <iframe
                    key={selected.id}
                    title={`Featured video: ${selected.title}`}
                    src={selected.videoUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="ch-featuredMeta">
                <div className="ch-featuredTitle">{selected.title}</div>
                <div className="ch-featuredBadges">
                  <span className="ch-pill ch-pill--platform">{selected.platform}</span>
                  <span className="ch-pill ch-pill--duration">{selected.duration}</span>
                </div>
              </div>

              <div className="ch-actionBar" aria-label="Social actions">
                <div className="ch-actionLeft">
                  <button type="button" className="ch-actionBtn" aria-label="Like">
                    <span className="ch-actionIcon" aria-hidden="true">
                      <HeartIcon size={18} />
                    </span>
                    <span className="ch-actionText">Like</span>
                  </button>
                  <button type="button" className="ch-actionBtn" aria-label="Share">
                    <span className="ch-actionIcon" aria-hidden="true">
                      <LinkIcon size={18} />
                    </span>
                    <span className="ch-actionText">Share</span>
                  </button>
                  <button type="button" className="ch-actionBtn" aria-label="Save">
                    <span className="ch-actionIcon" aria-hidden="true">
                      <PinIcon size={18} />
                    </span>
                    <span className="ch-actionText">Save</span>
                  </button>
                </div>

                <div className="ch-actionRight" aria-label="Open original post">
                  <a
                    className="ch-socialLink ch-socialLink--instagram"
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <span className="ch-socialIcon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="ch-tooltip">Instagram</span>
                  </a>
                  <a
                    className="ch-socialLink ch-socialLink--youtube"
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                  >
                    <span className="ch-socialIcon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12s0-4-1-5-5-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 5 1 9 1 8 0 9-1 1-5 1-5Z" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M10 15V9l5 3-5 3Z" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="ch-tooltip">YouTube</span>
                  </a>
                  <a
                    className="ch-socialLink ch-socialLink--linkedin"
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <span className="ch-socialIcon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16v16H4V4Z" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M8 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M8 8.5h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
                        <path d="M12 17v-3.5c0-1.4 1-2.5 2.3-2.5 1.2 0 2.2 1 2.2 2.6V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="ch-tooltip">LinkedIn</span>
                  </a>
                  <a
                    className="ch-socialLink ch-socialLink--facebook"
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <span className="ch-socialIcon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 8h3V5h-3c-1.7 0-3 1.3-3 3v3H8v3h3v6h3v-6h3l1-3h-4V8Z" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="ch-tooltip">Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            <FeaturedArrows
              onPrev={() => setActiveIndex((i) => (i - 1 + videos.length) % videos.length)}
              onNext={() => setActiveIndex((i) => (i + 1) % videos.length)}
            />

            <div className="ch-pagination" aria-label="Featured pagination">
              {videos.map((v, idx) => (
                <button
                  key={v.id}
                  type="button"
                  className={`ch-dotBtn ${idx === activeIndex ? "is-active" : ""}`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={idx === activeIndex}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={`ch-previewWrap ${isInView ? "is-in" : ""}`}>
          <div className="ch-previewHeader" aria-hidden="true" />

          <div className="ch-previewScroller" role="region" aria-label="Video previews">
            <div
              ref={(n) => {
                previewWrapRef.current = n;
              }}
              className="ch-previewRow"
              onPointerDown={onPreviewPointerDown}
              onPointerMove={onPreviewPointerMove}
              onPointerUp={onPreviewPointerUp}
              onPointerCancel={onPreviewPointerUp}
            >
              {videos.map((v, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={v.id}
                    type="button"
                    className={`ch-previewCard ${active ? "is-active" : ""}`}
                    aria-label={`Select featured video: ${v.title}`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <div className="ch-previewThumbWrap">
                      <img src={v.thumbnail} alt={v.title} className="ch-previewThumb" loading="lazy" />
                      <div className="ch-previewPlay" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                          <path
                            d="M8.5 6.5L16 11L8.5 15.5V6.5Z"
                            fill="#7F22FE"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="ch-previewInfo">
                      <div className="ch-previewTitle">{v.title}</div>
                      <div className="ch-previewBadges">
                        <span className="ch-pill ch-pill--platform ch-pill--small">{v.platform}</span>
                        <span className="ch-pill ch-pill--duration ch-pill--small">{v.duration}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`ch-cta ${isInView ? "is-in" : ""}`}>
<Link to="/community" className="ch-ctaBtn" aria-label="See all community">
            <span>See All Community</span>
            <span className="ch-ctaArrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}


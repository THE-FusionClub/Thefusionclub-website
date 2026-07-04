import { useCallback, useEffect, useState } from "react";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { useScrollReveal } from "@/utils/useScrollReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Correct path: asset lives in `client/assets/team.lottie`
const teamLottie = new URL("../../../assets/team.lottie", import.meta.url).href;

const featuredStories = [
  { 
    id: "fs1",
    title: "Building momentum in cohorts",
    description: "A behind-the-scenes look at how we structure learning sprints and keep builders engaged throughout the journey.",
    eventName: "Community Sprint #12",
    date: "2026-04-18",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0&modestbranding=1",
    platform: "YouTube",
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fs2",
    title: "From prototypes to products",
    description: "Design reviews, developer feedback, and rapid iteration cycles that turn ideas into shipped products.",
    eventName: "Workshop: Product Studio",
    date: "2026-02-07",
    embedUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?rel=0&modestbranding=1",
    platform: "YouTube",
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fs3",
    title: "Moments that last forever",
    description: "Celebrating community wins—small and big. Every milestone is a story worth sharing.",
    eventName: "Showcase Night",
    date: "2025-11-21",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
    platform: "YouTube",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "fs4",
    title: "Hackathon weekend recap",
    description: "48 hours of coding, designing, and presenting. See what our teams built under pressure.",
    eventName: "Buildathon 2026",
    date: "2026-01-15",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0&modestbranding=1",
    platform: "YouTube",
    thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  },
];

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

export default function FeaturedStories() {
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const t = window.setInterval(() => setFeaturedIdx((i) => (i + 1) % featuredStories.length), 6200);
    return () => window.clearInterval(t);
  }, [featuredStories.length, reducedMotion]);

  const toggleLike = useCallback((id: string) => {
    setLikedStories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <section className="c-section">
      <div className="c-sectionInner">
        <AnimatedSectionTitle text="Featured Stories" />

        <div className="c-featuredGrid">
          {/* Animation (left on desktop) */}
          <div className="c-featuredAnim">
            <div className="c-featuredAnimInner">
              {/* Lottie animation */}
              <DotLottieReact src={teamLottie} autoplay loop className="c-featuredAnimFallback" />
            </div>
          </div>

          {/* Main Video + content (right on desktop) */}
          <div className="c-featuredMain reveal">
            <div className="c-featuredVideo">
              <iframe
                key={featuredStories[featuredIdx].id}
                title={featuredStories[featuredIdx].title}
                src={featuredStories[featuredIdx].embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="c-featuredBody">
              <div className="c-featuredKicker">{featuredStories[featuredIdx].eventName}</div>
              <div className="c-featuredHeadline">{featuredStories[featuredIdx].title}</div>
              <div className="c-featuredDesc">{featuredStories[featuredIdx].description}</div>
              <div className="c-featuredActions">
                <button
                  type="button"
                  className={`c-featuredLike ${likedStories.has(featuredStories[featuredIdx].id) ? "is-liked" : ""}`}
                  onClick={() => toggleLike(featuredStories[featuredIdx].id)}
                  aria-label="Like this story"
                >
                  <span aria-hidden="true" className="c-likeIcon">
                    {likedStories.has(featuredStories[featuredIdx].id) ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21s-7-4.7-9.3-8.5C.4 9.1 2 6 5.3 6c1.9 0 3.1 1 3.7 2 0 0 1.2-2 4-2 3.3 0 4.9 3.1 2.6 6.5C19 16.3 12 21 12 21Z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21s-7-4.7-9.3-8.5C.4 9.1 2 6 5.3 6c1.9 0 3.1 1 3.7 2 0 0 1.2-2 4-2 3.3 0 4.9 3.1 2.6 6.5C19 16.3 12 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span>Like</span>
                </button>
                <a href={featuredStories[featuredIdx].embedUrl} target="_blank" rel="noreferrer" className="c-featuredOpen">
                  <span>Open Original Post</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar Carousel */}
          <div className="c-featuredSide">
            {featuredStories.map((story, idx) => (
              <button
                key={story.id}
                type="button"
                className={`c-featuredSideCard ${idx === featuredIdx ? "is-active" : ""}`}
                onClick={() => setFeaturedIdx(idx)}
                aria-label={`Select: ${story.title}`}
              >
                <div className="c-featuredSideThumb">
                  <img src={story.thumbnail} alt={story.title} loading="lazy" />
                </div>
                <div className="c-featuredSideInfo">
                  <div className="c-featuredSideTitle">{story.title}</div>
                  <div className="c-featuredSideMeta">
                    {story.eventName} · {new Date(story.date).toLocaleDateString()}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
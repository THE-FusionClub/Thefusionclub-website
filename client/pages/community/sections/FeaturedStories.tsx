import React, { useCallback, useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";


const featuredStories = [
  { 
    id: "fs1",
    title: "Building momentum in cohorts",
    description: "A behind-the-scenes look at how we structure learning sprints and keep builders engaged throughout the journey.",
    eventName: "Community Sprint #12",
    date: "2026-04-18",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0&modestbranding=1",
    platform: "YouTube",
    thumbnail: "/assets/community/trip-1.jpeg",
  },
  {
    id: "fs2",
    title: "From prototypes to products",
    description: "Design reviews, developer feedback, and rapid iteration cycles that turn ideas into shipped products.",
    eventName: "Workshop: Product Studio",
    date: "2026-02-07",
    embedUrl: "https://www.youtube.com/embed/jfKfPfyJRdk?rel=0&modestbranding=1",
    platform: "YouTube",
    thumbnail: "/assets/community/idea-1.jpg",
  },
  {
    id: "fs3",
    title: "Moments that last forever",
    description: "Celebrating community wins—small and big. Every milestone is a story worth sharing.",
    eventName: "Showcase Night",
    date: "2025-11-21",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1",
    platform: "YouTube",
    thumbnail: "/assets/events/fusionX.png",
  },
  {
    id: "fs4",
    title: "Hackathon weekend recap",
    description: "48 hours of coding, designing, and presenting. See what our teams built under pressure.",
    eventName: "Buildathon 2026",
    date: "2026-01-15",
    embedUrl: "https://www.youtube.com/embed/ysz5S6PUM-U?rel=0&modestbranding=1",
    platform: "YouTube",
    thumbnail: "/assets/events/raibaryX.png",
  },
];

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
        <h2 className="c-sectionTitle">Featured Stories</h2>

        <div className="c-featuredGrid">
          {/* Featured Story Card */}
          <div className="c-featuredAnim">
            <div className="c-featuredAnimCard">
              <div className="c-featuredAnimThumb">
                <img
                  src={featuredStories[featuredIdx].thumbnail}
                  alt={featuredStories[featuredIdx].title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="c-featuredAnimBody">
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

import { useState } from "react";

const socialPosts = [
  { id: "sp1", platform: "Instagram" as const, title: "Behind the scenes at our latest workshop — the energy was unreal!", date: "2 days ago", url: "#" },
  { id: "sp2", platform: "LinkedIn" as const, title: "Our founder shares the vision behind TFC's community-first approach.", date: "1 week ago", url: "#" },
  { id: "sp3", platform: "YouTube" as const, title: "Watch the full recap of our National Meetup 2026", date: "3 weeks ago", url: "#" },
  { id: "sp4", platform: "Instagram" as const, title: "Reels from the hackathon — see the prototypes that won!", date: "5 days ago", url: "#" },
  { id: "sp5", platform: "LinkedIn" as const, title: "Workshop recap: Product Studio — from idea to MVP in 2 weeks", date: "2 weeks ago", url: "#" },
  { id: "sp6", platform: "YouTube" as const, title: "Community Spotlight: Stories of growth and collaboration", date: "1 month ago", url: "#" },
  { id: "sp7", platform: "Instagram" as const, title: "Celebrating our 100th community milestone!", date: "1 day ago", url: "#" },
  { id: "sp8", platform: "LinkedIn" as const, title: "New partnership announcement — expanding our reach", date: "4 days ago", url: "#" },
  { id: "sp9", platform: "YouTube" as const, title: "Bootcamp Day 1: Foundations of full-stack development", date: "2 weeks ago", url: "#" },
];

type SocialPlatform = "Instagram" | "LinkedIn" | "YouTube";

function SocialPlatformIcon({ platform }: { platform: SocialPlatform }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  if (platform === "Instagram") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (platform === "YouTube") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M22 12s0-4-1-5-5-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 5 1 9 1 8 0 9-1 1-5 1-5Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 15V9l5 3-5 3Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <path d="M4 4h16v16H4V4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 8.5h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M12 17v-3.5c0-1.4 1-2.5 2.3-2.5 1.2 0 2.2 1 2.2 2.6V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SocialWall() {
  const [socialTab, setSocialTab] = useState("All");
  const socialTabs = ["All", "Instagram", "LinkedIn", "YouTube"];
  const filteredPosts = socialTab === "All" ? socialPosts : socialPosts.filter((p) => p.platform === socialTab);

  return (
    <section className="c-section">
      <div className="c-sectionInner">
        <div className="c-socialTabs" role="tablist" aria-label="Social platform filter">
          {socialTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`c-socialTab ${socialTab === tab ? "is-active" : ""}`}
              onClick={() => setSocialTab(tab)}
              role="tab"
              aria-selected={socialTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="c-socialGrid">
          {filteredPosts.map((post) => (
            <a key={post.id} href={post.url} target="_blank" rel="noreferrer" className="c-socialCard">
              <div className="c-socialCardPlatform">
                <span className="c-socialPlatformIcon" aria-hidden="true"><SocialPlatformIcon platform={post.platform} /></span>
                {post.platform}
              </div>
              <div className="c-socialCardTitle">{post.title}</div>
              <div className="c-socialCardDate">{post.date}</div>
              <div className="c-socialCardArrow" aria-hidden="true">↗</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
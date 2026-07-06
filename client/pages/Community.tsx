import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import { useScrollReveal } from "@/utils/useScrollReveal";
import "./Community.css";

/* ── Utility Hooks ── */

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

function useCursorGlow() {
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const updateVars = () => {
      document.documentElement.style.setProperty("--community-cx", `${current.current.x}px`);
      document.documentElement.style.setProperty("--community-cy", `${current.current.y}px`);
    };

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.14;
      current.current.y += dy * 0.14;
      updateVars();
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!active) setActive(true);
      if (prefersReduced) {
        current.current.x = target.current.x;
        current.current.y = target.current.y;
        updateVars();
      }
    };
    const onLeave = () => setActive(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [active]);

  return { active };
}

/* ── Scroll Progress ── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handle = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return (
    <div className="c-scrollProgress" aria-hidden="true">
      <div className="c-scrollProgressBar" style={{ width: `${progress * 100}%` }} />
    </div>
  );
}

/* ── Floating Particles ── */
function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 3 + Math.random() * 4,
      duration: 12 + Math.random() * 20,
      delay: Math.random() * 15,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, []);
  const prefersReduced = usePrefersReducedMotion();
  if (prefersReduced) return null;
  return (
    <div className="c-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="c-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated Counter ── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useScrollReveal({ threshold: 0.3, triggerOnce: true });
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!isInView || prefersReduced) {
      setCount(value);
      return;
    }
    let start = 0;
    const duration = 1500;
    const step = 16;
    const totalSteps = duration / step;
    const increment = value / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, step);

    return () => clearInterval(timer);
  }, [isInView, value, prefersReduced]);

  return (
    <span ref={ref as any}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Section Title with Letter-by-Letter Animation ── */
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

/* ── Statistics Card ── */
function StatsCard({ title, value, suffix }: { title: string; value: number; suffix: string }) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.2, rootMargin: "0px 0px -80px 0px", triggerOnce: true });

  return (
    <div ref={ref as any} className={`c-statsCard reveal ${isInView ? "is-visible" : ""}`}>
      <div className="c-statsValue">
        <AnimatedCounter value={value} suffix={suffix} />
      </div>
      <div className="c-statsTitle">{title}</div>
      <div className="c-statsHint">{ /* hidden hint for spacing */ }</div>
    </div>
  );
}

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

/* ── Image Grid Data ── */
const galleryImages = [
  { id: "g1", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80", title: "Event Kickoff", size: "tall" },
  { id: "g2", src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80", title: "Workshop Moments", size: "small" },
  { id: "g3", src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", title: "Team Collaboration", size: "medium" },
  { id: "g4", src: "https://images.unsplash.com/photo-1522071820081-82c8b0c1b6cf?auto=format&fit=crop&w=600&q=80", title: "Networking Night", size: "small" },
  { id: "g5", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80", title: "Community Celebration", size: "tall" },
  { id: "g6", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", title: "Hackathon", size: "small" },
  { id: "g7", src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=800&q=80", title: "Design Review", size: "medium" },
  { id: "g8", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80", title: "Keynote Session", size: "small" },
  { id: "g9", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", title: "Mentorship", size: "medium" },
  { id: "g10", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", title: "Group Photo", size: "tall" },
];

/* ── Bento Grid Data ── */
type BentoIconName =
  | "innovation"
  | "networking"
  | "leadership"
  | "projects"
  | "mentorship"
  | "hackathons"
  | "community"
  | "learning";

function BentoIcon({ name }: { name: BentoIconName }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (name) {
    case "innovation":
      return (
        <svg {...common} aria-hidden="true">
          <path
            d="M9 18h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 22h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 2a7 7 0 0 0-4 12c.5.4 1 1.1 1 1.8V17h6v-1.2c0-.7.5-1.4 1-1.8A7 7 0 0 0 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "networking":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="5" cy="12" r="2.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="19" cy="12" r="2.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="19" r="2.2" stroke="currentColor" strokeWidth="2" />
          <path
            d="M10 7.2 7.2 10 7.2 14 10 16.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14 7.2 16.8 10 16.8 14 14 16.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "leadership":
      return (
        <svg {...common} aria-hidden="true">
          <path
            d="M12 2l3 6 6 1-4.5 4.2 1 6.6L12 17l-5.5 3.8 1-6.6L3 9l6-1 3-6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "projects":
      return (
        <svg {...common} aria-hidden="true">
          <path
            d="M12 2 20 6v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M9 12l2 2 4-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "mentorship":
      return (
        <svg {...common} aria-hidden="true">
          <path
            d="M4 19c2-4 14-4 16 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 15a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M19 8h2m-1-1v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "hackathons":
      return (
        <svg {...common} aria-hidden="true">
          <path
            d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "community":
      return (
        <svg {...common} aria-hidden="true">
          <path
            d="M16 11c1.7 0 3-1.3 3-3S17.7 5 16 5s-3 1.3-3 3 1.3 3 3 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 20c.5-3.5 3-6 6.5-6s6 2.5 6.5 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M14.5 20c.3-2.2 1.7-4 4-4 1.2 0 2.2.3 3 .9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "learning":
      return (
        <svg {...common} aria-hidden="true">
          <path
            d="M4 19c0-1.1 7-1.1 7 0v-13c0-1.1-7-1.1-7 0v13Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M11 6c0-1.1 7-1.1 7 0v13c0-1.1-7-1.1-7 0V6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M4 19c0 1.1 7 1.1 7 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Bento Card ── */
function BentoCard({ item }: { item: typeof bentoItems[number] }) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref as any}
      className={`c-bentoItem ${item.size} reveal ${isInView ? "is-visible" : ""}`}
    >
      <div className="c-bentoIcon">
        <BentoIcon name={item.icon} />
      </div>
      <div className="c-bentoTitle">{item.title}</div>
      <div className="c-bentoDesc">{item.desc}</div>
    </div>
  );
}

const bentoItems = [
  { id: "b1", icon: "innovation" as const, title: "Innovation", desc: "Prototype, iterate, and ship brave ideas with peer support.", size: "" },
  { id: "b2", icon: "networking" as const, title: "Networking", desc: "Connect with creators, developers, and designers across colleges.", size: "tall" },
  { id: "b3", icon: "leadership" as const, title: "Leadership", desc: "Own projects, lead teams, and make community-first decisions.", size: "" },
  { id: "b4", icon: "projects" as const, title: "Projects", desc: "Build real-world products from concept to deployment.", size: "wide" },
  { id: "b5", icon: "mentorship" as const, title: "Mentorship", desc: "Learn from seniors, alumni, and industry professionals.", size: "" },
  { id: "b6", icon: "hackathons" as const, title: "Hackathons", desc: "Compete, collaborate, and create under pressure.", size: "tall" },
  { id: "b7", icon: "community" as const, title: "Community", desc: "Be part of a growing family of builders and creators.", size: "wide" },
  { id: "b8", icon: "learning" as const, title: "Learning", desc: "Hands-on workshops, resources, and guided sprints.", size: "big" },
];

/* ── Partners Data ── */
const partners = ["Google", "Microsoft", "AWS", "Figma", "Notion", "Vercel", "GitHub", "Linear", "Supabase", "Railway"];

/* ── Testimonials Data ── */
const testimonials = [
  { id: "t1", name: "Ananya Sharma", role: "Community Member, IIT", quote: "The best community I've joined. The feedback culture is incredible—fast iteration, real care.", rating: 5, photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80" },
  { id: "t2", name: "Rohit Verma", role: "Workshop Attendee, VIT", quote: "I shipped my first project because the learning was hands-on and premium. Truly transformative.", rating: 5, photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" },
  { id: "t3", name: "Priya Patel", role: "Organizer, SRM", quote: "A community that's calm, focused, and creative—exactly what I needed to grow.", rating: 5, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
  { id: "t4", name: "Arjun Nair", role: "Hackathon Winner", quote: "From zero to shipping in 48 hours. The energy here is unmatched.", rating: 5, photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
  { id: "t5", name: "Kavya Singh", role: "Design Lead", quote: "Design reviews here shaped how I think about products. Forever grateful.", rating: 5, photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80" },
  { id: "t6", name: "Neha Gupta", role: "Mentee → Mentor", quote: "I joined as a learner and now I mentor others. That's the TFC effect.", rating: 5, photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80" },
];

type SocialPlatform = "Instagram" | "LinkedIn" | "YouTube";

function SocialPlatformIcon({ platform }: { platform: SocialPlatform }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

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

  // LinkedIn
  return (
    <svg {...common} aria-hidden="true">
      <path d="M4 4h16v16H4V4Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 8.5h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M12 17v-3.5c0-1.4 1-2.5 2.3-2.5 1.2 0 2.2 1 2.2 2.6V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Social Posts Data ── */
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


/* ════════════════════════════════════════
   MAIN PAGE COMPONENT
   ════════════════════════════════════════ */
export default function Community() {
  const { active: glowActive } = useCursorGlow();
  const reducedMotion = usePrefersReducedMotion();

  /* ── Stats ── */
  const stats = useMemo(() => [
    { title: "Community Members", value: 8000, suffix: "+" },
    { title: "Events", value: 25, suffix: "+" },
    { title: "Workshops", value: 150, suffix: "+" },
    { title: "Partners", value: 50, suffix: "+" },
    { title: "Social Reach", value: 100, suffix: "K+" },
  ], []);

  /* ── Featured Stories ── */
  const featuredStories = useMemo(() => [
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
  ], []);

  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());

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

  /* ── Gallery Modal ── */
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImg, setGalleryImg] = useState(galleryImages[0]);
  const galleryModalRef = useRef<HTMLDivElement | null>(null);
  const galleryCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  const openGallery = useCallback((img: typeof galleryImages[0]) => {
    setGalleryImg(img);
    setGalleryOpen(true);
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
  }, []);

  useEffect(() => {
    if (!galleryOpen) return;
    // Focus the close button when modal opens
    const t = window.setTimeout(() => {
      galleryCloseBtnRef.current?.focus();
    }, 50);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [galleryOpen]);

  useEffect(() => {
    if (!galleryOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeGallery();
        return;
      }
      // Focus trap within modal
      if (e.key === "Tab") {
        const focusable = galleryModalRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryOpen, closeGallery]);

  /* ── Timeline ── */
  const journey = useMemo(() => [
    { year: "2023", title: "Community Started", detail: "The first cohort, the first stories, the first momentum. A small group of builders came together." },
    { year: "2024", title: "First Workshop", detail: "Hands-on learning sessions that brought together developers, designers, and product thinkers." },
    { year: "2024", title: "Hackathon", detail: "Our first 48-hour build sprint — prototypes, presentations, and prizes." },
    { year: "2025", title: "Bootcamp", detail: "An intensive multi-week program covering full-stack development and design." },
    { year: "2025", title: "National Meetup", detail: "Builders from across the country gathered for a weekend of collaboration and celebration." },
    { year: "2026", title: "Growing National Community", detail: "A wider network of creators building in public, with chapters across multiple cities." },
  ], []);

  /* ── Social Tabs ── */
  const [socialTab, setSocialTab] = useState("All");
  const socialTabs = ["All", "Instagram", "LinkedIn", "YouTube"];
  const filteredPosts = socialTab === "All" ? socialPosts : socialPosts.filter((p) => p.platform === socialTab);

  /* ── Testimonials Auto Scroll ── */
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [testimonialsIdx, setTestimonialsIdx] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => {
      setTestimonialsIdx((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(t);
  }, [testimonials.length, reducedMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[testimonialsIdx] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
    }
  }, [testimonialsIdx]);

  return (
    <div className="c-page">
      {/* Global Effects */}
      <ScrollProgress />
      <FloatingParticles />
      <div className={`c-cursorGlow ${glowActive ? "is-visible" : ""}`} aria-hidden="true" />

      <Navbar />

      {/* ════════════════════════════════════
          1. HERO SECTION
         ════════════════════════════════════ */}
      <header className="c-hero">
        <div className="c-heroInner">
          <div className="c-heroLeft">
            {/* <div className="c-heroLabel">COMMUNITY</div> */}
            <h1 className="c-heroTitle">
              More Than Events.<br />
              <span className="c-heroTitleAccent">We Build Experiences.</span>
            </h1>
            <p className="c-heroDesc">
              Every workshop, every meetup, every event, and every collaboration strengthens the TFC Community.
              Explore our journey, our people, and the memories we've created together.
            </p>
            <div className="c-heroActions">
              <Link to="/join-event" className="c-primaryBtn">
                <span>Join Community</span>
                <span className="c-btnArrow">→</span>
              </Link>
              <a href="#gallery" className="c-secondaryBtn">
                <span>Explore Gallery</span>
                <span className="c-btnArrow">→</span>
              </a>
            </div>
          </div>

          <div className="c-heroRight">
            <div className="c-heroCollage">
              <div className="c-heroCollageImg">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                  alt="Community event"
                  loading="lazy"
                />
              </div>
              <div className="c-heroCollageImg">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-82c8b0c1b6cf?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  loading="lazy"
                />
              </div>
              <div className="c-heroCollageImg">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
                  alt="Workshop"
                  loading="lazy"
                />
              </div>
              <div className="c-heroCollageImg">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="Networking"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════
          Community Philosophy Manifesto
         ════════════════════════════════════ */}
      <div className="c-manifesto">
        <div className="c-manifestoInner">
          {["Learn Together", "Build Together", "Lead Together", "Grow Together", "Celebrate Together"].map((text) => (
            <div key={text} className="c-manifestoItem">
              <span className="c-manifestoDot" />
              <span className="c-manifestoText">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          2. COMMUNITY IN NUMBERS
         ════════════════════════════════════ */}
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

      {/* ════════════════════════════════════
          3. FEATURED STORIES
         ════════════════════════════════════ */}
      <section className="c-section">
        <div className="c-sectionInner">
          <AnimatedSectionTitle text="Featured Stories" />

          <div className="c-featuredGrid">
            {/* Featured Story Card */}
            <div className="c-featuredAnim">
              <div className="c-featuredAnimCard">
                <div className="c-featuredAnimThumb">
                  <img
                    src={featuredStories[featuredIdx].thumbnail}
                    alt={featuredStories[featuredIdx].title}
                    loading="lazy"
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
                            <path
                              d="M12 21s-7-4.7-9.3-8.5C.4 9.1 2 6 5.3 6c1.9 0 3.1 1 3.7 2 0 0 1.2-2 4-2 3.3 0 4.9 3.1 2.6 6.5C19 16.3 12 21 12 21Z"
                              fill="currentColor"
                            />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 21s-7-4.7-9.3-8.5C.4 9.1 2 6 5.3 6c1.9 0 3.1 1 3.7 2 0 0 1.2-2 4-2 3.3 0 4.9 3.1 2.6 6.5C19 16.3 12 21 12 21Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
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

      {/* ════════════════════════════════════
          4. COMMUNITY GALLERY (Pinterest)
         ════════════════════════════════════ */}
      <section className="c-section" id="gallery">
        <div className="c-sectionInner">
          <AnimatedSectionTitle text="Community Gallery" />

          <div className="c-galleryGrid" aria-label="Community photo gallery">
            {galleryImages.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  className="c-galleryItem"
                  onClick={() => openGallery(img)}
                  aria-label={`Open ${img.title}`}
                >
                  <img src={img.src} alt={img.title} loading="lazy" />
                  <div className="c-galleryOverlay">
                    <span className="c-galleryItemTitle">{img.title}</span>
                  </div>
                </button>
            ))}
          </div>

          {/* Gallery Modal */}
          {galleryOpen && (
            <div className="c-galleryModal" role="dialog" aria-modal="true" aria-label="Photo viewer" ref={galleryModalRef}>
              <div className="c-galleryModalBackdrop" onClick={closeGallery} />
              <div className="c-galleryModalContent">
                <img className="c-galleryModalImg" src={galleryImg.src} alt={galleryImg.title} />
                <div className="c-galleryModalInfo">
                  <span className="c-galleryModalTitle">{galleryImg.title}</span>
                  <button
                    type="button"
                    ref={galleryCloseBtnRef}
                    className="c-galleryModalClose"
                    onClick={closeGallery}
                    aria-label="Close gallery"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>

                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════
          5. EVENT TIMELINE
         ════════════════════════════════════ */}
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

      {/* ════════════════════════════════════
          6. MEET OUR LEADERS
         ════════════════════════════════════ */}
      <section className="c-section">
        <div className="c-sectionInner">
          <AnimatedSectionTitle text="Meet Our Leaders" />

          <div className="c-leadersGrid">
            {/* Founder */}
            <div className="c-leaderCard">
              <div className="c-leaderVisual">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                  alt="Founder"
                  loading="lazy"
                />
                <div className="c-leaderVisualOverlay" />
              </div>
              <div className="c-leaderInfo">
                <div className="c-leaderRole">Founder</div>
                <div className="c-leaderName">Alex Rivera</div>
                <div className="c-leaderQuote">
                  "Our vision has always been to create a community where innovation meets collaboration.
                  Every builder deserves a space to grow, ship, and lead."
                </div>
                <div className="c-leaderSignature">~ Alex Rivera</div>
              </div>
            </div>

            {/* Co-Founder (Alternate) */}
            <div className="c-leaderCard c-leaderCardAlt">
              <div className="c-leaderVisual">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80"
                  alt="Co-Founder"
                  loading="lazy"
                />
                <div className="c-leaderVisualOverlay" />
              </div>
              <div className="c-leaderInfo">
                <div className="c-leaderRole">Co-Founder</div>
                <div className="c-leaderName">Maya Chen</div>
                <div className="c-leaderQuote">
                  "We build with care—through mentorship, review culture, and learning that compounds.
                  Great teams form when communication is thoughtful."
                </div>
                <div className="c-leaderSignature">~ Maya Chen</div>
              </div>
            </div>

            {/* CTO */}
            <div className="c-leaderCard">
              <div className="c-leaderVisual">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80"
                  alt="CTO"
                  loading="lazy"
                />
                <div className="c-leaderVisualOverlay" />
              </div>
              <div className="c-leaderInfo">
                <div className="c-leaderRole">CTO</div>
                <div className="c-leaderName">Rajan Patel</div>
                <div className="c-leaderQuote">
                  "Technology is the enabler, but community is the catalyst.
                  We're building the infrastructure for the next generation of builders."
                </div>
                <div className="c-leaderSignature">~ Rajan Patel</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          7. SOCIAL WALL
         ════════════════════════════════════ */}
      <section className="c-section">
        <div className="c-sectionInner">
          <AnimatedSectionTitle text="Social Wall" />

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
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="c-socialCard"
              >
                <div className="c-socialCardPlatform">
                  <span className="c-socialPlatformIcon" aria-hidden="true">
                    <SocialPlatformIcon platform={post.platform} />
                  </span>
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

      {/* ════════════════════════════════════
          8. TESTIMONIALS
         ════════════════════════════════════ */}
      <section className="c-section">
        <div className="c-sectionInner">
          <AnimatedSectionTitle text="Testimonials" />

          <div className="c-testimonialsTrack" ref={trackRef} aria-label="Testimonials carousel">
            {testimonials.map((t) => (
              <div key={t.id} className="c-testCard">
                <div className="c-testStars" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < t.rating ? "is-on" : ""}>★</span>
                  ))}
                </div>
                <div className="c-testQuote">"{t.quote}"</div>
                <div className="c-testAuthor">
                  <img className="c-testAuthorImg" src={t.photo} alt={t.name} loading="lazy" />
                  <div>
                    <div className="c-testAuthorName">{t.name}</div>
                    <div className="c-testAuthorRole">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          9. WHY JOIN TFC (Bento Grid)
         ════════════════════════════════════ */}
      <section className="c-section">
        <div className="c-sectionInner">
          <AnimatedSectionTitle text="Why Join TFC" />

          <div className="c-bentoGrid">
            {bentoItems.map((item) => {
              return (
                <BentoCard key={item.id} item={item} />
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          10. PARTNERS
         ════════════════════════════════════ */}
      <section className="c-section">
        <div className="c-sectionInner">
          <AnimatedSectionTitle text="Our Partners" />

          <div className="c-partners" aria-label="Partner logos">
            <div className="c-partnersTrack">
              {[...partners, ...partners].map((name, i) => (
                <div key={`${name}-${i}`} className="c-partnerLogo">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          11. JOIN COMMUNITY CTA
         ════════════════════════════════════ */}
      <section className="c-ctaSection">
        <div className="c-ctaDots" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="c-ctaDot"
              style={{
                left: `${10 + (i * 8) % 80}%`,
                top: `${15 + (i * 13) % 70}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${6 + (i % 4) * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="c-ctaInner">
          <div className="c-ctaKicker">Join Community</div>
          <h2 className="c-ctaTitle">
            Ready to Build<br />
            <span className="c-ctaTitleAccent">Something Bigger?</span>
          </h2>
          <p className="c-ctaDesc">
            Join the TFC Community Today. Take part in a premium learning experience—workshops, stories, and collaborations built with intention.
          </p>
          <div className="c-ctaActions">
            <Link to="/join-event" className="c-primaryBtn">
              <span>Join Now</span>
              <span className="c-btnArrow">→</span>
            </Link>
            <Link to="/events#contact" className="c-secondaryBtn">
              <span>Explore Event</span>
              <span className="c-btnArrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
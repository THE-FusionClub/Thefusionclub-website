import { useScrollReveal } from "@/utils/useScrollReveal";

type BentoIconName = "innovation" | "networking" | "leadership" | "projects" | "mentorship" | "hackathons" | "community" | "learning";

function BentoIcon({ name }: { name: BentoIconName }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

  switch (name) {
    case "innovation":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 22h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 2a7 7 0 0 0-4 12c.5.4 1 1.1 1 1.8V17h6v-1.2c0-.7.5-1.4 1-1.8A7 7 0 0 0 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "networking":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="5" cy="12" r="2.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="19" cy="12" r="2.2" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="19" r="2.2" stroke="currentColor" strokeWidth="2" />
          <path d="M10 7.2 7.2 10 7.2 14 10 16.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 7.2 16.8 10 16.8 14 14 16.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "leadership":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 2l3 6 6 1-4.5 4.2 1 6.6L12 17l-5.5 3.8 1-6.6L3 9l6-1 3-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "projects":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 2 20 6v6c0 5-3.4 9.4-8 10-4.6-.6-8-5-8-10V6l8-4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "mentorship":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 19c2-4 14-4 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 15a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M19 8h2m-1-1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "hackathons":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "community":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M16 11c1.7 0 3-1.3 3-3S17.7 5 16 5s-3 1.3-3 3 1.3 3 3 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M2.5 20c.5-3.5 3-6 6.5-6s6 2.5 6.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M14.5 20c.3-2.2 1.7-4 4-4 1.2 0 2.2.3 3 .9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "learning":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 19c0-1.1 7-1.1 7 0v-13c0-1.1-7-1.1-7 0v13Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M11 6c0-1.1 7-1.1 7 0v13c0-1.1-7-1.1-7 0V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M4 19c0 1.1 7 1.1 7 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
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

function BentoCard({ item }: { item: typeof bentoItems[number] }) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.1, triggerOnce: true });

  return (
    <div ref={ref as any} className={`c-bentoItem ${item.size} reveal ${isInView ? "is-visible" : ""}`}>
      <div className="c-bentoIcon"><BentoIcon name={item.icon} /></div>
      <div className="c-bentoTitle">{item.title}</div>
      <div className="c-bentoDesc">{item.desc}</div>
    </div>
  );
}

export default function BentoSection() {
  return (
    <section className="c-section">
      <div className="c-sectionInner">
        <div className="c-bentoGrid">
          {bentoItems.map((item) => <BentoCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
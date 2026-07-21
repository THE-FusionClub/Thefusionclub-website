
export const perks = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Brand Visibility",
    description: "Your brand showcased to 5000+ students across multiple colleges and events.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Talent Access",
    description: "Connect with passionate, skilled students for internships, projects, and recruitment.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "CSR Impact",
    description: "Contribute to nurturing the next generation of innovators and tech leaders.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    title: "Innovation Exposure",
    description: "Witness cutting-edge student projects and emerging tech trends firsthand.",
  },
];

export const faqData = [
  {
    question: "How do I become a sponsor?",
    answer: "Simply reach out to us via the contact form below or email us directly. Our team will get back to you within 48 hours with a customized sponsorship package.",
  },
  {
    question: "Can I customize my sponsorship package?",
    answer: "Absolutely! We offer flexible sponsorship packages that can be tailored to your specific goals and budget. Just let us know what you're looking for.",
  },
  {
    question: "What events will my sponsorship cover?",
    answer: "Sponsorships cover our annual events including DevFest, workshops, hackathons, industrial visits, and more. You can choose to sponsor specific events or the entire year.",
  },
  {
    question: "How is my logo and brand showcased?",
    answer: "Your logo will be featured on our website, event banners, social media posts, promotional materials, and at the event venue. Higher tiers include additional visibility options.",
  },
  {
    question: "Can I recruit students through sponsorship?",
    answer: "Yes! Gold and Platinum tier sponsors get access to our student talent pool and can conduct recruitment drives, workshops, and networking sessions.",
  },
];

export const stats = [
  { value: "5000+", label: "Students Reached" },
  { value: "25+", label: "Annual Events" },
  { value: "40+", label: "Partner Organizations" },
  { value: "10+", label: "Colleges Connected" },
];

export type TierKey = "title" | "gold" | "silver";

export type Tier = {
  key: TierKey;
  name: string;
  price: string;
  description: string;
  accentGradient: string;
  cardBg: string;
  headerOverlay: string;
  lottieFile: string;
  waveColors: { top: string; mid: string; bottom: string };
  borderColors: string[];
};

export const tiers: Tier[] = [
  {
    key: "title",
    name: "Title Sponsor",
    price: "₹1,00,000+",
    description: "Lead the conversation and put your brand at the center of every experience.",
    accentGradient: "from-[#EC4899] via-[#8B5CF6] to-[#3B82F6]",
    cardBg: "background: rgba(255,255,255,0.04); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12);",
    headerOverlay: "from-[#EC4899]/35 via-[#8B5CF6]/30 to-[#3B82F6]/25",
    lottieFile: "announcement.json",
    waveColors: { top: "#3B1B4F", mid: "#312E81", bottom: "#3B82F6" },
    borderColors: ["#EC4899", "#8B5CF6", "#3B82F6", "#8B5CF6", "#EC4899"],
  },
  {
    key: "gold",
    name: "Gold Sponsor",
    price: "₹50,000+",
    description: "Premium visibility and high-impact networking across flagship events.",
    accentGradient: "from-[#FACC15] via-[#F59E0B] to-[#FACC15]",
    cardBg: "background: rgba(255,255,255,0.035); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12);",
    headerOverlay: "from-[#FACC15]/30 via-[#F59E0B]/25 to-[#FACC15]/30",
    lottieFile: "management.json",
    waveColors: { top: "#3D3214", mid: "#4A3410", bottom: "#F59E0B" },
    borderColors: ["#FACC15", "#F59E0B", "#FACC15", "#F59E0B", "#FACC15"],
  },
  {
    key: "silver",
    name: "Silver Sponsor",
    price: "₹25,000+",
    description: "Strong brand placement with targeted promotion to engaged communities.",
    accentGradient: "from-[#E5E7EB] via-[#94A3B8] to-[#E5E7EB]",
    cardBg: "background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.12);",
    headerOverlay: "from-[#E5E7EB]/20 via-[#94A3B8]/15 to-[#E5E7EB]/20",
    lottieFile: "globe.json",
    waveColors: { top: "#252936", mid: "#374151", bottom: "#94A3B8" },
    borderColors: ["#E5E7EB", "#94A3B8", "#E5E7EB", "#94A3B8", "#E5E7EB"],
  },
];

/* ── Core visible benefits (always shown) ── */
export const coreBenefits: Record<TierKey, string[]> = {
  title: [
    "Main Stage Branding",
    "Website Hero Placement",
    "Social Media Campaign (12+)",
    "VIP Passes (10)",
    "Logo on All Materials",
  ],
  gold: [
    "Stage Recognition",
    "Website Logo Placement",
    "Social Media Posts (6+)",
    "VIP Passes (5)",
    "Booth Space",
  ],
  silver: [
    "Website Logo",
    "Social Media Posts (3+)",
    "VIP Passes (2)",
    "Networking Spotlight",
    "Event Mention",
  ],
};

/* ── Expandable premium benefits (hidden by default) ── */
export const extendedBenefits: Record<TierKey, string[]> = {
  title: [
    "Keynote Speaking Slot",
    "Dedicated Branding Booth",
    "Custom Social Media Campaigns",
    "Exclusive Talent Recruiting Drive",
    "Co-branded Event Merchandise",
    "Quarterly Innovation Report Access",
    "Priority Booth Placement",
    "Behind-the-Scenes Access",
  ],
  gold: [
    "Workshop Hosting Slot",
    "Branded Giveaway Distribution",
    "Dedicated Email Campaign",
    "Talent Pool Access",
    "Event Banner Priority",
    "Annual Report Listing",
  ],
  silver: [
    "Digital Flyer Inclusion",
    "Workshop Participation",
    "Community Newsletter Feature",
    "Certificate of Sponsorship",
  ],
};

/* ── Legacy compat: flattened included / notIncluded ── */

export const included: Record<TierKey, string[]> = {
  title: [...coreBenefits.title, ...extendedBenefits.title],
  gold: [...coreBenefits.gold, ...extendedBenefits.gold],
  silver: [...coreBenefits.silver, ...extendedBenefits.silver],
};

export const notIncluded: Record<TierKey, string[]> = {
  title: [
    "Extra Booth Space",
    "Custom Production",
  ],
  gold: [
    "Main Stage Branding",
    "Custom Production",
    "Dedicated Campaigns",
  ],
  silver: [
    "Main Stage Branding",
    "Booth Space",
    "Custom Production",
    "Dedicated Campaigns",
  ],
};

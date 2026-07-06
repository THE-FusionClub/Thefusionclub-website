import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Player as LordiconPlayer } from "@lordicon/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import LiquidEther from "@/components/ui/LiquidEther";
import {
  TargetIcon,
  LockIcon,
  SatelliteIcon,
  WaveOceanIcon,
  FactoryIcon,
  RobotIcon,
  ConstructionIcon,
  RocketIcon,
  CalendarIcon,
} from "@/components/ui/Icons";

/* ── Types ── */
type EventType =
  | "Workshop"
  | "Festival"
  | "Hackathon"
  | "Industrial Visit"
  | "Inter National"
  | "Intra National"
  | "Inter Nationalrsity";

interface EventData {
  id: string;
  name: string;
  description: string;
  date?: string;
  month?: string;
  school?: string;
  type: EventType;
  icon: string;
  image?: string;
  category: string;
}

/* ── Lordicon asset map ── */
const iconMap: Record<string, { icon: string; color?: string }> = {
  target: { icon: "https://cdn.lordicon.com/puvaffet.json", color: "#2563eb" },
  lock: { icon: "https://cdn.lordicon.com/zzcjjxew.json", color: "#7c3aed" },
  satellite: { icon: "https://cdn.lordicon.com/udwhdpod.json", color: "#0f766e" },
  wave: { icon: "https://cdn.lordicon.com/ayhtotha.json", color: "#0284c7" },
  factory: { icon: "https://cdn.lordicon.com/qduilmpq.json", color: "#ea580c" },
  robot: { icon: "https://cdn.lordicon.com/nocovwne.json", color: "#9333ea" },
  construction: { icon: "https://cdn.lordicon.com/ssvybplt.json", color: "#f59e0b" },
  rocket: { icon: "https://cdn.lordicon.com/kiynvdns.json", color: "#dc2626" },
  calendar: { icon: "https://cdn.lordicon.com/pnhskdva.json", color: "#4f46e5" },
};

function EventIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  const iconData = iconMap[icon];
  const [animationData, setAnimationData] = useState<unknown | null>(null);
  const playerRef = useRef<LordiconPlayer | null>(null);

  useEffect(() => {
    if (!iconData) return;

    let active = true;
    fetch(iconData.icon)
      .then((response) => response.json())
      .then((data) => {
        if (active) setAnimationData(data);
      })
      .catch(() => {
        if (active) setAnimationData(null);
      });

    return () => {
      active = false;
    };
  }, [iconData]);

  if (!iconData) {
    return <CalendarIcon size={size} />;
  }

  return (
    <div
      className="inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      onMouseEnter={() => playerRef.current?.playFromBeginning()}
    >
      {animationData ? (
        <LordiconPlayer
          ref={playerRef}
          icon={animationData as never}
          size={size}
          colorize={iconData.color}
        />
      ) : (
        <CalendarIcon size={size} />
      )}
    </div>
  );
}

/* ── Event Data ── */
const allEvents: EventData[] = [
  {
    id: "devfest",
    name: "DevFest (RaibarX)",
    description:
      "The flagship inter-school tech festival featuring coding competitions, workshops, and innovation showcases. A celebration of technology and creativity.",
    date: "21 August",
    type: "Inter National",
    school: "All",
    icon: "target",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    category: "Festival",
  },
  {
    id: "cyber-security",
    name: "Cyber Security Workshop",
    description:
      "Hands-on workshop covering ethical hacking, network security, and cyber threat intelligence. Learn from industry experts.",
    month: "September (Week 1)",
    type: "Inter National",
    icon: "lock",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    category: "Workshop",
  },
  {
    id: "iot-workshop",
    name: "IoT Workshop",
    description:
      "Build and program IoT devices with sensors and microcontrollers. Explore the world of connected devices.",
    month: "September (Week 1)",
    type: "Inter National",
    icon: "satellite",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    category: "Workshop",
  },
  {
    id: "nav-sangam",
    name: "Nav-Sangam",
    description:
      "An inter-university cultural and technical confluence bringing together students from diverse backgrounds for collaboration and competition.",
    month: "September",
    type: "Inter Nationalrsity",
    icon: "wave",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    category: "Festival",
  },
  {
    id: "industrial-visit-1",
    name: "Industrial Visit",
    description:
      "Visit leading tech companies and manufacturing units to gain real-world industry exposure and understand operational workflows.",
    month: "After Mid Semester Exams",
    type: "Inter National",
    icon: "factory",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    category: "Industrial Visit",
  },
  {
    id: "iot-festival",
    name: "IoT Festival",
    description:
      "A school-level festival showcasing IoT innovations, projects, and competitions exclusively for SoEC students.",
    month: "February",
    school: "SoEC",
    type: "Inter National",
    icon: "robot",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    category: "Festival",
  },
  {
    id: "industrial-visit-2",
    name: "Industrial Visit",
    description:
      "An exclusive industrial visit for SoEC students to explore cutting-edge technologies and industry practices.",
    month: "After Mid Semester Exams",
    school: "SoEC",
    type: "Inter National",
    icon: "construction",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    category: "Industrial Visit",
  },
];

/* ── FAQ Data ── */
const faqData = [
  {
    question: "Who can participate?",
    answer:
      "All students from affiliated schools and universities are welcome to participate. Some events may have specific eligibility criteria based on the event type and school.",
  },
  {
    question: "Is registration free?",
    answer:
      "Yes, registration for most events is completely free. Select premium workshops or festivals may have a nominal registration fee to cover materials and resources.",
  },
  {
    question: "Will certificates be provided?",
    answer:
      "Absolutely! All participants receive digital certificates. Winners and top performers get special recognition certificates and prizes.",
  },
  {
    question: "Can students from all schools join?",
    answer:
      "Yes, inter-school events are open to all schools. Intra-school events are specifically for students of the organizing school. Check the event type for details.",
  },
  {
    question: "How are winners selected?",
    answer:
      "Winners are selected by a panel of expert judges based on criteria such as innovation, technical execution, presentation, and impact. Specific rubrics are shared before each event.",
  },
];

/* ── Filter Options ── */
const filterOptions = [
  "All",
  "Workshop",
  "Festival",
  "Hackathon",
  "Industrial Visit",
  "Inter National",
  "Intra National",
  "Inter National",
] as const;

/* ── Timeline Data ── */
const timelineData = [
  { month: "August", events: ["DevFest (RaibarX)"] },
  { month: "September", events: ["Cyber Security Workshop", "IoT Workshop", "Nav-Sangam"] },
  { month: "After Mid Sem", events: ["Industrial Visit"] },
  { month: "February", events: ["IoT Festival"] },
  { month: "After Mid Sem (SoEC)", events: ["Industrial Visit"] },
];

/* ── Gallery Images ── */
const galleryImages = [
  { id: "g1", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80", title: "Event Kickoff" },
  { id: "g2", src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80", title: "Workshop Moments" },
  { id: "g3", src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80", title: "Team Collaboration" },
  { id: "g4", src: "https://images.unsplash.com/photo-1522071820081-82c8b0c1b6cf?auto=format&fit=crop&w=400&q=80", title: "Networking Night" },
  { id: "g5", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", title: "Hackathon" },
  { id: "g6", src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=400&q=80", title: "Design Review" },
  { id: "g7", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80", title: "Keynote Session" },
  { id: "g8", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80", title: "Group Photo" },
  { id: "g9", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", title: "Mentorship" },
];

/* ── Animation Variants ── */
const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const fadeUpBlurVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOut } },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

/* ── Section Title ── */
function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <motion.div variants={fadeUpVariants} className="mb-12 md:mb-16 text-center">
      {subtitle && (
        <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600 mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
        {children}
      </h2>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   SECTION 1 — HERO
   ════════════════════════════════════════ */
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* LiquidEther Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B497CF']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-transparent pointer-events-none" aria-hidden="true" />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
              className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]"
            >
              Explore Innovation,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Learning & Competition
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg"
            >
              Join our annual events designed to inspire, educate, and challenge students
              across schools and universities. From workshops to festivals — there's something for everyone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                to="#events"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:bg-blue-700 transition-all duration-300"
              >
                Explore Events
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <Link
                to="#timeline"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-gray-700 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                View Calendar
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right side - animated lottie visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: easeOut }}
            className="hidden lg:flex items-center justify-center"
          >
            <DotLottieReact
              src={new URL("../assets/M4iFOW10Xd.lottie", import.meta.url).href}
              loop
              autoplay
              className="w-full max-w-[520px] aspect-square"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 2 — FEATURED EVENT
   ════════════════════════════════════════ */
function FeaturedEvent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="text-center mb-12"
        >
          {/* <span className="inline-block rounded-full bg-amber-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-600 mb-4">
            Featured Event
          </span> */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            This Year's Highlight
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="relative group"
        >
          {/* Glass card with gradient border */}
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-xl border border-blue-100/50 shadow-xl shadow-blue-100/30 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500">
            {/* Gradient border glow */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl p-[1px] bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

            <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16">
              {/* Left Content */}
              <div className="flex flex-col justify-center">
                <motion.div variants={fadeUpVariants} className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Inter National · All Schools
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                    DevFest
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      (RaibarX)
                    </span>
                  </h3>

                  <div className="flex items-center gap-3 text-gray-500">
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">21 August</span>
                    <span className="text-gray-300">|</span>
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">Festival</span>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                    The flagship inter-school tech festival featuring coding competitions, workshops,
                    and innovation showcases. A celebration of technology and creativity that brings
                    together the brightest young minds.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link
                      to="/join-event"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:bg-blue-700 transition-all duration-300"
                    >
                      Register Now
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link
                      to="#events"
                      className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:border-blue-200 hover:text-blue-600 transition-all duration-300"
                    >
                      Coming Soon
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Right Image */}
              <motion.div variants={scaleInVariants} className="relative">
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
                    alt="DevFest Event"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm font-bold text-blue-600">
                    <TargetIcon size={16} className="inline-block mr-1" /> Featured
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 3 — UPCOMING EVENTS
   ════════════════════════════════════════ */
function UpcomingEvents() {
  const upcomingEvents = allEvents.slice(0, 5);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="py-20 md:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionTitle subtitle="">Upcoming Events</SectionTitle>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {upcomingEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={scaleInVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer"
            >
              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 via-transparent to-indigo-400/0 group-hover:from-blue-400/10 group-hover:to-indigo-400/10 transition-all duration-500 pointer-events-none" />

              <motion.div
                className="relative"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-3xl">
                  <EventIcon icon={event.icon} size={28} />
                </span>
              </motion.div>

              <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {event.name}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{event.date || event.month}</span>
              </div>

              <div className="mt-2">
                <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  {event.type}
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                {event.description}
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Coming Soon</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 4 — ANNUAL EVENT TIMELINE
   ════════════════════════════════════════ */
function EventTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  const scrollToEvent = (eventName: string) => {
    const event = allEvents.find((e) => e.name === eventName);
    if (event) {
      const el = document.getElementById(`event-${event.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="timeline" className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionTitle subtitle="">Event Timeline</SectionTitle>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-blue-200 transform md:-translate-x-1/2" />

          {timelineData.map((item, idx) => (
            <motion.div
              key={item.month}
              variants={fadeUpVariants}
              className={`relative flex items-start gap-6 md:gap-0 mb-12 md:mb-16 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Month label */}
              <div className="flex-shrink-0 w-16 md:w-1/2 flex md:justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {item.month}
                </motion.div>
              </div>

              {/* Events */}
              <div className="flex-1 md:w-1/2 space-y-3">
                {item.events.map((eventName) => {
                  const event = allEvents.find((e) => e.name === eventName);
                  return (
                    <motion.button
                      key={eventName}
                      whileHover={{ x: 4 }}
                      onClick={() => scrollToEvent(eventName)}
                      className="w-full text-left group flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300"
                    >
                      <span className="text-xl">
                        {event ? <EventIcon icon={event.icon} size={20} /> : <CalendarIcon size={20} />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {eventName}
                        </span>
                        {event && (
                          <span className="text-xs text-gray-500">{event.type}</span>
                        )}
                      </div>
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 5 — FILTER
   ════════════════════════════════════════ */
function FilterBar({ activeFilter, onFilterChange }: { activeFilter: string; onFilterChange: (f: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
      {filterOptions.map((filter) => (
        <motion.button
          key={filter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === filter
              ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
              : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          {filter}
        </motion.button>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   SECTION 6 — EVENT GRID
   ════════════════════════════════════════ */
function EventGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const filteredEvents = useMemo(() => {
    if (activeFilter === "All") return allEvents;
    return allEvents.filter(
      (e) => e.category === activeFilter || e.type === activeFilter
    );
  }, [activeFilter]);

  return (
    <section id="events" className="py-20 md:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionTitle subtitle="">All Events</SectionTitle>

        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          layout
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                id={`event-${event.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: easeOut }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{event.date || event.month}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {event.name}
                    </h3>
                    <span className="text-xl">
                      <EventIcon icon={event.icon} size={20} />
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {event.school && (
                        <span className="inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                          {event.school}
                        </span>
                      )}
                      <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/join-event"
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                  >
                    Coming Soon
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 7 — GALLERY
   ════════════════════════════════════════ */
function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(galleryImages[0]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const openLightbox = useCallback((img: typeof galleryImages[0]) => {
    setLightboxImg(img);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, closeLightbox]);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionTitle subtitle="">Event Gallery</SectionTitle>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="columns-2 md:columns-3 gap-4 space-y-4"
        >
          {galleryImages.map((img) => (
            <motion.button
              key={img.id}
              variants={scaleInVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(img)}
              className="group relative w-full overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-4">
                <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {img.title}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: easeOut }}
                className="relative max-w-4xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxImg.src}
                  alt={lightboxImg.title}
                  className="w-full h-full object-contain rounded-2xl"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
                  <span className="text-white text-lg font-semibold">{lightboxImg.title}</span>
                </div>
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 8 — STATISTICS
   ════════════════════════════════════════ */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  useEffect(() => {
    if (!isInView) return;
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
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const stats = [
    { value: 25, suffix: "+", label: "Annual Events" },
    { value: 1500, suffix: "+", label: "Participants" },
    { value: 40, suffix: "+", label: "Speakers" },
    { value: 12, suffix: "+", label: "Industry Partners" },
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className="text-center mb-12"
        >
          {/* <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold tracking-wide text-white mb-4">
            By the Numbers
          </span> */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Our Impact in Numbers
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleInVariants}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm md:text-base text-blue-100 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 9 — FAQ
   ════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-gray-50/50">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionTitle subtitle="">Frequently Asked Questions</SectionTitle>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="space-y-3"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-blue-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: easeOut }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SECTION 10 — CTA
   ════════════════════════════════════════ */
function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeUpVariants}
        className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Ready to Join Our Next Event?
        </h2>
        <p className="mt-6 text-lg md:text-xl text-blue-100 leading-relaxed max-w-xl mx-auto">
          Be part of something extraordinary. Register for upcoming events, connect with fellow innovators,
          and take your skills to the next level.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-300"
          >
            Register Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            to="/join-event"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════ */
export default function Events() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <HeroSection />
        <FeaturedEvent />
        <UpcomingEvents />
        <EventTimeline />
        <EventGrid />
        <Gallery />
        <Statistics />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
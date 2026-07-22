export type EventType =
  | "Workshop"
  | "Festival"
  | "Hackathon"
  | "Industrial Visit"
  | "Inter National"
  | "Intra National"
  | "Inter Nationalrsity";

export interface EventData {
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

export const allEvents: EventData[] = [
  {
    id: "devfest",
    name: "DevFest (RaibarX)",
    description: "The flagship inter-school tech festival featuring coding competitions, workshops, and innovation showcases. A celebration of technology and creativity.",
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
    description: "Hands-on workshop covering ethical hacking, network security, and cyber threat intelligence. Learn from industry experts.",
    month: "September (Week 1)",
    type: "Inter National",
    icon: "lock",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    category: "Workshop",
  },
  {
    id: "iot-workshop",
    name: "IoT Workshop",
    description: "Build and program IoT devices with sensors and microcontrollers. Explore the world of connected devices.",
    month: "September (Week 1)",
    type: "Inter National",
    icon: "satellite",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    category: "Workshop",
  },
  {
    id: "nav-sangam",
    name: "Nav-Sangam",
    description: "An inter-university cultural and technical confluence bringing together students from diverse backgrounds for collaboration and competition.",
    month: "September",
    type: "Inter Nationalrsity",
    icon: "wave",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    category: "Festival",
  },
  {
    id: "industrial-visit-1",
    name: "Industrial Visit",
    description: "Visit leading tech companies and manufacturing units to gain real-world industry exposure and understand operational workflows.",
    month: "After Mid Semester Exams",
    type: "Inter National",
    icon: "factory",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    category: "Industrial Visit",
  },
  {
    id: "iot-festival",
    name: "IoT Festival",
    description: "A school-level festival showcasing IoT innovations, projects, and competitions exclusively for SoEC students.",
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
    description: "An exclusive industrial visit for SoEC students to explore cutting-edge technologies and industry practices.",
    month: "After Mid Semester Exams",
    school: "SoEC",
    type: "Inter National",
    icon: "construction",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    category: "Industrial Visit",
  },
];

export const faqData = [
  { question: "Who can participate?", answer: "All students from affiliated schools and universities are welcome to participate. Some events may have specific eligibility criteria based on the event type and school." },
  { question: "Is registration free?", answer: "Yes, registration for most events is completely free. Select premium workshops or festivals may have a nominal registration fee to cover materials and resources." },
  { question: "Will certificates be provided?", answer: "Absolutely! All participants receive digital certificates. Winners and top performers get special recognition certificates and prizes." },
  { question: "Can students from all schools join?", answer: "Yes, inter-school events are open to all schools. Intra-school events are specifically for students of the organizing school. Check the event type for details." },
  { question: "How are winners selected?", answer: "Winners are selected by a panel of expert judges based on criteria such as innovation, technical execution, presentation, and impact. Specific rubrics are shared before each event." },
];

export const filterOptions = [
  "All",
  "Workshop",
  "Festival",
  "Hackathon",
  "Industrial Visit",
  "Inter National",
  "Intra National",
  "Inter Nationalrsity",
] as const;


export const timelineData = [
  { month: "August", events: ["DevFest (RaibarX)"] },
  { month: "September", events: ["Cyber Security Workshop", "IoT Workshop", "Nav-Sangam"] },
  { month: "After Mid Sem", events: ["Industrial Visit"] },
  { month: "February", events: ["IoT Festival"] },
  { month: "After Mid Sem (SoEC)", events: ["Industrial Visit"] },
];

export const galleryImages = [
  { id: "g1", src: "/assets/events/fusionX.png", title: "FusionX Event" },
  { id: "g2", src: "/assets/events/RaibarX.png", title: "RaibarX Festival" },
  { id: "g3", src: "/assets/events/fusionXposter.png", title: "FusionX Poster" },
  { id: "g4", src: "/assets/community/L-1.png", title: "Community L-1" },
  { id: "g5", src: "/assets/community/L-2.png", title: "Community L-2" },
  { id: "g6", src: "/assets/community/idea-1.jpg", title: "Ideathone Event" },
  { id: "g7", src: "/assets/team-mates/parul.png", title: "Team Parul" },
  { id: "g8", src: "/assets/team-mates/suraj.jpeg", title: "Team Suraj" },
  { id: "g9", src: "/assets/events/fusionX.png", title: "FusionX Highlight" },
];
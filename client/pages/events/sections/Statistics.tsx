import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;
const fadeUpVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } };
const staggerContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const scaleInVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } } };

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const duration = 1500;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Statistics() {
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
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUpVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">Our Impact in Numbers</h2>
        </motion.div>
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainerVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={scaleInVariants} className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-white"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></div>
              <div className="mt-2 text-sm md:text-base text-blue-100 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
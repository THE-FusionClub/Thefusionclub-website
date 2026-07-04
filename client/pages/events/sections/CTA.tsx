import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const fadeUpVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } };

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" animate={{ x: [0, 30, 0], y: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" animate={{ x: [0, -30, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      </div>
      <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUpVariants} className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">Ready to Join Our Next Event?</h2>
        <p className="mt-6 text-lg md:text-xl text-blue-100 leading-relaxed max-w-xl mx-auto">
          Be part of something extraordinary. Register for upcoming events, connect with fellow innovators, and take your skills to the next level.
        </p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/join-event" className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-300">
            Register Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300">Contact Us</Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
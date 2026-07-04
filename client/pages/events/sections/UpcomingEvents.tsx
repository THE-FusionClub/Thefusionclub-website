import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { allEvents } from "../data";
import { EventIcon } from "../components/EventIcon";
import { SectionTitle } from "./SectionTitle";

const easeOut = [0.16, 1, 0.3, 1] as const;
const scaleInVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } } };
const staggerContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

export default function UpcomingEvents() {
  const upcomingEvents = allEvents.slice(0, 5);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="py-20 md:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionTitle subtitle="">Upcoming Events</SectionTitle>
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainerVariants} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {upcomingEvents.map((event) => (
            <motion.div key={event.id} variants={scaleInVariants} whileHover={{ y: -8, transition: { duration: 0.3 } }} className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 via-transparent to-indigo-400/0 group-hover:from-blue-400/10 group-hover:to-indigo-400/10 transition-all duration-500 pointer-events-none" />
              <motion.div className="relative" whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                <span className="text-3xl"><EventIcon icon={event.icon} size={28} /></span>
              </motion.div>
              <h3 className="mt-4 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{event.name}</h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>{event.date || event.month}</span>
              </div>
              <div className="mt-2"><span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">{event.type}</span></div>
              <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed">{event.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn More</span>
                <motion.svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></motion.svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
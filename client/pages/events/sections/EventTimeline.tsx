import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { allEvents, timelineData } from "../data";
import { EventIcon } from "../components/EventIcon";
import { CalendarIcon } from "@/components/ui/Icons";
import { SectionTitle } from "./SectionTitle";

const easeOut = [0.16, 1, 0.3, 1] as const;
const fadeUpVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } };

export default function EventTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section id="timeline" className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionTitle subtitle="">Event Timeline</SectionTitle>
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-blue-200 transform md:-translate-x-1/2" />
          {timelineData.map((item, idx) => (
            <motion.div key={item.month} variants={fadeUpVariants} className={`relative flex items-start gap-6 md:gap-0 mb-12 md:mb-16 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
              <div className="flex-shrink-0 w-16 md:w-1/2 flex md:justify-center">
                <motion.div whileHover={{ scale: 1.05 }} className="relative z-10 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> {item.month}
                </motion.div>
              </div>
              <div className="flex-1 md:w-1/2 space-y-3">
                {item.events.map((eventName) => {
                  const event = allEvents.find((e) => e.name === eventName);
                  return (
                    <motion.button key={eventName} whileHover={{ x: 4 }} className="w-full text-left group flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-200 transition-all duration-300">
                      <span className="text-xl">{event ? <EventIcon icon={event.icon} size={20} /> : <CalendarIcon size={20} />}</span>
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{eventName}</span>
                        {event && <span className="text-xs text-gray-500">{event.type}</span>}
                      </div>
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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
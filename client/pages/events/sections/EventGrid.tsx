import { useMemo, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { allEvents, filterOptions } from "../data";
import { EventIcon } from "../components/EventIcon";
import { SectionTitle } from "./SectionTitle";

const easeOut = [0.16, 1, 0.3, 1] as const;
const staggerContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

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
            activeFilter === filter ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50"
          }`}
        >
          {filter}
        </motion.button>
      ))}
    </div>
  );
}

export default function EventGrid() {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const filteredEvents = useMemo(() => {
    if (activeFilter === "All") return allEvents;
    return allEvents.filter((e) => e.category === activeFilter || e.type === activeFilter);
  }, [activeFilter]);

  return (
    <section id="events" className="py-20 md:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionTitle subtitle="">All Events</SectionTitle>
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainerVariants} layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: easeOut }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={event.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"} alt={event.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3"><span className="inline-block rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">{event.category}</span></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      <span className="font-medium">{event.date || event.month}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{event.name}</h3>
                    <span className="text-xl"><EventIcon icon={event.icon} size={20} /></span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {event.school && <span className="inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{event.school}</span>}
                      <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">{event.type}</span>
                    </div>
                  </div>
                  <Link to="/join-event" className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                    Coming Soon
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
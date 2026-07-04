import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TargetIcon } from "@/components/ui/Icons";

const easeOut = [0.16, 1, 0.3, 1] as const;
const fadeUpVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } };
const staggerContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const scaleInVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } } };

export default function FeaturedEvent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUpVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">This Year's Highlight</h2>
        </motion.div>
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainerVariants} className="relative group">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-xl border border-blue-100/50 shadow-xl shadow-blue-100/30 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500">
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl p-[1px] bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
            <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16">
              <div className="flex flex-col justify-center">
                <motion.div variants={fadeUpVariants} className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Inter School · All Schools
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                    DevFest<span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">(RaibarX)</span>
                  </h3>
                  <div className="flex items-center gap-3 text-gray-500">
                    <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="font-medium">22 August</span>
                    <span className="text-gray-300">|</span>
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">Festival</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-base md:text-lg">The flagship inter-school tech festival featuring coding competitions, workshops, and innovation showcases. A celebration of technology and creativity that brings together the brightest young minds.</p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Link to="/join-event" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:bg-blue-700 transition-all duration-300">
                      Register Now
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                    <Link to="#events" className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:border-blue-200 hover:text-blue-600 transition-all duration-300">Learn More</Link>
                  </div>
                </motion.div>
              </div>
              <motion.div variants={scaleInVariants} className="relative">
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" alt="DevFest Event" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <motion.div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100" animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  <span className="text-sm font-bold text-blue-600"><TargetIcon size={16} className="inline-block mr-1" /> Featured</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
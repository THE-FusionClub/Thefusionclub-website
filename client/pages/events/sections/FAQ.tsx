import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { faqData } from "../data";
import { SectionTitle } from "./SectionTitle";

const easeOut = [0.16, 1, 0.3, 1] as const;
const fadeUpVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } };
const staggerContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="py-20 md:py-28 bg-gray-50/50">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionTitle subtitle="">Frequently Asked Questions</SectionTitle>
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainerVariants} className="space-y-3">
          {faqData.map((faq, index) => (
            <motion.div key={index} variants={fadeUpVariants} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <button onClick={() => toggleFAQ(index)} className="w-full flex items-center justify-between p-5 md:p-6 text-left">
                <span className="text-base md:text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                <motion.svg animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }} className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: easeOut }} className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
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
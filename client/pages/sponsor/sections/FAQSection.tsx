import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { faqData } from "./sponsorData";
import styles from "./FAQSection.module.css";

const easeOut = [0.16, 1, 0.3, 1] as const;

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionTitle subtitle="FAQ">Frequently Asked Questions</SectionTitle>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className={styles.list}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              className={styles.item}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={styles.trigger}
              >
                <span className={styles.question}>{faq.question}</span>
                <svg
                  className={`${styles.chevron} ${openIndex === index ? styles.chevronOpen : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`${styles.answerWrapper} ${
                  openIndex === index ? styles.answerWrapperOpen : styles.answerWrapperClosed
                }`}
              >
                <p className={styles.answer}>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
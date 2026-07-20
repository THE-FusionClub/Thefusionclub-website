import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ContactSection.module.css";

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariants}
          className={styles.header}
        >
          {/* <span className={styles.badge}>Get In Touch</span> */}
          <h2 className={styles.title}>Ready to Partner?</h2>
          <p className={styles.subtitle}>
            Let's discuss how we can work together to create something amazing.
            Reach out to us and we'll get back to you within 48 hours.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className={styles.formWrapper}
        >
          <motion.div variants={fadeUpVariants} className={styles.formCard}>
            <div className={styles.form}>
              <p className={styles.sponsorIntro}>
                Register your interest for sponsorship by filling out the appropriate form below:
              </p>
              <a
                href="https://forms.gle/RJK3fEoYi8fdc6gf9"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sponsorBtn}
              >
                <span className={styles.sponsorBtnTitle}>Silver Sponsor</span>
                <span className={styles.sponsorBtnSub}>Register Here</span>
              </a>
              <a
                href="https://forms.gle/yjXpdkmFMtm35yLg7"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sponsorBtn}
              >
                <span className={styles.sponsorBtnTitle}>Gold Sponsor</span>
                <span className={styles.sponsorBtnSub}>Register Here</span>
              </a>
              <a
                href="https://forms.gle/VbbDoY8JZ9B6rQaN8"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sponsorBtn}
              >
                <span className={styles.sponsorBtnTitle}>Title Sponsor</span>
                <span className={styles.sponsorBtnSub}>Register Here</span>
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariants} className={styles.emailRow}>
            <p className={styles.emailText}>
              Or email us directly at{" "}
              <a href="mailto:sponsor@thefusionclub.in" className={styles.emailLink}>
                fusionclubthe@gmail.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
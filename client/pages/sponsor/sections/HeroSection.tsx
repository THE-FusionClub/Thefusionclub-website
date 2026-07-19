import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./HeroSection.module.css";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function SponsorHeroSection() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section className={styles.hero}>
      {/* Animated background particles */}
      <div className={styles.bgParticles} aria-hidden="true">
        <div className={styles.particle1} />
        <div className={styles.particle2} />
        <div className={styles.particle3} />
      </div>

      {/* Grid overlay */}
      <div className={styles.gridOverlay} aria-hidden="true" />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className={styles.content}>
        <div className={styles.inner}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className={styles.badge}>Partner With Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className={styles.heading}
          >
            Sponsor{" "}
            <span className={styles.gradientText}>The Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.description}
          >
            Partner with The Fusion Club to empower the next generation of innovators,
            gain unparalleled brand visibility, and connect with top tech talent.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={styles.actions}
          >
            <a href="#tiers" className={styles.btnPrimary}>
              View Packages
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#contact" className={styles.btnSecondary}>
              Contact Us
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
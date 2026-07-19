import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { perks } from "./sponsorData";
import styles from "./WhySponsorSection.module.css";

const easeOut = [0.16, 1, 0.3, 1] as const;

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

export default function WhySponsorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionTitle subtitle="Why Sponsor">Benefits of Partnering</SectionTitle>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className={styles.grid}
        >
          {perks.map((perk) => (
            <motion.div
              key={perk.title}
              variants={scaleInVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={styles.card}
            >
              <div className={styles.iconBox}>{perk.icon}</div>
              <h3 className={styles.cardTitle}>{perk.title}</h3>
              <p className={styles.cardDesc}>{perk.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
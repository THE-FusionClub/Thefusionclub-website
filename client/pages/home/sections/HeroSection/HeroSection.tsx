import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

import styles from "./HeroSection.module.css";
import logo from "@/assets/logo.png";

const TITLE = "Tech - Innovate Culture.";

type HeroSectionProps = {
  introDone?: boolean;
};

export default function HeroSection({ introDone = false }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const words = useMemo(() => TITLE.split(" "), []);

  const ready = introDone;

  const wordDelayBase = 0.08;
  const wordDelayStep = 0.10;

  return (
    <section
      className={`${styles.heroSection} tfc-hero ${ready ? "tfc-hero-ready" : ""}`}
      aria-label="TFC Hero"
    >
      <motion.div
        className={styles.heroContainer}
        initial={false}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left content */}
        <motion.div
          className={styles.heroContent}
          initial={false}
          animate={ready ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {/* Word-by-word heading */}
          <h1 className={styles.heroTitle}>
            {words.map((w, i) => {
              const isCulture = w.includes("Culture");
              return (
                <motion.span
                  key={`${w}-${i}`}
                  className={isCulture ? styles.heroTitlePurple : styles.heroTitleDark}
                  initial={false}
                  animate={ready ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
                    visible: {
                      opacity: 1,
                      y: [16, -6, 0],
                      filter: "blur(0px)",
                    },
                  }}
                  transition={{
                    duration: reducedMotion ? 0.01 : 0.9,
                    delay: reducedMotion ? 0 : wordDelayBase + i * wordDelayStep,
                    times: [0, 0.55, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ display: "inline-block", marginRight: i === words.length - 1 ? 0 : 10 }}
                >
                  {w}
                </motion.span>
              );
            })}
          </h1>

          <motion.p
            className={styles.heroDescription}
            initial={false}
            animate={ready ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 14, filter: "blur(12px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: reducedMotion ? 0.01 : 0.8,
                  delay: reducedMotion ? 0 : 0.40,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            The Fusion Club (TFC) is a student-driven community fostering
            Technology, Innovation, and Culture through hackathons, workshops,
            ideathons, and creative events.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className={styles.heroActions}
            initial={false}
            animate={ready ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: reducedMotion ? 0.01 : 0.7,
                  delay: reducedMotion ? 0 : 0.52,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            <motion.a
              href="/events"
              className={styles.heroBtnPrimary}
              initial={false}
              animate={
                ready
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      y: 10,
                      scale: 0.9,
                    }
              }
              transition={{
                duration: reducedMotion ? 0.01 : 0.55,
                delay: reducedMotion ? 0 : 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span>Join The Event</span>
              <div className={styles.heroBtnIcon}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M0 4.66667H9.33333M4.66667 0L9.33333 4.66667L4.66667 9.33333"
                    stroke="currentColor"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.a>

            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLScue8y1m6gGbX7umHmnVWXMdaS0EzQFCTngC6HG95nsY5bZbw/viewform"
              className={styles.heroBtnSecondary}
              initial={false}
              animate={
                ready
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      y: 10,
                      scale: 0.9,
                    }
              }
              transition={{
                duration: reducedMotion ? 0.01 : 0.55,
                delay: reducedMotion ? 0 : 0.10,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className={styles.heroBtnCircle}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M3.125 7.5H11.875M7.5 11.875L11.875 7.5L7.5 3.125"
                    stroke="#1E1E1E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className={styles.heroBtnText}>Join TFC</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          className={`${styles.heroVisual} ${styles.heroVisualCommunity}`}
          initial={false}
          animate={ready ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, x: 18, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              transition: {
                duration: reducedMotion ? 0.01 : 0.85,
                delay: reducedMotion ? 0 : 0.50,
                ease: [0.16, 1, 0.3, 1],
              },
            },
          }}
        >
          <motion.div
            className={styles.heroImageCard}
            initial={false}
            animate={
              reducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }
            }
            transition={{
              duration: reducedMotion ? 0.01 : 0.7,
              delay: reducedMotion ? 0 : 0.10,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className={styles.heroCarousel} aria-label="TFC Community Carousel">
              <div className={styles.heroCarouselTrack} aria-hidden="false">
                <img
                  src="/assets/events/fusionXposter.png"
                  alt="TFC Community - Slide 1"
                  className={styles.heroImage}
                />
                <img
                  src="/assets/events/RaibarX.png"
                  alt="TFC Community - Slide 2"
                  className={`${styles.heroImage} ${styles.heroImageSlide}`}
                  loading="lazy"
                />
                <img
                  src="/assets/community/idea-1.jpg"
                  alt="TFC Community - Slide 3"
                  className={`${styles.heroImage} ${styles.heroImageSlide}`}
                  loading="lazy"
                />
                <img
                  src="/assets/events/fusionXposter.png"
                  alt="TFC Community - Slide 1 (duplicate)"
                  className={`${styles.heroImage} ${styles.heroImageSlide}`}
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          <motion.img
            src={logo}
            alt="TFC Logo"
            className={styles.heroFloatingLogo}
            initial={false}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.8,
              delay: reducedMotion ? 0 : 0.60,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          <motion.div
            className={styles.heroBadge}
            initial={false}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.65,
              delay: reducedMotion ? 0 : 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-label="Active Members"
          >
            <div className={styles.heroBadgeAvatars}>
              <img src="/assets/team-mates/suraj.jpeg" alt="Member" className={styles.heroAvatar} />
              <img src="/assets/team-mates/prakash.jpeg" alt="Member" className={styles.heroAvatar} />
              <img src="/assets/team-mates/parul.png" alt="Member" className={styles.heroAvatar} />
              <div className={styles.heroAvatarCount}>+10</div>
            </div>
            <div className={styles.heroBadgeText}>
              <span className={styles.heroBadgeLabel}>Active Members</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.heroStats}
        initial={false}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{
          duration: reducedMotion ? 0.01 : 0.75,
          delay: reducedMotion ? 0 : 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className={styles.heroStatCard}>
          <div className={styles.heroStatIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 16L22 12L18 8M6 8L2 12L6 16M14.5 4L9.5 20" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className={styles.heroStatNumber}>3</div>
            <div className={styles.heroStatLabel}>Developers</div>
            <div className={styles.heroStatDesc}>Passionate developers building the future.</div>
          </div>
        </div>

        <div className={styles.heroStatCard}>
          <div className={styles.heroStatIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 2V6M16 2V6" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 4H19C20.1038 4 21 4.89617 21 6V20C21 21.1038 20.1038 22 19 22H5C3.89617 22 3 21.1038 3 20V6C3 4.89617 3.89617 4 5 4V4" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className={styles.heroStatNumber}>2</div>
            <div className={styles.heroStatLabel}>Annual Events</div>
            <div className={styles.heroStatDesc}>Action-packed events every year.</div>
          </div>
        </div>

        <div className={styles.heroStatCard}>
          <div className={styles.heroStatIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11 17L13 19C13.8279 19.8279 15.1721 19.8279 16 19C16.8279 18.1721 16.8279 16.8279 16 16" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 14L16.5 16.5C17.3279 17.3279 18.6721 17.3279 19.5 16.5C20.3279 15.6721 20.3279 14.3279 19.5 13.5L15.62 9.62C14.4487 8.45 12.5513 8.45 11.38 9.62L10.5 10.5" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 3L22 14H20M3 3L2 14L8.5 20.5C9.32787 21.3279 10.6721 21.3279 11.5 20.5C12.3279 19.6721 12.3279 18.3279 11.5 17.5M3 4H11" stroke="#7F22FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className={styles.heroStatNumber}>2</div>
            <div className={styles.heroStatLabel}>Partners</div>
            <div className={styles.heroStatDesc}>Trusted by amazing partners.</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
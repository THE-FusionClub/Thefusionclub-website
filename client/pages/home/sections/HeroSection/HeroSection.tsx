import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

import "./HeroSection.css";
import logo from "@/assets/logo.png";



const TITLE = "Tech - Innovate Culture.";

type HeroSectionProps = {
  introDone?: boolean;
};

export default function HeroSection({ introDone = false }: HeroSectionProps) {
  const reducedMotion = useReducedMotion();
  const words = useMemo(() => TITLE.split(" "), []);

  const ready = introDone;

  // 80–120ms word-by-word vibe
  const wordDelayBase = 0.08;
  const wordDelayStep = 0.10;

  return (
    <section
      className={`hero-section tfc-hero ${ready ? "tfc-hero-ready" : ""}`}
      aria-label="TFC Hero"
    >
      <motion.div
        className="hero-container"
        initial={false}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left content */}
        <motion.div
          className="hero-content"
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
          <h1 className="hero-title">
            {words.map((w, i) => {
              const isCulture = w.includes("Culture");
              return (
                <motion.span
                  key={`${w}-${i}`}
                  className={isCulture ? "hero-title-purple" : "hero-title-dark"}
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

          {/* Subtitle */}
          <motion.p
            className="hero-description"
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
            className="hero-actions"
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
              href="https://docs.google.com/forms/d/1-H3nmBvKWKxST6AFST56EJXtRu5rdImaRcj0jO6wBeU/viewform?edit_requested=true"
              className="hero-btn-primary"
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
              <div className="hero-btn-icon">
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
              className="hero-btn-secondary"
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
              <div className="hero-btn-circle">
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
              <span className="hero-btn-text">Join TFC</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          className="hero-visual hero-visual--community"
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
          {/* Lordicon solid accent */}
          
          {/* Hero image card */}

          <motion.div
            className="hero-image-card"
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
            <div className="hero-carousel" aria-label="TFC Community Carousel">
              <div className="hero-carousel-track">
                <img
                  src="/assets/events/fusionXposter.png"
                  alt="TFC Community - Slide 1"
                  className="hero-image"
                />
                <img
                  src="/assets/events/RaibarX.png"
                  alt="TFC Community - Slide 2"
                  className="hero-image hero-image--slide"
                  loading="lazy"
                />
                <img
                  src="/assets/community/idea-1.jpg"
                  alt="TFC Community - Slide 3"
                  className="hero-image hero-image--slide"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* Floating TFC logo */}
          <motion.img
            src={logo}
            alt="TFC Logo"
            className="hero-floating-logo"
            initial={false}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.8,
              delay: reducedMotion ? 0 : 0.60,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Active Members Badge */}
          <motion.div
            className="hero-badge"
            initial={false}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{
              duration: reducedMotion ? 0.01 : 0.65,
              delay: reducedMotion ? 0 : 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-label="Active Members"
          >
            <div className="hero-badge-avatars">
              <img
                src="/assets/team-mates/suraj.jpeg"
                alt="Member"
                className="hero-avatar"
              />
              <img
                src="/assets/team-mates/prakash.jpeg"
                alt="Member"
                className="hero-avatar"
              />
              <img
                src="/assets/team-mates/parul.png"
                alt="Member"
                className="hero-avatar"
              />

              <div className="hero-avatar-count">+10</div>
            </div>
            <div className="hero-badge-text">
              <span className="hero-badge-label">Active Members</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="hero-stats"
        initial={false}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{
          duration: reducedMotion ? 0.01 : 0.75,
          delay: reducedMotion ? 0 : 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="hero-stat-card">
          <div className="hero-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 16L22 12L18 8M6 8L2 12L6 16M14.5 4L9.5 20"
                stroke="#7F22FE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="hero-stat-number">3</div>
            <div className="hero-stat-label">Developers</div>
            <div className="hero-stat-desc">Passionate developers building the future.</div>
          </div>
        </div>

        <div className="hero-stat-card">
          <div className="hero-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 2V6M16 2V6"
                stroke="#7F22FE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 4H19C20.1038 4 21 4.89617 21 6V20C21 21.1038 20.1038 22 19 22H5C3.89617 22 3 21.1038 3 20V6C3 4.89617 3.89617 4 5 4V4"
                stroke="#7F22FE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 10H21"
                stroke="#7F22FE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="hero-stat-number">2</div>
            <div className="hero-stat-label">Annual Events</div>
            <div className="hero-stat-desc">Action-packed events every year.</div>
          </div>
        </div>

        <div className="hero-stat-card">
          <div className="hero-stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M11 17L13 19C13.8279 19.8279 15.1721 19.8279 16 19C16.8279 18.1721 16.8279 16.8279 16 16"
                stroke="#7F22FE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 14L16.5 16.5C17.3279 17.3279 18.6721 17.3279 19.5 16.5C20.3279 15.6721 20.3279 14.3279 19.5 13.5L15.62 9.62C14.4487 8.45 12.5513 8.45 11.38 9.62L10.5 10.5C9.67211 11.3279 8.32785 11.3279 7.49998 10.5C6.67211 9.67 6.67211 8.33 7.49998 7.5L10.31 4.69C12.1867 2.82 15.0949 2.46 17.37 3.82L17.84 4.1C18.2658 4.357 18.772 4.45 19.26 4.35L21 4"
                stroke="#7F22FE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 3L22 14H20M3 3L2 14L8.5 20.5C9.32787 21.3279 10.6721 21.3279 11.5 20.5C12.3279 19.6721 12.3279 18.3279 11.5 17.5M3 4H11"
                stroke="#7F22FE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="hero-stat-number">2</div>
            <div className="hero-stat-label">Partners</div>
            <div className="hero-stat-desc">Trusted by amazing partners.</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
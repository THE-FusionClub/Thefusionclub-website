import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useScrollReveal } from "@/utils/useScrollReveal";

import styles from "./NewsletterSection.module.css";

type Slide = {
  id: string;
  image: string;
  label: string;
};

export default function NewsletterSection() {
  const { ref: sectionRef, isInView } = useScrollReveal({ threshold: 0.15 });

  const slides: Slide[] = useMemo(
    () => [
      { id: "ns1", image: "/assets/community/L-1.png", label: "Community stories" },
      { id: "ns2", image: "/assets/community/L-2.png", label: "Workshops in motion" },
      { id: "ns3", image: "/assets/community/idea-1.jpg", label: "Builders at play" },
      { id: "ns4", image: "/assets/events/fusionXposter.png", label: "Collaboration moments" },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) return;

    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(t);
  }, [slides.length]);

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className={styles.newsletterSection}>
      <div className={styles.nlsBg} aria-hidden="true">
        {slides.map((s, idx) => (
          <div key={s.id} className={`${styles.nlsSlide} ${idx === active ? styles.isActive : ""}`}>
            <img className={styles.nlsImg} src={s.image} alt={s.label} />
          </div>
        ))}
        <div className={styles.nlsOverlay} />
      </div>

      <div className={`${styles.newsletterCard} reveal ${isInView ? "is-visible" : ""}`}>
        <div className={styles.newsletterCardContent}>
          <div className={styles.newsletterIconCircle}>
            <img src="/assets/events/fusionX.png" alt="FusionX" className={styles.newsletterIconImage} />
          </div>

          <div className={styles.newsletterText}>
            <h3 className={styles.newsletterTitle}>
              Stay In The <span className={styles.loopHighlight}>Loop</span>
            </h3>
            <p className={styles.newsletterDescription}>
              Find out about our upcoming programs, offers, and more by Join to TFC monthly newsletter.
            </p>
          </div>
        </div>

        <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.newsletterInputWrapper}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={styles.newsletterInputIcon}>
              <path d="M15.75 5.25L9.75659 9.068C9.34253 9.3085 8.83131 9.3085 8.41725 9.068L2.25 5.25" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="2.25" y="3.75" width="13.5" height="10.5" rx="2" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input type="email" placeholder="FusionX Online Hackathon" className={styles.newsletterInput} />
            <a href="https://docs.google.com/forms/d/1-H3nmBvKWKxST6AFST56EJXtRu5rdImaRcj0jO6wBeU/viewform?edit_requested=true" target="_blank" rel="noreferrer" className={styles.newsletterSubmit}>
              Register Now
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.75 9H14.25M9 3.75L14.25 9L9 14.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
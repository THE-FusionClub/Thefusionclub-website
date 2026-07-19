import React from "react";
import { useScrollReveal } from "@/utils/useScrollReveal";
import styles from "./EcosystemSection.module.css";
import { useNavigate } from "react-router-dom";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type DotLottieProps = {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
};

function DotLottie({ src, loop, autoplay, className }: DotLottieProps) {
  return <DotLottieReact src={src} loop={loop} autoplay={autoplay} className={className} />;
}

export default function EcosystemSection() {
  const navigate = useNavigate();

  const { ref: sectionRef, isInView } = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className={styles.ecosystemSection}>
      <div className={styles.ecosystemInner}>
        <div className={styles.ecosystemCardsTop}>
          <div className={`${styles.ecosystemCardLeft} hover-glow`}>
            <div className={styles.ecosystemCardIcon}>
              <DotLottie
                src="/assets/lottie-icons/community-help.lottie"
                loop
                autoplay
                className={styles.ecosystemLottieIcon}
              />
            </div>
            <div className={styles.ecosystemCardContent}>
              <h3 className={styles.ecosystemCardTitle}>Community partners</h3>
              <p className={styles.ecosystemCardDesc}>
                Get everything you need to support and run amazing hackathons and developer events.
              </p>
              <button
                className={styles.ecosystemCardArrow}
                onClick={() => navigate("/events")}
                aria-label="View Events"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10H16" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 5L16 10L11 15" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className={`${styles.ecosystemCardRight} hover-glow`}>
            <div className={styles.ecosystemCardIcon}>
              <DotLottie
                src="/assets/lottie-icons/hand-earn.lottie"
                loop
                autoplay
                className={styles.ecosystemLottieIcon}
              />
            </div>
            <div className={styles.ecosystemCardContent}>
              <h3 className={styles.ecosystemCardTitle}>Sponsorship</h3>
              <p className={styles.ecosystemCardDesc}>Sponsor With Us — Reach the best developers building the future.</p>
              <button
                className={styles.ecosystemCardArrow}
                onClick={() => navigate("/events")}
                aria-label="View Events"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10H16" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 5L16 10L11 15" stroke="#90A1B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.ecosystemContent}>
          <div className={styles.ecosystemText}>
            <div className={`${styles.ecosystemLabel} ${styles.reveal} ${isInView ? styles.isVisible : ""}`}>BUILT FOR COMMUNITY PARTNERS.</div>
            <h2 className={`${styles.ecosystemHeading} ${styles.reveal} ${styles.revealDelay1} ${isInView ? styles.isVisible : ""}`}>CONNECTING THE TECH ECOSYSTEM</h2>
            <div className={`${styles.ecosystemBorderText} ${styles.reveal} ${styles.revealDelay2} ${isInView ? styles.isVisible : ""}`}>
              <p>Discover meaningful ways to collaborate with developer communities and support real-world hackathons & events.</p>
            </div>
            <p className={`${styles.ecosystemDescription} ${styles.reveal} ${styles.revealDelay3} ${isInView ? styles.isVisible : ""}`}>
              TFC is where you build. We&rsquo;ve created a home for software creators at every stage. Build something at a hackathon. Write about what you learned. That knowledge becomes permanent, searchable, and useful to the next person. Partners like DBUU support our community. TFC is where your brand becomes part of the builder journey.
            </p>

            <div className={`${styles.ecosystemSocials} ${styles.reveal} ${styles.revealDelay4} ${isInView ? styles.isVisible : ""}`}>
              <p className={styles.ecosystemSocialsLabel}>Connect with us:</p>
              <div className={`${styles.ecosystemSocialsGrid} ${styles.staggerChildren} ${isInView ? styles.isVisible : ""}`}>
                <a href="https://www.linkedin.com/company/the-fusion-club-page/" className={styles.ecosystemSocial} target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M19 3C20.1038 3 21 3.89617 21 5V19C21 20.1038 20.1038 21 19 21H5C3.89617 21 3 20.1038 3 19V5C3 3.89617 3.89617 3 5 3H19ZM18.5 18.5V13.2C18.5 11.4008 17.0392 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C15.0832 12.17 15.71 12.7968 15.71 13.57V18.5H18.5ZM6.88 8.56C7.80784 8.56 8.56 7.80784 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C5.94664 5.19 5.19 5.94664 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"/></svg>
                </a>
                <a href="https://www.instagram.com/the_fusionclub" className={styles.ecosystemSocial} target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4033 19.4033 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.59889 4.59889 2 7.8 2ZM7.6 4C5.61177 4 4 5.61177 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C18.3882 20 20 18.3882 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.9399 5.5 18.5 6.06011 18.5 6.75C18.5 7.43989 17.9399 8 17.25 8C16.5601 8 16 7.43989 16 6.75C16 6.06011 16.5601 5.5 17.25 5.5ZM12 7C14.7596 7 17 9.24043 17 12C17 14.7596 14.7596 17 12 17C9.24043 17 7 14.7596 7 12C7 9.24043 9.24043 7 12 7ZM12 9C10.3443 9 9 10.3443 9 12C9 13.6557 10.3443 15 12 15C13.6557 15 15 13.6557 15 12C15 10.3443 13.6557 9 12 9Z"/></svg>
                </a>
                <a href="https://x.com/TheFusionClubb" className={styles.ecosystemSocial} target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="24" fill="white"><path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/></svg>
                </a>
                <a href="https://www.youtube.com/@thefusionclubofficial" className={styles.ecosystemSocial} target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a2.966 2.966 0 0 0-2.092-2.094C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.406.592A2.966 2.966 0 0 0 .502 6.186 30.89 30.89 0 0 0 0 12a30.89 30.89 0 0 0 .502 5.814 2.966 2.966 0 0 0 2.092 2.094C4.495 20.5 12 20.5 12 20.5s7.505 0 9.406-.592a2.966 2.966 0 0 0 2.092-2.094A30.89 30.89 0 0 0 24 12a30.89 30.89 0 0 0-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/583c4c3a338f800ee5d6e495104101afc493744b?width=1216"
            alt="Tech Ecosystem"
            className={`${styles.ecosystemImage} ${styles.reveal} ${styles.revealDelay2} ${isInView ? styles.isVisible : ""}`}
          />
        </div>
      </div>
    </section>
  );
}
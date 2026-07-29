import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar/Navbar";
import styles from "./Privacy.module.css";

/* ────────── SECTION DATA ────────── */
const SECTIONS = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `The Fusion Club ("TFC", "we", "us", or "our") is committed to protecting the privacy of our community members, event participants, sponsors, and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, register for events, apply for fellowships, or engage with our community platforms.`,
  },
  {
    id: "information-collection",
    title: "2. Information We Collect",
    content: `We may collect the following types of information:

• Personal Identification Information: Name, email address, phone number, college/university affiliation, year of study, and portfolio links provided during event registration or fellowship applications.
• Event Participation Data: Details related to your participation in hackathons, workshops, demo days, and other TFC events including project submissions, team compositions, and feedback.
• Communication Records: Correspondence with us via email, contact forms, or social media channels.
• Usage Data: Non-personal information such as IP address, browser type, device information, pages visited, and time spent on our website collected through cookies and similar technologies.
• Sponsor & Partner Information: Business contact details and company information provided by sponsors and partners for collaboration purposes.`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: `We use the collected information for the following purposes:

• To facilitate event registration, participation, and communication regarding TFC events, hackathons, and fellowship programs.
• To process and evaluate fellowship applications and demo day submissions.
• To send periodic updates, newsletters, and promotional materials related to TFC activities and community initiatives.
• To improve our website, events, and community experience based on usage patterns and feedback.
• To connect participants with sponsors and partners for collaboration and placement opportunities.
• To ensure compliance with our Terms & Conditions and applicable laws.
• To protect the security and integrity of our platform and community.`,
  },
  {
    id: "data-sharing",
    title: "4. Data Sharing & Disclosure",
    content: `We do not sell, trade, or rent your personal information to third parties. However, we may share your information under the following circumstances:

• With Event Partners & Sponsors: Limited information (such as name and email) may be shared with event sponsors and partners for follow-up communications or collaboration opportunities, with your explicit consent.
• With Service Providers: We engage trusted third-party service providers to assist with website hosting, email communications, analytics, and event management. These providers are contractually obligated to protect your data.
• For Legal Compliance: When required by law, court order, or governmental regulation, we may disclose information to comply with legal obligations.
• With Your Consent: We may share your information for any other purpose with your explicit consent.`,
  },
  {
    id: "data-security",
    title: "5. Data Security & Retention",
    content: `We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.

We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Event participation data is typically retained for the duration of the event cycle plus a reasonable period for follow-up activities. You may request deletion of your data at any time by contacting us.`,
  },
  {
    id: "your-rights",
    title: "6. Your Rights & Choices",
    content: `You have the following rights regarding your personal information:

• Access: You may request a copy of the personal information we hold about you.
• Correction: You may request correction of inaccurate or incomplete information.
• Deletion: You may request deletion of your personal information, subject to certain legal exceptions.
• Opt-Out: You may unsubscribe from our marketing communications at any time by clicking the "unsubscribe" link in our emails or contacting us directly.
• Data Portability: You may request a copy of your data in a structured, commonly used format.`,
  },
  {
    id: "cookies",
    title: "7. Cookies & Tracking Technologies",
    content: `Our website uses cookies and similar tracking technologies to enhance user experience, analyze site traffic, and understand usage patterns. Cookies are small text files stored on your device.

You can manage cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain for a set period) for analytics and performance optimization.`,
  },
  {
    id: "third-party",
    title: "8. Third-Party Links & Services",
    content: `Our website and communications may contain links to third-party websites, platforms, or services (such as social media, registration platforms, or code repositories). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.

We use the following third-party services to operate our community:
• Event registration and management platforms
• Email communication services
• Analytics and performance monitoring tools
• Code hosting and collaboration platforms (e.g., GitHub)`,
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    content: `Our services are not directed to individuals under the age of 13 (or the applicable age of consent in your jurisdiction). We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information promptly. If you believe a child has provided us with personal data, please contact us immediately.`,
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. We will notify you of any material changes by posting the updated policy on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.`,
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

Email: privacy@thefusionclub.com
Instagram DM: @the_fusionclub
LinkedIn: The Fusion Club

The Fusion Club
Empowering the next generation of software creators through innovation, collaboration, and community.`,
  },
];

/* ────────── COMPONENT ────────── */
export default function PrivacyPolicy() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ── Scroll Progress ── */
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(Math.min(progress, 100));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── Intersection Observer for visibility + active section ── */
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -60% 0px" }
    );

    const currentRefs = sectionRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) {
        sectionObserver.observe(ref);
        activeObserver.observe(ref);
      }
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) {
          sectionObserver.unobserve(ref);
          activeObserver.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <div className={styles.page}>
      {/* Scroll Progress Bar */}
      <div className={styles.scrollProgress} aria-hidden="true">
        <div
          className={styles.scrollProgressBar}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Ambient glow orbs */}
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.ambientGlow2} aria-hidden="true" />

      {/* Floating particles */}
      <div className={styles.particles} aria-hidden="true">
        <span className={`${styles.particle} ${styles.p1}`} />
        <span className={`${styles.particle} ${styles.p2}`} />
        <span className={`${styles.particle} ${styles.p3}`} />
        <span className={`${styles.particle} ${styles.p4}`} />
        <span className={`${styles.particle} ${styles.p5}`} />
        <span className={`${styles.particle} ${styles.p6}`} />
        <span className={`${styles.particle} ${styles.p7}`} />
        <span className={`${styles.particle} ${styles.p8}`} />
      </div>

      <Navbar />

      {/* HERO HEADER */}
      <header className={styles.hero}>
        <div className={styles.heroDeco} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.badge}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="3" fill="#7F22FE" opacity="0.6" />
              <circle cx="5" cy="5" r="1.5" fill="#A684FF" />
            </svg>
            Legal
          </span>
          <h1 className={styles.heroTitle}>
            Privacy <span className={styles.titleHighlight}>Policy</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Your privacy matters to us. Learn how The Fusion Club collects, uses, and protects your personal information.
          </p>
          <div className={styles.heroMeta}>
            <span className={styles.effectiveDate}>Last Updated: June 2025</span>
            <span className={styles.readTime}>~5 min read</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Quick Navigation */}
          <nav className={styles.toc} aria-label="Table of Contents">
            <h2 className={styles.tocTitle}>Contents</h2>
            <ul className={styles.tocList}>
              {SECTIONS.map((section, idx) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`${styles.tocLink} ${
                      activeSection === section.id ? styles.tocLinkActive : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById(section.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span className={styles.tocNumber}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className={styles.sections}>
            {SECTIONS.map((section, idx) => (
              <div
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                className={styles.sectionCard}
                style={{
                  transitionDelay: `${idx * 0.05}s`,
                }}
              >
                <div className={styles.sectionMarker} aria-hidden="true">
                  <span className={styles.markerDot} />
                  <span className={styles.markerLine} />
                </div>
                <div className={styles.sectionBody}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <div className={styles.sectionContent}>
                    {section.content.split("\n").map((line, i) => {
                      const trimmed = line.trim();
                      if (!trimmed) return <br key={i} />;
                      if (trimmed.startsWith("•")) {
                        return (
                          <span key={i} className={styles.bulletItem}>
                            {trimmed}
                          </span>
                        );
                      }
                      return (
                        <p key={i} className={styles.paragraph}>
                          {trimmed}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={styles.bottomCta}>
            <p className={styles.bottomCtaText}>
              Have questions about our Privacy Policy?
            </p>
            <Link to="/contact" className={styles.bottomCtaLink}>
              Contact Us
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>

      {/* FOOTER NOTE */}
      <footer className={styles.footerNote}>
        <div className={styles.footerNoteInner}>
          <p>&copy; {new Date().getFullYear()} The Fusion Club. All rights reserved.</p>
          <div className={styles.footerNoteLinks}>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


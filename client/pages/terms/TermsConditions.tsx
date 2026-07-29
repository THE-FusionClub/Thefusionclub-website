import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar/Navbar";
import styles from "./Terms.module.css";

/* ────────── SECTION DATA ────────── */
const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the The Fusion Club ("TFC") website, participating in our events (including hackathons, workshops, demo days, and fellowship programs), or engaging with our community platforms, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must discontinue use of our services immediately.

These terms constitute a legally binding agreement between you ("Participant", "User", "Sponsor", or "You") and The Fusion Club. We reserve the right to modify these terms at any time, with changes effective upon posting. Continued use of our services after modifications constitutes acceptance of the updated terms.`,
  },
  {
    id: "eligibility",
    title: "2. Eligibility & Registration",
    content: `To participate in TFC events and programs, you must:

• Be at least 16 years of age, or have obtained parental/guardian consent if under the applicable age of majority in your jurisdiction.
• Be currently enrolled in an educational institution (school, college, or university) unless otherwise specified for specific programs.
• Provide accurate, complete, and up-to-date registration information.
• Maintain the confidentiality of any account credentials provided.
• Not create multiple accounts or misrepresent your identity or affiliation.

TFC reserves the right to verify eligibility and deny participation to any individual at our sole discretion, without liability.`,
  },
  {
    id: "event-participation",
    title: "3. Event Participation & Conduct",
    content: `All participants in TFC events, including hackathons, workshops, and fellowship programs, agree to:

• Comply with all event rules, schedules, and guidelines provided by TFC organizers.
• Maintain a respectful, inclusive, and professional demeanor towards all participants, mentors, judges, sponsors, and organizers.
• Refrain from any form of harassment, discrimination, bullying, or disruptive behavior.
• Not submit plagiarized, stolen, or AI-generated content as original work without proper disclosure.
• Adhere to the specific code of conduct provided for each event.

Violation of conduct standards may result in immediate disqualification, removal from the event, and potential ban from future TFC activities without refund of any fees paid.`,
  },
  {
    id: "intellectual-property",
    title: "4. Intellectual Property Rights",
    content: `Respect for intellectual property is fundamental to our community.

• Your Work: You retain full ownership and intellectual property rights to any code, designs, or projects you create during TFC events, unless otherwise specified in specific program agreements.
• TFC Content: All materials provided by TFC including branding, logos, website content, workshop materials, and event frameworks are the intellectual property of The Fusion Club and may not be reproduced, distributed, or used without prior written consent.
• Open Source Contributions: Any code contributed to TFC-managed open-source repositories is subject to the license specified in the respective repository.
• Submissions: By submitting projects for evaluation, judging, or demo day presentations, you grant TFC a non-exclusive, royalty-free license to display, highlight, and promote your work for community and promotional purposes.`,
  },
  {
    id: "code-of-conduct",
    title: "5. Code of Conduct",
    content: `The Fusion Club is committed to providing a safe, welcoming, and harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, ethnicity, age, religion, or technical experience.

We do not tolerate harassment of participants in any form. Harassment includes:
• Offensive verbal comments related to protected characteristics
• Deliberate intimidation, stalking, or following
• Inappropriate physical contact or unwelcome sexual attention
• Sustained disruption of talks, workshops, or other events
• Photography or recording without explicit consent

Participants asked to stop any harassing behavior are expected to comply immediately. Event organizers may take any action they deem appropriate, including warning the offender or expulsion from the event.`,
  },
  {
    id: "sponsors-partners",
    title: "6. Sponsors & Partners",
    content: `Sponsors and partners collaborating with TFC agree to:

• Provide accurate company and contact information for collaboration purposes.
• Fulfill any commitments made regarding prizes, mentorship, job opportunities, or resources promised to participants.
• Adhere to the same code of conduct standards as participants during all TFC events.
• Not use TFC events for unsolicited marketing or data collection without explicit participant consent.
• Respect the intellectual property and confidentiality of participant projects.

TFC reserves the right to terminate partnerships that violate these terms or our community values.`,
  },
  {
    id: "limitation-liability",
    title: "7. Limitation of Liability",
    content: `To the fullest extent permitted by applicable law, The Fusion Club, its organizers, volunteers, sponsors, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to:

• Your participation or inability to participate in any TFC event or program.
• Any errors, omissions, or inaccuracies in event materials or communications.
• Personal injury, property damage, or data loss incurred during event participation.
• Any unauthorized access to or use of our servers and/or any personal information stored therein.
• Any interruption or cessation of transmission to or from our services.

Our total liability for any claims under these terms shall not exceed the amount paid by you (if any) to TFC for the specific event giving rise to the claim.`,
  },
  {
    id: "indemnification",
    title: "8. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless The Fusion Club, its officers, directors, employees, volunteers, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from:

• Your use of and access to TFC services and events.
• Your violation of any term of these Terms & Conditions.
• Your violation of any third-party right, including without limitation any copyright, property, or privacy right.
• Any claim that your participation caused damage to a third party.

This indemnification obligation will survive the termination of your participation and these Terms & Conditions.`,
  },
  {
    id: "termination",
    title: "9. Termination & Suspension",
    content: `TFC reserves the right to terminate or suspend your access to our services, events, and community platforms immediately, without prior notice or liability, for any reason whatsoever, including without limitation:

• Breach of these Terms & Conditions.
• Violation of event-specific rules or code of conduct.
• Fraudulent, abusive, or illegal behavior.
• Requests by law enforcement or other government agencies.

Upon termination, your right to use our services will immediately cease. Provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`,
  },
  {
    id: "governing-law",
    title: "10. Governing Law & Dispute Resolution",
    content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.

Any disputes arising out of or relating to these terms, our events, or our services shall be resolved through the following process:

1. Informal Resolution: The parties agree to first attempt to resolve any dispute informally by contacting TFC at legal@thefusionclub.com.
2. Mediation: If the dispute cannot be resolved informally, the parties agree to submit the dispute to mediation before a mutually agreed mediator.
3. Jurisdiction: Any legal proceedings not resolved through mediation shall be brought exclusively in the courts of Dehradun, Uttarakhand, India.

You agree to submit to the personal jurisdiction of such courts for the purpose of litigating all such claims.`,
  },
  {
    id: "contact-legal",
    title: "11. Contact & Legal Notices",
    content: `For questions, concerns, or legal notices regarding these Terms & Conditions, please contact us:

Email: legal@thefusionclub.com
Instagram DM: @the_fusionclub
LinkedIn: The Fusion Club

All legal notices shall be sent to:
The Fusion Club (TFC)
Dehradun, Uttarakhand, India

These Terms & Conditions were last updated on June 2025. We encourage you to review them periodically.`,
  },
];

/* ────────── COMPONENT ────────── */
export default function TermsConditions() {
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
            Terms &amp; <span className={styles.titleHighlight}>Conditions</span>
          </h1>
          <p className={styles.heroSubtitle}>
            By participating in The Fusion Club community, events, and programs, you agree to the following terms governing your involvement.
          </p>
          <div className={styles.heroMeta}>
            <span className={styles.effectiveDate}>Last Updated: June 2025</span>
            <span className={styles.readTime}>~6 min read</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Table of Contents */}
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
                      if (/^\d+\./.test(trimmed)) {
                        return (
                          <span key={i} className={styles.subList}>
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
              Have questions about our Terms &amp; Conditions?
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
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


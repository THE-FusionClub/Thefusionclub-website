import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  included,
  notIncluded,
  tiers,
  Tier,
  TierKey,
  coreBenefits,
  extendedBenefits,
} from "./sponsorData";
import styles from "./SponsorTiersSection.module.css";
import LottieSponsorIcon from "./LottieSponsorIcon";

const easeOut = [0.16, 1, 0.3, 1] as const;

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: easeOut },
  },
};

/* ── Hierarchical tier config (kept for gradients/borders) ── */
const tierConfig: Record<
  TierKey,
  {
    cardBorder: string;
    cardBg: string;
    glowColor: string;
    gradient: string;
    badgeLabel: string;
    badgeBg: string;
    isFeatured: boolean;
    accent: string;
    borderGradient: string;
    ctaHoverShadow: string;
  }
> = {
  title: {
    cardBorder: "rgba(124, 58, 237, 0.25)",
    cardBg: "rgba(255,255,255,0.85)",
    glowColor: "rgba(124, 58, 237, 0.15)",
    gradient: "linear-gradient(135deg, #7C3AED, #4F46E5)",
    badgeLabel: "Featured",
    badgeBg: "linear-gradient(135deg, #7C3AED, #4F46E5)",
    isFeatured: true,
    accent: "#7C3AED",
    borderGradient:
      "conic-gradient(from 210deg, rgba(124,58,237,0), rgba(124,58,237,0.45), rgba(79,70,229,0), rgba(245,158,11,0.35), rgba(203,213,225,0), rgba(124,58,237,0.45))",
    ctaHoverShadow: "rgba(124, 58, 237, 0.5)",
  },
  gold: {
    cardBorder: "rgba(245, 158, 11, 0.2)",
    cardBg: "rgba(255,255,255,0.82)",
    glowColor: "rgba(245, 158, 11, 0.12)",
    gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)",
    badgeLabel: "Premium",
    badgeBg: "linear-gradient(135deg, #F59E0B, #FBBF24)",
    isFeatured: false,
    accent: "#F59E0B",
    borderGradient:
      "conic-gradient(from 210deg, rgba(245,158,11,0), rgba(245,158,11,0.35), rgba(251,191,36,0), rgba(124,58,237,0.2), rgba(203,213,225,0), rgba(245,158,11,0.35))",
    ctaHoverShadow: "rgba(245, 158, 11, 0.5)",
  },
  silver: {
    cardBorder: "rgba(100, 116, 139, 0.18)",
    cardBg: "rgba(255,255,255,0.78)",
    glowColor: "rgba(148, 163, 184, 0.08)",
    gradient: "linear-gradient(135deg, #64748B, #CBD5E1)",
    badgeLabel: "Essential",
    badgeBg: "linear-gradient(135deg, #64748B, #94A3B8)",
    isFeatured: false,
    accent: "#64748B",
    borderGradient:
      "conic-gradient(from 210deg, rgba(148,163,184,0), rgba(148,163,184,0.3), rgba(203,213,225,0), rgba(100,116,139,0.2), rgba(148,163,184,0), rgba(148,163,184,0.3))",
    ctaHoverShadow: "rgba(148, 163, 184, 0.4)",
  },
};

function CheckIcon() {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#10B981" opacity="0.15" />
      <path
        d="M8 12.5l3 3 5-6"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className={styles.crossIcon} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#64748B" opacity="0.14" />
      <path
        d="M8.5 8.5l7 7M15.5 8.5l-7 7"
        stroke="#64748B"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg className={styles.sparkleIcon} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z"
        fill="currentColor"
        opacity="0.6"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function DecorativeBlobs({ tier }: { tier: Tier }) {
  const cfg = tierConfig[tier.key];
  return (
    <div className={styles.blobsContainer} aria-hidden="true">
      <div className={styles.blobTop} style={{ background: cfg.gradient }} />
      <div className={styles.blobBottom} style={{ background: cfg.gradient }} />

      <svg className={styles.lineDecorTop} viewBox="0 0 100 60" fill="none">
        <path
          d="M10 50 Q30 10 50 30 Q70 50 90 20"
          stroke={cfg.accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.15"
        />
        <circle cx="90" cy="20" r="3" fill={cfg.accent} opacity="0.2" />
      </svg>

      <svg className={styles.lineDecorBottom} viewBox="0 0 80 40" fill="none">
        <path
          d="M5 35 Q25 5 40 20 Q55 35 75 10"
          stroke={cfg.accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.12"
        />
      </svg>
    </div>
  );
}

function getTierLottieFile(tierKey: TierKey) {
  if (tierKey === "title") return "gold-house-corn.json";
  if (tierKey === "gold") return "lucky-cat.json";
  return "shooting-star.json";
}

/* ── Animated gradient border ── */
function AnimatedBorder({ cfg, isFeatured }: { cfg: typeof tierConfig[TierKey]; isFeatured: boolean }) {
  return (
    <div className={`${styles.gradientBorder} ${isFeatured ? styles.gradientBorderFeatured : ""}`}>
      <div
        className={styles.gradientBorderInner}
        style={{ background: cfg.borderGradient }}
      />
      {isFeatured && (
        <div className={styles.gradientBorderPulse} style={{ background: cfg.gradient }} />
      )}
    </div>
  );
}

/* ── Premium CTA Button ── */
function PremiumCTA({ cfg }: { cfg: typeof tierConfig[TierKey] }) {
  return (
    <a
      href="#contact"
      className={styles.cta}
      style={{
        background: cfg.gradient,
        boxShadow: `0 4px 20px ${cfg.accent}40`,
      }}
    >
      <span className={styles.ctaShine} />
      <span className={styles.ctaContent}>
        <SparkleIcon />
        <span className={styles.ctaText}>Become a Sponsor</span>
        <svg
          className={styles.ctaIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

/* ── Tier-specific header ornament ── */
function TierOrnament({ tierKey }: { tierKey: TierKey }) {
  if (tierKey === "title") {
    return (
      <svg className={styles.tierOrnament} viewBox="0 0 120 10" fill="none" aria-hidden="true">
        <path d="M0 5 L30 2 L60 5 L90 8 L120 5" stroke="url(#crownGrad)" strokeWidth="2" opacity="0.5" />
        <defs>
          <linearGradient id="crownGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (tierKey === "gold") {
    return (
      <svg className={styles.tierOrnament} viewBox="0 0 80 8" fill="none" aria-hidden="true">
        <path d="M0 4 L20 1 L40 4 L60 7 L80 4" stroke="#F59E0B" strokeWidth="1.5" opacity="0.4" />
      </svg>
    );
  }
  return null;
}

export default function SponsorTiersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const [expandedTiers, setExpandedTiers] = useState<Record<TierKey, boolean>>({
    title: false,
    gold: false,
    silver: false,
  });
  const [hoveredTier, setHoveredTier] = useState<TierKey | null>(null);

  const toggleExpand = useCallback((key: TierKey) => {
    setExpandedTiers((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.bgDecor1} aria-hidden="true" />
      <div className={styles.bgDecor2} aria-hidden="true" />
      <div className={styles.bgDecor3} aria-hidden="true" />

      <div className={styles.container}>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: easeOut }}
          className={styles.pillWrapper}
        >
          <div className={styles.pill}>
            <svg
              className={styles.pillIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Sponsorship Levels
          </div>
        </motion.div> */}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
          className={styles.heading}
        >
          Choose Your <span className={styles.headingAccent}>Sponsorship Tier</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
          className={styles.subtext}
        >
          Partner with us to amplify your brand and connect with the next generation of tech talent.
        </motion.p>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerVariants}
          className={styles.grid}
        >
          {tiers.map((tier) => {
            const cfg = tierConfig[tier.key];
            const isExpanded = expandedTiers[tier.key];
            const isHovered = hoveredTier === tier.key;
            const tierExtendedBenefits = extendedBenefits[tier.key];

            return (
              <motion.div
                key={tier.key}
                variants={cardVariants}
                onMouseEnter={() => setHoveredTier(tier.key)}
                onMouseLeave={() => setHoveredTier(null)}
                className={`${styles.card} ${cfg.isFeatured ? styles.cardFeatured : ""} ${
                  isHovered ? styles.cardHovered : ""
                }`}
                style={{
                  background: cfg.cardBg,
                  borderColor: cfg.cardBorder,
                }}
              >
                <AnimatedBorder cfg={cfg} isFeatured={cfg.isFeatured} />

                {cfg.isFeatured && (
                  <div className={styles.featuredGlow} style={{ background: cfg.glowColor }} />
                )}

                <DecorativeBlobs tier={tier} />

                <div
                  className={`${styles.lottieWrap} ${
                    isHovered ? styles.lottieWrapHovered : ""
                  }`}
                  aria-hidden="true"
                  style={{
                    animationDuration: tier.key === "title" ? "4.8s" : tier.key === "gold" ? "5.4s" : "6s",
                  }}
                >
                  <LottieSponsorIcon
                    fileName={getTierLottieFile(tier.key)}
                    className={styles.lottieImg}
                  />
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.badgeRow}>
                    <div className={styles.tierBadge} style={{ background: cfg.badgeBg }}>
                      {cfg.badgeLabel}
                    </div>
                    {cfg.isFeatured && (
                      <div className={styles.featuredChip}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
                        </svg>
                        Most Popular
                      </div>
                    )}
                  </div>

                  <TierOrnament tierKey={tier.key} />

                  <h3 className={styles.tierName}>{tier.name}</h3>

                  <div className={styles.priceRow}>
                    <span className={styles.priceValue}>{tier.price}</span>
                    <span className={styles.pricePeriod}>/ year</span>
                  </div>

                  <p className={styles.description}>{tier.description}</p>

                  <div
                    className={styles.divider}
                    style={{ background: `linear-gradient(to right, ${cfg.accent}40, transparent)` }}
                  />

                  <div className={styles.includedSection}>
                    <span className={styles.includedLabel}>What you get</span>
                    <ul className={styles.benefitsList}>
                      {/* Core benefits - always visible */}
                      {coreBenefits[tier.key].map((item) => {
                        const isIncluded = included[tier.key].includes(item);
                        const isExcluded = notIncluded[tier.key].includes(item);
                        const disabled = !isIncluded && isExcluded;

                        return (
                          <li
                            key={item}
                            className={`${styles.benefitItem} ${disabled ? styles.benefitItemDisabled : ""} ${styles.benefitItemCore}`}
                          >
                            {isIncluded ? <CheckIcon /> : <CrossIcon />}
                            <span>{item}</span>
                          </li>
                        );
                      })}

                      {/* Extended benefits - expandable */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            key="extended-benefits"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: easeOut }}
                            className={styles.extendedBenefitsWrap}
                          >
                            <div className={styles.extendedDivider} />
                            <span className={styles.extendedLabel}>
                              <SparkleIcon />
                              Premium Extras
                            </span>
                            {tierExtendedBenefits.map((item) => {
                              const isIncluded = included[tier.key].includes(item);
                              const isExcluded = notIncluded[tier.key].includes(item);
                              const disabled = !isIncluded && isExcluded;

                              return (
                                <li
                                  key={item}
                                  className={`${styles.benefitItem} ${disabled ? styles.benefitItemDisabled : ""} ${styles.benefitItemExtended}`}
                                >
                                  {isIncluded ? <CheckIcon /> : <CrossIcon />}
                                  <span>{item}</span>
                                </li>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </ul>

                    {tierExtendedBenefits.length > 0 && (
                      <button
                        type="button"
                        onClick={() => toggleExpand(tier.key)}
                        className={styles.expandToggle}
                        style={{ color: cfg.accent }}
                      >
                        <span>{isExpanded ? "Show Less" : `Show All ${coreBenefits[tier.key].length + tierExtendedBenefits.length} Benefits`}</span>
                        <svg
                          className={`${styles.expandIcon} ${isExpanded ? styles.expandIconOpen : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <PremiumCTA cfg={cfg} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
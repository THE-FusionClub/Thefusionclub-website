import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

/* ──────────── FOOTER NAV LINKS ──────────── */
const FOOTER_LINKS = {
  Programs: ["Hackathons", "Fellowship", "Workshops", "Demo Day"],
  Explore: ["Home", "About", "Events", "Join"],
  Company: ["About", "Register"],
};

/* ──────────── SOCIAL ICONS ──────────── */
const SOCIAL_ICONS = [
  {
    name: "Twitter",
    href: "https://x.com/TheFusionClubb",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/the_fusionclub",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4033 19.4033 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.59889 4.59889 2 7.8 2ZM7.6 4C5.61177 4 4 5.61177 4 7.6V16.4C4 18.39 5.61 20 7.6 20H16.4C18.3882 20 20 18.3882 20 16.4V7.6C20 5.61 18.39 4 16.4 4H7.6ZM17.25 5.5C17.9399 5.5 18.5 6.06011 18.5 6.75C18.5 7.43989 17.9399 8 17.25 8C16.5601 8 16 7.43989 16 6.75C16 6.06011 16.5601 5.5 17.25 5.5ZM12 7C14.7596 7 17 9.24043 17 12C17 14.7596 14.7596 17 12 17C9.24043 17 7 14.7596 7 12C7 9.24043 9.24043 7 12 7ZM12 9C10.3443 9 9 10.3443 9 12C9 13.6557 10.3443 15 12 15C13.6557 15 15 13.6557 15 12C15 10.3443 13.6557 9 12 9Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/the-fusion-club-page/",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3C20.1038 3 21 3.89617 21 5V19C21 20.1038 20.1038 21 19 21H5C3.89617 21 3 20.1038 3 19V5C3 3.89617 3.89617 3 5 3H19ZM18.5 18.5V13.2C18.5 11.4008 17.0392 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C15.0832 12.17 15.71 12.7968 15.71 13.57V18.5H18.5ZM6.88 8.56C7.80784 8.56 8.56 7.80784 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C5.94664 5.19 5.19 5.94664 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@thefusionclubofficial",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a2.966 2.966 0 0 0-2.092-2.094C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.406.592A2.966 2.966 0 0 0 .502 6.186 30.89 30.89 0 0 0 0 12a30.89 30.89 0 0 0 .502 5.814 2.966 2.966 0 0 0 2.092 2.094C4.495 20.5 12 20.5 12 20.5s7.505 0 9.406-.592a2.966 2.966 0 0 0 2.092-2.094A30.89 30.89 0 0 0 24 12a30.89 30.89 0 0 0-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
      </svg>
    ),
  },
];

/* ──────────── FLOATING TECH SVG ELEMENTS ──────────── */
const FLOATING_ELEMENTS = [
  {
    /* AI Node — connected circles */
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="8" stroke="#7f22fe" strokeWidth="1.2" opacity="0.5" />
        <circle cx="24" cy="24" r="3" fill="#b794ff" opacity="0.8" />
        <circle cx="16" cy="14" r="2.5" stroke="#4f39f6" strokeWidth="0.8" opacity="0.4" />
        <circle cx="34" cy="16" r="2" stroke="#4f39f6" strokeWidth="0.8" opacity="0.4" />
        <circle cx="33" cy="34" r="2" stroke="#4f39f6" strokeWidth="0.8" opacity="0.35" />
        <circle cx="15" cy="33" r="1.8" stroke="#4f39f6" strokeWidth="0.8" opacity="0.35" />
        <line x1="24" y1="24" x2="16" y2="14" stroke="#7f22fe" strokeWidth="0.5" opacity="0.2" />
        <line x1="24" y1="24" x2="34" y2="16" stroke="#7f22fe" strokeWidth="0.5" opacity="0.2" />
        <line x1="24" y1="24" x2="33" y2="34" stroke="#7f22fe" strokeWidth="0.5" opacity="0.2" />
        <line x1="24" y1="24" x2="15" y2="33" stroke="#7f22fe" strokeWidth="0.5" opacity="0.2" />
      </svg>
    ),
  },
  {
    /* Network connection lines */
    svg: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2" fill="#7f22fe" opacity="0.5" />
        <circle cx="32" cy="10" r="2" fill="#7f22fe" opacity="0.5" />
        <circle cx="22" cy="32" r="2" fill="#7f22fe" opacity="0.5" />
        <line x1="12" y1="12" x2="32" y2="10" stroke="#b794ff" strokeWidth="0.6" opacity="0.25" />
        <line x1="12" y1="12" x2="22" y2="32" stroke="#b794ff" strokeWidth="0.6" opacity="0.25" />
        <line x1="32" y1="10" x2="22" y2="32" stroke="#b794ff" strokeWidth="0.6" opacity="0.25" />
      </svg>
    ),
  },
  {
    /* Glowing cube */
    svg: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="20" height="20" rx="3" stroke="#b794ff" strokeWidth="1" opacity="0.4" />
        <rect x="11" y="11" width="14" height="14" rx="2" stroke="#7f22fe" strokeWidth="0.7" opacity="0.3" />
        <rect x="14" y="14" width="8" height="8" rx="1.5" fill="#7f22fe" opacity="0.15" />
      </svg>
    ),
  },
  {
    /* Code brackets { } */
    svg: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8L6 16L12 24" stroke="#b794ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        <path d="M20 8L26 16L20 24" stroke="#b794ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        <circle cx="16" cy="16" r="1.5" fill="#7f22fe" opacity="0.6" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </svg>
    ),
  },
  {
    /* Circuit pattern */
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="30" r="2" fill="#4f39f6" opacity="0.4" />
        <circle cx="30" cy="10" r="2" fill="#4f39f6" opacity="0.4" />
        <line x1="10" y1="30" x2="20" y2="20" stroke="#7f22fe" strokeWidth="0.6" opacity="0.2" />
        <line x1="20" y1="20" x2="30" y2="10" stroke="#7f22fe" strokeWidth="0.6" opacity="0.2" />
        <line x1="20" y1="20" x2="28" y2="28" stroke="#7f22fe" strokeWidth="0.6" opacity="0.2" strokeDasharray="3 3" />
        <rect x="18" y="18" width="4" height="4" rx="1" fill="#b794ff" opacity="0.3" />
      </svg>
    ),
  },
  {
    /* Geometric diamond / innovation symbol */
    svg: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="17,4 30,17 17,30 4,17" stroke="#7f22fe" strokeWidth="0.8" opacity="0.4" />
        <polygon points="17,9 25,17 17,25 9,17" stroke="#b794ff" strokeWidth="0.6" opacity="0.3" />
        <circle cx="17" cy="17" r="3" fill="#7f22fe" opacity="0.2" />
        <circle cx="17" cy="17" r="1.5" fill="#b794ff" opacity="0.5" />
      </svg>
    ),
  },
  {
    /* Small plus / cross */
    svg: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="14" y1="6" x2="14" y2="22" stroke="#4f39f6" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
        <line x1="6" y1="14" x2="22" y2="14" stroke="#4f39f6" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
        <circle cx="14" cy="14" r="2" fill="#7f22fe" opacity="0.2" />
      </svg>
    ),
  },
  {
    /* Glow dot */
    svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="2.5" fill="#b794ff" opacity="0.3" />
        <circle cx="10" cy="10" r="5" stroke="#7f22fe" strokeWidth="0.5" opacity="0.15" />
        <circle cx="10" cy="10" r="8" stroke="#7f22fe" strokeWidth="0.4" opacity="0.08" />
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
      </svg>
    ),
  },
  {
    /* Small triangle / play */
    svg: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="13,5 22,19 4,19" stroke="#4f39f6" strokeWidth="0.7" opacity="0.35" />
        <circle cx="13" cy="14" r="1.5" fill="#7f22fe" opacity="0.25" />
      </svg>
    ),
  },
];

/* ──────────── LINK RESOLVER ──────────── */
function resolveHref(link: string): string {
  const map: Record<string, string> = {
    Home: "/",
    About: "/about",
    Events: "/events",
    Join: "/join-event",
    Register: "/signup",
  };
  return map[link] || "/";
}

/* ──────────── MAIN COMPONENT ──────────── */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Grid pattern overlay */}
      <div className={styles.gridOverlay} aria-hidden="true" />

      {/* Floating tech illustrations container */}
      <div className={styles.floatingContainer} aria-hidden="true">
        {FLOATING_ELEMENTS.map((el, idx) => (
          <div key={idx} className={`${styles.floatingItem} ${styles[`floatingItem${idx}`] || ""}`}>
            {el.svg}
          </div>
        ))}
      </div>

      <div className={styles.inner}>
        {/* ── Left — Brand ── */}
        <div className={styles.brand}>
          <img
            src="/assets/logo.png"
            alt="The Fusion Club"
            className={styles.logo}
          />
          <p className={styles.tagline}>
            Empowering the next generation of software creators through innovation, collaboration, and community.
          </p>
          <div className={styles.socials}>
            {SOCIAL_ICONS.map((icon) => (
              <a
                key={icon.name}
                href={icon.href}
                className={styles.socialLink}
                aria-label={icon.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon.svg}
              </a>
            ))}
          </div>
        </div>

        {/* ── Center — Nav columns ── */}
        <div className={styles.navGroup}>
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className={styles.column}>
              <h4 className={styles.columnTitle}>
                {category}
                <span className={styles.titleAccent} />
              </h4>
              <ul className={styles.columnLinks}>
                {links.map((link) => (
                  <li key={link}>
                    <Link to={resolveHref(link)} className={styles.navLink}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Right — (previously illustration, now empty / spacing role) ── */}
        {/* Right space is naturally handled by flex layout; floating elements
            sit in the absolute container above. */}
      </div>

      {/* ── Bottom legal bar ── */}
      <div className={styles.bottom}>
        <div className={styles.divider} />
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            &copy; 2026 The Fusion Club (TFC). All rights reserved. | Designed &amp; Developed by Shreya.
          </p>
          <div className={styles.legalLinks}>
            <a href="/privacy-policy" className={styles.legalLink}>
              Privacy Policy
            </a>
            <span className={styles.legalSeparator}>|</span>
            <a href="/terms" className={styles.legalLink}>
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}


import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";


const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Community", to: "/community" },
  { label: "Events", to: "/events" },
  { label: "Sponsor", to: "/sponsor" },
  { label: "Join", to: "/join-event" },
];

type NavbarProps = {
  introDone?: boolean;
};

export default function Navbar({ introDone = false }: NavbarProps) {
  const introClass = introDone ? "is-intro-done" : "";

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const mobileFirstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const t = window.setTimeout(() => {
      mobileFirstLinkRef.current?.focus();
    }, 50);

    return () => window.clearTimeout(t);
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!mobileOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobile();
        return;
      }

      if (e.key === "Tab") {
        const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    if (mobileOpen) return;
    toggleBtnRef.current?.focus();
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav className={`${styles.navbar} ${introClass}`.trim()}>
      <div className={styles.navbarInner}>
        <Link to="/" className={styles.navbarLogo}>
          <img src="/assets/logo.png" alt="TFC Logo" width={145} height={62} />
        </Link>


        <div className={styles.navbarLinks}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className={styles.navbarLink}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.navbarActions}>
          <Link to="/signup" className={styles.navbarSignup}>
            Register Now
          </Link>
        </div>

        <button
          ref={toggleBtnRef}
          className={styles.navbarMobileToggle}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-controls="navbar-mobile-menu"
          aria-expanded={mobileOpen}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <div
          className={styles.navbarMobileBackdrop}
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {mobileOpen && (
        <div
          id="navbar-mobile-menu"
          ref={mobileMenuRef}
          className={styles.navbarMobileMenu}
          role="menu"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.label}
              to={link.to}
              className={styles.navbarMobileLink}
              role="menuitem"
              tabIndex={idx === 0 ? 0 : -1}
              onClick={() => setMobileOpen(false)}
              ref={idx === 0 ? mobileFirstLinkRef : undefined}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/signup"
            className={styles.navbarMobileLink}
            role="menuitem"
            tabIndex={-1}
            onClick={() => setMobileOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}


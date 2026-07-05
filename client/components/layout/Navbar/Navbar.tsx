import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";



const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Community", to: "/community" },
  { label: "Events", to: "/events" },
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
      // Focus trap: Tab/Shift+Tab cycle within mobile menu
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

  // Prevent body scroll when mobile menu is open
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
    <nav className={`navbar ${introClass}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <img
            src="/assets/logo.png"
            alt="TFC Logo"
            width={104}
            height={44}
          />
        </Link>


        <div className="navbar-links">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className="navbar-link">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          {/* <Link to="/signin" className="navbar-signin">
            Sign In
          </Link> */}
          <Link to="/signup" className="navbar-signup">
           Register Now
          </Link>
        </div>


        <button
          ref={toggleBtnRef}
          className="navbar-mobile-toggle"
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

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          className="navbar-mobile-backdrop"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {mobileOpen && (
        <div
          id="navbar-mobile-menu"
          ref={mobileMenuRef}
          className="navbar-mobile-menu"
          role="menu"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.label}
              to={link.to}
              className="navbar-mobile-link"
              role="menuitem"
              tabIndex={idx === 0 ? 0 : -1}
              onClick={() => setMobileOpen(false)}
              ref={idx === 0 ? mobileFirstLinkRef : undefined}
            >
              {link.label}
            </Link>
          ))}
          {/* <Link
            to="/signin"
            className="navbar-mobile-link"
            role="menuitem"
            tabIndex={-1}
            onClick={() => setMobileOpen(false)}
          >
            Sign In
          </Link> */}
          <Link
            to="/signup"
            className="navbar-mobile-link"
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

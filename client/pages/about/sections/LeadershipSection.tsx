import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LeadershipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = contentRef.current?.children;
      if (els) {
        gsap.from(els, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="about-section"
      data-object-section
      data-object-scale="0.9"
      data-object-opacity="0.12"
      data-object-x="0"
      data-object-y="-30"
      data-object-blur="0"
      style={{
        padding: '10rem 0',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg)',
      }}
      aria-label="Leadership Message"
    >
      {/* Soft radial gradient overlay */}
      <div className="soft-radial-overlay" aria-hidden="true" />

      <div className="about-container">
        <div
          ref={contentRef}
          className="glass-card"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: 'clamp(2.5rem, 5vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
          }}
        >
          {/* Quote icon */}
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(124,58,237,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'transform 0.3s ease, background 0.3s ease',
            }}
            className="card-icon-badge"
            aria-hidden="true"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
          </div>

          <blockquote>
            <p
              className="about-heading-md"
              style={{
                fontStyle: 'italic',
                color: 'var(--color-text-primary)',
                lineHeight: 1.5,
              }}
            >
              "TFC is more than just a club — it's a launchpad for the next generation of builders,
              creators, and innovators. We're here to transform passion into impact."
            </p>
          </blockquote>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(124,58,237,0.18)',
                border: '1px solid rgba(124,58,237,0.25)',
              }}
              role="img"
              aria-label="Leadership avatar"
            >
              <img
                src="/client/assets/logo.png"
                alt="TFC"
                width={56}
                height={56}
                style={{
                  width: '56px',
                  height: '56px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                The Fusion Club
              </p>
              <p className="about-body" style={{ fontSize: '0.875rem' }}>
                Student-Led Community
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
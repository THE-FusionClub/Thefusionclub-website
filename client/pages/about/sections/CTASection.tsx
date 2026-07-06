import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = contentRef.current?.children;
      if (els) {
        gsap.from(els, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1.5,
          },
        });
      }

      // Gradient mesh animation
      gsap.to('.cta-gradient', {
        backgroundPosition: '100% 100%',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="about-section"
      data-object-section
      data-object-scale="2.5"
      data-object-opacity="0.08"
      data-object-x="0"
      data-object-y="0"
      data-object-blur="5"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg)',
      }}
      aria-label="Join Us"
    >
      {/* Gradient mesh background with purple tones */}
      <div
        className="cta-gradient"
        aria-hidden="true"
      />

      {/* Soft radial overlay */}
      <div className="soft-radial-overlay" aria-hidden="true" />

      <div
        ref={contentRef}
        className="about-container"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '800px',
        }}
      >
        <span
          className="section-label"
        >
          Join the Movement
        </span>

        <h2
          className="about-heading-xl"
          style={{ marginBottom: '2rem' }}
        >
          Ready to Build
          <br />
          the{' '}
          <span className="text-gradient-purple">
            Future
          </span>
          ?
        </h2>

        <p
          className="about-subheading"
          style={{
            maxWidth: '500px',
            margin: '0 auto 3rem',
          }}
        >
          Be part of a community that's shaping the next generation of innovators, creators, and leaders.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/join-event" className="about-cta" aria-label="Join TFC today">
            Join TFC Today
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3L13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </Link>
          <Link to="/events" className="about-cta about-cta-outline">
            Explore Events
          </Link>
        </div>
      </div>
    </section>
  );
}
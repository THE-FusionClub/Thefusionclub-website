import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(headingRef.current?.querySelectorAll('.hero-word'), {
        y: 120,
        opacity: 0,
        rotationX: -40,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.3,
      });

      gsap.from(subRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: 'power3.out',
      });

      gsap.from(ctaRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 1.3,
        ease: 'power3.out',
      });

      gsap.from('.scroll-indicator', {
        opacity: 0,
        duration: 0.8,
        delay: 1.8,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headingWords = ['Empowering', 'Innovation,', 'Leadership', '&', 'Creativity'];

  return (
    <section
      ref={sectionRef}
      className="about-section"
      data-object-section
      data-object-scale="1"
      data-object-opacity="0.15"
      data-object-x="0"
      data-object-y="0"
      data-object-blur="0"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '8rem 0 4rem',
      }}
      aria-label="Hero"
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)',
          zIndex: 0,
        }}
      />

      {/* Subtle purple gradient glow behind text */}
      <div className="hero-gradient-glow" aria-hidden="true" />

      {/* Floating abstract shape on right side */}
      <div className="hero-floating-shape" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shapeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path d="M200 0L260 140L400 160L300 260L320 400L200 320L80 400L100 260L0 160L140 140L200 0Z" 
                fill="url(#shapeGrad)" />
          <path d="M200 30L248 145L360 162L278 248L294 365L200 300L106 365L122 248L40 162L152 145L200 30Z" 
                stroke="#7C3AED" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
          <circle cx="200" cy="200" r="80" fill="#7C3AED" fillOpacity="0.04" />
          <circle cx="200" cy="200" r="40" fill="#7C3AED" fillOpacity="0.06" />
        </svg>
      </div>

      {/* Subtle particle overlay */}
      <div className="particle-bg" aria-hidden="true" />

      <div className="about-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ maxWidth: '900px' }}>
          <h1
            ref={headingRef}
            className="about-heading-xl"
            style={{ marginBottom: '2rem' }}
          >
            {headingWords.map((word, i) => (
              <span
                key={i}
                ref={(el) => { if (el) wordsRef.current[i] = el; }}
                className="hero-word"
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'top',
                  marginRight: word === '&' ? '0.5rem' : undefined,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    color: word === '&' ? 'var(--color-accent)' : undefined,
                    fontStyle: word === '&' ? 'italic' : undefined,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="about-subheading"
            style={{ maxWidth: '600px', marginBottom: '3rem' }}
          >
            A student-led community where technology, innovation, and culture come together to create impact.
          </p>

          <div ref={ctaRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#story" className="about-cta" aria-label="Discover our story">
              Discover Our Story
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3L13 8L8 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
            <a href="#values" className="about-cta about-cta-outline">
              Our Values
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-indicator-line" />
      </div>
    </section>
  );
}
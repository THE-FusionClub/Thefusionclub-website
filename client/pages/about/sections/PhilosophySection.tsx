import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statements = [
  'We Learn.',
  'We Build.',
  'We Lead.',
  'We Inspire.',
  'We Create.',
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stmts = statementsRef.current?.querySelectorAll<HTMLElement>('.philosophy-statement');
      if (stmts) {
        stmts.forEach((stmt) => {
          // Text reveal
          const text = stmt.querySelector('.philosophy-text');
          if (text) {
            gsap.from(text, {
              y: 100,
              opacity: 0,
              rotateX: -30,
              duration: 1.2,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: stmt,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1.5,
              },
            });
          }

          // Counter line underneath
          const line = stmt.querySelector('.philosophy-line');
          if (line) {
            gsap.from(line, {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: 1,
              scrollTrigger: {
                trigger: stmt,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1.5,
              },
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section"
      data-object-section
      data-object-scale="2"
      data-object-opacity="0.2"
      data-object-x="0"
      data-object-y="0"
      data-object-blur="10"
      data-dark
      style={{
        padding: '12rem 0',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-dark-bg)',
      }}
      aria-label="Our Philosophy"
    >
      {/* Blurred object background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 60%)',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div
        ref={statementsRef}
        className="about-container"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#6B7280',
            marginBottom: '3rem',
          }}
        >
          Our Philosophy
        </span>

        {statements.map((stmt, i) => (
          <div
            key={i}
            className="philosophy-statement"
            style={{
              marginBottom: i < statements.length - 1 ? '2.5rem' : 0,
              overflow: 'hidden',
            }}
          >
            <div
              className="philosophy-text"
              style={{
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(1rem, 3vw, 2rem)',
                  fontWeight: 400,
                  color: '#6B7280',
                  marginRight: '1.5rem',
                  verticalAlign: 'middle',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {stmt}
            </div>
            <div
              className="philosophy-line"
              style={{
                width: '100%',
                height: '1px',
                background: 'rgba(255,255,255,0.1)',
                marginTop: '1.5rem',
                transformOrigin: 'left center',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
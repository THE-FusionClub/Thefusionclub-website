import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 1200, suffix: '+', label: 'Students' },
  { value: 28, suffix: '', label: 'Events' },
  { value: 50, suffix: '+', label: 'Workshops' },
  { value: 75, suffix: '+', label: 'Projects' },
  { value: 500, suffix: '+', label: 'Community Members' },
];

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counterEls = countersRef.current?.querySelectorAll<HTMLElement>('.impact-counter');
      if (counterEls) {
        counterEls.forEach((el) => {
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';

          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => {
              gsap.fromTo(
                el,
                { textContent: '0' },
                {
                  textContent: target,
                  duration: 2,
                  ease: 'power2.out',
                  snap: { textContent: 1 },
                  onUpdate: () => {
                    const current = parseInt(el.textContent || '0', 10);
                    el.textContent = current + suffix;
                  },
                }
              );
            },
            once: true,
          });
        });
      }

      // Label entrance
      const labels = countersRef.current?.querySelectorAll<HTMLElement>('.impact-label');
      if (labels) {
        labels.forEach((label) => {
          gsap.from(label, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              end: 'top 70%',
              scrub: 1,
            },
          });
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
      data-object-scale="0.5"
      data-object-opacity="0.25"
      data-object-x="50"
      data-object-y="0"
      data-object-blur="4"
      style={{
        padding: '10rem 0',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
      aria-label="Our Impact"
    >
      <div className="about-container">
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.875rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '1rem',
          }}
        >
          Our Impact
        </span>
        <h2 className="about-heading-lg" style={{ marginBottom: '5rem' }}>
          By the Numbers
        </h2>

        <div
          ref={countersRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '3rem',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                className="impact-counter"
                data-target={stat.value}
                data-suffix={stat.suffix}
                style={{
                  fontSize: 'clamp(3rem, 5vw, 5rem)',
                  fontWeight: 800,
                  color: 'var(--color-text-primary)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  marginBottom: '0.75rem',
                }}
                aria-live="polite"
              >
                0{stat.suffix}
              </div>
              <p
                className="impact-label about-body"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
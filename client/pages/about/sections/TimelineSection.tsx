import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: '2021', title: 'Workshops', desc: 'Hands-on technical workshops covering modern development stacks and tools.' },
  { year: '2022', title: 'Hackathons', desc: 'Intense 24-hour hackathons where ideas transform into working prototypes.' },
  { year: '2022', title: 'Bootcamps', desc: 'Immersive bootcamps designed to accelerate learning and skill-building.' },
  { year: '2023', title: 'Industry Sessions', desc: 'Exclusive sessions with industry experts sharing real-world insights.' },
  { year: '2023', title: 'Industrial Visits', desc: 'Behind-the-scenes visits to leading tech companies and startups.' },
  { year: '2024', title: 'Networking', desc: 'Connecting students with mentors, founders, and fellow innovators.' },
  { year: '2024', title: 'Cultural Events', desc: 'Celebrating creativity through cultural fests and community events.' },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line animation
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1.5,
        },
      });

      // Items animation
      const items = itemsRef.current?.querySelectorAll<HTMLElement>('.timeline-item');
      if (items) {
        items.forEach((item) => {
          const isLeft = item.classList.contains('tl-left');
          gsap.from(item, {
            x: isLeft ? -80 : 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1.5,
            },
          });

          // Year badge animation
          const year = item.querySelector('.tl-year');
          if (year) {
            gsap.from(year, {
              scale: 0,
              duration: 0.6,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
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
      data-object-scale="0.6"
      data-object-opacity="0.3"
      data-object-x="30"
      data-object-y="0"
      data-object-blur="3"
      style={{
        padding: '10rem 0',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
      aria-label="Our Journey"
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
          Our Journey
        </span>
        <h2 className="about-heading-lg" style={{ marginBottom: '6rem' }}>
          The Path We've Built
        </h2>

        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          {/* Timeline line */}
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'var(--color-border)',
              transformOrigin: 'top center',
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          <div ref={itemsRef}>
            {timeline.map((item, i) => (
              <div
                key={i}
                className={`timeline-item ${i % 2 === 0 ? 'tl-left' : 'tl-right'}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '4rem',
                  position: 'relative',
                  zIndex: 1,
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                }}
              >
                {/* Content */}
                <div
                  style={{
                    width: 'calc(50% - 2rem)',
                    padding: i % 2 === 0 ? '0 2rem 0 0' : '0 0 0 2rem',
                    textAlign: i % 2 === 0 ? 'right' : 'left',
                  }}
                >
                  <span
                    className="tl-year"
                    style={{
                      display: 'inline-block',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      background: 'rgba(37,99,235,0.08)',
                      padding: '0.25rem 1rem',
                      borderRadius: '100px',
                      marginBottom: '1rem',
                    }}
                  >
                    {item.year}
                  </span>
                  <h3 className="about-heading-md" style={{ marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p className="about-body">{item.desc}</p>
                </div>

                {/* Dot */}
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'var(--color-accent)',
                    position: 'absolute',
                    left: '50%',
                    top: '0.5rem',
                    transform: 'translateX(-50%)',
                    border: '3px solid var(--color-bg-secondary)',
                    flexShrink: 0,
                    zIndex: 2,
                  }}
                  aria-hidden="true"
                />

                {/* Spacer */}
                <div style={{ width: 'calc(50% - 2rem)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
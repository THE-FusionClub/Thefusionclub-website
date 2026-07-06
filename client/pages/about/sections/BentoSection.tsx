import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { 
    title: 'Hackathons', 
    desc: '24-hour innovation sprints that turn ideas into reality.', 
    size: 'large', 
    color: '#FAFAFA', 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ) 
  },
  { 
    title: 'Coding', 
    desc: 'Competitive programming and collaborative coding sessions.', 
    size: 'small', 
    color: '#FFFFFF', 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ) 
  },
  { 
    title: 'Innovation', 
    desc: 'Ideathons and incubators for entrepreneurial minds.', 
    size: 'medium', 
    color: '#FAFAFA', 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ) 
  },
  { 
    title: 'Culture', 
    desc: 'Hands-on workshops, tech talks, and innovation showcases.', 
    size: 'medium', 
    color: '#FFFFFF', 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ) 
  },
  { 
    title: 'Networking', 
    desc: 'Connect with mentors, founders, and industry leaders.', 
    size: 'small', 
    color: '#FAFAFA', 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ) 
  },
  { 
    title: 'Community', 
    desc: 'A home for builders, creators, and lifelong learners.', 
    size: 'large', 
    color: '#FFFFFF', 
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) 
  },
];

export default function BentoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll<HTMLElement>('.bento-card');
      if (items) {
        items.forEach((item) => {
          gsap.from(item, {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1.5,
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
      id="bento"
      className="about-section"
      data-object-section
      data-object-scale="0.7"
      data-object-opacity="0.12"
      data-object-x="-40"
      data-object-y="0"
      data-object-blur="1"
      style={{
        padding: '10rem 0',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg)',
      }}
      aria-label="What We Do"
    >
      {/* Soft radial gradient overlay */}
      <div className="soft-radial-overlay" aria-hidden="true" />

      <div className="about-container" style={{ position: 'relative', zIndex: 1 }}>
        <span className="section-label">
          What We Do
        </span>
        <h2 className="about-heading-lg" style={{ marginBottom: '4rem', maxWidth: '600px' }}>
          Where Innovation Meets Action
        </h2>

        <div
          ref={gridRef}
          className="bento-grid"
        >
          {cards.map((card, i) => {
            return (
              <div
                key={card.title}
                className="bento-card"
                style={{
                  gridColumn: card.size === 'large' ? 'span 2' : card.size === 'medium' ? 'span 2' : 'span 1',
                  gridRow: card.size === 'large' ? 'span 2' : 'span 1',
                  padding: card.size === 'large' ? '3.25rem' : '2.25rem',
                  minHeight: card.size === 'large' ? '320px' : '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: card.size === 'large' ? 'flex-end' : 'flex-start',
                }}
                role="article"
                aria-label={card.title}
              >
                {/* Card number */}
                <span
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    opacity: 0.4,
                    letterSpacing: '0.1em',
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon badge */}
                <div
                  className="card-icon-badge"
                  style={{
                    marginBottom: card.size === 'large' ? '1.8rem' : '1.35rem',
                  }}
                  aria-hidden="true"
                >
                  {card.icon}
                </div>

                <h3
                  style={{
                    fontSize: card.size === 'large' ? '1.6rem' : '1.15rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="about-body"
                  style={{
                    fontSize: card.size === 'large' ? '0.95rem' : '0.85rem',
                    maxWidth: '90%',
                  }}
                >
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
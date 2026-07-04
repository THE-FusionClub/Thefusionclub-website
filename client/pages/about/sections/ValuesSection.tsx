import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { 
    title: 'Technology', 
    desc: 'Exploring cutting-edge tools and frameworks to build the future.', 
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ) 
  },
  { 
    title: 'Innovation', 
    desc: 'Fostering creative problem-solving and entrepreneurial thinking.', 
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ) 
  },
  { 
    title: 'Leadership', 
    desc: 'Developing the next generation of tech leaders and visionaries.', 
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ) 
  },
  { 
    title: 'Culture', 
    desc: 'Celebrating diversity, collaboration, and creative expression.', 
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ) 
  },
  { 
    title: 'Community', 
    desc: 'Building a supportive network of builders, creators, and learners.', 
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ) 
  },
];

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!cards || !section || !pin) return;

      const totalWidth = cards.scrollWidth;
      const viewWidth = window.innerWidth;
      const distance = totalWidth - viewWidth + 200;

      // Label animation
      gsap.from(labelRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      // Pinned horizontal scroll
      gsap.to(cards, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance + window.innerHeight * 0.5}`,
          pin: true,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      // Individual card entrance
      const cardEls = cards.querySelectorAll<HTMLElement>('.value-card');
      cardEls.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'left 90%',
            end: 'left 40%',
            scrub: 1.5,
          },
        });
      });

      // Update object position for this section
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          const obj = document.querySelector('.floating-object') as HTMLElement;
          if (obj) {
            gsap.to(obj, {
              scale: 1.5,
              opacity: 0.12,
              duration: 1,
              ease: 'power2.out',
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="values"
      className="about-section"
      data-object-section
      data-object-scale="1.5"
      data-object-opacity="0.12"
      data-object-x="0"
      data-object-y="-50"
      data-object-blur="0"
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg)',
        padding: '6rem 0',
      }}
      aria-label="Core Values"
    >
      {/* Soft radial gradient overlay */}
      <div className="soft-radial-overlay" aria-hidden="true" />

      <div ref={pinRef} style={{ position: 'relative', width: '100%' }}>
        <div className="about-container" style={{ marginBottom: '4rem' }}>
          <span
            ref={labelRef}
            className="section-label"
          >
            Core Values
          </span>
          <h2 className="about-heading-lg">
            What Drives Us
          </h2>
        </div>

        <div
          ref={cardsRef}
          style={{
            display: 'flex',
            gap: '2rem',
            padding: '0 2rem',
            willChange: 'transform',
          }}
        >
          {values.map((value, i) => (
            <div
              key={value.title}
              className="value-card"
              role="article"
              aria-label={value.title}
            >
              {/* Number */}
              <span
                style={{
                  fontSize: '4rem',
                  fontWeight: 900,
                  color: 'var(--color-accent)',
                  opacity: 0.12,
                  position: 'absolute',
                  top: '1.5rem',
                  right: '2rem',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Icon badge */}
              <div
                className="card-icon-badge"
                style={{
                  marginBottom: '1.5rem',
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                }}
                aria-hidden="true"
              >
                {value.icon}
              </div>

              <h3
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {value.title}
              </h3>
              <p
                className="about-body"
                style={{ fontSize: '1.125rem', lineHeight: 1.7 }}
              >
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80&auto=format&fit=crop', alt: 'Event gathering', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format&fit=crop', alt: 'Team collaboration', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&auto=format&fit=crop', alt: 'Tech workshop', size: 'square' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80&auto=format&fit=crop', alt: 'Networking event', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80&auto=format&fit=crop', alt: 'Hackathon', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80&auto=format&fit=crop', alt: 'Community meetup', size: 'square' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll<HTMLElement>('.gallery-item');
      if (items) {
        items.forEach((item) => {
          // Image reveal
          const img = item.querySelector('img');
          if (img) {
            gsap.from(img, {
              scale: 1.3,
              duration: 1.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1.5,
              },
            });
          }

          // Item entrance
          gsap.from(item, {
            y: 60,
            opacity: 0,
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
      className="about-section"
      data-object-section
      data-object-scale="0.6"
      data-object-opacity="0.3"
      data-object-x="-30"
      data-object-y="0"
      data-object-blur="2"
      style={{
        padding: '10rem 0',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
      aria-label="Gallery"
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
          Gallery
        </span>
        <h2 className="about-heading-lg" style={{ marginBottom: '4rem' }}>
          Moments That Define Us
        </h2>

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
          }}
          className="gallery-grid"
        >
          {images.map((img, i) => {
            let colSpan = 1;
            let rowSpan = 1;
            if (img.size === 'wide') { colSpan = 2; rowSpan = 1; }
            else if (img.size === 'tall') { colSpan = 1; rowSpan = 2; }
            else { colSpan = 1; rowSpan = 1; }

            return (
              <div
                key={i}
                className="gallery-item"
                style={{
                  gridColumn: `span ${colSpan}`,
                  gridRow: `span ${rowSpan}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  minHeight: img.size === 'tall' ? '400px' : '200px',
                }}
                onMouseEnter={(e) => {
                  const imgEl = e.currentTarget.querySelector('img');
                  if (imgEl) {
                    imgEl.style.transform = 'scale(1.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  const imgEl = e.currentTarget.querySelector('img');
                  if (imgEl) {
                    imgEl.style.transform = 'scale(1)';
                  }
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'transform',
                  }}
                />
                {/* Overlay on hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '1.5rem',
                  }}
                  className="gallery-overlay"
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
                >
                  <span style={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>
                    {img.alt}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
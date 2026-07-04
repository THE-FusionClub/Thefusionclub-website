import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sentences = [
  'The Fusion Club (TFC) is a student-driven community dedicated to empowering the next generation of innovators, creators, and leaders.',
  'Built on the pillars of <em>Technology</em>, <em>Innovation</em>, and <em>Culture</em>, TFC provides a dynamic platform where students can learn, collaborate, and grow beyond the classroom.',
  'We bring together students from all branches and backgrounds to explore emerging technologies, develop practical skills, foster entrepreneurial thinking, and celebrate creativity.',
  'Through hackathons, ideathons, workshops, bootcamps, coding competitions, industry sessions, industrial visits, cultural events, and networking opportunities, TFC creates meaningful experiences that inspire innovation and personal development.',
  'At TFC, we believe in <em>learning by doing</em>, <em>leading by example</em>, and building a community that transforms ideas into impact.',
];

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const sentencesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark parallax
      gsap.to(watermarkRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Sentence reveal animations
      const sentenceEls = sentencesRef.current?.querySelectorAll('.story-sentence');
      if (sentenceEls) {
        sentenceEls.forEach((el, i) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 45%',
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
      id="story"
      className="about-section"
      data-object-section
      data-object-scale="0.8"
      data-object-opacity="0.4"
      data-object-x="-20"
      data-object-y="0"
      data-object-blur="2"
      style={{
        padding: '10rem 0',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
      aria-label="Our Story"
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="watermark"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(15rem, 30vw, 40rem)',
          opacity: 0.03,
        }}
        aria-hidden="true"
      >
        TFC
      </div>

      <div className="about-container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '2rem',
            }}
          >
            Who We Are
          </span>

          <div ref={sentencesRef}>
            {sentences.map((sentence, i) => (
              <p
                key={i}
                className="story-sentence about-heading-md"
                style={{
                  marginBottom: i < sentences.length - 1 ? '2.5rem' : 0,
                  color: i === sentences.length - 1 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontWeight: i === sentences.length - 1 ? 700 : 400,
                }}
                dangerouslySetInnerHTML={{ __html: sentence }}
              />
            ))}
          </div>

          {/* Tagline */}
          <div
            style={{
              marginTop: '4rem',
              paddingTop: '3rem',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            {['Tech', 'Innovate', 'Culture'].map((tag, i) => (
              <span
                key={tag}
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {i < 2 ? `${tag} •` : tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
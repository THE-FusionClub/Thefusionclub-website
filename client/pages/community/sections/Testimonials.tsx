import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const testimonials = [
  { id: "t1", name: "Ananya Sharma", role: "Community Member, IIT", quote: "The best community I've joined. The feedback culture is incredible—fast iteration, real care.", rating: 5, photo: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80" },
  { id: "t2", name: "Rohit Verma", role: "Workshop Attendee, VIT", quote: "I shipped my first project because the learning was hands-on and premium. Truly transformative.", rating: 5, photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" },
  { id: "t3", name: "Priya Patel", role: "Organizer, SRM", quote: "A community that's calm, focused, and creative—exactly what I needed to grow.", rating: 5, photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
  { id: "t4", name: "Arjun Nair", role: "Hackathon Winner", quote: "From zero to shipping in 48 hours. The energy here is unmatched.", rating: 5, photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
  { id: "t5", name: "Kavya Singh", role: "Design Lead", quote: "Design reviews here shaped how I think about products. Forever grateful.", rating: 5, photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80" },
  { id: "t6", name: "Neha Gupta", role: "Mentee → Mentor", quote: "I joined as a learner and now I mentor others. That's the TFC effect.", rating: 5, photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80" },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [testimonialsIdx, setTestimonialsIdx] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => {
      setTestimonialsIdx((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(t);
  }, [testimonials.length, reducedMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[testimonialsIdx] as HTMLElement;
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
    }
  }, [testimonialsIdx]);

  return (
    <section className="c-section">
      <div className="c-sectionInner">
        <div className="c-testimonialsTrack" ref={trackRef} aria-label="Testimonials carousel">
          {testimonials.map((t) => (
            <div key={t.id} className="c-testCard">
              <div className="c-testStars" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < t.rating ? "is-on" : ""}>★</span>
                ))}
              </div>
              <div className="c-testQuote">"{t.quote}"</div>
              <div className="c-testAuthor">
                <img className="c-testAuthorImg" src={t.photo} alt={t.name} loading="lazy" />
                <div>
                  <div className="c-testAuthorName">{t.name}</div>
                  <div className="c-testAuthorRole">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
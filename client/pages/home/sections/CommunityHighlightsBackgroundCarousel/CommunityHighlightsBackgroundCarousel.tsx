import { useEffect, useMemo, useState } from "react";
import styles from "./CommunityHighlightsBackgroundCarousel.module.css";

type Slide = {
  id: string;
  image: string;
  label: string;
};

export default function CommunityHighlightsBackgroundCarousel() {
  const slides: Slide[] = useMemo(
    () => [
      { id: "s1", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=80", label: "Community stories" },
      { id: "s2", image: "https://images.unsplash.com/photo-1522071820081-82c8b0c1b6cf?auto=format&fit=crop&w=1800&q=80", label: "Collaboration moments" },
      { id: "s3", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=80", label: "Workshops in motion" },
      { id: "s4", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80", label: "Builders at play" },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) return;

    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(t);
  }, [slides.length]);

  return (
    <section className={styles.chbcWrap} aria-label="Community highlights background">
      <div className={styles.chbcBg} aria-hidden="true">
        {slides.map((s, idx) => (
          <div key={s.id} className={`${styles.chbcSlide} ${idx === active ? styles.isActive : ""}`}>
            <img className={styles.chbcImg} src={s.image} alt={s.label} />
          </div>
        ))}
        <div className={styles.chbcOverlay} />
      </div>

      <div className={styles.chbcInner} aria-hidden="true">
        <div className={styles.chbcLeftGlow} />
        <div className={styles.chbcRightGlow} />
        <div className={styles.chbcTitles}>
          <div className={styles.chbcKicker}>DONE THIS</div>
          <div className={styles.chbcTitle}>COUNTLESS TIMES BEFORE</div>
        </div>
        <div className={styles.chbcDots}>
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`${styles.chbcDot} ${idx === active ? styles.isActive : ""}`}
              aria-label={`Background slide ${idx + 1}`}
              aria-current={idx === active}
              onClick={() => setActive(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
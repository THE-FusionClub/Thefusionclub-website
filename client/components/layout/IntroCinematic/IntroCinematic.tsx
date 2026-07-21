import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import styles from "./IntroCinematic.module.css";

type IntroCinematicProps = {
  logoSrc: string;
  onDone: () => void;
};

type Star = { x: number; y: number; s: number; o: number; d: number };

function createStars(count: number): Star[] {
  const arr: Star[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: 0.6 + Math.random() * 1.4,
      o: 0.25 + Math.random() * 0.75,
      d: Math.random() * 2.5,
    });
  }
  return arr;
}

export default function IntroCinematic({ logoSrc, onDone }: IntroCinematicProps) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const cameraWrapRef = useRef<HTMLDivElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);

  const stars = useMemo(() => createStars(70), []);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReducedMotion(Boolean(mql?.matches));
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = rootRef.current;
    const logo = logoRef.current;
    const cameraWrap = cameraWrapRef.current;
    const flash = flashRef.current;

    if (!root || !logo || !cameraWrap || !flash) return;

    if (reducedMotion) {
      gsap.set(root, { opacity: 1 });
      gsap.to(root, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
        onComplete: onDone,
      });
      return;
    }

    gsap.set(logo, {
      opacity: 0,
      xPercent: 0,
      yPercent: 0,
      scale: 0.86,
      filter: "blur(3px) saturate(1.2)",
      rotateY: 0,
      transformStyle: "preserve-3d",
    });

    gsap.set(cameraWrap, {
      scale: 0.86,
      transformOrigin: "50% 50%",
    });

    gsap.set(flash, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(logo, { opacity: 1, duration: 0.65 });

    tl.to(
      logo,
      {
        rotateY: 18,
        duration: 1.1,
        ease: "sine.inOut",
      },
      "-=0.55"
    );

    // Camera slowly zooms toward the logo
    tl.to(
      cameraWrap,
      {
        scale: 1.0,
        duration: 1.15,
        ease: "sine.inOut",
      },
      "-=1.2"
    );

    // Cinematic lighting change
    tl.to(
      logo,
      {
        filter: "blur(0px) saturate(1.25) contrast(1.05)",
        duration: 0.7,
      },
      "-=0.55"
    );

    // Energy collapse + flash
    tl.addLabel("collapse", "+=0.55");

    tl.to(
      cameraWrap,
      {
        scale: 1.55,
        duration: 0.25,
        ease: "power2.in",
      },
      "collapse"
    );

    tl.to(
      logo,
      {
        scale: 0.6,
        filter: "blur(1px) saturate(1.6)",
        rotateY: 42,
        duration: 0.25,
        ease: "power2.in",
      },
      "collapse"
    );

    tl.to(
      flash,
      {
        opacity: 1,
        duration: 0.12,
        ease: "power2.out",
      },
      "collapse+=0.08"
    );

    // Shrink rapidly into the center
    tl.to(
      logo,
      {
        scale: 0.06,
        opacity: 0,
        filter: "blur(6px) saturate(2)",
        duration: 0.14,
        ease: "power3.in",
      },
      "collapse+=0.18"
    );

    tl.to(
      flash,
      {
        opacity: 0,
        duration: 0.18,
        ease: "power2.out",
      },
      "collapse+=0.18"
    );

    // Reveal homepage underneath seamlessly
    tl.to(
      root,
      {
        opacity: 0,
        duration: 0.22,
        ease: "power2.out",
        onComplete: onDone,
      },
      "collapse+=0.12"
    );

    return () => {
      tl.kill();
    };
  }, [mounted, reducedMotion, onDone]);

  return (
    <div ref={rootRef} className={styles.introRoot} aria-hidden>
      <div className={styles.introStars} aria-hidden>
        {stars.map((st, idx) => (
          <span
            key={idx}
            className={styles.introStar}
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              transform: `scale(${st.s})`,
              opacity: st.o,
              animationDelay: `${st.d}s`,
            }}
          />
        ))}
      </div>

      <div ref={cameraWrapRef} className={styles.introCamera}>
        <div className={styles.introNebula} aria-hidden />
        <div className={styles.introGlow} aria-hidden />
        <img ref={logoRef} className={styles.introLogo} src={logoSrc} alt="TFC" />

        <div className={styles.introParticles} aria-hidden>
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className={styles.introParticle} />
          ))}
        </div>
      </div>

      <div ref={flashRef} className={styles.introFlash} aria-hidden />
    </div>
  );
}


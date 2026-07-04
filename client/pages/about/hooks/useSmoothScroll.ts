import { useEffect } from 'react';
import Lenis from 'lenis';

// Lenis-based smooth scrolling.
// Lightweight by enabling "lerp" scrolling and respecting reduced motion.
export default function useSmoothScroll() { 
  useEffect(() => {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    };

    // Mark html for Lenis CSS hooks used in about.css
    document.documentElement.classList.add('lenis');
    document.documentElement.classList.add('lenis-smooth');

    requestAnimationFrame(raf);

    return () => {
      document.documentElement.classList.remove('lenis');
      document.documentElement.classList.remove('lenis-smooth');
      if (lenis) lenis.destroy();
    };
  }, []);
}
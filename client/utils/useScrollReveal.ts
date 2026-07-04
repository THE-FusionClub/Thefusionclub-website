import { useEffect, useRef, useState } from "react";

type AnimationConfig = {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
};

export function useScrollReveal(config: AnimationConfig = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", triggerOnce = true } = config;
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

export function useStaggeredAnimation(
  itemCount: number,
  config: AnimationConfig = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -40px 0px" } = config;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    const observers: IntersectionObserver[] = [];

    const createObserver = (index: number) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index));
            observer.unobserve(entry.target);
          }
        },
        { threshold, rootMargin }
      );

      if (children[index]) {
        observer.observe(children[index] as Element);
        observers.push(observer);
      }
    };

    for (let i = 0; i < itemCount; i++) {
      createObserver(i);
    }

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [itemCount, threshold, rootMargin]);

  return { containerRef, visibleItems };
}
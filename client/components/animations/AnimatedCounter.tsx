import { useEffect, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  isInView?: boolean;
  prefersReduced?: boolean;
};

export function AnimatedCounter({ value, suffix = "", isInView = true, prefersReduced = false }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReduced) {
      setCount(value);
      return;
    }
    const duration = 1500;
    const step = 16;
    const totalSteps = duration / step;
    const increment = value / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, step);

    return () => clearInterval(timer);
  }, [isInView, value, prefersReduced]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}
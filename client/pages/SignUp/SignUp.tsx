import { useEffect, useRef } from "react";
import "../JoinEvent/JoinEvent.css";

import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import DragonCursor from "@/components/layout/DragonCursor/DragonCursor";

function PetalAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Petal {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      speedX: number;
      speedY: number;
      sway: number;
      swaySpeed: number;
      phase: number;
      hue: number;
      blur: number;
    }

    const petals: Petal[] = [];

    for (let i = 0; i < 40; i++) {
      const size = 8 + Math.random() * 18;
      petals.push({
        x: Math.random() * canvas.width * 0.5,
        y: Math.random() * canvas.height,
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed:
          (0.01 + Math.random() * 0.03) * (Math.random() > 0.5 ? 1 : -1),
        opacity: 0.3 + Math.random() * 0.6,
        speedX: 0.2 + Math.random() * 0.6,
        speedY: 0.3 + Math.random() * 0.8,
        sway: Math.random() * 30,
        swaySpeed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.5 ? 270 : 330,
        blur: size > 18 ? 2 + Math.random() * 3 : 0,
      });
    }

    let spawnTimer = 0;

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.blur > 0) {
        ctx.shadowBlur = p.blur;
        ctx.shadowColor = `hsla(${p.hue}, 70%, 70%, 0.3)`;
      }

      ctx.beginPath();

      // Cherry blossom petal shape
      const w = p.size;
      const h = p.size * 0.6;
      ctx.moveTo(0, -h / 2);
      ctx.bezierCurveTo(w / 2, -h / 2, w / 2, h / 2, 0, h / 2);
      ctx.bezierCurveTo(-w / 2, h / 2, -w / 2, -h / 2, 0, -h / 2);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
      const sat = 60 + Math.random() * 20;
      gradient.addColorStop(
        0,
        `hsla(${p.hue - 10}, ${sat}%, 65%, ${p.opacity})`
      );
      gradient.addColorStop(
        0.5,
        `hsla(${p.hue + 10}, ${sat + 10}%, 75%, ${p.opacity})`
      );
      gradient.addColorStop(
        1,
        `hsla(${p.hue + 20}, ${sat}%, 60%, ${p.opacity})`
      );
      ctx.fillStyle = gradient;
      ctx.fill();

      // Subtle center line
      ctx.strokeStyle = `hsla(${p.hue}, 50%, 50%, ${p.opacity * 0.3})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -h / 2 + 3);
      ctx.lineTo(0, h / 2 - 3);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new petals from top-left area
      spawnTimer++;
      if (spawnTimer > 20 + Math.random() * 30) {
        spawnTimer = 0;
        const size = 8 + Math.random() * 18;
        petals.push({
          x: -20 - Math.random() * 80,
          y: -20 - Math.random() * 60,
          size,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed:
            (0.01 + Math.random() * 0.03) * (Math.random() > 0.5 ? 1 : -1),
          opacity: 0.3 + Math.random() * 0.5,
          speedX: 0.3 + Math.random() * 0.8,
          speedY: 0.4 + Math.random() * 1.0,
          sway: Math.random() * 40,
          swaySpeed: 0.015 + Math.random() * 0.03,
          phase: Math.random() * Math.PI * 2,
          hue: Math.random() > 0.5 ? 270 : 330,
          blur: size > 18 ? 2 + Math.random() * 4 : 0,
        });
      }

      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.x += p.speedX + Math.sin(time * p.swaySpeed + p.phase) * 0.3;
        p.y += p.speedY + Math.sin(time * p.swaySpeed * 0.8 + p.phase) * 0.2;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0.1, p.opacity);

        // Occasional cross-center drift
        if (i % 7 === 0) {
          p.x += Math.sin(time * 0.008 + p.phase) * 0.4;
        }

        drawPetal(p);

        // Remove if off screen
        if (p.y > canvas.height + 50 || p.x > canvas.width + 50) {
          petals.splice(i, 1);
        }
      }

      // Cap petal count
      while (petals.length > 60) {
        petals.shift();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="petal-canvas" aria-hidden="true" />
  );
}

function RadarBadge() {
  return (
    <div className="radar-badge">
      {/* Outer rings */}
      <div className="radar-ring ring-1" />
      <div className="radar-ring ring-2" />
      <div className="radar-ring ring-3" />

      {/* Pulse dots on rings */}
      <div className="pulse-dot dot-1" />
      <div className="pulse-dot dot-2" />
      <div className="pulse-dot dot-3" />

      {/* Radar sweep */}
      <div className="radar-sweep" />

      {/* Center content */}
      <div className="badge-inner">
        <span className="badge-label">TFC</span>
        <span className="badge-sub">Sign Up</span>
      </div>
    </div>
  );
}

export default function SignUp() {
  return (
    <>
      <DragonCursor />
      <Navbar />
      <main className="join-event-page">
        {/* Background layers */}
        <div className="bg-layer">
          <div className="bg-dragon" />
          <div className="bg-overlay" />
          <div className="bg-glow" />
        </div>

        {/* Petal animation */}
        <PetalAnimation />

        {/* Hero content */}
        <div className="hero-content">
          <div className="hero-inner">
            <RadarBadge />

            <h1 className="hero-heading">
              <span className="heading-line">Sign up to</span>
              <span className="heading-line gradient">Elite Circle</span>
            </h1>

            <p className="hero-subtitle">Click below for registration</p>

            <div className="cta-wrapper">
              <a
                href="https://docs.google.com/forms/d/1-H3nmBvKWKxST6AFST56EJXtRu5rdImaRcj0jO6wBeU/viewform?edit_requested=true"
                target="_blank"
                rel="noreferrer"
                className="cta-button"
              >
                <span className="cta-text">Register Now</span>
                <div className="cta-laser" />
              </a>
            </div>

            <p className="secure-text">
              <svg
                className="lock-icon"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Secure Connection
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}


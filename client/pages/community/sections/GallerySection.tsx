import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/utils/useScrollReveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const galleryImages = [
  { id: "g1", src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80", title: "Event Kickoff", size: "tall" },
  { id: "g2", src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80", title: "Workshop Moments", size: "small" },
  { id: "g3", src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", title: "Team Collaboration", size: "medium" },
  { id: "g4", src: "https://images.unsplash.com/photo-1522071820081-82c8b0c1b6cf?auto=format&fit=crop&w=600&q=80", title: "Networking Night", size: "small" },
  { id: "g5", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80", title: "Community Celebration", size: "tall" },
  { id: "g6", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", title: "Hackathon", size: "small" },
  { id: "g7", src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&w=800&q=80", title: "Design Review", size: "medium" },
  { id: "g8", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80", title: "Keynote Session", size: "small" },
  { id: "g9", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", title: "Mentorship", size: "medium" },
  { id: "g10", src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", title: "Group Photo", size: "tall" },
];

function AnimatedSectionTitle({ text }: { text: string }) {
  const { ref, isInView } = useScrollReveal({ threshold: 0.3, triggerOnce: true });
  const prefersReduced = usePrefersReducedMotion();

  return (
    <h2 ref={ref as any} className="c-sectionTitle">
      {prefersReduced ? (
        text
      ) : (
        text.split("").map((char, i) => (
          <span key={i} className={`c-letter ${isInView ? "is-visible" : ""}`} style={{ transitionDelay: `${i * 30}ms` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))
      )}
    </h2>
  );
}

export default function GallerySection() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImg, setGalleryImg] = useState(galleryImages[0]);
  const galleryModalRef = useRef<HTMLDivElement | null>(null);
  const galleryCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  const openGallery = useCallback((img: typeof galleryImages[0]) => {
    setGalleryImg(img);
    setGalleryOpen(true);
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
  }, []);

  useEffect(() => {
    if (!galleryOpen) return;
    const t = window.setTimeout(() => {
      galleryCloseBtnRef.current?.focus();
    }, 50);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [galleryOpen]);

  useEffect(() => {
    if (!galleryOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeGallery(); return; }
      if (e.key === "Tab") {
        const focusable = galleryModalRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [galleryOpen, closeGallery]);

  return (
    <section className="c-section" id="gallery">
      <div className="c-sectionInner">
        <AnimatedSectionTitle text="Community Gallery" />
        <div className="c-galleryGrid" aria-label="Community photo gallery">
          {galleryImages.map((img) => (
            <button key={img.id} type="button" className="c-galleryItem" onClick={() => openGallery(img)} aria-label={`Open ${img.title}`}>
              <img src={img.src} alt={img.title} loading="lazy" />
              <div className="c-galleryOverlay">
                <span className="c-galleryItemTitle">{img.title}</span>
              </div>
            </button>
          ))}
        </div>
        {galleryOpen && (
          <div className="c-galleryModal" role="dialog" aria-modal="true" aria-label="Photo viewer" ref={galleryModalRef}>
            <div className="c-galleryModalBackdrop" onClick={closeGallery} />
            <div className="c-galleryModalContent">
              <img className="c-galleryModalImg" src={galleryImg.src} alt={galleryImg.title} />
              <div className="c-galleryModalInfo">
                <span className="c-galleryModalTitle">{galleryImg.title}</span>
                <button type="button" ref={galleryCloseBtnRef} className="c-galleryModalClose" onClick={closeGallery} aria-label="Close gallery">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
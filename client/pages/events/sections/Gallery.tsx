import { useCallback, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { galleryImages } from "../data";
import { SectionTitle } from "./SectionTitle";

const easeOut = [0.16, 1, 0.3, 1] as const;
const scaleInVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } } };
const staggerContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(galleryImages[0]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const openLightbox = useCallback((img: typeof galleryImages[0]) => { setLightboxImg(img); setLightboxOpen(true); }, []);
  const closeLightbox = useCallback(() => { setLightboxOpen(false); }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [lightboxOpen, closeLightbox]);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <SectionTitle subtitle="">Event Gallery</SectionTitle>
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainerVariants} className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((img) => (
            <motion.button key={img.id} variants={scaleInVariants} whileHover={{ scale: 1.02 }} onClick={() => openLightbox(img)} className="group relative w-full overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-lg transition-all duration-300">
              <img src={img.src} alt={img.title} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-4">
                <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">{img.title}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={closeLightbox}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3, ease: easeOut }} className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <img src={lightboxImg.src} alt={lightboxImg.title} className="w-full h-full object-contain rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl"><span className="text-white text-lg font-semibold">{lightboxImg.title}</span></div>
                <button onClick={closeLightbox} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
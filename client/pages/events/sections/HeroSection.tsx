import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LiquidEther from "@/components/ui/LiquidEther";

const easeOut = [0.16, 1, 0.3, 1] as const;

const heroLottie = new URL("../../../assets/M4iFOW10Xd.lottie", import.meta.url).href;

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <LiquidEther colors={['#1c78b6', '#99adb8', '#3086a3']} mouseForce={20} cursorSize={100} isViscous viscous={30} iterationsViscous={32} iterationsPoisson={32} resolution={0.5} isBounce={false} autoDemo autoSpeed={0.5} autoIntensity={2.2} takeoverDuration={0.25} autoResumeDelay={3000} autoRampDuration={0.6} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-transparent pointer-events-none" aria-hidden="true" />
      <motion.div style={{ y: heroY }} className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
       <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-20">
          <div className="max-w-xl">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: easeOut }} className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
              Explore Innovation,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Learning & Competition</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg">
              Join our annual events designed to inspire, educate, and challenge students across schools and universities. From workshops to festivals — there's something for everyone.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="mt-8 flex flex-wrap gap-4">
              <Link to="#events" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:bg-blue-700 transition-all duration-300">
                Explore Events
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </Link>
              <Link to="#timeline" className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-gray-700 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                View Calendar
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: easeOut }} className="flex items-center justify-center w-full h-[300px] sm:h-[400px] lg:h-[520px]">
            <DotLottieReact
  src={heroLottie}
  loop
  autoplay
  className="w-full h-full"
/>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
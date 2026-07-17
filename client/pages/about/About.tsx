import React, { useEffect } from "react";
import "./about.css";
import "./responsive.css";
import "./about-patch.module.css";

import FloatingObject from "./components/FloatingObject";
import useSmoothScroll from './hooks/useSmoothScroll';

import HeroSection from './sections/HeroSection';
import StorySection from './sections/StorySection';
import ValuesSection from './sections/ValuesSection';
// import TimelineSection from './sections/TimelineSection';
import PhilosophySection from './sections/PhilosophySection';
import BentoSection from './sections/BentoSection';
// import ImpactSection from './sections/ImpactSection';
import LeadershipSection from './sections/LeadershipSection';
import GallerySection from './sections/GallerySection';
import CTASection from './sections/CTASection';

/**
 * About Us Page - The Fusion Club
 * Premium storytelling experience with cinematic scroll animations.
 */
export default function AboutPage() {
  useSmoothScroll();

  // Set page title
  useEffect(() => {
    document.title = 'About | The Fusion Club';
  }, []);

  return (
    <main className="about-page" role="main">
      {/* Floating abstract object that travels through the page */}
      <FloatingObject />

      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Who We Are / Story */}
      <StorySection />

      {/* Section 3: Core Values - Horizontal Scroll */}
      <ValuesSection />

      {/* Section 4: Timeline */}
      {/* <TimelineSection /> */}

      {/* Section 5: Philosophy - Dark */}
      <PhilosophySection />

      {/* Section 6: Bento Grid */}
      <BentoSection />

      {/* Section 7: Impact Counters */}
      {/* <ImpactSection /> */}

      {/* Section 8: Leadership Message */}
      <LeadershipSection />

      {/* Section 9: Gallery */}
      <GallerySection />

      {/* Section 10: Final CTA */}
      <CTASection />
    </main>
  );
}
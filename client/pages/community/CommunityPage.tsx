import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import HeroSection from "./sections/HeroSection";
import ManifestoSection from "./sections/ManifestoSection";
// import StatsSection from "./sections/StatsSection";
import FeaturedStories from "./sections/FeaturedStories";
import GallerySection from "./sections/GallerySection";
import TimelineSection from "./sections/TimelineSection";
import LeadershipSection from "./sections/LeadershipSection";
import SocialWall from "./sections/SocialWall";
import Testimonials from "./sections/Testimonials";
import BentoSection from "./sections/BentoSection";
import PartnersSection from "./sections/PartnersSection";
import CTASection from "./sections/CTASection";

export default function CommunityPage() {
  return (
    <>
      <ScrollProgress />
      <div className="c-cursorGlow is-visible" aria-hidden="true" />

      <HeroSection />
      <ManifestoSection />
      {/* <StatsSection /> */}
      <FeaturedStories />
      <GallerySection />
      {/* <TimelineSection /> */}
      <LeadershipSection />
      {/* <SocialWall /> */}
      <Testimonials />
      <BentoSection />
      <PartnersSection />
      <CTASection />
    </>
  );
}
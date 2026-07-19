import React, { useEffect } from "react";
import SponsorHeroSection from "./sections/HeroSection";
import WhySponsorSection from "./sections/WhySponsorSection";
import SponsorTiersSection from "./sections/SponsorTiersSection";
import StatsSection from "./sections/StatsSection";
import FAQSection from "./sections/FAQSection";
import ContactSection from "./sections/ContactSection";

export default function SponsorPage() {
  useEffect(() => {
    document.title = "Sponsor | The Fusion Club";
  }, []);

  return (
    <main>
      <SponsorHeroSection />
      <WhySponsorSection />
      <SponsorTiersSection />
      {/* <StatsSection /> */}
      <FAQSection />
      <ContactSection />
    </main>
  );
}
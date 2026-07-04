import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import HeroSection from "./home/sections/HeroSection/HeroSection";
import EcosystemSection from "./home/sections/EcosystemSection/EcosystemSection";
import FellowshipSection from "./home/sections/FellowshipSection/FellowshipSection";
import EventsSection from "./home/sections/EventsSection/EventsSection";
import CommunityHighlights from "./home/sections/CommunityHighlights/CommunityHighlights";
import NewsletterSection from "./home/sections/NewsletterSection/NewsletterSection";

import "../global-intro.css";

export default function Index() {
  // Home page should be static (no GSAP intro). Keep Navbar/main always visible.
  const introDone = true;

  return (
    <div className="min-h-screen bg-white">
      <Navbar introDone={introDone} />

      <main>
        <HeroSection introDone={introDone} />

        <EcosystemSection />
        <FellowshipSection />
        <EventsSection />
        <CommunityHighlights />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}


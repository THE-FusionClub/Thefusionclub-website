import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";

import HeroSection from "./sections/HeroSection";
import FeaturedEvent from "./sections/FeaturedEvent";
import UpcomingEvents from "./sections/UpcomingEvents";
import EventTimeline from "./sections/EventTimeline";
import EventGrid from "./sections/EventGrid";
import Gallery from "./sections/Gallery";
import Statistics from "./sections/Statistics";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedEvent />
        <UpcomingEvents />
        <EventTimeline />
        <EventGrid />
        <Gallery />
        {/* <Statistics /> */}
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}


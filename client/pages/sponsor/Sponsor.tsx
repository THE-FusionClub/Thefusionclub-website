import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import SponsorPageContent from "./SponsorPage";

export default function Sponsor() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <SponsorPageContent />
      <Footer />
    </div>
  );
}
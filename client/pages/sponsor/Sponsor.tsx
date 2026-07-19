import React from "react";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import SponsorPageContent from "./SponsorPage";

export default function Sponsor() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <SponsorPageContent />
      <Footer />
    </div>
  );
}
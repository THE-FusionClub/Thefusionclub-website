import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import CommunityPage from "./CommunityPage";
import "../Community.css";

export default function Community() {
  return (
    <div className="c-page flex flex-col min-h-screen">
      <Navbar />
      <CommunityPage />
      <Footer />
    </div>
  );
}
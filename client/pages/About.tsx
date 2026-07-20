import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import AboutPage from "./about/About";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <AboutPage />
      <Footer />
    </div>
  );
}

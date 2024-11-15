import FeatureSection from "@/components/home/feature-section";
import Footer from "@/components/home/footer";
import HeroSection from "@/components/home/hero-section";
import Navbar from "@/components/home/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </div>
  );
}

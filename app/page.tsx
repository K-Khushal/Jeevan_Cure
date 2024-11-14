import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/*<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">*/}
      {/*  <p className="text-4xl font-bold text-center">*/}
      {/*    Jeevan Cure <br />*/}
      {/*    Coming Soon 👋!*/}
      {/*  </p>*/}
      {/*</div>*/}
      <Footer />
    </div>
  );
}

import { useEffect } from "react";
import HeroSection from "./sections/HeroSection";
import LogoMarquee from "./LogoMarquee";
import LiquidDivider from "./LiquidDivider";
import ParticleSwing from "./ParticleSwing";
import ProductsSection from "./sections/ProductsSection";
import AppBuildingSection from "./sections/AppBuildingSection";
import ProofOfWorkSection from "./sections/ProofOfWorkSection";
import VideoSection from "./sections/VideoSection";
import WhySection from "./sections/WhySection";
import SocialProofSection from "./sections/SocialProofSection";
import LeadCaptureSection from "./sections/LeadCaptureSection";
import DirectoryPopup from "./DirectoryPopup";
import ChatbotWidget from "./ChatbotWidget";

export default function App() {
  useEffect(() => {
    document.documentElement.dataset.appHydrated = "true";
    window.dispatchEvent(new Event("prescia:app-hydrated"));
  }, []);

  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <div className="relative">
        <LiquidDivider className="h-[30vh] min-h-[180px] max-h-[340px]" />
        <ProductsSection />
        <ParticleSwing trigger="products" className="z-20" />
      </div>
      <LiquidDivider variant="light-to-dark" className="h-[24vh] min-h-[160px] max-h-[280px]" />
      <AppBuildingSection />
      <ProofOfWorkSection />
      <VideoSection />
      <WhySection />
      <SocialProofSection />
      <LeadCaptureSection />
      <DirectoryPopup />
      <ChatbotWidget />
    </>
  );
}

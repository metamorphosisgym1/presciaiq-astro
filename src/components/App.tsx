import HeroSection from './sections/HeroSection';
import ProductsSection from './sections/ProductsSection';
import AppBuildingSection from './sections/AppBuildingSection';
import ProofOfWorkSection from './sections/ProofOfWorkSection';
import FlywheelSection from './sections/FlywheelSection';
import VideoSection from './sections/VideoSection';
import WhySection from './sections/WhySection';
import SocialProofSection from './sections/SocialProofSection';
import LeadCaptureSection from './sections/LeadCaptureSection';
import DirectoryPopup from './DirectoryPopup';
import ChatbotWidget from './ChatbotWidget';

export default function App() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <AppBuildingSection />
      <ProofOfWorkSection />
      <FlywheelSection />
      <VideoSection />
      <WhySection />
      <SocialProofSection />
      <LeadCaptureSection />
      <DirectoryPopup />
      <ChatbotWidget />
    </>
  );
}

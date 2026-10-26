import { useEffect } from 'react';
import HeroSection from './sections/HeroSection';
import LogoMarquee from './LogoMarquee';
import LiquidDivider from './LiquidDivider';
import ParticleSwing from './ParticleSwing';
import ProductsSection from './sections/ProductsSection';
import AppBuildingSection from './sections/AppBuildingSection';
import WhySection from './sections/WhySection';
import LeadCaptureSection from './sections/LeadCaptureSection';

export default function App() {
  useEffect(() => {
    document.documentElement.dataset.appHydrated = 'true';
    window.dispatchEvent(new Event('prescia:app-hydrated'));
  }, []);

  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <div className="relative">
        {/* White ink rises out of the marquee into the light Engines section. */}
        <LiquidDivider className="h-[50vh] min-h-[300px] max-h-[520px]" />
        <ProductsSection />
        {/* Dark particle swarm swinging across the white as the Engines section arrives. */}
        <ParticleSwing trigger="products" className="z-20" />
      </div>
      <AppBuildingSection showCaseStudy={false} />
      <LiquidDivider className="h-[50vh] min-h-[300px] max-h-[520px]" />
      <WhySection />
      <LiquidDivider variant="light-to-dark" className="h-[50vh] min-h-[300px] max-h-[520px]" />
      <LeadCaptureSection />
    </>
  );
}

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const close = () => { setIsMobileMenuOpen(false); setIsProductsOpen(false); setIsServicesOpen(false); };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border/50" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/"><img src="/logo.png" alt="PresciaIQ" className="h-8 w-auto" /></a>
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button onClick={() => setIsProductsOpen(!isProductsOpen)} className="flex items-center space-x-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
                <span>Products</span><ChevronDown className="h-4 w-4" />
              </button>
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg py-2 z-50" onMouseLeave={() => setIsProductsOpen(false)}>
                  <a href="https://buildpredictiq.com.au/" target="_blank" rel="noopener noreferrer" onClick={close} className="flex flex-col px-4 py-3 hover:bg-accent transition-colors"><span className="text-sm font-semibold">BuildPredictIQ</span><span className="text-xs text-muted-foreground">Construction Intelligence</span></a>
                  <a href="https://adsiq.com.au/" target="_blank" rel="noopener noreferrer" onClick={close} className="flex flex-col px-4 py-3 hover:bg-accent transition-colors"><span className="text-sm font-semibold">AdsIQ</span><span className="text-xs text-muted-foreground">Marketing Intelligence</span></a>
                  <a href="https://opsiq.com.au/" target="_blank" rel="noopener noreferrer" onClick={close} className="flex flex-col px-4 py-3 hover:bg-accent transition-colors"><span className="text-sm font-semibold">OpsIQ</span><span className="text-xs text-muted-foreground">Operations Intelligence</span></a>
                  <a href="https://tradesmaniq.com.au/" target="_blank" rel="noopener noreferrer" onClick={close} className="flex flex-col px-4 py-3 hover:bg-accent transition-colors"><span className="text-sm font-semibold">TradesmanIQ</span><span className="text-xs text-muted-foreground">Trades Intelligence</span></a>
                </div>
               )}
            </div>
            <div className="relative">
              <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="flex items-center space-x-1 text-sm font-medium text-[#00ff88] hover:text-[#00ff88]/80 transition-colors">
                <span>Development</span><ChevronDown className="h-4 w-4" />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg py-2 z-50" onMouseLeave={() => setIsServicesOpen(false)}>
                  <a href="/development" onClick={close} className="flex flex-col px-4 py-3 hover:bg-accent transition-colors"><span className="text-sm font-semibold text-[#00ff88]">All Development Services</span><span className="text-xs text-muted-foreground">Web, App &amp; Software</span></a>
                  <div className="border-t border-border my-1"></div>
                  <a href="/services/ai-software-development" onClick={close} className="flex flex-col px-4 py-3 hover:bg-accent transition-colors"><span className="text-sm font-semibold">AI Software Development</span><span className="text-xs text-muted-foreground">Custom enterprise AI systems</span></a>
                  <a href="/services/ai-app-development" onClick={close} className="flex flex-col px-4 py-3 hover:bg-accent transition-colors"><span className="text-sm font-semibold">AI App Development</span><span className="text-xs text-muted-foreground">Intelligent mobile &amp; web apps</span></a>
                  <a href="/services/ai-web-development" onClick={close} className="flex flex-col px-4 py-3 hover:bg-accent transition-colors"><span className="text-sm font-semibold">AI Web Development</span><span className="text-xs text-muted-foreground">Predictive web platforms</span></a>
                </div>
              )}
            </div>
            <a href="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">About</a>
            <a href="/insights" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Insights</a>
            <a href="/pricing" className="text-sm font-medium text-[#00ff88] hover:text-[#00ff88]/80 transition-colors">Pricing</a>
            <a href="/contact" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Contact</a>
            <a href="/start" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Start a Project</a>
            <a href="/contact" className="bg-[#00ff88] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#00ff88]/90 transition-colors text-sm">Book a Strategy Call</a>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>{isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border py-4 space-y-1">
            <a href="https://buildpredictiq.com.au/" target="_blank" rel="noopener noreferrer" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent">BuildPredictIQ</a>
            <a href="https://adsiq.com.au/" target="_blank" rel="noopener noreferrer" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent">AdsIQ</a>
            <a href="https://opsiq.com.au/" target="_blank" rel="noopener noreferrer" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent">OpsIQ</a>
            <a href="https://tradesmaniq.com.au/" target="_blank" rel="noopener noreferrer" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent">TradesmanIQ</a>
            <div className="border-t border-border my-2"></div>
            <a href="/development" onClick={close} className="block px-4 py-2 text-sm text-[#00ff88]">Development</a>
            <a href="/services/ai-software-development" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent pl-6">↳ AI Software Development</a>
            <a href="/services/ai-app-development" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent pl-6">↳ AI App Development</a>
            <a href="/services/ai-web-development" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent pl-6">↳ AI Web Development</a>
            <a href="/about" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent">About</a>
            <a href="/insights" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent">Insights</a>
            <a href="/pricing" onClick={close} className="block px-4 py-2 text-sm text-[#00ff88]">Pricing</a>
            <a href="/contact" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent">Contact</a>
            <a href="/start" onClick={close} className="block px-4 py-2 text-sm hover:bg-accent">Start a Project</a>
            <div className="px-4 pt-2"><a href="/contact" onClick={close} className="block w-full bg-[#00ff88] text-black font-semibold px-4 py-2 rounded-lg text-sm text-center">Book a Strategy Call</a></div>
          </div>
         )}
      </div>
    </nav>
  );
};

export default Navbar;

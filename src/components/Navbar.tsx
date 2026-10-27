import { useState, useEffect, useRef } from "react";
import { Menu, X, MessageCircle, FolderKanban, ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/61400457006?text=Hi%20PresciaIQ%2C%20I%27d%20like%20to%20discuss%20an%20AI%20project.";

interface Sublink {
  name: string;
  href: string;
  external?: boolean;
}

interface NavItem {
  name: string;
  href: string;
  sublinks?: Sublink[];
}

const navItems: NavItem[] = [
  {
    name: "Products",
    href: "/products/",
    sublinks: [
      { name: "All Products Overview", href: "/products/" },
      { name: "BuildPredictIQ — Construction AI", href: "https://buildpredictiq.com.au/", external: true },
      { name: "AdsIQ — ROAS Prediction", href: "https://adsiq.com.au/", external: true },
      { name: "AI Automations & Agents", href: "/products/ai-automations/" },
      { name: "Daynori — Enterprise Operations", href: "/services/ai-software-development/" },
      { name: "FinanceIQ — Digital CFO", href: "https://www.daywinlabs.com", external: true },
    ],
  },
  {
    name: "Development",
    href: "/development/",
    sublinks: [
      { name: "All Development Services", href: "/development/" },
      { name: "AI Software Development", href: "/services/ai-software-development/" },
      { name: "AI App Development", href: "/services/ai-app-development/" },
      { name: "AI Web Development", href: "/services/ai-web-development/" },
      { name: "AEO / SEO Predictive Search", href: "/services/aeo-seo-predictive-search-architecture/" },
      { name: "Social Media Distribution", href: "/services/social-media-content-management/" },
    ],
  },
  {
    name: "Industries",
    href: "/industries/",
    sublinks: [
      { name: "All Industries Overview", href: "/industries/" },
      { name: "Construction & Infrastructure", href: "/industries/construction/" },
      { name: "Marketing & Ad Agencies", href: "/industries/marketing-agencies/" },
      { name: "Enterprise Operations", href: "/services/ai-software-development/" },
      { name: "Logistics & Supply Chain", href: "/industries/logistics/" },
      { name: "Financial Services", href: "/industries/financial-services/" },
      { name: "Mid-Market SMB", href: "/industries/smb/" },
    ],
  },
  {
    name: "Insights",
    href: "/insights/",
    sublinks: [
      { name: "Articles & Briefings", href: "/insights/" },
      { name: "Case Studies", href: "/case-studies/" },
      { name: "Predictive ROI Calculator", href: "/pricing/" },
      { name: "Technical Q&A Answers", href: "/answers/" },
      { name: "Testimonials", href: "/testimonials/" },
      { name: "Channel Partners", href: "/partners/" },
    ],
  },
  {
    name: "Pricing",
    href: "/pricing/",
  },
  {
    name: "Company",
    href: "/about/",
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const closeAll = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleStrategyCallClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeAll();
    if (typeof window !== "undefined") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-strategy-modal"));
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close directory modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDirectoryOpen(false);
        closeAll();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Body scroll lock when directory modal is open
  useEffect(() => {
    if (isDirectoryOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDirectoryOpen]);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full h-20 z-50 bg-ink-950/90 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300 hero-nav-entrance"
      >
        <div className="w-full max-w-[1720px] mx-auto h-full px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Brand Mark (Left) */}
          <a href="/" onClick={closeAll} className="flex items-center">
            <img
              src="/assets/presciaiq-logo.webp"
              alt="PresciaIQ"
              width={463}
              height={96}
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </a>

          {/* Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.sublinks && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className={`text-sm font-medium transition-colors py-1.5 px-3.5 rounded-full inline-flex items-center gap-1.5 ${
                    activeDropdown === item.name
                      ? "text-white bg-white/10"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.sublinks && (
                    <svg
                      className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                        activeDropdown === item.name ? "rotate-180 text-white" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </a>

                {/* Minimalist Subtle Dropdown */}
                {item.sublinks && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="min-w-[270px] py-2 rounded-xl bg-neutral-950/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/90">
                      {item.sublinks.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={closeAll}
                          {...(sub.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex items-center justify-between px-3.5 py-2 text-xs font-sans text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors rounded-lg mx-1.5"
                        >
                          <span>{sub.name}</span>
                          {sub.external && (
                            <span className="text-[10px] text-neutral-500 font-mono ml-2">↗</span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Product Directory Action Item */}
            <button
              type="button"
              onClick={() => {
                closeAll();
                setIsDirectoryOpen(true);
              }}
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors py-1.5 px-3 rounded-full hover:bg-white/5 inline-flex items-center gap-1.5 cursor-pointer"
              title="Open Product Directory"
            >
              <FolderKanban className="w-3.5 h-3.5 text-[#6D896E]" />
              <span className="hidden xl:inline">Product Directory</span>
              <span className="inline xl:hidden">Directory</span>
            </button>
          </nav>

          {/* Action Button & Mobile Toggle (Right) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Action Pill with Live Pulsing Green Dot */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-neutral-200 hover:text-white hover:border-[#6D896E]/40 hover:bg-[rgba(109,137,110,0.2)] text-xs px-3 sm:px-3.5 py-2 transition-all font-medium tracking-wide active:scale-95 cursor-pointer whitespace-nowrap group shadow-sm"
              aria-label="Chat with PresciaIQ on WhatsApp"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6D896E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6D896E]" />
              </span>
              <MessageCircle className="w-3.5 h-3.5 text-[#6D896E] group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline">Chat on WhatsApp</span>
              <span className="inline md:hidden">Chat</span>
            </a>

            {/* Strategy Call Primary Pill */}
            <a
              href="/contact/"
              onClick={handleStrategyCallClick}
              className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs px-5 py-2 hover:bg-white hover:text-black transition-all font-medium tracking-wide active:scale-95 cursor-pointer whitespace-nowrap shadow-sm"
            >
              Book a Strategy Call
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors outline-none focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#00FF88]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full border-b border-white/10 bg-neutral-950/95 backdrop-blur-xl px-6 py-6 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto space-y-6 text-left">
            <div className="space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <a
                    href={item.href}
                    onClick={closeAll}
                    className="block text-sm font-medium text-neutral-200 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                  {item.sublinks && (
                    <div className="pl-3 border-l border-white/10 space-y-1 mt-1">
                      {item.sublinks.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          onClick={closeAll}
                          {...(sub.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex items-center justify-between py-1 text-xs text-neutral-400 hover:text-white transition-colors"
                        >
                          <span>{sub.name}</span>
                          {sub.external && (
                            <span className="text-[10px] text-neutral-500 font-mono">↗</span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Product Directory Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    closeAll();
                    setIsDirectoryOpen(true);
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-[#6D896E] hover:text-white transition-colors py-1 cursor-pointer"
                >
                  <FolderKanban className="w-4 h-4 text-[#6D896E]" />
                  <span>Product Directory</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-center text-xs font-medium tracking-wide border border-white/15 bg-white/[0.06] text-white hover:border-[#6D896E]/40 hover:bg-[rgba(109,137,110,0.2)] transition-all cursor-pointer shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6D896E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6D896E]" />
                </span>
                <MessageCircle className="w-3.5 h-3.5 text-[#6D896E]" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="/start/"
                onClick={closeAll}
                className="block w-full py-2.5 rounded-full text-center text-xs font-medium tracking-wide border border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10 hover:text-white transition-all"
              >
                Start a Project
              </a>
              <a
                href="/contact/"
                onClick={handleStrategyCallClick}
                className="block w-full py-2.5 rounded-full text-center text-xs font-medium tracking-wide border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all cursor-pointer shadow-sm"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Product Directory Modal */}
      {isDirectoryOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDirectoryOpen(false);
          }}
        >
          <div className="bg-[#111613] border border-white/10 rounded-3xl p-7 max-w-md w-full relative shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-left overflow-hidden">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FF88] to-transparent" />

            <button
              onClick={() => setIsDirectoryOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/10 text-[#00FF88] font-mono text-[10px] tracking-widest uppercase mb-3">
              PRESCIAIQ ENGINES
            </div>

            <h2 className="text-2xl font-serif font-bold text-white mb-1.5">
              Product Directory
            </h2>
            <p className="text-neutral-400 text-sm mb-6 font-sans">
              Choose the intelligence layer that fits your business.
            </p>

            <div className="space-y-2.5">
              <a
                href="https://buildpredictiq.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDirectoryOpen(false)}
                className="flex items-center justify-between p-3.5 bg-neutral-900/60 border border-white/10 rounded-xl hover:border-[#00FF88]/50 hover:bg-white/[0.04] transition-all group"
              >
                <div>
                  <div className="font-semibold text-sm text-neutral-100 group-hover:text-[#00FF88] transition-colors">
                    BuildPredictIQ
                  </div>
                  <div className="text-xs text-neutral-400">Construction Intelligence</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00FF88] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://adsiq.com.au/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsDirectoryOpen(false)}
                className="flex items-center justify-between p-3.5 bg-neutral-900/60 border border-white/10 rounded-xl hover:border-[#00FF88]/50 hover:bg-white/[0.04] transition-all group"
              >
                <div>
                  <div className="font-semibold text-sm text-neutral-100 group-hover:text-[#00FF88] transition-colors">
                    AdsIQ
                  </div>
                  <div className="text-xs text-neutral-400">Marketing Intelligence</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00FF88] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/products/ai-automations/"
                onClick={() => setIsDirectoryOpen(false)}
                className="flex items-center justify-between p-3.5 bg-neutral-900/60 border border-white/10 rounded-xl hover:border-[#00FF88]/50 hover:bg-white/[0.04] transition-all group"
              >
                <div>
                  <div className="font-semibold text-sm text-neutral-100 group-hover:text-[#00FF88] transition-colors">
                    AI Automations &amp; Agents
                  </div>
                  <div className="text-xs text-neutral-400">Autonomous Workflow Pipelines</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00FF88] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/services/ai-software-development/"
                onClick={() => setIsDirectoryOpen(false)}
                className="flex items-center justify-between p-3.5 bg-neutral-900/60 border border-white/10 rounded-xl hover:border-[#00FF88]/50 hover:bg-white/[0.04] transition-all group"
              >
                <div>
                  <div className="font-semibold text-sm text-neutral-100 group-hover:text-[#00FF88] transition-colors">
                    Daynori
                  </div>
                  <div className="text-xs text-neutral-400">Enterprise Operating System</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00FF88] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/development/"
                onClick={() => setIsDirectoryOpen(false)}
                className="flex items-center justify-between w-full p-3.5 bg-neutral-900/60 border border-white/10 rounded-xl hover:border-[#00FF88]/50 hover:bg-white/[0.04] transition-all group text-left cursor-pointer"
              >
                <div>
                  <div className="font-semibold text-sm text-neutral-100 group-hover:text-[#00FF88] transition-colors">
                    Web &amp; App Development
                  </div>
                  <div className="text-xs text-neutral-400">Custom builds for Australian businesses</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00FF88] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Navbar Entrance Animation Styles */}
      <style>{`
        @keyframes heroNavEntrance {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-nav-entrance {
          animation: heroNavEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-nav-entrance {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;

import { Linkedin, Twitter, Instagram } from "lucide-react";
const logo = "/logo.png";


const Footer = () => {
  return (
    <footer style={{ background: 'rgba(5,5,8,0.9)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <img src={logo} alt="PresciaIQ" className="w-48 h-auto" />
            </div>
            <p className="text-sm italic text-muted-foreground mb-3 font-display">
              Intelligence That Moves First
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Australia's AI Intelligence & Development Company. We build predictive tools that turn data into decisions.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Products</h4>
            <ul className="space-y-3">
              <li><a href="/products/" className="text-sm text-primary hover:text-primary/80 transition-colors font-sans font-semibold">All Products →</a></li>
              {[
                { name: "BuildPredictIQ", href: "/products/buildpredictiq/", sub: "Construction AI" },
                { name: "AdsIQ", href: "/products/adsiq/", sub: "Marketing AI" },
                { name: "OpsIQ", href: "/products/opsiq/", sub: "Operations AI" },
                { name: "TradesmanIQ", href: "/products/tradesmaniq/", sub: "Trades AI" },
              ].map((p) => (
                <li key={p.name}>
                  <a href={p.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                    {p.name.replace("IQ", "")}<span className="text-primary">IQ</span>
                  </a>
                </li>
              ))}
              <li><a href="/development" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">Web & App <span className="text-primary">Development</span></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Industries</h4>
            <ul className="space-y-3">
              <li><a href="/industries/" className="text-sm text-primary hover:text-primary/80 transition-colors font-sans font-semibold">All Industries →</a></li>
              <li><a href="/industries/construction/" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">Construction</a></li>
              <li><a href="/industries/marketing-agencies/" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">Marketing</a></li>
              <li><a href="/industries/trades/" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">Trades</a></li>
              <li><a href="/industries/logistics/" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">Logistics</a></li>
              <li><a href="/industries/financial-services/" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">Financial Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Company</h4>
            <ul className="space-y-3">
              <li><a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">About</a></li>
              <li><a href="/insights" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">Insights</a></li>
              <li><a href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">Pricing</a></li>
              <li><a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">Careers</a></li>
              <li><a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Social</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://www.linkedin.com/company/presciaiq-holdings" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/presciaiq-holdings" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
        <Twitter className="w-4 h-4" /> Twitter / X
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/presciaiq-holdings" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans">
        <Instagram className="w-4 h-4" /> Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-mono">Contact & Legal</h4>
            <ul className="space-y-3">
              <li><a href="tel:0400457006" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">📞 0400 457 006</a></li>
              <li><a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors font-sans">✉️ Contact Us</a></li>
              <li className="text-sm text-muted-foreground font-sans">📍 100 Harris St, Pyrmont, New South Wales 2009, AU</li>
              <li className="text-sm text-muted-foreground font-sans">📍 1501 Biscayne Blvd, Miami, Florida 33132, US</li>
                            <li><a href="/privacy" class="text-muted-foreground hover:text-primary transition-colors text-sm font-sans">Privacy Policy</a></li>
              <li><a href="/terms" class="text-muted-foreground hover:text-primary transition-colors text-sm font-sans">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="text-xs text-muted-foreground font-sans">
            © 2026 PresciaIQ. All rights reserved. Australian-built AI intelligence.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/company/presciaiq-holdings" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/company/presciaiq-holdings" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
        <Twitter className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/company/presciaiq-holdings" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
        <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

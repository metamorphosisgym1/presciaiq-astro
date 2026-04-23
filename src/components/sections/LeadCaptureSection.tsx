import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

import SectionWrapper from "../SectionWrapper";
import { toast } from "sonner";

const WEBHOOK_URL = "https://api.web3forms.com/submit";

const projectTypes = [
  { value: "", label: "Select project type" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "webapp", label: "App Store Build" },
  { value: "corporate", label: "Corporate Website" },
  { value: "other", label: "Other" },
];

const budgetRanges = [
  { value: "", label: "Budget Range" },
  { value: "under-10k", label: "Under $10k" },
  { value: "10k-25k", label: "$10k - $25k" },
  { value: "25k-50k", label: "$25k - $50k" },
  { value: "50k+", label: "$50k+" },
  { value: "100k+", label: "$100k+" },
];

type Tab = "strategy" | "scoping";

const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
  };
};

const LeadCaptureSection = () => {
  
  const [activeTab, setActiveTab] = useState<Tab>("strategy");
  const [utmParams, setUtmParams] = useState({ utm_source: "", utm_medium: "", utm_campaign: "" });

  useEffect(() => {
    setUtmParams(getUtmParams());
  }, []);

  const [strategyForm, setStrategyForm] = useState({
    name: "", business: "", email: "", phone: "", interest: "",
  });

  const [scopingForm, setScopingForm] = useState({
    name: "", businessName: "", email: "", phone: "", website: "", projectType: "", budget: "", description: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const submitToWebhook = async (formType: string, data: Record<string, string>) => {
    const payload = {
      access_key: "fd818bb1-e5a7-4519-873e-68ba8725be59",
      subject: formType === "strategy_call" ? "New Strategy Call Request" : "New Project Scoping Request",
      form_type: formType,
      submitted_at: new Date().toISOString(),
      page_url: window.location.href,
      ...data,
      ...utmParams,
    };

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
      body: JSON.stringify(payload),
    });

    // no-cors returns opaque response; treat as success
    return response;
  };

  const handleStrategySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");
    try {
      await submitToWebhook("strategy_call", strategyForm);
      setStrategyForm({ name: "", business: "", email: "", phone: "", interest: "" });
      setSuccessMessage("Request received. Our engineering team will contact you shortly.");
    } catch {
      toast.error("Something went wrong. Please email us directly at sales@presciaiq.com.au");
    }
    setSubmitting(false);
  };

  const handleScopingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage("");
    try {
      await submitToWebhook("project_scoping", scopingForm);
      setScopingForm({ name: "", businessName: "", email: "", phone: "", website: "", projectType: "", budget: "", description: "" });
      setSuccessMessage("Request received. Our engineering team will contact you shortly.");
    } catch {
      toast.error("Something went wrong. Please email us directly at sales@presciaiq.com.au");
    }
    setSubmitting(false);
  };

  const inputClass =
    "w-full rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm font-sans";
  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' };

  return (
    <SectionWrapper id="audit" className="py-12 md:py-16 aurora-bg relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            Let's Build Something Intelligent.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Whether you need a predictive AI strategy or a high-performance digital product, Alex and Macauley are ready to build with you directly.
          </p>
        </div>

        <div className="glass-card p-6 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(0,255,136,0.03) 0%, transparent 60%)' }} />

          {/* Tab Toggle */}
          <div className="relative z-10 flex items-center justify-center mb-8">
            <div className="inline-flex rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => setActiveTab("strategy")}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold font-sans transition-all duration-300 ${
                  activeTab === "strategy"
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,255,136,0.2)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                AI Strategy Call
              </button>
              <button
                onClick={() => setActiveTab("scoping")}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold font-sans transition-all duration-300 ${
                  activeTab === "scoping"
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,255,136,0.2)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Project Scoping
              </button>
            </div>
          </div>

          <div className="relative z-10">
            {successMessage && (
              <div className="mb-6 p-4 rounded-xl text-center text-sm font-sans font-semibold text-primary" style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}>
                {successMessage}
              </div>
            )}
            {activeTab === "strategy" ? (
              <>
                <div className="text-center mb-8">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                    Get Your Free Intelligence Audit
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans">
                    In 15 minutes, we'll identify the single biggest intelligence gap in your business.
                  </p>
                </div>
                <form onSubmit={handleStrategySubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <input type="text" placeholder="Full Name *" required value={strategyForm.name}
                      onChange={(e) => setStrategyForm({ ...strategyForm, name: e.target.value })}
                      className={inputClass} style={inputStyle} />
                    <input type="text" placeholder="Business Name *" required value={strategyForm.business}
                      onChange={(e) => setStrategyForm({ ...strategyForm, business: e.target.value })}
                      className={inputClass} style={inputStyle} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <input type="email" placeholder="Email *" required value={strategyForm.email}
                      onChange={(e) => setStrategyForm({ ...strategyForm, email: e.target.value })}
                      className={inputClass} style={inputStyle} />
                    <input type="tel" placeholder="Phone *" required value={strategyForm.phone}
                      onChange={(e) => setStrategyForm({ ...strategyForm, phone: e.target.value })}
                      className={inputClass} style={inputStyle} />
                  </div>
                  <select value={strategyForm.interest} onChange={(e) => setStrategyForm({ ...strategyForm, interest: e.target.value })} required
                    className={inputClass} style={inputStyle}>
                    <option value="">Which area interests you most?</option>
                    <option value="construction">Construction Risk</option>
                    <option value="marketing">Marketing & Ads</option>
                    <option value="operations">Operations & SOPs</option>
                    <option value="trades">Trades Management</option>
                    <option value="all">All of the Above</option>
                  </select>
                  <button type="submit" disabled={submitting}
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all duration-500 text-sm uppercase tracking-widest font-sans disabled:opacity-50 flex items-center justify-center gap-2">
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : "Book Your Strategy Call"}
                  </button>
                  <p className="text-center text-xs text-muted-foreground font-sans">
                    Join 300+ Australian businesses in the PresciaIQ intelligence network.
                  </p>
                </form>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                    Ready to build your digital unfair advantage?
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans max-w-xl mx-auto">
                    Whether you need a complex web app, a high-converting landing page, or a complete digital overhaul - tell us about your project.
                  </p>
                </div>
                <form onSubmit={handleScopingSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <input type="text" placeholder="Full Name *" required value={scopingForm.name}
                      onChange={(e) => setScopingForm({ ...scopingForm, name: e.target.value })}
                      className={inputClass} style={inputStyle} />
                    <input type="text" placeholder="Business Name *" required value={scopingForm.businessName}
                      onChange={(e) => setScopingForm({ ...scopingForm, businessName: e.target.value })}
                      className={inputClass} style={inputStyle} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <input type="email" placeholder="Work Email *" required value={scopingForm.email}
                      onChange={(e) => setScopingForm({ ...scopingForm, email: e.target.value })}
                      className={inputClass} style={inputStyle} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <input type="tel" placeholder="Phone Number *" required value={scopingForm.phone}
                      onChange={(e) => setScopingForm({ ...scopingForm, phone: e.target.value })}
                      className={inputClass} style={inputStyle} />
                    <input type="url" placeholder="Company Website (optional)" value={scopingForm.website}
                      onChange={(e) => setScopingForm({ ...scopingForm, website: e.target.value })}
                      className={inputClass} style={inputStyle} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <select value={scopingForm.projectType} onChange={(e) => setScopingForm({ ...scopingForm, projectType: e.target.value })}
                      className={inputClass} style={inputStyle}>
                      {projectTypes.map((pt) => (
                        <option key={pt.value} value={pt.value}>{pt.label}</option>
                      ))}
                    </select>
                    <select value={scopingForm.budget} onChange={(e) => setScopingForm({ ...scopingForm, budget: e.target.value })}
                      className={inputClass} style={inputStyle}>
                      {budgetRanges.map((br) => (
                        <option key={br.value} value={br.value}>{br.label}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    placeholder="Brief Project Description (optional)"
                    rows={4}
                    value={scopingForm.description}
                    onChange={(e) => setScopingForm({ ...scopingForm, description: e.target.value })}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                  <button type="submit" disabled={submitting}
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all duration-500 text-sm uppercase tracking-widest font-sans disabled:opacity-50 flex items-center justify-center gap-2">
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : (
                      <>REQUEST A PROJECT SCOPE <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                  <p className="text-center text-xs text-muted-foreground font-sans">
                    Usually replies within 2 hours. Australian-based engineering team.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LeadCaptureSection;

import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Brain, Zap, Shield, BarChart3, Bot, Cpu, Sparkles } from "lucide-react";

const WEBHOOK_URL = "https://api.web3forms.com/submit";
const ACCESS_KEY = "fd818bb1-e5a7-4519-873e-68ba8725be59";
const TOTAL_STEPS = 7;

type FormData = {
  fullName: string; email: string; businessName: string; mobile: string;
  buildType: string; painPoints: string; goal: string;
  mustHaves: string; niceToHaves: string;
  aesthetic: string; sitesLove: string;
  budget: string; timeline: string;
};

const initial: FormData = {
  fullName: "", email: "", businessName: "", mobile: "",
  buildType: "", painPoints: "", goal: "",
  mustHaves: "", niceToHaves: "",
  aesthetic: "", sitesLove: "",
  budget: "", timeline: "",
};

const buildTypes = [
  { value: "custom_app",     label: "Custom app or web platform",   sub: "Internal tool, customer dashboard, marketplace" },
  { value: "saas",           label: "SaaS product",                  sub: "Multi-tenant software you'd sell or licence" },
  { value: "automation_ai",  label: "Automation or AI agent",        sub: "Replace manual work, AI assistant, workflow automation" },
  { value: "sops",           label: "SOPs & operational systems",    sub: "Document and systemise how your business runs" },
  { value: "website",        label: "High-converting website",       sub: "Service site, e-commerce, booking platform" },
  { value: "aeo_seo",        label: "AEO/SEO — Predictive Search Architecture", sub: "Own every search result. Thousands of targeted pages, zero ad spend." },
  { value: "mix",            label: "A mix of the above",            sub: "Multi-part project — let's scope it together" },
  { value: "not_sure",       label: "Not sure yet",                  sub: "You have a problem — we'll figure out the solution" },
];

const aesthetics = [
  { value: "modern_minimal",      label: "Modern & minimal",         sub: "Linear, Notion, Vercel — clean, lots of whitespace" },
  { value: "premium_considered",  label: "Premium & considered",     sub: "Editorial, serif accents, deep neutrals" },
  { value: "bold_confident",      label: "Bold & confident",         sub: "Dark mode, strong accent colours, high-end" },
  { value: "friendly_approachable", label: "Friendly & approachable", sub: "Cal.com, Duolingo — warm, rounded, human" },
  { value: "serious_utility",     label: "Serious & utility-first",  sub: "Stripe dashboard — information-dense, trustworthy" },
  { value: "not_sure_aesthetic",  label: "Not sure",                 sub: "Give us your recommendation" },
];

const budgets = [
  { value: "under_5k",       label: "Under $5k AUD" },
  { value: "5k_15k",         label: "$5k – $15k AUD" },
  { value: "15k_35k",        label: "$15k – $35k AUD" },
  { value: "35k_75k",        label: "$35k – $75k AUD" },
  { value: "75k_plus",       label: "$75k+ AUD" },
  { value: "not_sure_budget", label: "Not sure — need guidance" },
];

const timelines = [
  { value: "asap",        label: "ASAP" },
  { value: "4_weeks",     label: "Within 4 weeks" },
  { value: "1_2_months",  label: "1–2 months" },
  { value: "2_3_months",  label: "2–3 months" },
  { value: "3_plus",      label: "3+ months" },
  { value: "flexible",    label: "Flexible" },
];

const steps = [
  { section: "01", title: "Your details",           sub: "So we know who we're building for." },
  { section: "02", title: "What are we building?",  sub: "Tick the one that fits best." },
  { section: "03", title: "What's the pain?",       sub: "Tell us what's broken or missing right now." },
  { section: "04", title: "The goal",               sub: "What does life look like once this exists?" },
  { section: "05", title: "Features",               sub: "Don't overthink it — bullet points are perfect." },
  { section: "06", title: "Look & feel",            sub: "So the prototype matches your vibe." },
  { section: "07", title: "Investment & timeline",  sub: "Real talk — helps us scope properly." },
];

// AI capabilities PresciaIQ can deliver — shown as live signals
const aiCapabilities = [
  { icon: Brain, label: "Predictive AI" },
  { icon: Zap, label: "Automation" },
  { icon: BarChart3, label: "AEO/SEO" },
  { icon: Bot, label: "AI Agents" },
  { icon: Cpu, label: "Custom LLMs" },
  { icon: Shield, label: "Data Systems" },
  { icon: Sparkles, label: "GenAI Apps" },
];

const inputCls =
  "w-full px-4 py-3 rounded-lg text-sm font-sans text-white placeholder-white/40 bg-white/[0.04] border border-white/[0.10] focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all duration-200";

function OptionPill({
  label, sub, selected, onClick,
}: { label: string; sub?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-sans transition-all duration-200 ${
        selected
          ? "border-primary/60 bg-primary/[0.08] text-white"
          : "border-white/[0.08] bg-white/[0.02] text-white/70 hover:border-white/25 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors ${selected ? "border-primary" : "border-white/25"}`}>
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </div>
        <div>
          <span className={`font-medium ${selected ? "text-white" : ""}`}>{label}</span>
          {sub && <span className="block text-xs text-white/45 mt-0.5 leading-snug">{sub}</span>}
        </div>
      </div>
    </button>
  );
}

// Animated AI status ticker
function AiStatusBar({ step }: { step: number }) {
  const messages = [
    "Analysing brief parameters...",
    "Mapping capability requirements...",
    "Evaluating automation potential...",
    "Scoping AI architecture...",
    "Identifying feature dependencies...",
    "Calibrating aesthetic model...",
    "Generating investment estimate...",
  ];
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/[0.06] border border-primary/20 mb-6">
      <div className="flex gap-0.5">
        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0ms" }} />
        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: "150ms" }} />
        <span className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: "300ms" }} />
      </div>
      <span
        className={`text-[11px] font-mono text-primary tracking-wide transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {messages[step - 1]}
      </span>
    </div>
  );
}

export default function IntakeQuiz() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof FormData, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const canAdvance = () => {
    if (step === 1) return !!(form.fullName.trim() && form.email.trim() && form.businessName.trim());
    if (step === 2) return !!form.buildType;
    if (step === 3) return form.painPoints.trim().length > 10;
    if (step === 4) return form.goal.trim().length > 10;
    if (step === 5) return form.mustHaves.trim().length > 5;
    if (step === 6) return !!form.aesthetic;
    if (step === 7) return !!(form.budget && form.timeline);
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const label = (arr: { value: string; label: string }[], val: string) =>
        arr.find((x) => x.value === val)?.label || val;

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New Intake Brief — ${form.businessName} (${form.fullName})`,
          from_name: "PresciaIQ Intake Quiz",
          to: "sales@presciaiq.com.au",
          replyto: form.email,
          submitted_at: new Date().toISOString(),
          "Full Name": form.fullName,
          "Email": form.email,
          "Business Name": form.businessName,
          "Mobile": form.mobile || "Not provided",
          "What Are We Building?": label(buildTypes, form.buildType),
          "Pain Points": form.painPoints,
          "Goal": form.goal,
          "Must-Haves": form.mustHaves,
          "Nice-to-Haves": form.niceToHaves || "None specified",
          "Aesthetic": label(aesthetics, form.aesthetic),
          "Sites / Apps They Love": form.sitesLove || "Not specified",
          "Budget": label(budgets, form.budget),
          "Timeline": label(timelines, form.timeline),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please email us at sales@presciaiq.com.au");
      }
    } catch {
      setError("Something went wrong. Please email us at sales@presciaiq.com.au");
    } finally {
      setSubmitting(false);
    }
  };

  const { section, title, sub } = steps[step - 1];
  const progress = (step / TOTAL_STEPS) * 100;

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
          <CheckCircle className="w-5 h-5 text-primary" />
        </div>
        <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">Brief received</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
          We'll be in touch, {form.fullName.split(" ")[0]}.
        </h2>
        <p className="text-sm text-white/60 font-sans max-w-sm leading-relaxed">
          Expect a tailored recommendation within 24 hours.
        </p>
        <p className="mt-8 text-xs font-mono text-white/30">— Macauley · PresciaIQ</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 overflow-x-hidden">

      {/* AI Capability Strip */}
      <div className="flex flex-wrap gap-2 mb-8">
        {aiCapabilities.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-[10px] font-mono text-white/50 tracking-wide"
          >
            <Icon className="w-3 h-3 text-primary/70" />
            {label}
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-mono text-white/40 tracking-widest uppercase">
          {section} / 07
        </span>
        <span className="text-[11px] font-mono text-primary">{Math.round(progress)}%</span>
      </div>
      <div className="h-px w-full bg-white/[0.06] mb-6 relative">
        <div
          className="absolute top-0 left-0 h-px bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* AI Status */}
      <AiStatusBar step={step} />

      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">{title}</h2>
        <p className="text-sm text-white/55 font-sans">{sub}</p>
      </div>

      {/* Fields */}
      <div className="space-y-3">

        {step === 1 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" placeholder="Full name *" required value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)} className={inputCls} />
              <input type="text" placeholder="Business name *" required value={form.businessName}
                onChange={(e) => set("businessName", e.target.value)} className={inputCls} />
            </div>
            <input type="email" placeholder="Best email *" required value={form.email}
              onChange={(e) => set("email", e.target.value)} className={inputCls} />
            <input type="tel" placeholder="Mobile (optional)" value={form.mobile}
              onChange={(e) => set("mobile", e.target.value)} className={inputCls} />
          </>
        )}

        {step === 2 && buildTypes.map((bt) => (
          <OptionPill key={bt.value} label={bt.label} sub={bt.sub}
            selected={form.buildType === bt.value}
            onClick={() => set("buildType", bt.value)} />
        ))}

        {step === 3 && (
          <textarea
            placeholder="What's costing you time, money, or sleep? What can't you do today that you wish you could? *"
            rows={6}
            value={form.painPoints}
            onChange={(e) => set("painPoints", e.target.value)}
            className={`${inputCls} resize-none`}
          />
        )}

        {step === 4 && (
          <textarea
            placeholder="What changes for your business when this is built? Be specific — paint the picture of life after we ship. *"
            rows={6}
            value={form.goal}
            onChange={(e) => set("goal", e.target.value)}
            className={`${inputCls} resize-none`}
          />
        )}

        {step === 5 && (
          <>
            <div>
              <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest mb-2">Must-haves *</p>
              <textarea
                placeholder="The non-negotiables. What does v1 absolutely need to do?"
                rows={4}
                value={form.mustHaves}
                onChange={(e) => set("mustHaves", e.target.value)}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div>
              <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest mb-2">Nice-to-haves</p>
              <textarea
                placeholder="Things you'd love but could live without for v1."
                rows={3}
                value={form.niceToHaves}
                onChange={(e) => set("niceToHaves", e.target.value)}
                className={`${inputCls} resize-none`}
              />
            </div>
          </>
        )}

        {step === 6 && (
          <>
            {aesthetics.map((a) => (
              <OptionPill key={a.value} label={a.label} sub={a.sub}
                selected={form.aesthetic === a.value}
                onClick={() => set("aesthetic", a.value)} />
            ))}
            <div className="pt-1">
              <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest mb-2">Sites or apps you love</p>
              <input type="text" placeholder="URLs or names — even competitors help us calibrate."
                value={form.sitesLove}
                onChange={(e) => set("sitesLove", e.target.value)}
                className={inputCls} />
            </div>
          </>
        )}

        {step === 7 && (
          <>
            <div>
              <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest mb-2">Budget range *</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {budgets.map((b) => (
                  <OptionPill key={b.value} label={b.label}
                    selected={form.budget === b.value}
                    onClick={() => set("budget", b.value)} />
                ))}
              </div>
            </div>
            <div className="pt-1">
              <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest mb-2">When do you need this live? *</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {timelines.map((t) => (
                  <OptionPill key={t.value} label={t.label}
                    selected={form.timeline === t.value}
                    onClick={() => set("timeline", t.value)} />
                ))}
              </div>
            </div>
          </>
        )}

        {error && <p className="text-xs text-red-400 font-sans pt-1">{error}</p>}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-5">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white font-sans transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : <div />}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              disabled={!canAdvance()}
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg uppercase tracking-widest font-sans hover:shadow-[0_0_24px_rgba(0,255,136,0.30)] transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={!canAdvance() || submitting}
              onClick={handleSubmit}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg uppercase tracking-widest font-sans hover:shadow-[0_0_24px_rgba(0,255,136,0.30)] transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
            >
              {submitting
                ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending...</>
                : <>Send Brief <ArrowRight className="w-3.5 h-3.5" /></>}
            </button>
          )}
        </div>

        <p className="text-center text-[11px] text-white/30 font-sans pt-1">
          We'll come back within 24 hours with a tailored brief.
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";

type FormData = {
  brandName: string;
  instagramHandle: string;
  businessType: string;
  description: string;
  goals: string[];
  tone: string;
  topics: string[];
  postsPerWeek: string;
  postingDays: string[];
  postingTime: string;
  platforms: string[];
  hasPhotos: string;
  hasBrandGuidelines: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

const INITIAL: FormData = {
  brandName: "", instagramHandle: "", businessType: "", description: "",
  goals: [], tone: "", topics: [],
  postsPerWeek: "5", postingDays: [], postingTime: "", platforms: [],
  hasPhotos: "", hasBrandGuidelines: "",
  contactName: "", contactEmail: "", contactPhone: "",
};

const STEPS = ["Your Brand", "Content Goals", "Posting Schedule", "Your Assets", "Review & Submit"];

const BUSINESS_TYPES = [
  { value: "combat-coach", label: "Combat Sports Coach" },
  { value: "gym", label: "Gym / Training Facility" },
  { value: "athlete", label: "Athlete / Personal Brand" },
  { value: "nutrition", label: "Nutrition Brand" },
  { value: "ecommerce", label: "E-Commerce Brand" },
  { value: "professional-services", label: "Professional Services" },
  { value: "enterprise-operations", label: "Enterprise Operations" },
  { value: "other", label: "Other" },
];

const GOALS = ["Grow followers", "Drive enquiries", "Build authority", "Sell a product or service", "Retain existing clients"];
const TONES = [
  { value: "aggressive", label: "Aggressive & Direct", desc: "No fluff. Short, punchy, confrontational." },
  { value: "educational", label: "Educational & Informative", desc: "Data-backed, detailed, trust-building." },
  { value: "motivational", label: "Motivational", desc: "Energy-forward, inspiring, action-driven." },
  { value: "mixed", label: "Mixed", desc: "Rotate between styles depending on the content." },
];
const TOPICS = ["Nutrition", "Training", "Mindset", "Recovery", "Fight Week", "Weight Cut", "Supplements", "Off-Season", "Game Day", "Client Results", "Behind the Scenes", "Product Launches"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIMES = [
  { value: "morning", label: "Morning", desc: "6am – 10am" },
  { value: "midday", label: "Midday", desc: "10am – 2pm" },
  { value: "evening", label: "Evening", desc: "5pm – 8pm" },
  { value: "night", label: "Night", desc: "8pm – 11pm" },
];
const PLATFORMS = ["Instagram", "TikTok", "LinkedIn", "YouTube", "Facebook"];
const FREQ = ["3", "5", "7", "Daily"];
const PHOTO_OPTIONS = [
  { value: "yes", label: "Yes — full library", desc: "Photos, videos, action shots ready to go." },
  { value: "some", label: "Some", desc: "A few assets but not a complete library." },
  { value: "no", label: "No", desc: "We will generate or source visuals." },
];
const GUIDE_OPTIONS = [
  { value: "yes", label: "Yes", desc: "I have a brand guide, logo files, and colour palette." },
  { value: "no", label: "No", desc: "We will define the brand style together." },
];

function toggle(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-mono uppercase tracking-[0.18em] mb-2 text-[#8FAF8F]">{children}</label>;
}
function Field({ children }: { children: React.ReactNode }) {
  return <div className="mb-6">{children}</div>;
}
function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#F0EDE6] placeholder:text-white/30 focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] transition-all font-sans"
    />
  );
}
function Textarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#F0EDE6] placeholder:text-white/30 focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] transition-all font-sans resize-none"
    />
  );
}
function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: {value:string;label:string}[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-[#F0EDE6] focus:border-[#00FF88] focus:outline-none focus:ring-1 focus:ring-[#00FF88] transition-all font-sans"
      style={{ color: value ? "#F0EDE6" : "#888" }}
    >
      {placeholder && <option value="" disabled className="bg-[#111411] text-white/50">{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value} className="bg-[#111411] text-[#F0EDE6]">{o.label}</option>)}
    </select>
  );
}
function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-xl transition-all duration-200 active:scale-95 ${
        selected
          ? "border border-[#00FF88]/50 bg-[#00FF88]/10 text-[#00FF88] shadow-[0_0_12px_rgba(0,255,136,0.15)]"
          : "border border-white/10 bg-black/40 text-[#C9CCC8] hover:border-white/20 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
function Radio({ label, desc, selected, onClick }: { label: string; desc?: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        selected
          ? "border-[#00FF88]/60 border-l-4 border-l-[#00FF88] bg-[#00FF88]/[0.06] shadow-[0_0_20px_rgba(0,255,136,0.12)]"
          : "border-white/10 bg-black/40 hover:border-white/20"
      }`}
    >
      <span className={`block text-sm font-serif font-semibold ${selected ? "text-[#00FF88]" : "text-[#F0EDE6]"}`}>{label}</span>
      {desc && <span className="block text-xs mt-1 text-[#C9CCC8] font-sans">{desc}</span>}
    </button>
  );
}

export default function SocialsForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (patch: Partial<FormData>) => setData(d => ({ ...d, ...patch }));
  const next = () => setStep(s => Math.min(s + 1, 5));
  const back = () => setStep(s => Math.max(s - 1, 1));
  const progress = ((step - 1) / 4) * 100;

  const handleSubmit = async () => {
    setSubmitting(true);
    // Build mailto body
    const body = [
      `=== PresciaIQ Social Media Content Brief ===`,
      ``,
      `BRAND: ${data.brandName}`,
      `INSTAGRAM: ${data.instagramHandle}`,
      `BUSINESS TYPE: ${data.businessType}`,
      `DESCRIPTION: ${data.description}`,
      ``,
      `GOALS: ${data.goals.join(", ")}`,
      `TONE: ${data.tone}`,
      `TOPICS: ${data.topics.join(", ")}`,
      ``,
      `POSTS PER WEEK: ${data.postsPerWeek}`,
      `POSTING DAYS: ${data.postingDays.join(", ")}`,
      `POSTING TIME: ${data.postingTime}`,
      `PLATFORMS: ${data.platforms.join(", ")}`,
      ``,
      `HAS PHOTOS: ${data.hasPhotos}`,
      `HAS BRAND GUIDELINES: ${data.hasBrandGuidelines}`,
      ``,
      `CONTACT NAME: ${data.contactName}`,
      `CONTACT EMAIL: ${data.contactEmail}`,
      `CONTACT PHONE: ${data.contactPhone}`,
    ].join("\n");

    const subject = `Social Media Content Brief — ${data.brandName || data.contactName}`;
    const mailtoUrl = `mailto:sales@presciaiq.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setTimeout(() => { setSubmitted(true); setSubmitting(false); }, 800);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto mb-6 flex items-center justify-center w-16 h-16 rounded-full border border-[#00FF88] bg-[#00FF88]/10 shadow-[0_0_25px_rgba(0,255,136,0.3)]">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M5 14L11 20L23 8" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-3xl font-serif font-bold text-[#F0EDE6] mb-3">Brief Received.</h3>
        <p className="text-base text-[#8FAF8F] font-sans">A PresciaIQ strategist will review your brief and be in touch within one business day.</p>
        <p className="mt-8 text-xs font-mono tracking-widest uppercase text-white/30">presciaiq.com.au</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-4 rounded-3xl border border-white/10 bg-[#111411]/90 backdrop-blur-2xl p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
      {/* Ambient corner glow inside form */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#00FF88]/10 blur-3xl" aria-hidden="true" />

      {/* Step Indicator Header */}
      <div className="text-xs font-mono uppercase tracking-widest text-[#8FAF8F] mb-8 border-b border-white/5 pb-4">
        <div className="flex justify-between items-center mb-3">
          <span>STEP {step} OF 5</span>
          <span className="text-[#00FF88]">{STEPS[step - 1]}</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#00FF88] rounded-full transition-all duration-500 shadow-[0_0_10px_#00FF88]" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="relative z-10">
          <p className="text-3xl font-mono font-bold text-[#00FF88] mb-1">01</p>
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#F0EDE6] mb-2">Tell us about your brand.</h3>
          <p className="text-sm text-[#C9CCC8] font-sans mb-8">We build content around your business, not a generic template.</p>
          <Field><Label>Brand / Business Name</Label><Input value={data.brandName} onChange={v => update({ brandName: v })} placeholder="Modern Body Method" /></Field>
          <Field><Label>Instagram Handle</Label><Input value={data.instagramHandle} onChange={v => update({ instagramHandle: v })} placeholder="@modernbodymethod" /></Field>
          <Field><Label>What best describes your business?</Label><Select value={data.businessType} onChange={v => update({ businessType: v })} options={BUSINESS_TYPES} placeholder="Select one" /></Field>
          <Field><Label>Describe what you do in 2–3 sentences</Label><Textarea value={data.description} onChange={v => update({ description: v })} placeholder="We coach combat athletes through their full fight camp, covering nutrition, training load, and weight management." /></Field>
          <button
            onClick={next}
            disabled={!(data.brandName && data.instagramHandle && data.businessType)}
            className="w-full bg-[#00FF88] text-[#050508] font-semibold py-3.5 rounded-xl hover:bg-[#00FF88]/90 transition-all font-mono uppercase tracking-wider text-xs hover:shadow-[0_0_20px_rgba(0,255,136,0.35)] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next: Content Goals →
          </button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="relative z-10">
          <p className="text-3xl font-mono font-bold text-[#00FF88] mb-1">02</p>
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#F0EDE6] mb-2">What do you want your content to do?</h3>
          <p className="text-sm text-[#C9CCC8] font-sans mb-8">Be specific. Vague goals produce vague content.</p>
          <Field>
            <Label>Primary Goals (select all that apply)</Label>
            <div className="flex flex-wrap gap-2.5">{GOALS.map(g => <Chip key={g} label={g} selected={data.goals.includes(g)} onClick={() => update({ goals: toggle(data.goals, g) })} />)}</div>
          </Field>
          <Field>
            <Label>Content Tone</Label>
            <div className="flex flex-col gap-2.5">{TONES.map(t => <Radio key={t.value} label={t.label} desc={t.desc} selected={data.tone === t.value} onClick={() => update({ tone: t.value })} />)}</div>
          </Field>
          <Field>
            <Label>Topics to Cover</Label>
            <div className="flex flex-wrap gap-2.5">{TOPICS.map(t => <Chip key={t} label={t} selected={data.topics.includes(t)} onClick={() => update({ topics: toggle(data.topics, t) })} />)}</div>
          </Field>
          <div className="flex gap-3 pt-2">
            <button onClick={back} className="px-6 py-3.5 text-xs font-mono uppercase tracking-wider rounded-xl border border-white/10 text-[#C9CCC8] bg-white/[0.03] hover:border-white/20 transition-all">Back</button>
            <button
              onClick={next}
              disabled={!(data.goals.length && data.tone && data.topics.length)}
              className="flex-1 bg-[#00FF88] text-[#050508] font-semibold py-3.5 rounded-xl hover:bg-[#00FF88]/90 transition-all font-mono uppercase tracking-wider text-xs hover:shadow-[0_0_20px_rgba(0,255,136,0.35)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next: Posting Schedule →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="relative z-10">
          <p className="text-3xl font-mono font-bold text-[#00FF88] mb-1">03</p>
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#F0EDE6] mb-2">How do you want to post?</h3>
          <p className="text-sm text-[#C9CCC8] font-sans mb-8">Consistency beats volume. Pick a cadence you can sustain.</p>
          <Field>
            <Label>Posts Per Week</Label>
            <div className="flex gap-2">{FREQ.map(f => (
              <button
                key={f}
                type="button"
                onClick={() => update({ postsPerWeek: f })}
                className={`flex-1 py-3 text-xs font-mono font-bold rounded-xl transition-all ${
                  data.postsPerWeek === f
                    ? "border border-[#00FF88]/50 bg-[#00FF88]/10 text-[#00FF88] shadow-[0_0_12px_rgba(0,255,136,0.15)]"
                    : "border border-white/10 bg-black/40 text-[#C9CCC8] hover:border-white/20"
                }`}
              >
                {f === "Daily" ? "Daily" : `${f}x`}
              </button>
            ))}</div>
          </Field>
          <Field>
            <Label>Preferred Posting Days</Label>
            <div className="flex flex-wrap gap-2">{DAYS.map(d => <Chip key={d} label={d} selected={data.postingDays.includes(d)} onClick={() => update({ postingDays: toggle(data.postingDays, d) })} />)}</div>
          </Field>
          <Field>
            <Label>Preferred Posting Time</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">{TIMES.map(t => <Radio key={t.value} label={t.label} desc={t.desc} selected={data.postingTime === t.value} onClick={() => update({ postingTime: t.value })} />)}</div>
          </Field>
          <Field>
            <Label>Platforms</Label>
            <div className="flex flex-wrap gap-2">{PLATFORMS.map(p => <Chip key={p} label={p} selected={data.platforms.includes(p)} onClick={() => update({ platforms: toggle(data.platforms, p) })} />)}</div>
          </Field>
          <div className="flex gap-3 pt-2">
            <button onClick={back} className="px-6 py-3.5 text-xs font-mono uppercase tracking-wider rounded-xl border border-white/10 text-[#C9CCC8] bg-white/[0.03] hover:border-white/20 transition-all">Back</button>
            <button
              onClick={next}
              disabled={!(data.postingDays.length && data.postingTime && data.platforms.length)}
              className="flex-1 bg-[#00FF88] text-[#050508] font-semibold py-3.5 rounded-xl hover:bg-[#00FF88]/90 transition-all font-mono uppercase tracking-wider text-xs hover:shadow-[0_0_20px_rgba(0,255,136,0.35)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next: Your Assets →
            </button>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="relative z-10">
          <p className="text-3xl font-mono font-bold text-[#00FF88] mb-1">04</p>
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#F0EDE6] mb-2">What are you working with?</h3>
          <p className="text-sm text-[#C9CCC8] font-sans mb-8">The more we know upfront, the faster we move.</p>
          <Field>
            <Label>Do you have existing photos or videos?</Label>
            <div className="flex flex-col gap-2.5">{PHOTO_OPTIONS.map(o => <Radio key={o.value} label={o.label} desc={o.desc} selected={data.hasPhotos === o.value} onClick={() => update({ hasPhotos: o.value })} />)}</div>
          </Field>
          <Field>
            <Label>Do you have brand guidelines?</Label>
            <div className="flex flex-col gap-2.5">{GUIDE_OPTIONS.map(o => <Radio key={o.value} label={o.label} desc={o.desc} selected={data.hasBrandGuidelines === o.value} onClick={() => update({ hasBrandGuidelines: o.value })} />)}</div>
          </Field>
          <div className="flex gap-3 pt-2">
            <button onClick={back} className="px-6 py-3.5 text-xs font-mono uppercase tracking-wider rounded-xl border border-white/10 text-[#C9CCC8] bg-white/[0.03] hover:border-white/20 transition-all">Back</button>
            <button
              onClick={next}
              disabled={!(data.hasPhotos && data.hasBrandGuidelines)}
              className="flex-1 bg-[#00FF88] text-[#050508] font-semibold py-3.5 rounded-xl hover:bg-[#00FF88]/90 transition-all font-mono uppercase tracking-wider text-xs hover:shadow-[0_0_20px_rgba(0,255,136,0.35)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Review &amp; Submit →
            </button>
          </div>
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div className="relative z-10">
          <p className="text-3xl font-mono font-bold text-[#00FF88] mb-1">05</p>
          <h3 className="text-2xl md:text-3xl font-serif font-semibold text-[#F0EDE6] mb-2">Review your brief.</h3>
          <p className="text-sm text-[#C9CCC8] font-sans mb-8">Confirm the details. We will be in touch within one business day.</p>
          <div className="mb-8 rounded-2xl border border-white/10 bg-black/40 p-5 text-sm space-y-2.5">
            {[
              ["Brand", data.brandName], ["Instagram", data.instagramHandle], ["Business Type", data.businessType],
              ["Goals", data.goals.join(", ")], ["Tone", data.tone], ["Topics", data.topics.join(", ")],
              ["Posts / Week", data.postsPerWeek], ["Days", data.postingDays.join(", ")],
              ["Time", data.postingTime], ["Platforms", data.platforms.join(", ")],
              ["Has Photos", data.hasPhotos], ["Brand Guide", data.hasBrandGuidelines],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8FAF8F]">{label}</span>
                <span className="text-[#F0EDE6] text-right font-sans text-xs md:text-sm max-w-[60%] truncate">{value || "—"}</span>
              </div>
            ))}
          </div>
          <Field><Label>Your Name</Label><Input value={data.contactName} onChange={v => update({ contactName: v })} placeholder="Full Name" /></Field>
          <Field><Label>Email Address</Label><Input value={data.contactEmail} onChange={v => update({ contactEmail: v })} placeholder="your@email.com" type="email" /></Field>
          <Field><Label>Phone (optional)</Label><Input value={data.contactPhone} onChange={v => update({ contactPhone: v })} placeholder="+61 4xx xxx xxx" type="tel" /></Field>
          <div className="flex gap-3 pt-2">
            <button onClick={back} className="px-6 py-3.5 text-xs font-mono uppercase tracking-wider rounded-xl border border-white/10 text-[#C9CCC8] bg-white/[0.03] hover:border-white/20 transition-all">Back</button>
            <button
              onClick={handleSubmit}
              disabled={!(data.contactName && data.contactEmail) || submitting}
              className="flex-1 bg-[#00FF88] text-[#050508] font-semibold py-3.5 rounded-xl hover:bg-[#00FF88]/90 transition-all font-mono uppercase tracking-wider text-xs hover:shadow-[0_0_20px_rgba(0,255,136,0.35)] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending..." : "Submit My Brief →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

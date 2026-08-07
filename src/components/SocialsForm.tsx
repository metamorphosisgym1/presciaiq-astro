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
  { value: "trades", label: "Trades & Field Services" },
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
  return <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#8FAF8F]">{children}</label>;
}
function Field({ children }: { children: React.ReactNode }) {
  return <div className="mb-5">{children}</div>;
}
function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-4 py-3 text-sm bg-[#111411] border border-[#222] rounded text-[#F0EDE6] placeholder-[#555] outline-none focus:border-[#5C7A5C] transition-colors" />
  );
}
function Textarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4}
      className="w-full px-4 py-3 text-sm bg-[#111411] border border-[#222] rounded text-[#F0EDE6] placeholder-[#555] outline-none focus:border-[#5C7A5C] transition-colors resize-none" />
  );
}
function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: {value:string;label:string}[]; placeholder?: string }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-3 text-sm bg-[#111411] border border-[#222] rounded outline-none focus:border-[#5C7A5C] transition-colors"
      style={{ color: value ? "#F0EDE6" : "#888" }}>
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map(o => <option key={o.value} value={o.value} style={{ background: "#111411" }}>{o.label}</option>)}
    </select>
  );
}
function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-all duration-150 active:scale-95"
      style={{ border: `1px solid ${selected ? "#5C7A5C" : "#222"}`, background: selected ? "rgba(92,122,92,0.15)" : "#111411", color: selected ? "#8FAF8F" : "#666", borderRadius: "4px" }}>
      {label}
    </button>
  );
}
function Radio({ label, desc, selected, onClick }: { label: string; desc?: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="w-full text-left px-4 py-3 transition-all duration-150"
      style={{ border: `1px solid ${selected ? "#5C7A5C" : "#222"}`, borderLeftWidth: selected ? "3px" : "1px", background: selected ? "rgba(92,122,92,0.08)" : "#111411", borderRadius: "4px" }}>
      <span className="block text-sm font-semibold" style={{ color: selected ? "#8FAF8F" : "#F0EDE6" }}>{label}</span>
      {desc && <span className="block text-xs mt-0.5 text-[#666]">{desc}</span>}
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
      <div className="text-center py-20">
        <div className="mx-auto mb-8 flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#5C7A5C]">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M5 14L11 20L23 8" stroke="#5C7A5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-3xl font-black text-white mb-3" style={{ fontFamily: "'Noto Serif', serif" }}>Brief received.</h3>
        <p className="text-[#8FAF8F] italic" style={{ fontFamily: "'Noto Serif', serif" }}>We will be in touch within one business day.</p>
        <p className="mt-6 text-xs tracking-widest uppercase text-[#555]">presciaiq.com.au</p>
      </div>
    );
  }

  return (
    <div className="max-w-[680px] mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-[#555] mb-2 tracking-widest uppercase">
          <span>Step {step} of 5</span>
          <span>{STEPS[step - 1]}</span>
        </div>
        <div className="h-[2px] bg-[#1a1a1a] rounded-full">
          <div className="h-full bg-[#5C7A5C] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <p className="text-5xl font-black text-[#5C7A5C] mb-1" style={{ fontFamily: "'Noto Serif', serif", opacity: 0.8 }}>01</p>
          <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>Tell us about your brand.</h3>
          <p className="text-sm italic text-[#8FAF8F] mb-8" style={{ fontFamily: "'Noto Serif', serif" }}>We build content around your business, not a template.</p>
          <Field><Label>Brand / Business Name</Label><Input value={data.brandName} onChange={v => update({ brandName: v })} placeholder="Modern Body Method" /></Field>
          <Field><Label>Instagram Handle</Label><Input value={data.instagramHandle} onChange={v => update({ instagramHandle: v })} placeholder="@modernbodymethod" /></Field>
          <Field><Label>What best describes your business?</Label><Select value={data.businessType} onChange={v => update({ businessType: v })} options={BUSINESS_TYPES} placeholder="Select one" /></Field>
          <Field><Label>Describe what you do in 2–3 sentences</Label><Textarea value={data.description} onChange={v => update({ description: v })} placeholder="We coach combat athletes through their full fight camp, covering nutrition, training load, and weight management." /></Field>
          <button onClick={next} disabled={!(data.brandName && data.instagramHandle && data.businessType)}
            className="w-full py-3 text-sm font-semibold tracking-widest uppercase rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "rgba(92,122,92,0.85)", color: "#fff" }}>Next: Content Goals</button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div>
          <p className="text-5xl font-black text-[#5C7A5C] mb-1" style={{ fontFamily: "'Noto Serif', serif", opacity: 0.8 }}>02</p>
          <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>What do you want your content to do?</h3>
          <p className="text-sm italic text-[#8FAF8F] mb-8" style={{ fontFamily: "'Noto Serif', serif" }}>Be specific. Vague goals produce vague content.</p>
          <Field>
            <Label>Primary Goals (select all that apply)</Label>
            <div className="flex flex-wrap gap-2">{GOALS.map(g => <Chip key={g} label={g} selected={data.goals.includes(g)} onClick={() => update({ goals: toggle(data.goals, g) })} />)}</div>
          </Field>
          <Field>
            <Label>Content Tone</Label>
            <div className="flex flex-col gap-2">{TONES.map(t => <Radio key={t.value} label={t.label} desc={t.desc} selected={data.tone === t.value} onClick={() => update({ tone: t.value })} />)}</div>
          </Field>
          <Field>
            <Label>Topics to Cover</Label>
            <div className="flex flex-wrap gap-2">{TOPICS.map(t => <Chip key={t} label={t} selected={data.topics.includes(t)} onClick={() => update({ topics: toggle(data.topics, t) })} />)}</div>
          </Field>
          <div className="flex gap-3">
            <button onClick={back} className="px-6 py-3 text-sm font-semibold tracking-widest uppercase rounded-full border border-[#5C7A5C] text-[#8FAF8F] bg-transparent transition-all">Back</button>
            <button onClick={next} disabled={!(data.goals.length && data.tone && data.topics.length)}
              className="flex-1 py-3 text-sm font-semibold tracking-widest uppercase rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "rgba(92,122,92,0.85)", color: "#fff" }}>Next: Posting Schedule</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div>
          <p className="text-5xl font-black text-[#5C7A5C] mb-1" style={{ fontFamily: "'Noto Serif', serif", opacity: 0.8 }}>03</p>
          <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>How do you want to post?</h3>
          <p className="text-sm italic text-[#8FAF8F] mb-8" style={{ fontFamily: "'Noto Serif', serif" }}>Consistency beats volume. Pick a cadence you can sustain.</p>
          <Field>
            <Label>Posts Per Week</Label>
            <div className="flex gap-2">{FREQ.map(f => (
              <button key={f} onClick={() => update({ postsPerWeek: f })}
                className="flex-1 py-3 text-sm font-black transition-all"
                style={{ border: `1px solid ${data.postsPerWeek === f ? "#5C7A5C" : "#222"}`, background: data.postsPerWeek === f ? "rgba(92,122,92,0.15)" : "#111411", color: data.postsPerWeek === f ? "#8FAF8F" : "#666", borderRadius: "4px" }}>
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
            <div className="grid grid-cols-2 gap-2">{TIMES.map(t => <Radio key={t.value} label={t.label} desc={t.desc} selected={data.postingTime === t.value} onClick={() => update({ postingTime: t.value })} />)}</div>
          </Field>
          <Field>
            <Label>Platforms</Label>
            <div className="flex flex-wrap gap-2">{PLATFORMS.map(p => <Chip key={p} label={p} selected={data.platforms.includes(p)} onClick={() => update({ platforms: toggle(data.platforms, p) })} />)}</div>
          </Field>
          <div className="flex gap-3">
            <button onClick={back} className="px-6 py-3 text-sm font-semibold tracking-widest uppercase rounded-full border border-[#5C7A5C] text-[#8FAF8F] bg-transparent">Back</button>
            <button onClick={next} disabled={!(data.postingDays.length && data.postingTime && data.platforms.length)}
              className="flex-1 py-3 text-sm font-semibold tracking-widest uppercase rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "rgba(92,122,92,0.85)", color: "#fff" }}>Next: Your Assets</button>
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div>
          <p className="text-5xl font-black text-[#5C7A5C] mb-1" style={{ fontFamily: "'Noto Serif', serif", opacity: 0.8 }}>04</p>
          <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>What are you working with?</h3>
          <p className="text-sm italic text-[#8FAF8F] mb-8" style={{ fontFamily: "'Noto Serif', serif" }}>The more we know upfront, the faster we move.</p>
          <Field>
            <Label>Do you have existing photos or videos?</Label>
            <div className="flex flex-col gap-2">{PHOTO_OPTIONS.map(o => <Radio key={o.value} label={o.label} desc={o.desc} selected={data.hasPhotos === o.value} onClick={() => update({ hasPhotos: o.value })} />)}</div>
          </Field>
          <Field>
            <Label>Do you have brand guidelines?</Label>
            <div className="flex flex-col gap-2">{GUIDE_OPTIONS.map(o => <Radio key={o.value} label={o.label} desc={o.desc} selected={data.hasBrandGuidelines === o.value} onClick={() => update({ hasBrandGuidelines: o.value })} />)}</div>
          </Field>
          <div className="flex gap-3">
            <button onClick={back} className="px-6 py-3 text-sm font-semibold tracking-widest uppercase rounded-full border border-[#5C7A5C] text-[#8FAF8F] bg-transparent">Back</button>
            <button onClick={next} disabled={!(data.hasPhotos && data.hasBrandGuidelines)}
              className="flex-1 py-3 text-sm font-semibold tracking-widest uppercase rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "rgba(92,122,92,0.85)", color: "#fff" }}>Review & Submit</button>
          </div>
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div>
          <p className="text-5xl font-black text-[#5C7A5C] mb-1" style={{ fontFamily: "'Noto Serif', serif", opacity: 0.8 }}>05</p>
          <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Noto Serif', serif" }}>Review your brief.</h3>
          <p className="text-sm italic text-[#8FAF8F] mb-8" style={{ fontFamily: "'Noto Serif', serif" }}>Confirm the details. We will be in touch within one business day.</p>
          <div className="mb-6 bg-[#111411] border border-[#1a1a1a] rounded p-4 text-sm space-y-2">
            {[
              ["Brand", data.brandName], ["Instagram", data.instagramHandle], ["Business Type", data.businessType],
              ["Goals", data.goals.join(", ")], ["Tone", data.tone], ["Topics", data.topics.join(", ")],
              ["Posts / Week", data.postsPerWeek], ["Days", data.postingDays.join(", ")],
              ["Time", data.postingTime], ["Platforms", data.platforms.join(", ")],
              ["Has Photos", data.hasPhotos], ["Brand Guide", data.hasBrandGuidelines],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between border-b border-[#1a1a1a] pb-2 last:border-0 last:pb-0">
                <span className="text-xs tracking-widest uppercase text-[#555]">{label}</span>
                <span className="text-[#F0EDE6] text-right max-w-[60%]">{value || "—"}</span>
              </div>
            ))}
          </div>
          <Field><Label>Your Name</Label><Input value={data.contactName} onChange={v => update({ contactName: v })} placeholder="Full Name" /></Field>
          <Field><Label>Email Address</Label><Input value={data.contactEmail} onChange={v => update({ contactEmail: v })} placeholder="your@email.com" type="email" /></Field>
          <Field><Label>Phone (optional)</Label><Input value={data.contactPhone} onChange={v => update({ contactPhone: v })} placeholder="+61 4xx xxx xxx" type="tel" /></Field>
          <div className="flex gap-3">
            <button onClick={back} className="px-6 py-3 text-sm font-semibold tracking-widest uppercase rounded-full border border-[#5C7A5C] text-[#8FAF8F] bg-transparent">Back</button>
            <button onClick={handleSubmit} disabled={!(data.contactName && data.contactEmail) || submitting}
              className="flex-1 py-3 text-sm font-semibold tracking-widest uppercase rounded-full transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "rgba(92,122,92,0.85)", color: "#fff" }}>
              {submitting ? "Sending..." : "Submit My Brief"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

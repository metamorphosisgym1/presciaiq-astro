import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

// ─── FAQ Knowledge Base ───
const faqBank: { keywords: string[]; q: string; a: string }[] = [
  // GENERAL
  { keywords: ["what is presciaiq", "presciaiq", "who are you", "about presciaiq", "what do you do"], q: "What is PresciaIQ?", a: "PresciaIQ is Australia's AI Intelligence & Development Company. We build predictive tools that turn raw data into competitive advantage - four products, one ecosystem, zero guesswork. We're based in Sydney, NSW, with a presence in Miami, FL." },
  { keywords: ["ecosystem", "suite", "products overview"], q: "What is the PresciaIQ ecosystem?", a: "The PresciaIQ ecosystem is a unified suite of four AI intelligence products - **BuildPredictIQ** (construction), **AdsIQ** (marketing), **OpsIQ** (operations), and **TradesmanIQ** (trades) - plus enterprise-grade web and app development services. Every product shares the same AI backbone." },
  { keywords: ["australian", "australia", "local", "based"], q: "Is PresciaIQ Australian?", a: "Yes. PresciaIQ is proudly Australian-built, designed specifically for Australian regulations, markets, and conditions. Our primary office is in Sydney, NSW." },
  { keywords: ["industries", "sectors", "who do you serve"], q: "What industries does PresciaIQ serve?", a: "We serve construction & property development (BuildPredictIQ), marketing & advertising (AdsIQ), business operations (OpsIQ), and the trades sector (TradesmanIQ). Our development services serve any Australian business." },
  { keywords: ["different", "unique", "why presciaiq", "competitive advantage", "palantir"], q: "What makes PresciaIQ different?", a: "PresciaIQ delivers Palantir-level predictive intelligence at SMB-accessible pricing. We don't just analyse - we predict outcomes before they happen. Our products are Australian-built, ecosystem-connected, and designed for measurable ROI from day one." },
  { keywords: ["contact", "phone", "email", "reach", "get in touch"], q: "How do I contact PresciaIQ?", a: "You can reach us by phone at **0400 457 006**, by email at **sales@presciaiq.com.au**, or by booking a free 15-minute Intelligence Audit via the website." },
  { keywords: ["how many", "businesses", "clients", "users", "4400"], q: "How many businesses use PresciaIQ?", a: "Over **4,400** Australian businesses are in the PresciaIQ intelligence network. Our tools have collectively identified and prevented over **$111M** in business risk and delivered an average **21% gross margin improvement**." },
  { keywords: ["offices", "miami", "international"], q: "Does PresciaIQ have offices outside Australia?", a: "Yes. In addition to our Sydney, NSW headquarters, we have a presence in **Miami, FL**, United States." },
  { keywords: ["strategy call", "intelligence audit", "consultation", "book a call", "free call"], q: "What is a Strategy Call?", a: "A free 15-minute Intelligence Audit where our team identifies the single biggest intelligence gap in your business and recommends the right product or service. You can [book directly on the website](/contact)." },

  // BuildPredictIQ
  { keywords: ["buildpredictiq", "construction", "building", "risk analysis", "builder", "construction intelligence"], q: "What is BuildPredictIQ?", a: "BuildPredictIQ is an AI risk engine for Australian construction. It transforms raw project data into a quantified, actionable risk matrix before a single sod is turned - protecting your margins and defending your certifications." },
  { keywords: ["buildpredictiq who", "builder", "developer", "quantity surveyor", "qs", "tier 1"], q: "Who is BuildPredictIQ for?", a: "BuildPredictIQ is built for builders protecting their P&L, Tier 1 developers managing portfolios, and Quantity Surveyors certifying progress drawdowns and initial bank reports." },
  { keywords: ["buildpredictiq price", "buildpredictiq cost", "report cost", "$2500", "construction pricing"], q: "How much does a BuildPredictIQ report cost?", a: "A single Pay-As-You-Go report costs **$2,500**. The Professional plan is **$4,999/year (ex GST)** (20 reports, API access, benchmarking). Enterprise plans with unlimited reporting are available on custom pricing." },
  { keywords: ["buildpredictiq roi", "return on investment", "150k", "50x"], q: "What is the ROI?", a: "Reports cost less than $3,000 and avert a minimum of **$150,000** in project risks - a **50x average ROI**." },
  { keywords: ["risk vectors", "geotechnical", "what risks", "analyse"], q: "What risks does BuildPredictIQ analyse?", a: "Five core vectors: **(1) Geotechnical** - subsurface, contamination, rock shelf; **(2) Financial** - trade inflation, subcontractor availability; **(3) Schedule** - weather, approvals, supply chain; **(4) Compliance** - DA conditions, BCA gaps; **(5) Commercial** - contracts, insurance, market conditions." },
  { keywords: ["project types", "residential", "commercial", "high-rise"], q: "What project types are supported?", a: "Currently Residential Dwellings and Commercial High-Rise. Enterprise clients can request custom risk vectors." },
  { keywords: ["bank report", "drawdown", "qs report", "lender"], q: "Can QS use it for bank reports?", a: "Yes. BuildPredictIQ provides independent, data-backed risk assessments that strengthen initial bank reports and progress drawdown certifications." },
  { keywords: ["sample report", "download report", "example report"], q: "Can I see a sample report?", a: "Yes. A sample report is available for download at [buildpredictiq.com.au](https://buildpredictiq.com.au)." },
  { keywords: ["enterprise plan", "unlimited reporting", "sso", "dedicated account"], q: "What is the Enterprise plan?", a: "Unlimited reporting, custom risk vectors, dedicated account manager, and SSO integration. Pricing is on an annual contract - [contact our team](/contact) to discuss." },

  // ADSIQ
  { keywords: ["adsiq", "marketing", "advertising", "ads", "roas", "campaign", "marketing intelligence"], q: "What is AdsIQ?", a: "AdsIQ is a marketing intelligence tool that delivers a precision **Campaign Readiness Score** and a full Strategy Report - before you spend a single dollar on advertising." },
  { keywords: ["platforms", "meta", "google ads", "tiktok", "linkedin", "facebook", "instagram", "channels"], q: "Which platforms does AdsIQ support?", a: "Meta (Facebook & Instagram), Google Ads, TikTok, LinkedIn, YouTube, and Snapchat. More integrations (Zapier, HubSpot, Shopify) are on the roadmap." },
  { keywords: ["how does adsiq", "predict", "campaign performance", "how accurate"], q: "How does AdsIQ predict performance?", a: "A three-layer intelligence engine: computer vision deconstructs your creative, NLP analyses ad copy, and algorithmic modelling simulates platform algorithm response - benchmarked against a proprietary campaign database. **94% accuracy rate**." },
  { keywords: ["readiness score", "campaign score", "score out of 100"], q: "What is a Campaign Readiness Score?", a: "A single score out of 100 synthesising creative quality, budget efficiency, audience alignment, and platform fit. It tells you your probability of campaign success before you commit budget." },
  { keywords: ["adsiq free", "free trial", "no credit card", "first score"], q: "Is AdsIQ free?", a: "Your first campaign score is **free** with no credit card required. Paid plans include Pay-As-You-Go, Professional (10 scores/month), and Agency (unlimited, white-label)." },
  { keywords: ["white-label", "agency plan", "client reports", "branded reports"], q: "Can I white-label reports?", a: "Yes. The Agency plan includes white-label Strategy Reports branded with your agency logo. Agencies typically charge $500–$1,000 per pre-launch audit, making it pay for itself on day one." },
  { keywords: ["intelligence archive", "history", "past campaigns"], q: "What is the Intelligence Archive?", a: "Every AdsIQ prediction is stored in your Intelligence Archive. Filter by channel, objective, or score; download any report; or re-run predictions with updated parameters." },

  // OPSIQ
  { keywords: ["opsiq", "operations", "sop", "standard operating", "playbook", "operations intelligence"], q: "What is OpsIQ?", a: "OpsIQ builds your entire business playbook - custom Standard Operating Procedures - in just **four weeks**. Not templates; fully tailored systems through face-to-face discovery." },
  { keywords: ["opsiq when", "opsiq launch", "opsiq available", "q3 2026"], q: "When will OpsIQ be available?", a: "OpsIQ is scheduled for release in **Q3 2026**. [Register your interest](/contact) to be notified at launch." },
  { keywords: ["sop", "standard operating procedures", "why sops"], q: "What are SOPs?", a: "Documented step-by-step processes that define how your business operates. They eliminate key-person dependency, reduce errors, accelerate onboarding, and are essential for consistent scaling." },

  // TRADESMANIQ
  { keywords: ["tradesmaniq", "trades", "tradesman", "tradies", "plumber", "electrician", "trades intelligence"], q: "What is TradesmanIQ?", a: "TradesmanIQ is the digital backbone for modern Australian trades businesses - a single intelligent platform covering everything from quoting to compliance." },
  { keywords: ["tradesmaniq when", "tradesmaniq launch", "tradesmaniq available"], q: "When will TradesmanIQ be available?", a: "TradesmanIQ is currently **in development**. [Register your interest](/contact) to be notified." },
  { keywords: ["tradesmaniq features", "job management", "compliance"], q: "What features will it include?", a: "Job Management, Compliance Tracking, and a Client Portal - with more features announced closer to launch. Built on the PresciaIQ AI backbone for predictive capabilities." },

  // DEVELOPMENT
  { keywords: ["web development", "website", "app development", "development services", "build a website"], q: "What development services does PresciaIQ offer?", a: "Enterprise-grade app store builds and high-converting websites for Australian businesses. From Starter Websites to complex AI-integrated app store builds." },
  { keywords: ["website cost", "development cost", "how much website", "pricing development", "$5k", "$15k"], q: "How much does a website cost?", a: "Starter websites from **$5,000** one-off. Scoped app store builds from **$15,000**. Enterprise and retainer arrangements on custom pricing." },
  { keywords: ["tech stack", "technology", "react", "next.js", "tailwind"], q: "What tech stack do you use?", a: "React, Next.js, Tailwind CSS, Framer Motion, Stripe, and custom APIs - modern stacks that are fast, scalable, and AI-ready." },
  { keywords: ["ai-ready", "ai infrastructure", "ai ready"], q: "What is AI-Ready Infrastructure?", a: "We build on a modern technical foundation that can seamlessly integrate with PresciaIQ's AI tools (or any ML system) when you're ready to scale your intelligence capabilities." },
  { keywords: ["ecommerce", "e-commerce", "online store", "stripe"], q: "Do you build e-commerce?", a: "Yes. We've built secure, high-performance e-commerce platforms with complex bundle logic, Stripe integration, and conversion-focused aesthetics." },
  { keywords: ["portfolio", "examples", "previous work", "longevity", "buildhire", "loop"], q: "Can I see examples?", a: "Yes - Longevity Australia (longevityaus.org), BuildHire (buildhire.com.au), and Loop Consulting Group (loopbc.com.au). Visit the [Development page](/development) for more." },

  // PRICING
  { keywords: ["pricing", "how much", "cost", "price", "plans"], q: "How does pricing work?", a: "Transparent, ecosystem-wide pricing. Start small with a single report or score and scale. Full details at [presciaiq.com.au/pricing](/pricing)." },
  { keywords: ["free trial", "trial", "try"], q: "Do you offer free trials?", a: "AdsIQ offers a **free first campaign score** (no credit card). BuildPredictIQ offers a downloadable sample report. Contact us for trial access to other products." },
  { keywords: ["contract", "commitment", "minimum"], q: "Is there a contract?", a: "Pay-As-You-Go options require no commitment. Annual and enterprise plans involve a contract - [speak to our team](/contact)." },
  { keywords: ["custom quote", "tailored", "enterprise pricing"], q: "Can I get a custom quote?", a: "Yes. For Enterprise, Development, or Agency arrangements, email **sales@presciaiq.com.au** or [book a Strategy Call](/contact)." },

  // SECURITY
  { keywords: ["data secure", "security", "safe", "privacy"], q: "Is my data secure?", a: "Yes. Data security is a core principle. All data is handled with strict confidentiality and stored securely." },
  { keywords: ["privacy act", "compliance", "australian privacy"], q: "Australian Privacy Act compliance?", a: "Yes. PresciaIQ operates in compliance with the Australian Privacy Act. Full details in our Privacy Policy." },
  { keywords: ["third parties", "share data", "sell data"], q: "Do you share data with third parties?", a: "No. We do not sell or share your data with third parties." },
];

const quickReplies = [
  { label: "Show me the products", message: "Show me all products" },
  { label: "Construction risk analysis", message: "I need construction risk analysis" },
  { label: "Book a strategy call", message: "Book a strategy call" },
];

function matchFAQ(input: string): string {
  const lower = input.toLowerCase().trim();
  let bestMatch: typeof faqBank[0] | null = null;
  let bestScore = 0;

  for (const faq of faqBank) {
    for (const kw of faq.keywords) {
      if (lower.includes(kw)) {
        const score = kw.length;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = faq;
        }
      }
    }
  }

  if (bestMatch) return bestMatch.a;

  // Fallback: show all products
  if (lower.includes("product") || lower.includes("show") || lower.includes("all")) {
    return "Here's the PresciaIQ ecosystem:\n\n• **BuildPredictIQ** - Construction risk intelligence → [buildpredictiq.com.au](https://buildpredictiq.com.au)\n• **AdsIQ** - Marketing intelligence → [adsiq.com.au](https://adsiq.com.au)\n• **OpsIQ** - Operations intelligence (Coming Q3 2026)\n• **TradesmanIQ** - Trades intelligence (In Development)\n• **Web & App Development** - From $5K → [Learn more](/development)\n\nWhat would you like to know more about?";
  }

  return "I'm not sure I have the answer to that specific question, but I'd love to help. You can:\n\n• Ask about any of our products (BuildPredictIQ, AdsIQ, OpsIQ, TradesmanIQ)\n• Ask about pricing, development services, or our company\n• [Book a free Strategy Call](/contact) to speak with our team directly\n\nWhat else can I help with?";
}

type Message = { role: "assistant" | "user"; content: string };

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there. I'm the PresciaIQ Intelligence Assistant. I can help you find the right product, answer pricing questions, or connect you with our team. What are you looking for today?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      const userMsg: Message = { role: "user", content: text.trim() };
      const answer = matchFAQ(text);
      setMessages((prev) => [...prev, userMsg, { role: "assistant", content: answer }]);
      setInput("");
    },
    []
  );

  return (
    <>
      {/* Trigger button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-sans font-semibold text-sm shadow-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] transition-shadow duration-300"
            aria-label="Ask PresciaIQ"
          >
            <MessageCircle className="w-5 h-5" />
            Ask PresciaIQ
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[360px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              height: "min(480px, calc(100vh - 6rem))",
              background: "rgba(10,10,14,0.97)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(40px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,255,136,0.1)" }}>
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground font-sans leading-tight">PresciaIQ Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] text-primary font-sans">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                style={{ background: "rgba(255,255,255,0.04)" }}
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-sans leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "rounded-bl-md text-foreground"
                    }`}
                    style={
                      msg.role === "assistant"
                        ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }
                        : undefined
                    }
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_p]:mb-1 [&_ul]:mb-1 [&_li]:mb-0.5 [&_a]:text-primary [&_a]:no-underline [&_a:hover]:underline [&_strong]:text-foreground">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {/* Quick replies after first message only */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr.label}
                      onClick={() => send(qr.message)}
                      className="px-3 py-1.5 text-xs font-sans font-medium rounded-full text-primary transition-all duration-200 hover:bg-primary/10"
                      style={{ border: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.04)" }}
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-3 py-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about our products..."
                  className="flex-1 bg-transparent text-sm text-foreground font-sans placeholder:text-muted-foreground outline-none px-3 py-2 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  aria-label="Chat message input"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 transition-opacity"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;

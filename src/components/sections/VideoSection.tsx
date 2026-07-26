import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

// ─── VSL VIDEO ID ────────────────────────────────────────────────────────────
// Replace the empty string below with your YouTube video ID when ready.
// e.g. if your video URL is https://www.youtube.com/watch?v=dQw4w9WgXcQ
// then set: const VSL_YOUTUBE_ID = "dQw4w9WgXcQ";
const VSL_YOUTUBE_ID = ""; // <-- DROP YOUR YOUTUBE VIDEO ID HERE
// ─────────────────────────────────────────────────────────────────────────────

const VideoSection = () => {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <SectionWrapper className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            <span style={{whiteSpace:"nowrap"}}>See Prescia<span className="text-primary neon-glow">IQ</span> in 3 Minutes.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-sans">
            Watch how four AI tools work together to eliminate guesswork from your business.
          </p>
        </div>
        <div className="max-w-[900px] mx-auto">
          {VSL_YOUTUBE_ID ? (
            <div
              className="relative w-full rounded-xl overflow-hidden cursor-pointer group"
              style={{
                aspectRatio: "16/9",
                border: "1px solid rgba(0,255,136,0.15)",
                boxShadow: "0 0 40px -15px rgba(0,255,136,0.1)",
                background: "linear-gradient(135deg, rgba(10,10,15,1) 0%, rgba(15,20,18,1) 50%, rgba(10,10,15,1) 100%)",
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => setPlaying(true)}
            >
              {playing ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${VSL_YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="PresciaIQ — See It In 3 Minutes"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,255,136,0.03) 0%, transparent 70%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <motion.div
                      animate={{ scale: hovered ? 1.12 : 1, boxShadow: hovered ? "0 0 50px rgba(0,255,136,0.5), 0 0 100px rgba(0,255,136,0.2)" : "0 0 30px rgba(0,255,136,0.3), 0 0 60px rgba(0,255,136,0.1)" }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-20 h-20 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </motion.div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="relative w-full rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,255,136,0.1)] border border-white/10 bg-black/40 p-8 md:p-12 text-left">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Stop Reacting. Start Predicting.</h3>
                <div className="space-y-4 text-muted-foreground font-sans leading-relaxed text-lg">
                  <p>Every month, Australian businesses burn millions of dollars on a hidden expense we call the <strong className="text-foreground">Reaction Tax</strong>.</p>
                  <p>It is the cost of learning things after they happen — the ad budget spent on a failing campaign, the margin lost to a supplier delay you didn't see coming, the warehouse that ran dry during a demand spike.</p>
                  <p>PresciaIQ was built to eliminate this tax. Our four intelligence platforms use your historical data to forecast risk, cost, and profitability before you make a decision.</p>
                  <p className="pt-4"><a href="/start" className="text-primary font-bold hover:underline">Calculate your Reaction Tax →</a></p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};
export default VideoSection;

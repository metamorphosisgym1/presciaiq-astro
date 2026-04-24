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
            onClick={() => VSL_YOUTUBE_ID && setPlaying(true)}
          >
            {playing && VSL_YOUTUBE_ID ? (
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
                {/* Subtle aurora overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(0,255,136,0.03) 0%, transparent 70%)",
                  }}
                />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.div
                    animate={{
                      scale: hovered ? 1.12 : 1,
                      boxShadow: hovered
                        ? "0 0 50px rgba(0,255,136,0.5), 0 0 100px rgba(0,255,136,0.2)"
                        : "0 0 30px rgba(0,255,136,0.3), 0 0 60px rgba(0,255,136,0.1)",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-20 h-20 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                  </motion.div>
                </div>
                {!VSL_YOUTUBE_ID && (
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <span className="text-xs text-muted-foreground font-mono opacity-50">Video coming soon</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default VideoSection;

import { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
const heroBg = "/hero-bg.jpg";
const logo = "/logo.png";

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; baseX: number; baseY: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push({
        x, y, baseX: x, baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p, i) => {
        // Mouse repulsion
        const dmx = p.x - mx;
        const dmy = p.y - my;
        const distMouse = Math.sqrt(dmx * dmx + dmy * dmy);
        if (distMouse < 200) {
          const force = (200 - distMouse) / 200;
          p.x += (dmx / distMouse) * force * 2;
          p.y += (dmy / distMouse) * force * 2;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 136, 0.5)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.08 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-0 animate-fade-in" />;
};

/* Magnetic button that subtly follows cursor */
const MagneticButton = ({ children, href, className }: { children: React.ReactNode; href: string; className: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({ x: (e.clientX - cx) * 0.15, y: (e.clientY - cy) * 0.15 });
  }, []);

  const onLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const clients = [
  { name: "Modern Body Method", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/FSMtjROAgpCQtXgQ.jpg", height: 44 },
  { name: "Longevity Australia", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/cuvgTHdxFETpXNfw.png", height: 36 },
  { name: "MAC Developments", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/toLVqRnPHQXIWwAV.png", height: 40 },
  { name: "BuildHire", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/HTjarNxJwVKsAfMq.png", height: 40 },
  { name: "A-One Fencing & Gates", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/PToThjafjtTfyGoL.png", height: 52 },
  { name: "Loop", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/XEUSiOzDKmFWUMPm.png", height: 48 },
  { name: "Vale Tudo Training", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/NdZCoYDQkzDZlkOy.png", height: 44 },
  { name: "The Silk Studio", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/bgfDWeFezGaiFuju.png", height: 36 },
  { name: "Hypertint", src: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/tEEuKKGILsXRTMjr.png", height: 32 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,8,0.5) 0%, rgba(5,5,8,0.85) 60%, rgba(5,5,8,1) 100%)' }} />
      </div>
      <ParticleCanvas />
      <div className="grid-overlay absolute inset-0 z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-6 text-gradient-primary inline-block"
            >
              Australia's Predictive AI Company
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-foreground leading-[0.95] mb-6"
            >
              Eliminate the{" "}
              <em className="text-primary italic font-display neon-glow">Reaction</em> Tax.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed mb-10 font-sans"
            >
              Stop paying the hidden cost of learning things after they happen. We build AI forecasting platforms that give Australian operators predictive intelligence before decisions need to be made.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton
                href="/start"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all duration-500 font-sans"
              >
                Calculate Your AI ROI
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-foreground font-semibold transition-all duration-500 font-sans rounded-xl"
                style={{
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.06)',
                }}
              >
                Explore Our Products
              </a>
            </motion.div>
          </div>

          {/* Right side: Orbital viz */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="lg:col-span-2 hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center animate-float" style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.2)' }}>
                   <img src={logo} alt="PresciaIQ" className="w-20 h-auto object-contain" />
                 </div>
              </div>
              {[
                { label: "Build", angle: 0 },
                { label: "Ads", angle: 90 },
                { label: "Ops", angle: 180 },
                { label: "Trades", angle: 270 },
              ].map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const x = Math.cos(rad) * 120 + 140;
                const y = Math.sin(rad) * 120 + 140;
                return (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.15, type: "spring" }}
                    className="absolute"
                    style={{ left: x - 24, top: y - 24 }}
                  >
                    <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center">
                      <span className="text-[10px] font-mono text-primary">{node.label}</span>
                    </div>
                  </motion.div>
                );
              })}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                {[0, 90, 180, 270].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 120 + 160;
                  const y = Math.sin(rad) * 120 + 160;
                  return (
                    <line key={angle} x1="160" y1="160" x2={x} y2={y} stroke="rgba(0,255,136,0.1)" strokeWidth="1" />
                  );
                })}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Client logo carousel */}
      <div className="relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(20px)' }}>
        <div className="py-2 text-center">
          <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.25em]">Trusted by Australian businesses</span>
        </div>
        <div className="overflow-hidden pb-6">
          <div className="flex animate-scroll-left" style={{ width: 'max-content' }}>
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div key={i} className="flex items-center justify-center px-12 flex-shrink-0">
                <img
                  src={client.src}
                  alt={client.name}
                  style={{ height: client.height, width: 'auto', maxWidth: 150, objectFit: 'contain' }}
                  className="opacity-85 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

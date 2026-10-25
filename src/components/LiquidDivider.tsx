import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHITE = "#FFFFFF";
const INK = "10, 15, 13"; // #0A0F0D

// Dark stalactites hanging from the section above into the rising white.
type Drip = { x: number; w: number; len: number; phase: number; lag: number; current: number };
type Lobe = { freq: number; phase: number; speed: number; weight: number };

// Deterministic so the silhouette is stable across resizes and reloads.
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Uneven drips: mostly short and medium, a few long tears, jittered off any grid.
const makeDrips = (width: number): Drip[] => {
  const rand = mulberry32(7);
  const count = Math.max(12, Math.min(30, Math.round(width / 52)));
  return Array.from({ length: count }, (_, i) => {
    const tier = rand();
    const len = tier < 0.22 ? 0.6 + rand() * 0.4 : tier < 0.65 ? 0.24 + rand() * 0.3 : 0.06 + rand() * 0.14;
    return {
      x: (i + 0.15 + rand() * 0.7) / count,
      w: (len > 0.55 ? 7 : 4) + rand() * 7,
      len,
      phase: rand() * Math.PI * 2,
      lag: rand() * 0.4,
      current: 0,
    };
  });
};

// Rounded white lobes meeting in sharp dark cusps: |sin| peaks round, zeros pinch.
const LOBES: Lobe[] = [
  { freq: 9.3, phase: 0.4, speed: 0.22, weight: 0.5 },
  { freq: 15.7, phase: 2.1, speed: -0.17, weight: 0.32 },
  { freq: 27.1, phase: 4.3, speed: 0.3, weight: 0.18 },
];

type Dust = { u: number; depth: number; speed: number; drift: number; size: number; phase: number };
type Blob = { u: number; lift: number; r: number; phase: number; life: number };
type Tear = { x: number; y: number; vy: number; r: number };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (a: number, b: number, v: number) => {
  const k = clamp01((v - a) / (b - a));
  return k * k * (3 - 2 * k);
};

type LiquidDividerProps = {
  className?: string;
  variant?: "dark-to-light" | "light-to-dark";
};

export default function LiquidDivider({
  className = "",
  variant = "dark-to-light",
}: LiquidDividerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0;
    let H = 0;
    let progress = 0;
    // Eased copy of progress: the liquid glides to the scroll position instead of stepping.
    let shown = 0;
    let drips: Drip[] = [];
    let velocity = 0;
    let velocityTarget = 0;
    let time = 0;
    let last = performance.now();
    let frame = 0;
    let visible = false;
    let tearClock = 0;
    const tears: Tear[] = [];
    canvas.style.transformOrigin = variant === "light-to-dark" ? "center top" : "center bottom";
    canvas.style.willChange = "transform";
    canvas.style.backfaceVisibility = "hidden";
    canvas.style.transform = "translate3d(0, 0, 0) scaleY(1)";

    const small = window.innerWidth < 640;
    const dust: Dust[] = Array.from({ length: small ? 46 : 90 }, () => ({
      u: Math.random(),
      depth: Math.random(),
      speed: 0.05 + Math.random() * 0.12,
      drift: (Math.random() - 0.5) * 0.012,
      size: 0.6 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
    }));
    const blobs: Blob[] = Array.from({ length: small ? 9 : 16 }, () => ({
      u: Math.random(),
      lift: 0,
      r: 2 + Math.random() * 6,
      phase: Math.random() * Math.PI * 2,
      life: Math.random(),
    }));

    const voidCount = small ? 6 : 11;
    const voids = Array.from({ length: voidCount }, (_, i) => ({
      u: (i + 0.2 + Math.random() * 0.6) / voidCount,
      from: 0.05 + Math.random() * 0.5,
      depth: Math.random(),
      r: 3 + Math.random() * (small ? 6 : 10),
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drips = makeDrips(W);
      if (!frame) draw();
    };

    const syncScrollProgress = (nextProgress: number, nextVelocity: number) => {
      progress = clamp01(nextProgress);
      velocityTarget = nextVelocity;
      const easedProgress = 1 - (1 - progress) ** 2;
      const scale = reduced ? 1 : 0.85 + easedProgress * 0.15;
      canvas.style.transform = `translate3d(0, 0, 0) scaleY(${scale})`;
      if (!frame && visible) {
        shown = progress;
        draw();
      }
    };

    const geometry = () => {
      const rise = smoothstep(0, 1, shown);
      return {
        rise,
        // Mean surface climbs from near the bottom to the upper third.
        base: H * (0.8 - 0.5 * rise),
        // Deep swells that grow as the liquid rises and morph with scroll.
        wave: H * (0.07 + 0.07 * Math.sin(Math.PI * Math.min(1, rise * 1.4))),
        swell: Math.min(H * 0.03, 3 + 8 * rise),
        lobe: H * (0.03 + 0.04 * rise),
        dripMax: H * (0.1 + 0.36 * smoothstep(0.05, 0.85, shown)),
      };
    };
    type Geometry = ReturnType<typeof geometry>;

    // Drip lengths change once per frame, not once per sampled point.
    const updateDrips = (g: Geometry) => {
      for (const drip of drips) {
        const grow = smoothstep(drip.lag, 1, shown) * 0.8 + 0.2;
        const pulse = 0.82 + 0.18 * Math.sin(time * (0.6 + drip.lag) + drip.phase);
        drip.current = g.dripMax * drip.len * grow * pulse;
      }
    };

    // Rounded limits: the edge eases into its bounds instead of flattening against them.
    const softplus = (v: number, k: number) => (v > k * 20 ? v : k * Math.log1p(Math.exp(v / k)));

    const surfaceY = (x: number, g: Geometry) => {
      const nx = x / W;
      const tau = Math.PI * 2;
      const p = shown;
      // The front rises unevenly: some stretches lead, others lag behind.
      const lead =
        0.5 * Math.sin(nx * tau * 0.9 + 0.7) + 0.3 * Math.sin(nx * tau * 2.3 + 2.4) + 0.2 * Math.sin(nx * tau * 4.7 + 5.1);
      let y = g.base + lead * H * 0.08 * (1 - g.rise * 0.5);
      // Large swells travel in opposite directions as you scroll, so the
      // boundary swirls and re-forms rather than sliding up as one piece.
      y +=
        g.wave *
        (0.55 * Math.sin(nx * tau * 0.75 + p * 5.5 + time * 0.22) +
          0.45 * Math.sin(nx * tau * 1.65 - p * 7 + 1.9 - time * 0.16));
      y -= g.swell * (0.6 * Math.sin(nx * tau * 1.2 + time * 0.45) + 0.4 * Math.sin(nx * tau * 3.4 - time * 0.6 + 1.1));
      let lobes = 0;
      for (const lobe of LOBES)
        lobes += lobe.weight * Math.abs(Math.sin(nx * Math.PI * lobe.freq + lobe.phase + time * lobe.speed + p * lobe.freq * 0.4));
      y -= g.lobe * lobes;
      for (const drip of drips) {
        const d = Math.abs(x - drip.x * W) / drip.w;
        if (d > 12) continue;
        // Narrow stem plus a shallow shoulder where the liquid gathers before it falls.
        y += drip.current * (Math.exp(-d * d * 0.9) + 0.12 * Math.exp(-d * d * 0.04));
      }
      // Never reach the top or bottom edge: both seams must stay organic.
      const top = H * 0.05;
      const bottom = H - 6;
      y = top + softplus(y - top, 10);
      return bottom - softplus(bottom - y, 10);
    };

    const draw = () => {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      if (variant === "light-to-dark") {
        ctx.translate(0, H);
        ctx.scale(1, -1);
      }
      const g = geometry();
      updateDrips(g);
      const step = small ? 4 : 5;

      const points: { x: number; y: number }[] = [];
      const body = new Path2D();
      for (let x = 0; x <= W + step; x += step) {
        const y = surfaceY(x, g);
        points.push({ x, y });
      }
      body.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const previous = points[i - 1];
        const current = points[i];
        body.quadraticCurveTo(
          previous.x,
          previous.y,
          (previous.x + current.x) / 2,
          (previous.y + current.y) / 2,
        );
      }
      const lastPoint = points[points.length - 1];
      body.quadraticCurveTo(lastPoint.x, lastPoint.y, lastPoint.x, lastPoint.y);
      body.lineTo(W + step, H + 2);
      body.lineTo(0, H + 2);
      body.closePath();
      const surfaceAt = (x: number) => points[Math.max(0, Math.min(points.length - 1, Math.round(x / step)))].y;

      ctx.fillStyle = WHITE;
      ctx.fill(body);

      // White droplets beading just ahead of the surface.
      for (const blob of blobs) {
        const x = blob.u * W + Math.sin(time * 0.6 + blob.phase) * 8;
        const y = surfaceAt(x) - blob.lift;
        const r = blob.r * (0.6 + 0.4 * Math.sin(Math.PI * blob.life));
        ctx.beginPath();
        ctx.ellipse(x, y, r, r * 1.12, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bulbous drip tips and detached tears, punched back through to the dark.
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      for (const drip of drips) {
        const x = drip.x * W;
        const tip = surfaceY(x, g);
        const r = drip.w * 0.95 * Math.min(1, drip.current / (drip.w * 3));
        if (r < 1.5 || tip > H - r * 2) continue;
        ctx.beginPath();
        ctx.ellipse(x, tip - r * 0.85, r, r * 1.08, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      // Voids trapped under the surface: each opens and closes over its own
      // stretch of the scroll, like air torn into the liquid.
      for (const v of voids) {
        const k = clamp01((shown - v.from) / 0.38);
        const open = Math.sin(Math.PI * k);
        if (open < 0.05) continue;
        const x = v.u * W + Math.sin(time * 0.4 + v.phase) * 6;
        const y = surfaceAt(x) + v.depth * H * 0.12 + 10;
        const r = v.r * open;
        if (y + r * 1.6 > H - 8) continue;
        ctx.beginPath();
        ctx.ellipse(x, y, r, r * 1.6, Math.sin(time * 0.3 + v.phase) * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const tear of tears) {
        // Shrink away before the bottom edge so no tear is cut off at the seam.
        const r = tear.r * clamp01((H - 6 - tear.y) / (H * 0.3));
        if (r < 0.5) continue;
        ctx.beginPath();
        ctx.ellipse(tear.x, tear.y, r * 0.8, r * 1.15, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Dark dust dispersing from the edge into the white.
      const presence = 0.4 + 0.6 * smoothstep(0, 0.3, shown);
      for (const mote of dust) {
        const x = mote.u * W + Math.sin(time * 0.5 + mote.phase) * 10;
        const sy = surfaceAt(x);
        const room = H - sy;
        if (room < 8) continue;
        const y = sy + 6 + mote.depth * room * 0.9;
        const fade = (1 - mote.depth) * Math.min(1, mote.depth * 6);
        const twinkle = 0.7 + 0.3 * Math.sin(time * 1.8 + mote.phase * 3);
        ctx.fillStyle = `rgba(${INK}, ${0.55 * fade * twinkle * presence})`;
        ctx.beginPath();
        ctx.arc(x, y, mote.size * (1 - mote.depth * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;

      velocityTarget *= 0.9;
      velocity += (velocityTarget - velocity) * 0.08;
      const stir = 1 + Math.min(2.5, Math.abs(velocity) / 700);

      for (const mote of dust) {
        mote.depth += mote.speed * stir * dt * 0.35;
        mote.u = (((mote.u + mote.drift * dt) % 1) + 1) % 1;
        if (mote.depth >= 1) {
          mote.depth = 0;
          mote.u = Math.random();
        }
      }
      for (const blob of blobs) {
        blob.life += dt * 0.18 * stir;
        if (blob.life >= 1) {
          blob.life = 0;
          blob.u = Math.random();
          blob.r = 2 + Math.random() * 6;
        }
        // Spray up off the surface, then fall back and merge.
        blob.lift = Math.sin(Math.PI * blob.life) * (10 + blob.r * 3);
      }

      shown += (progress - shown) * (1 - Math.exp(-dt * 9));
      const g = geometry();
      tearClock += dt * stir;
      const long = drips.filter((drip) => drip.len > 0.5);
      if (shown > 0.15 && tearClock > 0.9 && tears.length < 10 && long.length) {
        tearClock = 0;
        const drip = long[Math.floor(Math.random() * long.length)];
        const x = drip.x * W;
        tears.push({ x, y: surfaceY(x, g) + 6, vy: 12, r: 1.5 + drip.w * 0.45 });
      }
      for (let i = tears.length - 1; i >= 0; i--) {
        const tear = tears[i];
        tear.vy += 120 * dt;
        tear.y += tear.vy * dt;
        tear.r *= 1 - 0.12 * dt;
        if (tear.y > H - 6 || tear.r < 0.6) tears.splice(i, 1);
      }

      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reduced || frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top bottom",
      end: "bottom 30%",
      onUpdate: (self) => syncScrollProgress(self.progress, self.getVelocity()),
      onRefresh: (self) => syncScrollProgress(self.progress, self.getVelocity()),
    });
    syncScrollProgress(scrollTrigger.progress, scrollTrigger.getVelocity());
    shown = progress;
    draw();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) {
        if (reduced) {
          shown = progress;
          draw();
        } else {
          start();
        }
      } else {
        stop();
      }
    });
    observer.observe(wrap);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    return () => {
      stop();
      scrollTrigger.kill();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [variant]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`relative w-full ${variant === "light-to-dark" ? "bg-black" : "bg-ink-950"} ${className}`}
      style={{ willChange: "transform", transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block h-full w-full"
        style={{ willChange: "transform", transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
      />
    </div>
  );
}

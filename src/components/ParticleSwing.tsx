import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INK = "10, 15, 13"; // #0A0F0D
const TAU = Math.PI * 2;
const DURATION = 4.5; // seconds for the whole stream to pass
const LENGTH = 0.7; // body length as a fraction of the path

type Mote = {
  // 0 = head, 1 = tail.
  rank: number;
  // Cross-body offset (-1..1).
  across: number;
  size: number;
  alpha: number;
  phase: number;
  drift: number;
  // Direction it flies off in as the stream disperses at the exit.
  scatterX: number;
  scatterY: number;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// Flight path in viewport fractions: enter from the left, complete a broad
// orbit around the centre, then curve away through the right.
const PATH: [number, number][] = [
  [-0.2, 0.68],
  [0.0, 0.64],
  [0.2, 0.54],
  [0.32, 0.48],
  [0.36, 0.32],
  [0.52, 0.25],
  [0.69, 0.32],
  [0.76, 0.49],
  [0.69, 0.67],
  [0.52, 0.74],
  [0.36, 0.66],
  [0.3, 0.49],
  [0.43, 0.39],
  [0.62, 0.42],
  [0.8, 0.5],
  [1.0, 0.48],
  [1.2, 0.4],
];

// Uniform Catmull-Rom through PATH, in pixels.
const spline = (t: number, W: number, H: number) => {
  const segments = PATH.length - 1;
  const f = clamp01(t) * segments;
  const i = Math.min(segments - 1, Math.floor(f));
  const u = f - i;
  const p0 = PATH[Math.max(0, i - 1)];
  const p1 = PATH[i];
  const p2 = PATH[i + 1];
  const p3 = PATH[Math.min(PATH.length - 1, i + 2)];
  const cr = (a: number, b: number, c: number, d: number) =>
    0.5 * (2 * b + (-a + c) * u + (2 * a - 5 * b + 4 * c - d) * u * u + (-a + 3 * b - 3 * c + d) * u * u * u);
  return { x: cr(p0[0], p1[0], p2[0], p3[0]) * W, y: cr(p0[1], p1[1], p2[1], p3[1]) * H };
};

/**
 * One-shot swarm of dark particles that enters from the left, orbits around the
 * centre as the trigger section settles into view, and disperses off to the
 * right. It plays once per visit and
 * re-arms only after the visitor scrolls back up into the hero.
 *
 * Render it absolutely over the region it should play in: the canvas is sticky
 * and viewport-sized, so the stream always crosses what is actually on screen.
 */
export default function ParticleSwing({ trigger: triggerId, className = "" }: { trigger: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const section = document.getElementById(triggerId);
    if (!canvas || !ctx || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let W = 0;
    let H = 0;
    let frame = 0;
    let started = 0;
    let armed = true;
    // Arc-length lookup so particles are spaced evenly along the path,
    // whatever the segment lengths.
    let lut: number[] = [];

    const count = window.innerWidth < 640 ? 360 : 440;
    const motes: Mote[] = Array.from({ length: count }, (_, i) => {
      return {
        rank: i / (count - 1),
        across: (Math.random() + Math.random() - 1) * 1.9,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.55 + Math.random() * 0.45,
        phase: Math.random() * TAU,
        drift: Math.random(),
        scatterX: 0.5 + Math.random() * 1.2,
        scatterY: (Math.random() - 0.5) * 2.2,
      };
    });

    const buildLut = () => {
      const samples = 240;
      lut = [0];
      let prev = spline(0, W, H);
      for (let i = 1; i <= samples; i++) {
        const next = spline(i / samples, W, H);
        lut.push(lut[i - 1] + Math.hypot(next.x - prev.x, next.y - prev.y));
        prev = next;
      }
    };

    // Distance fraction (0..1) along the path -> spline parameter.
    const atDistance = (s: number) => {
      const target = clamp01(s) * lut[lut.length - 1];
      let lo = 0;
      let hi = lut.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (lut[mid] < target) lo = mid;
        else hi = mid;
      }
      const span = lut[hi] - lut[lo] || 1;
      return (lo + (target - lut[lo]) / span) / (lut.length - 1);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildLut();
    };

    const draw = (elapsed: number) => {
      ctx.clearRect(0, 0, W, H);
      // The head runs on until the tail has also left the path.
      // Decelerate gently through the end of the orbit and departure.
      const k = elapsed / DURATION;
      const eased = 1 - Math.pow(1 - k, 2);
      const head = 0.04 + eased * (1 + LENGTH);
      const thickness = Math.min(H * 0.08, 56);
      ctx.fillStyle = `rgb(${INK})`;
      for (const mote of motes) {
        const s = head - mote.rank * LENGTH;
        if (s <= 0 || s >= 1) continue;
        const t = atDistance(s);
        const here = spline(t, W, H);
        const ahead = spline(Math.min(1, t + 0.004), W, H);
        let dx = ahead.x - here.x;
        let dy = ahead.y - here.y;
        const len = Math.hypot(dx, dy) || 1;
        dx /= len;
        dy /= len;
        // Tapered body: fine at the head, fullest a third of the way back,
        // fraying and loosening toward the tail.
        const taper = Math.sin(Math.PI * Math.min(1, mote.rank * 1.15 + 0.05)) ** 0.7;
        const fray = 1 + mote.rank * mote.rank * 1.6;
        // A travelling wave down the body keeps it slithering, not rigid.
        const undulate = Math.sin(elapsed * 2.2 - mote.rank * 9 + mote.phase * 0.3) * thickness * 0.35;
        const c = mote.across * thickness * taper * fray + undulate;
        const wander = Math.sin(elapsed * 1.6 + mote.phase) * 5 * fray;
        // Over the last stretch of path the stream breaks up and flies apart.
        const disperse = clamp01((s - 0.72) / 0.28);
        const fling = disperse * disperse * Math.min(W, H) * 0.42;
        const x = here.x - dy * c + dx * wander + mote.scatterX * fling;
        // Tail motes settle slightly, like dust losing lift.
        const y = here.y + dx * c + dy * wander + mote.drift * mote.rank * elapsed * 6 + mote.scatterY * fling;
        const fade = (1 - mote.rank * 0.55) * clamp01(s / 0.04) * (1 - disperse * 0.85);
        ctx.globalAlpha = mote.alpha * fade;
        ctx.beginPath();
        ctx.arc(x, y, mote.size, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const elapsed = (now - started) / 1000;
      if (elapsed >= DURATION) {
        ctx.clearRect(0, 0, W, H);
        frame = 0;
        return;
      }
      draw(elapsed);
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (!armed || frame) return;
      armed = false;
      started = performance.now();
      frame = requestAnimationFrame(tick);
    };

    // Fires once on the way down, as the section's top nears the top of the
    // screen and its intro headline settles into the middle.
    const fire = ScrollTrigger.create({ trigger: section, start: "top 60%", onEnter: play });
    // Re-arm only once the visitor is properly back up in the hero (its top
    // half on screen), not when a sliver of it peeks in on a small scroll back.
    const hero = document.getElementById("hero");
    const rearm = hero
      ? ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "center top",
          onEnterBack: () => {
            armed = true;
          },
        })
      : null;

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      fire.kill();
      rearm?.kill();
      resizeObserver.disconnect();
    };
  }, [triggerId]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="sticky top-0 block h-screen w-full will-change-transform [transform:translate3d(0,0,0)]"
      />
    </div>
  );
}

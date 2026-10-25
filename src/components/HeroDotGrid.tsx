import { useEffect, useRef } from "react";

/**
 * The hero's 24px background dot grid, drawn on a canvas so a press can send
 * a water ripple through it. Matches the HELM OS / automation panel dot grid
 * (1.25px white dots at 32% opacity, centred in each 24px tile) so the
 * texture is continuous down the page, and only animates while a ripple is
 * live.
 *
 * Each ripple is a travelling sine, sin(dist * k - time * omega), behind a
 * fast leading front, damped by exp(-time * decay) and by distance behind the
 * front. Dots move radially along it and light up on the crests.
 */

const CELL = 24;
const DOT_RADIUS = 1.25;
const BASE_ALPHA = 0.32;

const WAVE_SPEED = 520; // px/s, front and phase speed
const WAVELENGTH = 72; // px between crests
const WAVE_K = (Math.PI * 2) / WAVELENGTH;
const WAVE_OMEGA = WAVE_K * WAVE_SPEED;
const WAVE_DECAY = 1.5; // 1/s, exp(-time * decay)
const WAVE_TRAIL = 150; // px, how far the rings persist behind the front
const WAVE_FALLOFF = 520; // px, amplitude halves at this distance from the press
const WAVE_PUSH = 6; // px, peak radial displacement
const RIPPLE_LIFE = 2.6; // s; exp(-1.5 * 2.6) ~ 0.02
const MAX_RIPPLES = 8;

type Ripple = { x: number; y: number; startedAt: number };

export default function HeroDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const host = canvas?.parentElement;
    if (!canvas || !context || !host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ripples: Ripple[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let inView = true;

    const drawStatic = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = `rgba(255, 255, 255, ${BASE_ALPHA})`;
      context.beginPath();
      for (let y = CELL / 2; y < height + CELL; y += CELL) {
        for (let x = CELL / 2; x < width + CELL; x += CELL) {
          context.moveTo(x + DOT_RADIUS, y);
          context.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
        }
      }
      context.fill();
    };

    const render = (now: number) => {
      frame = 0;
      while (ripples.length && (now - ripples[0].startedAt) / 1000 > RIPPLE_LIFE) ripples.shift();
      if (!ripples.length) {
        drawStatic();
        return;
      }
      // Pressing a hero CTA and scrolling away used to leave this loop
      // redrawing a full-viewport grid for the ripple's remaining 2.6s, right
      // through the scroll it triggered. Drop the ripples and go static.
      if (!inView || document.hidden) {
        ripples.length = 0;
        drawStatic();
        return;
      }

      context.clearRect(0, 0, width, height);
      const resting = new Path2D();
      for (let y = CELL / 2; y < height + CELL; y += CELL) {
        for (let x = CELL / 2; x < width + CELL; x += CELL) {
          let energy = 0;
          let offsetX = 0;
          let offsetY = 0;
          for (const ripple of ripples) {
            const age = (now - ripple.startedAt) / 1000;
            const dx = x - ripple.x;
            const dy = y - ripple.y;
            const distance = Math.hypot(dx, dy) || 1;
            const front = age * WAVE_SPEED;
            if (distance > front + 16) continue; // the front hasn't arrived yet
            const behind = front - distance;
            const envelope =
              Math.exp(-age * WAVE_DECAY) *
              Math.exp(-behind / WAVE_TRAIL) *
              Math.min(1, (front + 16 - distance) / 16) /
              (1 + distance / WAVE_FALLOFF);
            const wave = Math.sin(distance * WAVE_K - age * WAVE_OMEGA + Math.PI / 2);
            const packet = Math.abs(wave) * envelope;
            if (packet < 0.01) continue;
            // Radial sway: out on crests, back on troughs; light peaks on crests.
            offsetX += (dx / distance) * wave * envelope * WAVE_PUSH;
            offsetY += (dy / distance) * wave * envelope * WAVE_PUSH;
            energy = Math.max(energy, Math.max(0, wave) * envelope);
          }
          if (energy < 0.01 && Math.abs(offsetX) + Math.abs(offsetY) < 0.05) {
            resting.moveTo(x + DOT_RADIUS, y);
            resting.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
            continue;
          }
          const level = Math.min(1, energy);
          context.fillStyle = `rgba(255, 255, 255, ${BASE_ALPHA + level * 0.75})`;
          context.beginPath();
          context.arc(x + offsetX, y + offsetY, DOT_RADIUS + level * 1.1, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.fillStyle = `rgba(255, 255, 255, ${BASE_ALPHA})`;
      context.fill(resting);

      frame = requestAnimationFrame(render);
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const bounds = host.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (!frame) drawStatic();
    };

    // Ripples fire only on an explicit press, never on hover, drag or scroll.
    const onPointerDown = (event: PointerEvent) => {
      if (!inView || document.hidden) return;
      const bounds = host.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (x < 0 || y < 0 || x > bounds.width || y > bounds.height) return;
      ripples.push({ x, y, startedAt: performance.now() });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
      if (!frame) frame = requestAnimationFrame(render);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        ripples.length = 0;
        drawStatic();
      }
    });
    intersectionObserver.observe(host);
    if (!reducedMotion) window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full" />;
}

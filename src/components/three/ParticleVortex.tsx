import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { registerRenderLoop } from "./RenderLoopCoordinator";

gsap.registerPlugin(ScrollTrigger);

interface Interaction {
  pointerX: number;
  pointerY: number;
  pointerActive: boolean;
  burstX: number;
  burstY: number;
  burstAt: number;
}

interface InteractionRef {
  current: Interaction;
}

// Entrance: 0 = dispersed beyond the frame, 1 = settled in the orbit ring.
interface AssembleRef {
  current: { value: number };
}

const ASSEMBLE_MAX_DELAY = 0.35; // per-particle stagger, as a fraction of the entrance

function Vortex({
  interaction,
  assemble,
  accent,
  white,
}: {
  interaction: InteractionRef;
  assemble: AssembleRef;
  accent: string;
  white: string;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const scale = Math.min(1.1, viewport.width / 6.5, viewport.height / 6.5);
  const geometry = useMemo(() => {
    const count = 4200;
    const positions = new Float32Array(count * 3);
    const scatter = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const delays = new Float32Array(count);
    let seed = 319;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const accentColor = new THREE.Color(accent);
    // A deeper step of the accent, so the olive reads as a tone range.
    const deepColor = new THREE.Color(accent).multiplyScalar(0.72);
    const whiteColor = new THREE.Color(white);

    for (let i = 0; i < count; i++) {
      const angle = random() * Math.PI * 2;
      const phase = random();
      const baseRadius = Math.sqrt(random()) * 2.45;
      const radius = Math.max(0.08, baseRadius + Math.sin(angle * 3 + baseRadius * 1.25 + phase * 6.28) * 0.12);
      const index = i * 3;
      positions[index] = Math.cos(angle) * radius;
      positions[index + 1] = Math.sin(angle) * radius;
      positions[index + 2] = (random() - 0.5) * 0.36;

      // Dispersed start: out along the particle's own bearing (plus a little
      // spread), mostly past the frame's edge, at a varied depth.
      const scatterAngle = angle + (random() - 0.5) * 1.2;
      const scatterRadius = 3.2 + random() * 4.2;
      scatter[index] = Math.cos(scatterAngle) * scatterRadius;
      scatter[index + 1] = Math.sin(scatterAngle) * scatterRadius;
      scatter[index + 2] = (random() - 0.5) * 3;
      // Inner particles land first, so the ring fills from the centre out.
      delays[i] = Math.min(1, baseRadius / 2.45) * ASSEMBLE_MAX_DELAY * (0.6 + random() * 0.4);

      const roll = random();
      const color = roll > 0.78 ? (roll > 0.9 ? deepColor : accentColor) : whiteColor;
      colors[index] = color.r;
      colors[index + 1] = color.g;
      colors[index + 2] = color.b;
      phases[i] = phase;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    buffer.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    buffer.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
    buffer.setAttribute("aDelay", new THREE.BufferAttribute(delays, 1));
    return buffer;
  }, [accent, white]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const uniforms = materialRef.current.uniforms;
      const time = clock.getElapsedTime();
      const input = interaction.current;
      uniforms.uTime.value = time;
      uniforms.uAssemble.value = assemble.current.value;
      uniforms.uPointer.value.set(
        (input.pointerX * viewport.width) / (2 * scale),
        (input.pointerY * viewport.height) / (2 * scale),
      );
      uniforms.uPointerActive.value = input.pointerActive ? 1 : 0;
      uniforms.uBurstOrigin.value.set(input.burstX, input.burstY);
      const burstAge = input.burstAt ? performance.now() / 1000 - input.burstAt : -1;
      uniforms.uBurstAge.value = burstAge >= 0 && burstAge < 2.5 ? burstAge : -1;
    }
  });

  return (
    <group scale={scale}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            uTime: { value: 0 },
            uPointer: { value: new THREE.Vector2() },
            uPointerActive: { value: 0 },
            uBurstOrigin: { value: new THREE.Vector2() },
            uBurstAge: { value: -1 },
            uAssemble: { value: assemble.current.value },
          }}
          vertexShader={`
            attribute float aPhase;
            attribute vec3 aScatter;
            attribute float aDelay;
            varying vec3 vColor;
            varying float vTwinkle;
            varying float vArrive;
            uniform float uTime;
            uniform float uAssemble;
            uniform vec2 uPointer;
            uniform float uPointerActive;
            uniform vec2 uBurstOrigin;
            uniform float uBurstAge;

            void main() {
              vec3 animatedPosition = position;
              float radius = length(animatedPosition.xy);
              float angle = atan(animatedPosition.y, animatedPosition.x);
              angle += uTime * (0.045 + aPhase * 0.035 + (1.0 - smoothstep(0.0, 2.5, radius)) * 0.06);
              radius += sin(uTime * 0.72 + aPhase * 6.28318 + radius * 1.5) * 0.055;
              animatedPosition.xy = vec2(cos(angle), sin(angle)) * radius;
              animatedPosition.z += sin(uTime * 0.68 + aPhase * 6.28318) * 0.07;

              // Entrance, all on the GPU: each particle spirals in from its
              // dispersed start, with a staggered cubic-out ease, and the
              // leftover twist unwinds as it lands, so the swarm reads as a
              // vortex collapsing into the ring.
              float arrive = clamp((uAssemble - aDelay) / ${(1 - ASSEMBLE_MAX_DELAY).toFixed(3)}, 0.0, 1.0);
              arrive = 1.0 - pow(1.0 - arrive, 3.0);
              vArrive = arrive;
              vec3 start = aScatter;
              float twist = (1.0 - arrive) * 2.2;
              start.xy = mat2(cos(twist), sin(twist), -sin(twist), cos(twist)) * start.xy;
              animatedPosition = mix(start, animatedPosition, arrive);

              vec2 mouseDelta = animatedPosition.xy - uPointer;
              float mouseDistance = max(length(mouseDelta), 0.001);
              float mouseFalloff = 1.0 - smoothstep(0.0, 1.35, mouseDistance);
              animatedPosition.xy += (mouseDelta / mouseDistance) * mouseFalloff * 0.9 * uPointerActive;

              if (uBurstAge >= 0.0) {
                vec2 burstDelta = animatedPosition.xy - uBurstOrigin;
                float burstDistance = max(length(burstDelta), 0.001);
                vec2 burstDirection = burstDelta / burstDistance;
                float impulse = (1.0 - exp(-uBurstAge * 20.0)) * exp(-uBurstAge * 2.5);
                float springSettle = impulse * (1.0 + 0.12 * sin(uBurstAge * 9.0));
                animatedPosition.xy += burstDirection * 2.2 * springSettle;
                animatedPosition.z += 0.65 * springSettle;
              }

              float twinkle = 0.88 + 0.12 * sin(uTime * 1.8 + aPhase * 6.28318);
              vTwinkle = twinkle;
              vColor = color;
              vec4 mvPosition = modelViewMatrix * vec4(animatedPosition, 1.0);
              gl_PointSize = 1.8 + twinkle * 0.9;
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying vec3 vColor;
            varying float vTwinkle;
            varying float vArrive;

            void main() {
              float pointAlpha = 1.0 - smoothstep(0.18, 0.5, length(gl_PointCoord - vec2(0.5)));
              // Faint while in flight, full strength once in the ring.
              pointAlpha *= 0.25 + 0.75 * vArrive;
              gl_FragColor = vec4(vColor * (0.82 + vTwinkle * 0.18), pointAlpha * (0.52 + vTwinkle * 0.22));
              #include <colorspace_fragment>
            }
          `}
          transparent
          opacity={0.78}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
          vertexColors
        />
      </points>
    </group>
  );
}

export default function ParticleVortex({
  className = "",
  accent = "#8FB890",
  white = "#FFFFFF",
}: {
  className?: string;
  accent?: string;
  white?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const interaction = useRef<Interaction>({
    pointerX: 0,
    pointerY: 0,
    pointerActive: false,
    burstX: 0,
    burstY: 0,
    burstAt: 0,
  });
  const setFrameloopRef = useRef<((mode: "always" | "demand" | "never") => void) | null>(null);
  const invalidateRef = useRef<(() => void) | null>(null);
  const assemble = useRef({ value: 0 });
  const shouldAnimateRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const updateMotionPreference = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    if (!container) return;

    let isInView = false;
    let intersectionRatio = 0;
    const renderLoop = registerRenderLoop((active) => {
      shouldAnimateRef.current = active && !reducedMotion;
      setFrameloopRef.current?.(shouldAnimateRef.current ? "always" : "demand");
    });
    const updatePointer = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      const isInside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom;
      interaction.current.pointerActive = isInside;
      if (!isInside) return;
      interaction.current.pointerX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      interaction.current.pointerY = 1 - ((event.clientY - bounds.top) / bounds.height) * 2;
    };
    const handlePointerDown = (event: PointerEvent) => {
      updatePointer(event);
      if (!interaction.current.pointerActive) return;
      interaction.current.burstX = interaction.current.pointerX;
      interaction.current.burstY = interaction.current.pointerY;
      interaction.current.burstAt = performance.now() / 1000;
    };
    const updateVisibility = () => {
      renderLoop.setVisibility(isInView && !document.hidden, intersectionRatio);
      if (isInView && !document.hidden && !reducedMotion) {
        window.addEventListener("pointermove", updatePointer, { passive: true });
        window.addEventListener("pointerdown", handlePointerDown, { passive: true });
      } else {
        interaction.current.pointerActive = false;
        window.removeEventListener("pointermove", updatePointer);
        window.removeEventListener("pointerdown", handlePointerDown);
      }
    };
    const handleVisibility = () => updateVisibility();
    // Graded thresholds so the coordinator can compare how much of the
    // viewport this canvas fills against the hero globe's, instead of both
    // reporting a bare 0-crossing and the loser still holding frames.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        intersectionRatio = entry.intersectionRatio;
        updateVisibility();
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85, 1] },
    );
    observer.observe(container);
    // Entrance: the swarm collapses into the ring as the section arrives.
    // invalidate() keeps frames coming even if the render coordinator has the
    // canvas on demand.
    assemble.current.value = reducedMotion ? 1 : 0;
    const entrance = gsap.to(assemble.current, {
      value: 1,
      duration: 1.8,
      ease: "none", // each particle eases itself on the GPU
      paused: true,
      onUpdate: () => invalidateRef.current?.(),
    });
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top 75%",
      once: true,
      onEnter: () => {
        if (!reducedMotion) entrance.play();
      },
    });

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      renderLoop.dispose();
      scrollTrigger.kill();
      entrance.kill();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [mounted, reducedMotion]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      <Canvas
        frameloop="never"
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={1}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        onCreated={({ setFrameloop, invalidate }) => {
          setFrameloopRef.current = setFrameloop;
          invalidateRef.current = invalidate;
          setFrameloop(shouldAnimateRef.current ? "always" : "demand");
          invalidate();
        }}
      >
        <Vortex interaction={interaction} assemble={assemble} accent={accent} white={white} />
      </Canvas>
    </div>
  );
}

import { useRef, useMemo, useEffect, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * PredictiveLattice — "Convergent Lattice" hero visual.
 *
 * Scattered telemetry points drift around a single obsidian core whose edges
 * are lit in the brand sage green. Fully transparent canvas, no bounding
 * box — designed to sit behind the hero content with zero visible edges.
 */

const SAGE = "#8FAF8F";
const OBSIDIAN = "#0a0e0c";
const MUTED_WHITE = "#d8d8d2";

// ---------- Background telemetry particles ----------
function TelemetryField({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Soft ellipsoid shell — sparse near the core, thinning outward
      const radius = 2.3 + Math.random() * 5.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      arr[i * 3 + 2] = radius * Math.cos(phi) * 0.85;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={MUTED_WHITE}
        size={0.017}
        sizeAttenuation
        transparent
        opacity={0.3}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

// ---------- The obsidian core ----------
function ObsidianCore() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.4, 1), []);
  const edgesGeometry = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      edgesGeometry.dispose();
    };
  }, [geometry, edgesGeometry]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // slow autonomous drift — never a full spin, just a held, deliberate turn
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.08;
    }

    // ambient "breathing" — subtle scale pulse, reads as "alive" not "spinning"
    const breathe = 1 + Math.sin(t * 0.6) * 0.015;
    coreRef.current?.scale.setScalar(breathe);
    edgesRef.current?.scale.setScalar(breathe);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.08 * (1 + Math.sin(t * 0.6 + 0.4) * 0.02));
    }
  });

  return (
    <group ref={groupRef}>
      {/* Matte obsidian core */}
      <mesh ref={coreRef} geometry={geometry}>
        <meshStandardMaterial color={OBSIDIAN} metalness={0.85} roughness={0.35} />
      </mesh>

      {/* Sage edge lattice — the brand accent, kept as line work only */}
      <lineSegments ref={edgesRef} geometry={edgesGeometry}>
        <lineBasicMaterial color={SAGE} transparent opacity={0.55} toneMapped={false} />
      </lineSegments>

      {/* Soft outer glow shell — fakes bloom without a postprocessing pass */}
      <mesh ref={glowRef} geometry={geometry} scale={1.08}>
        <meshBasicMaterial color={SAGE} transparent opacity={0.045} side={THREE.BackSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

// ---------- Mouse-driven parallax rig ----------
function ParallaxRig({ children, reducedMotion }: { children: ReactNode; reducedMotion: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  useFrame(() => {
    if (!rig.current) return;
    const maxTilt = 0.12; // radians — kept small so parallax reads as ambient, not interactive
    rig.current.rotation.y += (target.current.x * maxTilt - rig.current.rotation.y) * 0.03;
    rig.current.rotation.x += (-target.current.y * maxTilt * 0.5 - rig.current.rotation.x) * 0.03;
  });

  return <group ref={rig}>{children}</group>;
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} color={MUTED_WHITE} />
      <pointLight position={[6, 3, 4]} intensity={18} color={SAGE} distance={14} decay={2} />
      <pointLight position={[-2, -2, -3]} intensity={5} color={MUTED_WHITE} distance={16} decay={2} />

      <group position={[3.2, 0, 0]}>
        <ParallaxRig reducedMotion={reducedMotion}>
          <ObsidianCore />
          <TelemetryField />
        </ParallaxRig>
      </group>
    </>
  );
}

export default function PredictiveLattice({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    if (!container) return;

    const hero = container.closest<HTMLElement>("[data-hero]") ?? container;
    let heroVisible = false;
    const updateVisibility = () => setInView(heroVisible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      updateVisibility();
    });
    observer.observe(hero);

    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [mounted]);

  // Avoids a hydration flash inside the Astro/React island — canvas mounts
  // only once we're definitely in the browser.
  if (!mounted) return null;

  return (
    <div ref={containerRef} className={`absolute top-0 right-0 w-full lg:w-[60%] h-full pointer-events-none ${className}`} aria-hidden="true">
      <Canvas
        frameloop={inView && !reducedMotion ? "always" : "never"}
        camera={{ position: [-3.2, 0, 7.5], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}

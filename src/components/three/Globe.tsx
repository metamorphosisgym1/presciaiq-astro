import { useLayoutEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { registerRenderLoop } from "./RenderLoopCoordinator";
import { LAND_POINTS_DESKTOP, LAND_POINTS_MOBILE } from "./data/landPoints";

/**
 * Dotted-matrix Earth globe for the hero.
 *
 * - The canvas fills its container (the whole hero); the globe is placed with
 *   the camera (fov for size, view offset for vertical anchor), so the halo
 *   and long-haul arcs never clip against a canvas edge.
 * - Continents: precomputed Natural Earth land-dot coordinates, sampled on
 *   evenly spaced latitude rows at build time.
 * - Translucency: everything draws additively without depth testing; the far
 *   hemisphere fades instead of being occluded, over a faint glass body with a
 *   fresnel rim and a screen-space atmosphere halo.
 * - Data: hub-and-spoke great-circle arcs from two HQs, lifted in proportion
 *   to their length. Each arc carries one packet on its own cycle; the packet
 *   and its trail are both computed on the GPU from the same clock.
 * - Interaction: drag (only over the globe) with inertia, slow auto-rotation,
 *   tilt spring. Rendering pauses when off-screen or the tab is hidden.
 */

const RADIUS = 1.6;
const CAMERA_DISTANCE = 6;
const BASE_TILT = 0.2;
const INITIAL_LNG = 118; // longitude facing the camera on load
const AUTO_ROTATE_SPEED = 0.055; // rad/s

const PACKET_DUTY = 0.24; // share of each arc's cycle a packet is in flight

const INTRO_DURATION = 1.5; // s for scattered points to assemble into the globe
const INTRO_MAX_DELAY = 0.3; // per-point stagger, as a fraction of the intro

// Px of clearance between the slot top (under the navbar) and the globe, and
// how far the globe may extend below the slot towards the copy.
const GLOBE_TOP_GAP = 12;
const GLOBE_DROP = 16;

const MINT = new THREE.Color("#5BE3E8");

/** Primary hubs emit arcs in their network colour; other cities are destinations. */
type Hub = { name: string; lat: number; lng: number; hq?: THREE.Color };

const HUBS: Hub[] = [
  { name: "Sydney", lat: -33.87, lng: 151.21, hq: MINT },
  { name: "London", lat: 51.51, lng: -0.13, hq: MINT },
  { name: "New York", lat: 40.71, lng: -74.01, hq: MINT },
  { name: "Melbourne", lat: -37.81, lng: 144.96 },
  { name: "Brisbane", lat: -27.47, lng: 153.03 },
  { name: "Perth", lat: -31.95, lng: 115.86 },
  { name: "Auckland", lat: -36.85, lng: 174.76 },
  { name: "Singapore", lat: 1.35, lng: 103.82 },
  { name: "Hong Kong", lat: 22.32, lng: 114.17 },
  { name: "Tokyo", lat: 35.68, lng: 139.65 },
  { name: "Mumbai", lat: 19.08, lng: 72.88 },
  { name: "Dubai", lat: 25.2, lng: 55.27 },
  { name: "San Francisco", lat: 37.77, lng: -122.42 },
  { name: "Los Angeles", lat: 34.05, lng: -118.24 },
  { name: "Toronto", lat: 43.65, lng: -79.38 },
  { name: "Chicago", lat: 41.88, lng: -87.63 },
  { name: "Vancouver", lat: 49.28, lng: -123.12 },
  { name: "Miami", lat: 25.76, lng: -80.19 },
  { name: "Mexico City", lat: 19.43, lng: -99.13 },
  { name: "Bogotá", lat: 4.71, lng: -74.07 },
  { name: "Buenos Aires", lat: -34.6, lng: -58.38 },
  { name: "Cairo", lat: 30.04, lng: 31.24 },
  { name: "Nairobi", lat: -1.29, lng: 36.82 },
  { name: "Frankfurt", lat: 50.11, lng: 8.68 },
  { name: "Paris", lat: 48.86, lng: 2.35 },
  { name: "Amsterdam", lat: 52.37, lng: 4.9 },
  { name: "Stockholm", lat: 59.33, lng: 18.07 },
  { name: "Lagos", lat: 6.52, lng: 3.38 },
  { name: "Johannesburg", lat: -26.2, lng: 28.05 },
  { name: "São Paulo", lat: -23.55, lng: -46.63 },
];

const ROUTES: [string, string][] = [
  ["Sydney", "Melbourne"],
  ["Sydney", "Brisbane"],
  ["Sydney", "Perth"],
  ["Sydney", "Auckland"],
  ["Sydney", "Singapore"],
  ["Sydney", "Hong Kong"],
  ["Sydney", "Tokyo"],
  ["Sydney", "Mumbai"],
  ["Sydney", "Dubai"],
  ["Sydney", "San Francisco"],
  ["Sydney", "Los Angeles"],
  ["Sydney", "London"],
  ["London", "Frankfurt"],
  ["London", "Paris"],
  ["London", "Amsterdam"],
  ["London", "Stockholm"],
  ["London", "Dubai"],
  ["London", "Cairo"],
  ["London", "Lagos"],
  ["London", "Nairobi"],
  ["London", "Johannesburg"],
  // Americas network: fills the hemisphere opposite Sydney.
  ["New York", "London"],
  ["New York", "Toronto"],
  ["New York", "Chicago"],
  ["New York", "Vancouver"],
  ["New York", "San Francisco"],
  ["New York", "Los Angeles"],
  ["New York", "Miami"],
  ["New York", "Mexico City"],
  ["New York", "Bogotá"],
  ["New York", "São Paulo"],
  ["New York", "Buenos Aires"],
];

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Adds the per-point intro attributes to precomputed land-dot positions. */
function buildLandGeometry(positions: Float32Array) {
  const count = positions.length / 3;
  const scatter = new Float32Array(positions.length);
  const seeds = new Float32Array(count);
  const delays = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const offset = i * 3;
    let x = positions[offset] / RADIUS + (Math.random() - 0.5) * 1.8;
    let y = positions[offset + 1] / RADIUS + (Math.random() - 0.5) * 1.8;
    let z = positions[offset + 2] / RADIUS + (Math.random() - 0.5) * 1.8;
    const radius = RADIUS * (1.7 + Math.random() * 1.5) / Math.hypot(x, y, z);
    x *= radius;
    y *= radius;
    z *= radius;
    scatter[offset] = x;
    scatter[offset + 1] = y;
    scatter[offset + 2] = z;
    seeds[i] = Math.random();
    delays[i] = Math.random() * INTRO_MAX_DELAY;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aDelay", new THREE.BufferAttribute(delays, 1));
  return geometry;
}

type Route = {
  from: THREE.Vector3;
  to: THREE.Vector3;
  angle: number;
  lift: number;
  freq: number;
  offset: number;
  color: THREE.Color;
};

/** Unit vectors plus flight parameters; short hops hug the surface, long hauls arch high. */
function buildRoutes(): Route[] {
  const byName = new Map(HUBS.map((hub) => [hub.name, hub]));
  return ROUTES.flatMap(([fromName, toName], index) => {
    const from = byName.get(fromName);
    const to = byName.get(toName);
    if (!from || !to) return [];
    const a = latLngToVector3(from.lat, from.lng, 1);
    const b = latLngToVector3(to.lat, to.lng, 1);
    const angle = Math.acos(THREE.MathUtils.clamp(a.dot(b), -1, 1));
    if (Math.sin(angle) < 1e-4) return [];
    return [
      {
        from: a,
        to: b,
        angle,
        lift: 0.03 + 0.24 * (angle / Math.PI),
        freq: 1 / (7 + ((index * 7) % 6)),
        offset: (index * 0.618) % 1,
        color: from.hq ?? MINT,
      },
    ];
  });
}

/* Shared GLSL. */
const COMMON_GLSL = /* glsl */ `
  // 1 facing the camera, -1 on the far side of the globe.
  float facing(vec4 mvPosition) {
    vec4 mvCenter = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    return normalize(mvPosition.xyz - mvCenter.xyz).z;
  }
  // Point on the lifted great circle from a to b (unit vectors).
  vec3 flight(vec3 a, vec3 b, float angle, float lift, float t) {
    vec3 p = (sin((1.0 - t) * angle) * a + sin(t * angle) * b) / sin(angle);
    return p * ${RADIUS.toFixed(3)} * (1.0 + lift * sin(3.14159265 * t));
  }
  // Packet progress along its arc; x = eased t, y = 1 while in flight.
  vec2 packetCycle(float time, float freq, float offset) {
    float cyc = fract(time * freq + offset);
    float tr = clamp(cyc / ${PACKET_DUTY.toFixed(3)}, 0.0, 1.0);
    return vec2(tr * tr * (3.0 - 2.0 * tr), step(cyc, ${PACKET_DUTY.toFixed(3)}));
  }
`;

// Arcs and packets on the far side stay faint so they read as depth, not rings.
const DEPTH_FADE_GLSL = /* glsl */ `mix(0.07, 1.0, smoothstep(-0.4, 0.3, facing(mvPosition)))`;

type GlobeProps = {
  className?: string;
  /**
   * Element (inside the container) the globe should fit and centre in. The
   * canvas still covers the whole container so the halo and arcs can spill
   * past the slot; without a slot the globe centres in the container.
   */
  slotRef?: RefObject<HTMLElement | null>;
};

export default function Globe({ className = "", slotRef }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch (error) {
      console.warn("WebGL unavailable, skipping globe:", error);
      return;
    }
    renderer.setClearColor(0x000000, 0);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.set(0, 0, CAMERA_DISTANCE);

    const globe = new THREE.Group();
    globe.rotation.set(BASE_TILT, -THREE.MathUtils.degToRad(INITIAL_LNG + 90), 0);
    scene.add(globe);

    const timeUniform = { value: 0 };
    const scaleUniform = { value: 1 }; // device pixels per design pixel, times globe size
    const revealUniform = { value: reducedMotion ? 1 : 0 }; // arcs draw in from their hubs
    const motionUniform = { value: reducedMotion ? 0 : 1 };
    const assembleUniform = { value: reducedMotion ? 1 : 0 }; // intro: scattered -> on the sphere
    const glowUniform = { value: reducedMotion ? 1 : 0 }; // halo, rim and glass fade in with it
    // Declared up front: requestRender() can run during setup (resize, atlas load).
    let disposed = false;
    let inView = false;
    let frame = 0;
    // Granted by the RenderLoopCoordinator. Being on screen is not enough: only
    // one WebGL loop on the page may hold the main thread at a time, so the
    // globe never competes with the CTA particle ring for frames.
    let renderGranted = false;

    // ---------------------------------------------------------------
    // Atmosphere halo: camera-facing quad at the globe centre. The camera
    // never moves, so its silhouette radius in world units is fixed.
    // ---------------------------------------------------------------
    const silhouette = (RADIUS * CAMERA_DISTANCE) / Math.sqrt(CAMERA_DISTANCE ** 2 - RADIUS ** 2);
    const HALO_EXTENT = 1.55; // in silhouette radii
    const haloGeometry = new THREE.PlaneGeometry(silhouette * HALO_EXTENT * 2, silhouette * HALO_EXTENT * 2);
    const haloMaterial = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: MINT }, uExtent: { value: HALO_EXTENT }, uGlow: glowUniform },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uExtent;
        uniform float uGlow;
        varying vec2 vUv;
        void main() {
          float d = length(vUv - 0.5) * 2.0 * uExtent; // 1.0 == globe silhouette
          float outside = step(1.0, d);
          float outer = exp(-(d - 1.0) * 4.0) * outside;
          float inner = pow(clamp(d, 0.0, 1.0), 7.0) * (1.0 - outside);
          float glow = (outer * 0.3 + inner * 0.2) * (1.0 - smoothstep(uExtent * 0.75, uExtent, d)) * uGlow;
          vec3 color = mix(vec3(0.82, 1.0, 0.9), uColor, 0.85);
          gl_FragColor = vec4(color * glow, glow);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.renderOrder = 0;
    scene.add(halo);

    // ---------------------------------------------------------------
    // Glass: a faint obsidian body that quiets the hero background inside the
    // silhouette (drawn first, so it never dims the dots), plus a fresnel rim
    // shell drawn last.
    // ---------------------------------------------------------------
    const sphereGeometry = new THREE.SphereGeometry(1, 96, 64);
    const glassVertex = /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    const bodyMaterial = new THREE.ShaderMaterial({
      uniforms: { uGlow: glowUniform },
      vertexShader: glassVertex,
      fragmentShader: /* glsl */ `
        uniform float uGlow;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          float facingRatio = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
          gl_FragColor = vec4(vec3(0.012, 0.016, 0.014), 0.2 * smoothstep(0.0, 0.5, facingRatio) * uGlow);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const body = new THREE.Mesh(sphereGeometry, bodyMaterial);
    body.scale.setScalar(RADIUS * 0.99);
    body.renderOrder = 1;
    globe.add(body);

    const rimMaterial = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: MINT }, uGlow: glowUniform },
      vertexShader: glassVertex,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uGlow;
        varying vec3 vNormal;
        varying vec3 vView;
        void main() {
          vec3 n = normalize(vNormal);
          float facingRatio = abs(dot(normalize(vView), n));
          // Fresnel: the shell thickens towards the silhouette, brighter on the
          // lit upper hemisphere so the casing reads as curved glass.
          float upper = smoothstep(-0.35, 0.85, n.y);
          float fresnel = pow(1.0 - facingRatio, 3.5) * mix(0.28, 0.55, upper);
          // Top light: a broad translucent wash over the upper hemisphere plus a
          // soft specular hotspot up-left, like a window reflected in a glass orb.
          vec3 light = normalize(vec3(-0.45, 0.7, 0.55));
          float wash = pow(max(dot(n, light), 0.0), 6.0) * 0.07;
          float specular = pow(max(dot(n, light), 0.0), 60.0) * 0.32;
          vec3 tint = mix(vec3(0.9, 0.97, 0.94), uColor, 0.28);
          vec3 color = tint * (fresnel + wash) + vec3(1.0) * specular;
          float alpha = (fresnel + wash + specular) * uGlow;
          gl_FragColor = vec4(color * uGlow, alpha);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const rim = new THREE.Mesh(sphereGeometry, rimMaterial);
    rim.scale.setScalar(RADIUS * 1.035); // just outside the dots, so they sit inside the glass
    rim.renderOrder = 7;
    globe.add(rim);

    // ---------------------------------------------------------------
    // Land dots (built once the atlas chunk loads). The vertex shader also
    // runs the assembly intro.
    // ---------------------------------------------------------------
    const dotMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: timeUniform,
        uScale: scaleUniform,
        uMotion: motionUniform,
        uAssemble: assembleUniform,
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uScale;
        uniform float uMotion;
        uniform float uAssemble;
        attribute vec3 aScatter;
        attribute float aSeed;
        attribute float aDelay;
        varying float vAlpha;
        ${COMMON_GLSL}
        void main() {
          // Intro: fly in from the scattered start with a staggered quart-out ease.
          float progress = clamp((uAssemble - aDelay) / ${(1 - INTRO_MAX_DELAY).toFixed(3)}, 0.0, 1.0);
          float eased = 1.0 - pow(1.0 - progress, 4.0);
          vec4 mvPosition = modelViewMatrix * vec4(mix(aScatter, position, eased), 1.0);

          float front = smoothstep(-0.6, 0.85, facing(mvPosition));
          float shimmer = 0.9 + 0.1 * sin(uTime * 1.5 + aSeed * 6.2831) * uMotion;
          // Crisp (~0.92 front, ~0.22 through the far side).
          vAlpha = mix(0.22, 0.92, front) * shimmer * (0.35 + 0.65 * smoothstep(0.0, 0.3, progress));

          // Far-side dots are softer and smaller once perspective applies;
          // perspective is capped so points flying close to the camera stay small.
          float size = mix(1.9, 2.25, front);
          gl_PointSize = size * uScale * min(${CAMERA_DISTANCE.toFixed(1)} / -mvPosition.z, 2.2);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float disc = 1.0 - smoothstep(0.36, 0.5, d);
          if (disc < 0.004) discard;
          // Straight (not premultiplied) alpha: AdditiveBlending already scales by alpha.
          gl_FragColor = vec4(vec3(0.94, 0.95, 0.97), vAlpha * disc);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const landPositions = narrow ? LAND_POINTS_MOBILE : LAND_POINTS_DESKTOP;
    const dots = new THREE.Points(buildLandGeometry(landPositions), dotMaterial);
    dots.renderOrder = 3;
    globe.add(dots);

    // ---------------------------------------------------------------
    // Flight arcs: one LineSegments draw call. Lines draw in from the hub on
    // load; the packet trail comes from the same cycle as the packet head.
    // ---------------------------------------------------------------
    const routes = buildRoutes();
    const routeAttributes = (route: Route) => [
      route.from.x, route.from.y, route.from.z,
      route.to.x, route.to.y, route.to.z,
      route.angle, route.lift, route.freq, route.offset,
    ];

    const arcData = {
      position: [] as number[],
      t: [] as number[],
      from: [] as number[],
      to: [] as number[],
      params: [] as number[],
      color: [] as number[],
    };
    for (const route of routes) {
      const segments = Math.max(24, Math.round(56 * route.angle));
      const [ax, ay, az, bx, by, bz, angle, lift, freq, offset] = routeAttributes(route);
      for (let i = 0; i < segments; i++) {
        for (const j of [i, i + 1]) {
          arcData.position.push(0, 0, 0); // computed in the vertex shader
          arcData.t.push(j / segments);
          arcData.from.push(ax, ay, az);
          arcData.to.push(bx, by, bz);
          arcData.params.push(angle, lift, freq, offset);
          arcData.color.push(route.color.r, route.color.g, route.color.b);
        }
      }
    }
    const arcGeometry = new THREE.BufferGeometry();
    arcGeometry.setAttribute("position", new THREE.Float32BufferAttribute(arcData.position, 3));
    arcGeometry.setAttribute("aT", new THREE.Float32BufferAttribute(arcData.t, 1));
    arcGeometry.setAttribute("aFrom", new THREE.Float32BufferAttribute(arcData.from, 3));
    arcGeometry.setAttribute("aTo", new THREE.Float32BufferAttribute(arcData.to, 3));
    arcGeometry.setAttribute("aParams", new THREE.Float32BufferAttribute(arcData.params, 4));
    arcGeometry.setAttribute("aColor", new THREE.Float32BufferAttribute(arcData.color, 3));

    const arcMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: timeUniform, uReveal: revealUniform, uMotion: motionUniform },
      vertexShader: /* glsl */ `
        attribute float aT;
        attribute vec3 aFrom;
        attribute vec3 aTo;
        attribute vec4 aParams; // angle, lift, freq, offset
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vT;
        varying float vDepth;
        varying vec2 vCycle;
        uniform float uTime;
        ${COMMON_GLSL}
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(flight(aFrom, aTo, aParams.x, aParams.y, aT), 1.0);
          vT = aT;
          vColor = aColor;
          vDepth = ${DEPTH_FADE_GLSL};
          vCycle = packetCycle(uTime, aParams.z, aParams.w);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uReveal;
        uniform float uMotion;
        varying vec3 vColor;
        varying float vT;
        varying float vDepth;
        varying vec2 vCycle;
        void main() {
          float reveal = clamp((uReveal - vT * 0.85) / 0.15, 0.0, 1.0);
          float behind = vCycle.x - vT;
          float beam = behind >= 0.0 ? exp(-behind * 11.0) * vCycle.y * uMotion : 0.0;
          float alpha = (0.4 + beam * 0.6) * reveal * vDepth;
          vec3 base = mix(vec3(0.8, 0.86, 0.84), vColor, 0.5);
          vec3 color = mix(base, vColor, clamp(beam * 1.4, 0.0, 1.0));
          gl_FragColor = vec4(color * alpha, alpha);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const arcLines = new THREE.LineSegments(arcGeometry, arcMaterial);
    arcLines.frustumCulled = false; // positions live in the shader
    arcLines.renderOrder = 4;
    globe.add(arcLines);

    // Packet heads: one point per route, positioned entirely on the GPU.
    const packetGeometry = new THREE.BufferGeometry();
    packetGeometry.setAttribute("position", new THREE.Float32BufferAttribute(new Array(routes.length * 3).fill(0), 3));
    packetGeometry.setAttribute("aFrom", new THREE.Float32BufferAttribute(routes.flatMap((r) => r.from.toArray()), 3));
    packetGeometry.setAttribute("aTo", new THREE.Float32BufferAttribute(routes.flatMap((r) => r.to.toArray()), 3));
    packetGeometry.setAttribute(
      "aParams",
      new THREE.Float32BufferAttribute(routes.flatMap((r) => [r.angle, r.lift, r.freq, r.offset]), 4),
    );
    packetGeometry.setAttribute("aColor", new THREE.Float32BufferAttribute(routes.flatMap((r) => r.color.toArray()), 3));
    const packetMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: timeUniform, uScale: scaleUniform, uReveal: revealUniform, uMotion: motionUniform },
      vertexShader: /* glsl */ `
        attribute vec3 aFrom;
        attribute vec3 aTo;
        attribute vec4 aParams;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uTime;
        uniform float uScale;
        uniform float uReveal;
        uniform float uMotion;
        varying float vAlpha;
        ${COMMON_GLSL}
        void main() {
          vec2 cycle = packetCycle(uTime, aParams.z, aParams.w);
          vColor = aColor;
          vec4 mvPosition = modelViewMatrix * vec4(flight(aFrom, aTo, aParams.x, aParams.y, cycle.x), 1.0);
          float ends = smoothstep(0.0, 0.06, cycle.x) * (1.0 - smoothstep(0.94, 1.0, cycle.x));
          vAlpha = cycle.y * ends * step(1.0, uReveal) * uMotion * ${DEPTH_FADE_GLSL};
          gl_PointSize = 15.0 * uScale * (${CAMERA_DISTANCE.toFixed(1)} / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          if (vAlpha < 0.004) discard;
          float d = length(gl_PointCoord - 0.5);
          float core = 1.0 - smoothstep(0.04, 0.11, d);
          float glow = exp(-d * 10.0) * (1.0 - smoothstep(0.35, 0.5, d));
          float alpha = (core + glow * 0.75) * vAlpha;
          gl_FragColor = vec4(mix(vColor, vec3(1.0), core) * alpha, alpha);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const packets = new THREE.Points(packetGeometry, packetMaterial);
    packets.frustumCulled = false;
    packets.renderOrder = 5;
    globe.add(packets);

    // Hub nodes: primary hubs get a coloured core and sonar ring, spokes a small white node.
    const hubGeometry = new THREE.BufferGeometry().setFromPoints(
      HUBS.map((hub) => latLngToVector3(hub.lat, hub.lng, RADIUS * 1.004)),
    );
    hubGeometry.setAttribute("aHQ", new THREE.Float32BufferAttribute(HUBS.map((hub) => (hub.hq ? 1 : 0)), 1));
    hubGeometry.setAttribute("aColor", new THREE.Float32BufferAttribute(HUBS.flatMap((hub) => (hub.hq ?? MINT).toArray()), 3));
    hubGeometry.setAttribute("aSeed", new THREE.Float32BufferAttribute(HUBS.map((_, i) => (i * 0.37) % 1), 1));
    const hubMaterial = new THREE.ShaderMaterial({
      uniforms: { uTime: timeUniform, uScale: scaleUniform, uMotion: motionUniform, uReveal: revealUniform },
      vertexShader: /* glsl */ `
        uniform float uScale;
        uniform float uReveal;
        attribute float aHQ;
        attribute vec3 aColor;
        varying vec3 vColor;
        attribute float aSeed;
        varying float vHQ;
        varying float vSeed;
        varying float vDepth;
        ${COMMON_GLSL}
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vHQ = aHQ;
          vColor = aColor;
          vSeed = aSeed;
          vDepth = mix(0.15, 1.0, smoothstep(-0.3, 0.3, facing(mvPosition))) * smoothstep(0.0, 0.4, uReveal);
          gl_PointSize = mix(13.0, 34.0, aHQ) * uScale * (${CAMERA_DISTANCE.toFixed(1)} / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform float uMotion;
        varying vec3 vColor;
        varying float vHQ;
        varying float vSeed;
        varying float vDepth;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          float coreSize = mix(0.32, 0.17, vHQ);
          float core = 1.0 - smoothstep(coreSize * 0.6, coreSize, d);
          float wave = fract(uTime * mix(0.35, 0.6, vHQ) + vSeed);
          float ring = (1.0 - smoothstep(0.0, 0.07, abs(d - wave))) * (1.0 - wave) * uMotion;
          float alpha = (core + ring * mix(0.35, 0.85, vHQ)) * vDepth;
          if (alpha < 0.004) discard;
          vec3 color = mix(vec3(0.92, 0.96, 0.94), mix(vColor, vec3(1.0), core * 0.5), vHQ);
          gl_FragColor = vec4(color * alpha, alpha);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const hubs = new THREE.Points(hubGeometry, hubMaterial);
    hubs.renderOrder = 6;
    globe.add(hubs);

    // ---------------------------------------------------------------
    // Layout: size and anchor the globe via the camera.
    // ---------------------------------------------------------------
    const layout = { width: 1, height: 1, centerY: 0.5, radiusPx: 1 };
    const tanAlpha = Math.tan(Math.asin(RADIUS / CAMERA_DISTANCE));

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      const containerBounds = container.getBoundingClientRect();
      const slotBounds = slotRef?.current?.getBoundingClientRect() ?? containerBounds;
      const slotHeight = Math.max(1, slotBounds.height);
      // The container reaches up behind the (transparent) navbar, so the globe
      // may rise slightly above the slot; its bottom curve sits just above the
      // copy. The top keeps GLOBE_TOP_GAP px clear of the navbar; GLOBE_DROP is
      // px beyond the slot's bottom.
      const top = slotBounds.top - containerBounds.top + GLOBE_TOP_GAP;
      const bottom = slotBounds.top - containerBounds.top + slotHeight + GLOBE_DROP;
      const radiusPx = Math.max(60, Math.min((bottom - top) / 2, width * (width < 768 ? 0.46 : 0.42), 400));
      const anchor = (bottom - radiusPx) / height;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);

      // Silhouette radius in px = tan(alpha) / tan(fov/2) * height/2.
      camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan((tanAlpha * height) / (2 * radiusPx)));
      camera.aspect = width / height;
      camera.setViewOffset(width, height, 0, (0.5 - anchor) * height, width, height);
      camera.updateProjectionMatrix();

      scaleUniform.value = pixelRatio * (radiusPx / 300);
      Object.assign(layout, { width, height, centerY: anchor * height, radiusPx });
      requestRender();
    };

    // ---------------------------------------------------------------
    // Interaction: drag rotates (only when started over the globe), release
    // keeps momentum, then auto-rotation eases back and the tilt springs home.
    // ---------------------------------------------------------------
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastMoveAt = 0;
    let velocityY = 0; // rad/s around Y
    let velocityX = 0; // rad/s around X
    let targetTilt = BASE_TILT;
    let autoBlend = 1;

    const overGlobe = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const dx = event.clientX - bounds.left - layout.width / 2;
      const dy = event.clientY - bounds.top - layout.centerY;
      return Math.hypot(dx, dy) < layout.radiusPx * 1.12;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !overGlobe(event)) return;
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      lastMoveAt = performance.now();
      velocityX = 0;
      velocityY = 0;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };
    // Grab hand whenever a hovering (non-touch) pointer is over the sphere.
    const updateHoverCursor = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      canvas.style.cursor = overGlobe(event) ? "grab" : "";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) {
        updateHoverCursor(event);
        return;
      }
      const now = performance.now();
      const dt = Math.max(1, now - lastMoveAt) / 1000;
      const scale = 1.6 / layout.radiusPx;
      const dy = (event.clientX - lastX) * scale;
      const dx = (event.clientY - lastY) * scale;
      globe.rotation.y += dy;
      targetTilt = THREE.MathUtils.clamp(targetTilt + dx, -0.7, 0.9);
      velocityY = THREE.MathUtils.lerp(velocityY, THREE.MathUtils.clamp(dy / dt, -6, 6), 0.5);
      velocityX = THREE.MathUtils.lerp(velocityX, THREE.MathUtils.clamp(dx / dt, -4, 4), 0.5);
      lastX = event.clientX;
      lastY = event.clientY;
      lastMoveAt = now;
      autoBlend = 0;
      requestRender();
    };
    const endDrag = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (performance.now() - lastMoveAt > 80) {
        velocityX = 0;
        velocityY = 0;
      }
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      updateHoverCursor(event);
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerenter", updateHoverCursor);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);

    // ---------------------------------------------------------------
    // Visibility and the render loop.
    // ---------------------------------------------------------------
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    if (slotRef?.current) resizeObserver.observe(slotRef.current);
    resize();
    renderer.render(scene, camera);

    const hero = container.closest<HTMLElement>("[data-hero]") ?? container;
    const renderLoop = registerRenderLoop((active) => {
      renderGranted = active;
      if (active) requestRender();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    // Graded thresholds, not just the 0 crossing: the coordinator awards the
    // render budget to whichever canvas fills more of the viewport, so it needs
    // a live ratio rather than a single on/off report at the boundary.
    let viewRatio = 0;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        viewRatio = entry.intersectionRatio;
        renderLoop.setVisibility(inView && !document.hidden, viewRatio);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85, 1] },
    );
    intersectionObserver.observe(hero);
    const onVisibility = () => {
      renderLoop.setVisibility(inView && !document.hidden, viewRatio);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const timer = new THREE.Timer();

    function tick(timestamp: number) {
      frame = 0;
      timer.update(timestamp);
      const delta = Math.min(timer.getDelta(), 0.05);
      const elapsed = timer.getElapsed();
      timeUniform.value = elapsed;

      // The precomputed land dots are present from the first scene render.
      if (!reducedMotion) {
        const t = elapsed;
        assembleUniform.value = THREE.MathUtils.clamp(t / INTRO_DURATION, 0, 1);
        glowUniform.value = THREE.MathUtils.smoothstep(t, INTRO_DURATION * 0.45, INTRO_DURATION * 1.1);
        revealUniform.value = THREE.MathUtils.clamp((t - INTRO_DURATION * 0.85) / 1.2, 0, 1);
      }

      if (!dragging) {
        const damping = Math.exp(-delta * 2.4);
        velocityY *= damping;
        velocityX *= damping;
        globe.rotation.y += velocityY * delta;
        targetTilt = THREE.MathUtils.clamp(targetTilt + velocityX * delta, -0.7, 0.9);
        targetTilt += (BASE_TILT - targetTilt) * (1 - Math.exp(-delta * 0.8));
        autoBlend = Math.min(1, autoBlend + delta * 0.5);
        if (!reducedMotion) globe.rotation.y += AUTO_ROTATE_SPEED * autoBlend * delta;
      }
      globe.rotation.x += (targetTilt - globe.rotation.x) * (1 - Math.exp(-delta * 8));

      renderer.render(scene, camera);
      // Only the loop the coordinator granted keeps itself alive. Without the
      // grant this was a one-off repaint (a resize or a drag) and it stops here.
      if (renderGranted) requestRender();
    }

    function requestRender() {
      if (frame || disposed || document.hidden) return;
      // Off screen and unfunded: nothing to paint, and nothing may self-start.
      if (!inView && !renderGranted) return;
      frame = requestAnimationFrame(tick);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      renderLoop.dispose();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerenter", updateHoverCursor);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      timer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          (object.material as THREE.Material).dispose();
        }
      });
      dotMaterial.dispose(); // in case the atlas never arrived
      renderer.dispose();
    };
  }, [slotRef]);

  return (
    <div
      ref={containerRef}
      className={`select-none ${className}`}
      role="img"
      aria-label="Interactive dotted globe showing PresciaIQ data routes from Sydney and London"
    >
      <canvas ref={canvasRef} className="block h-full w-full touch-pan-y" />
    </div>
  );
}

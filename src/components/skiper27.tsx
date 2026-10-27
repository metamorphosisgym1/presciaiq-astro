import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";

// Register custom cubic-bezier ease for a snappy, fluid deceleration
let skiperEase: string | gsap.EaseFunction = "power4.out";
try {
  gsap.registerPlugin(CustomEase);
  skiperEase = CustomEase.create("skiper27", "0.22, 1, 0.36, 1");
} catch {
  skiperEase = "power4.out";
}

export interface Skiper27Props extends React.HTMLAttributes<HTMLHeadingElement> {
  text?: string;
  children?: React.ReactNode;
  stagger?: number;
  duration?: number;
  staggerFrom?: "center" | "start" | "end";
  className?: string;
}

/**
 * Single Character Split-Half Block (Skiper UI 27)
 * - Parent wrapper uses transform: translateZ(0) to force GPU composite rasterization.
 * - TOP HALF: clip-path: inset(0 0 50% 0), rotates upwards on X (rotateX(-90deg) -> 0deg, transform-origin: bottom)
 * - BOTTOM HALF: clip-path: inset(50% 0 0 0), rotates downwards on X (rotateX(90deg) -> 0deg, transform-origin: top)
 * - Both layers use will-change: transform and backface-visibility: hidden for locked 60fps performance.
 */
export const SplitChar = ({ char }: { char: string }) => (
  <span
    className="skiper27-char-wrapper relative inline-block overflow-hidden [perspective:1000px] align-baseline"
    style={{
      transform: "translateZ(0)",
      WebkitTransform: "translateZ(0)",
      visibility: "visible",
    }}
  >
    {/* TOP HALF: only top 50% visible, rotates from rotateX(-90deg) to 0deg, transform-origin: bottom */}
    <span
      data-split-top
      className="block select-none [transform-style:preserve-3d]"
      style={{
        clipPath: "inset(0 0 50% 0)",
        WebkitClipPath: "inset(0 0 50% 0)",
        transformOrigin: "bottom",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {char}
    </span>

    {/* BOTTOM HALF: only bottom 50% visible, rotates from rotateX(90deg) to 0deg, transform-origin: top */}
    <span
      aria-hidden="true"
      data-split-bottom
      className="absolute inset-0 block select-none [transform-style:preserve-3d]"
      style={{
        clipPath: "inset(50% 0 0 0)",
        WebkitClipPath: "inset(50% 0 0 0)",
        transformOrigin: "top",
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {char}
    </span>
  </span>
);

/**
 * Skiper UI 27 Split-Half Rolling Text Component
 * Fires automatically on page load / mount only (NO scroll triggers).
 * Top and bottom halves tumble simultaneously along the X-axis into place,
 * locking permanently static after the entrance animation finishes.
 */
export const RollingText = React.forwardRef<HTMLHeadingElement, Skiper27Props>(
  (
    {
      text,
      children,
      stagger = 0.018,
      duration = 0.48,
      staggerFrom = "center",
      className,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLHeadingElement>(null);
    const headingRef = (ref as React.RefObject<HTMLHeadingElement>) || localRef;
    const prefersReducedMotion = useReducedMotion();

    const content = text || (typeof children === "string" ? children : "");

    useEffect(() => {
      const el = headingRef.current;
      if (!el || prefersReducedMotion) return;

      const topHalves = el.querySelectorAll("[data-split-top]");
      const bottomHalves = el.querySelectorAll("[data-split-bottom]");
      if (!topHalves.length || !bottomHalves.length) return;

      const ctx = gsap.context(() => {
        // TOP HALF: tumble from rotateX: -90deg, opacity: 0 to rotateX: 0deg, opacity: 1 (origin: bottom)
        gsap.fromTo(
          topHalves,
          {
            rotationX: -90,
            opacity: 0,
            transformOrigin: "bottom",
          },
          {
            rotationX: 0,
            opacity: 1,
            duration: duration,
            ease: skiperEase,
            force3D: true,
            stagger: {
              each: stagger,
              from: staggerFrom,
            },
            clearProps: "transform,willChange",
          }
        );

        // BOTTOM HALF: tumble from rotateX: 90deg, opacity: 0 to rotateX: 0deg, opacity: 1 (origin: top)
        gsap.fromTo(
          bottomHalves,
          {
            rotationX: 90,
            opacity: 0,
            transformOrigin: "top",
          },
          {
            rotationX: 0,
            opacity: 1,
            duration: duration,
            ease: skiperEase,
            force3D: true,
            stagger: {
              each: stagger,
              from: staggerFrom,
            },
            clearProps: "transform,willChange",
          }
        );
      }, el);

      return () => ctx.revert();
    }, [headingRef, prefersReducedMotion, stagger, duration, staggerFrom]);

    const words = content ? content.split(" ") : [];

    return (
      <h1
        ref={headingRef}
        aria-label={content}
        style={{ visibility: "visible" }}
        className={cn(
          "font-serif text-white select-none",
          className
        )}
        {...props}
      >
        {content ? (
          words.map((word, w) => (
            <span
              key={w}
              aria-hidden="true"
              className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0"
              style={{
                marginRight: w === words.length - 1 ? 0 : "0.25em",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                visibility: "visible",
              }}
            >
              {Array.from(word).map((char, c) => (
                <SplitChar key={c} char={char} />
              ))}
            </span>
          ))
        ) : (
          children
        )}
      </h1>
    );
  }
);

RollingText.displayName = "Skiper27RollingText";
export default RollingText;

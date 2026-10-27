"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    description: "[0]",
  },
  {
    name: "Components",
    href: "/components",
    description: "[1]",
  },
  {
    name: "Pricing",
    href: "/pricing",
    description: "[2]",
  },
  {
    name: "How to use",
    href: "/docs/quick-start",
    description: "[3]",
  },
  {
    name: "Account",
    href: "/user",
    description: "[4]",
  },
  {
    name: "Login",
    href: "/login",
    description: "[7]",
  },
];

const STAGGER = 0.018;

export interface TextRollProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "p";
  children?: React.ReactNode;
  text?: string;
  className?: string;
  center?: boolean;
  duration?: number;
  stagger?: number;
}

// Hidden glyphs sit well past one line: a rolled-out word's descenders (and
// the incoming word's ascenders) hang outside the line box, and at 120% they
// still showed through the top and bottom of the word's padded mask.
const OFFSCREEN_BELOW = "160%";
const OFFSCREEN_ABOVE = "-160%";
const EASE = [0.22, 1, 0.36, 1] as const;

export const TextRoll: React.FC<TextRollProps> = ({
  children,
  text,
  className,
  center = true,
  duration = 0.48,
  stagger = STAGGER,
  as: Tag = "h1",
  ...props
}) => {
  const content = text || (typeof children === "string" ? children : "");
  const words = content ? content.split(" ") : [];
  const totalChars = content.replace(/ /g, "").length;
  let charCounter = 0;

  const delayFor = (index: number) =>
    center ? stagger * Math.abs(index - (totalChars - 1) / 2) : stagger * index;

  return (
    <Tag
      aria-label={content}
      className={cn(
        "font-serif text-white text-center font-semibold tracking-[-0.03em] select-none",
        className
      )}
      {...props}
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        animate="animate"
        whileHover="hovered"
        className="inline"
      >
        {words.map((word, w) => {
          const chars = Array.from(word);
          const start = charCounter;
          charCounter += chars.length;

          // Each word is its own mask: when the headline wraps, a glyph rolled
          // one line down stays inside its word instead of landing on the next line.
          return (
            <React.Fragment key={w}>
              <span className="relative -mx-[0.08em] -my-[0.12em] inline-block overflow-hidden whitespace-nowrap px-[0.08em] py-[0.12em] align-top">
                <span className="block">
                  {chars.map((char, c) => (
                    <motion.span
                      key={c}
                      variants={{
                        initial: { y: OFFSCREEN_BELOW, opacity: 0 },
                        animate: { y: 0, opacity: 1 },
                        hovered: { y: OFFSCREEN_ABOVE, opacity: 1 },
                      }}
                      transition={{ duration, ease: EASE, delay: delayFor(start + c) }}
                      // The entrance roll is the CSS animation skiper-roll-in (global.css), so
                      // the headline paints with the HTML instead of after hydration.
                      style={{ animationDuration: `${duration}s`, animationDelay: `${delayFor(start + c)}s` }}
                      className="skiper-roll-in inline-block will-change-transform [backface-visibility:hidden]"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="pointer-events-none absolute inset-x-[0.08em] top-[0.12em] block">
                  {chars.map((char, c) => (
                    <motion.span
                      key={c}
                      variants={{
                        initial: { y: OFFSCREEN_BELOW },
                        animate: { y: OFFSCREEN_BELOW },
                        hovered: { y: 0 },
                      }}
                      transition={{ duration, ease: EASE, delay: delayFor(start + c) }}
                      className="inline-block will-change-transform [backface-visibility:hidden]"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </span>
              {w < words.length - 1 && " "}
            </React.Fragment>
          );
        })}
      </motion.span>
    </Tag>
  );
};

export interface Skiper58Props extends TextRollProps {}

export const Skiper58: React.FC<Skiper58Props> = ({
  text,
  children,
  className,
  ...props
}) => {
  const content = text || (typeof children === "string" ? children : undefined);

  if (content) {
    return (
      <TextRoll center className={className} text={content} {...props}>
        {content}
      </TextRoll>
    );
  }

  return (
    <ul className="bs flex min-h-full w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-7 py-3 backdrop-blur-sm">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-center overflow-visible"
          key={index}
        >
          <div className="relative flex items-start">
            <TextRoll
              center
              className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-5xl"
            >
              {item.name}
            </TextRoll>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Skiper58;


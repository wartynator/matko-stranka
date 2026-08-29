"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Strong ease-out for entrances. Built-in CSS easings are too weak for UI. */
const EASE_OUT = [0.23, 1, 0.32, 1] as const;
/** Strong ease-in-out for on-screen movement and masked reveals. */
const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

/**
 * Scroll reveal. Marketing surfaces only, fires once.
 * Transform strings rather than the x/y shorthands, which are not hardware
 * accelerated and drop frames while the page is still loading.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
}: Readonly<{
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "header";
}>) {
  const reduce = useReducedMotion();
  const Cmp = motion[as];

  return (
    <Cmp
      className={className}
      initial={reduce ? false : { opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </Cmp>
  );
}

/**
 * Masked reveal for display type. The line wipes up from its own baseline rather
 * than sliding in, so the headline reads as being set instead of being moved.
 * Reduced motion keeps the fade and drops the wipe.
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
  onMount = false,
  as = "div",
}: Readonly<{
  children: ReactNode;
  delay?: number;
  className?: string;
  onMount?: boolean;
  as?: "div" | "h1" | "h2";
}>) {
  const reduce = useReducedMotion();
  const Cmp = motion[as];

  const shown = { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" };
  // The mask alone does the reveal. Fading at the same time makes the line
  // arrive late, since it is still near-transparent halfway through the wipe.
  const hidden = reduce
    ? { opacity: 0, clipPath: "inset(0% 0% 0% 0%)" }
    : { opacity: 1, clipPath: "inset(0% 0% 100% 0%)" };

  if (onMount) {
    return (
      <Cmp
        className={className}
        initial={hidden}
        animate={shown}
        transition={{
          duration: reduce ? 0.3 : 0.7,
          delay,
          ease: EASE_OUT,
        }}
      >
        {children}
      </Cmp>
    );
  }

  return (
    <Cmp
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0.3 : 0.6,
        delay,
        ease: reduce ? EASE_OUT : EASE_IN_OUT,
      }}
    >
      {children}
    </Cmp>
  );
}

/**
 * Cinematic settle for a hero image band. Scales down into place rather than
 * wiping, so it does not repeat the headline's reveal.
 */
export function MediaEntrance({
  children,
  delay = 0,
  className,
}: Readonly<{
  children: ReactNode;
  delay?: number;
  className?: string;
}>) {
  const reduce = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(1.06)" }}
        animate={{ opacity: 1, transform: "scale(1)" }}
        transition={{ duration: reduce ? 0.3 : 1.1, delay, ease: EASE_OUT }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Rule that draws itself left to right. Closes the hero entrance sequence. */
export function RuleDraw({
  delay = 0,
  className,
}: Readonly<{ delay?: number; className?: string }>) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden
      className={`block origin-left ${className ?? ""}`}
      initial={reduce ? { opacity: 0 } : { transform: "scaleX(0)" }}
      animate={reduce ? { opacity: 1 } : { transform: "scaleX(1)" }}
      transition={{ duration: reduce ? 0.3 : 0.8, delay, ease: EASE_OUT }}
    />
  );
}

/** Hero entrance. Runs on mount rather than on scroll, since the hero is already in view. */
export function Entrance({
  children,
  delay = 0,
  y = 14,
  className,
}: Readonly<{
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}>) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, transform: `translateY(${y}px)` }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container. 60ms between siblings; never blocks interaction while playing. */
export function RevealList({
  children,
  className,
  stagger = 0.06,
}: Readonly<{
  children: ReactNode;
  className?: string;
  stagger?: number;
}>) {
  const reduce = useReducedMotion();

  return (
    <motion.ul
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.ul>
  );
}

export function RevealItem({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  return (
    <motion.li
      className={className}
      variants={{
        hidden: { opacity: 0, transform: "translateY(18px)" },
        show: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: { duration: 0.55, ease: EASE_OUT },
        },
      }}
    >
      {children}
    </motion.li>
  );
}

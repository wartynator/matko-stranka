"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { credentials } from "@/lib/content";
import { Icon } from "@/components/shared/icons";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Credentials rail.
 * Purpose: state indication. A horizontal rail with no affordance hides half its
 * content, so the edge masks and the arrows report what is still off screen.
 * Scroll position is read from the element, never from a window scroll listener,
 * and state only updates when a boolean actually flips.
 */
export function CredentialRail() {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const reduce = useReducedMotion();

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const start = el.scrollLeft <= 2;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setAtStart((p) => (p === start ? p : start));
    setAtEnd((p) => (p === end ? p : end));
  }, []);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent transition-opacity duration-300 ease-out ${
          atStart ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent transition-opacity duration-300 ease-out ${
          atEnd ? "opacity-0" : "opacity-100"
        }`}
      />

      <motion.ul
        ref={ref}
        onScroll={sync}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        onAnimationComplete={sync}
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 sm:scroll-px-8 sm:px-8"
      >
        {credentials.map((c) => (
          <motion.li
            key={c.title}
            variants={{
              hidden: { opacity: 0, transform: "translateY(18px)" },
              show: {
                opacity: 1,
                transform: "translateY(0px)",
                transition: { duration: 0.55, ease: EASE_OUT },
              },
            }}
            className="group w-[19rem] shrink-0 snap-start rounded-[var(--radius-card)] border border-line bg-surface p-7 transition-[border-color,background-color] duration-300 ease-out hover:border-accent/45 hover:bg-surface-2"
          >
            <Icon
              name={c.icon}
              size={27}
              className="text-accent-text transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
            />
            <h3 className="mt-7 text-[1.08rem] font-medium tracking-[-0.02em] text-ink">
              {c.title}
            </h3>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-2">{c.body}</p>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mx-auto mt-8 flex max-w-[1400px] justify-end gap-2 px-5 sm:px-8">
        <RailButton label="Previous credentials" disabled={atStart} onClick={() => page(-1)}>
          <ArrowLeftIcon size={18} weight="light" />
        </RailButton>
        <RailButton label="Next credentials" disabled={atEnd} onClick={() => page(1)}>
          <ArrowRightIcon size={18} weight="light" />
        </RailButton>
      </div>
    </div>
  );
}

function RailButton({
  label,
  disabled,
  onClick,
  children,
}: Readonly<{
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}>) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded-[var(--radius-control)] border border-line p-3 text-ink transition-[border-color,color,opacity,scale] duration-160 ease-out hover:border-accent hover:text-accent-text active:scale-[0.94] disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
    </button>
  );
}

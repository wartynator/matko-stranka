"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { company, hero, nav } from "@/lib/content";

type Variant = "substation" | "blueprint" | "meridian";

const WORDMARK: Record<Variant, string> = {
  substation: "text-[1.05rem] font-semibold tracking-[-0.02em]",
  blueprint: "text-[1.02rem] font-bold tracking-[-0.03em] uppercase",
  meridian: "text-[1.15rem] font-medium tracking-[0.02em]",
};

export function SiteNav({ variant }: Readonly<{ variant: Variant }>) {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // State indication: the bar takes a surface once the hero is no longer behind it.
  useMotionValueEvent(scrollY, "change", (v) => setLifted(v > 24));

  const floating = variant === "meridian";
  const fill = lifted
    ? "bg-[color-mix(in_srgb,var(--bg)_88%,transparent)]"
    : "bg-transparent";
  const edge = lifted ? "border-line" : "border-transparent";
  const bar =
    "flex items-center justify-between gap-8 border backdrop-blur-xl transition-[background-color,border-color] duration-300 ease-out";
  const barClass = floating
    ? `${bar} pointer-events-auto mx-auto h-[68px] max-w-[1400px] rounded-[var(--radius-control)] border-line px-5 sm:px-7 ${fill}`
    : `${bar} h-[72px] border-x-0 border-t-0 px-5 sm:px-8 ${edge} ${fill}`;
  const headerClass = floating
    ? "pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5"
    : "fixed inset-x-0 top-0 z-50";
  const drawerClass = `pointer-events-auto origin-top border-y border-line bg-surface px-5 py-4 backdrop-blur-xl lg:hidden ${
    floating ? "mt-3 rounded-[var(--radius-card)] border" : ""
  }`;

  return (
    <header className={headerClass}>
      <div className={barClass}>
        <Link href="/" className="flex items-baseline gap-2.5 text-ink">
          <span className={WORDMARK[variant]}>{company.short}</span>
          <span className="hidden text-[0.7rem] font-medium tracking-[0.02em] text-ink-3 sm:inline">
            Power Systems
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.9rem] font-medium text-ink-2 transition-colors duration-200 ease-out hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={company.phoneHref}
            className="hidden text-[0.85rem] font-medium text-ink-2 transition-colors duration-200 ease-out hover:text-ink xl:inline"
          >
            {company.phone}
          </a>
          <a
            href={hero.primaryCta.href}
            className="hidden rounded-[var(--radius-control)] bg-accent px-4.5 py-2.5 text-[0.85rem] font-semibold whitespace-nowrap text-on-accent transition-[background-color,scale] duration-160 ease-out hover:bg-accent-hover active:scale-[0.97] sm:inline-block"
          >
            {hero.primaryCta.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-[var(--radius-control)] border border-line p-2 text-ink transition-[border-color,scale] duration-160 ease-out hover:border-line-strong active:scale-[0.94] lg:hidden"
          >
            {open ? (
              <XIcon size={19} weight="light" />
            ) : (
              <ListIcon size={19} weight="light" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary mobile"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "scaleY(0.94)" }}
            animate={{ opacity: 1, transform: "scaleY(1)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "scaleY(0.94)" }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className={drawerClass}
          >
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-line last:border-0">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 text-[1rem] font-medium text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={hero.primaryCta.href}
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-[var(--radius-control)] bg-accent px-4 py-3 text-center text-[0.9rem] font-semibold text-on-accent transition-transform duration-160 ease-out active:scale-[0.97]"
            >
              {hero.primaryCta.label}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

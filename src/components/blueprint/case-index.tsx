"use client";

import { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "motion/react";
import { caseStudies } from "@/lib/content";
import { Photo } from "@/components/shared/photo";

/**
 * Case-study index.
 * Motivation: on a document-led page the projects should read like a register you
 * open, not a carousel you swipe. One row expands at a time so the comparison
 * stays vertical and the page never scroll-jacks.
 */
export function CaseIndex() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="border-t border-line">
      {caseStudies.map((c, i) => {
        const isOpen = open === i;
        return (
          <article key={c.client} className="border-b border-line">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`case-${i}`}
                className="group flex w-full items-start gap-5 py-7 text-left transition-colors hover:bg-surface-2 sm:gap-8 sm:px-4"
              >
                <span className="mt-1.5 hidden w-40 shrink-0 font-mono text-[0.78rem] text-ink-3 sm:block">
                  {c.sector}
                </span>
                <span className="flex-1">
                  <span className="block text-[1.15rem] leading-[1.25] font-semibold tracking-[-0.02em] text-ink sm:text-[1.45rem]">
                    {c.title}
                  </span>
                  <span className="mt-2 block text-[0.9rem] text-ink-2">
                    {c.client}
                  </span>
                </span>
                <CaretDownIcon
                  size={20}
                  weight="light"
                  className={`mt-1 shrink-0 text-ink-3 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>

            <motion.div
              id={`case-${i}`}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-8 pb-10 sm:px-4 lg:grid-cols-12 lg:gap-10">
                <Photo
                  seed={c.seed}
                  alt={`${c.sector} project for ${c.client}`}
                  sizes="(min-width: 1024px) 30rem, 100vw"
                  tint={30}
                  className="aspect-[16/10] w-full lg:col-span-5 lg:aspect-[4/3]"
                />
                <dl className="grid gap-5 text-[0.95rem] leading-relaxed lg:col-span-4">
                  <div>
                    <dt className="font-mono text-[0.75rem] text-ink-3">Challenge</dt>
                    <dd className="mt-1.5 text-ink-2">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.75rem] text-ink-3">Solution</dt>
                    <dd className="mt-1.5 text-ink-2">{c.solution}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.75rem] text-ink-3">Outcome</dt>
                    <dd className="mt-1.5 text-ink-2">{c.outcome}</dd>
                  </div>
                </dl>
                <div className="grid content-start gap-6 border-t border-line pt-6 lg:col-span-3 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-mono text-[1.7rem] leading-none font-medium text-accent-text">
                        {m.value}
                      </p>
                      <p className="mt-2 text-[0.8rem] text-ink-3">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </article>
        );
      })}
    </div>
  );
}

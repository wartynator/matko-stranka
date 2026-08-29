"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { caseStudies } from "@/lib/content";
import { Photo } from "@/components/shared/photo";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sticky case-study stack.
 * Motivation: storytelling. Each project is given the whole viewport in turn, and
 * the previous one recedes rather than disappears, so the reader keeps a sense of
 * how many are left. Desktop only; touch and reduced motion get a plain stack.
 */
export function CaseStack() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduce || !el) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
        const last = cards.at(-1);
        if (!last) return;

        cards.forEach((card, i) => {
          if (card === last) return;

          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: last,
            end: "top top",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(card, {
            scale: 0.94,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      }, el);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduce]);

  return (
    <div ref={root} className="relative">
      {caseStudies.map((c) => (
        <section
          key={c.client}
          className="stack-card lg:sticky lg:top-0 lg:flex lg:min-h-[100dvh] lg:items-center"
        >
          <div className="mx-auto w-full max-w-[1400px] px-5 py-8 sm:px-8 lg:py-16">
            <article className="grid overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface lg:grid-cols-12">
              <Photo
                seed={c.seed}
                alt={`${c.sector} project for ${c.client}`}
                sizes="(min-width: 1024px) 45vw, 100vw"
                tint={55}
                className="aspect-[16/10] w-full lg:col-span-5 lg:aspect-auto lg:h-full"
              />

              <div className="flex flex-col gap-7 p-7 sm:p-10 lg:col-span-7 lg:p-12">
                <div>
                  <p className="font-mono text-[0.75rem] tracking-[0.12em] text-accent-text uppercase">
                    {c.sector}
                  </p>
                  <h3 className="mt-4 max-w-[24ch] text-[1.5rem] leading-[1.16] font-medium tracking-[-0.03em] text-ink sm:text-[1.9rem] lg:text-[2.1rem]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] text-ink-2">{c.client}</p>
                </div>

                <dl className="grid gap-5 text-[0.95rem] leading-relaxed lg:grid-cols-3 lg:gap-7">
                  <div>
                    <dt className="font-mono text-[0.72rem] tracking-[0.08em] text-ink-3 uppercase">
                      Challenge
                    </dt>
                    <dd className="mt-2 text-ink-2">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.72rem] tracking-[0.08em] text-ink-3 uppercase">
                      Solution
                    </dt>
                    <dd className="mt-2 text-ink-2">{c.solution}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.72rem] tracking-[0.08em] text-ink-3 uppercase">
                      Outcome
                    </dt>
                    <dd className="mt-2 text-ink-2">{c.outcome}</dd>
                  </div>
                </dl>

                <div className="grid grid-cols-3 gap-5 border-t border-line pt-6">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="font-mono text-[1.5rem] leading-none font-medium text-accent-text">
                        {m.value}
                      </p>
                      <p className="mt-2 text-[0.78rem] leading-snug text-ink-3">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>
      ))}
    </div>
  );
}

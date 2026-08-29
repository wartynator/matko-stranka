"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { caseStudies } from "@/lib/content";
import { Photo } from "@/components/shared/photo";

gsap.registerPlugin(ScrollTrigger);

/**
 * Horizontal case-study pan.
 * Motivation: three projects are peers, not a ranked list. Panning sideways keeps
 * them on one plane so the reader compares them instead of scrolling past them.
 * Pinning is desktop-only; touch devices get native scroll-snap, and reduced
 * motion keeps the scroll-snap fallback with no pinning at all.
 */
export function CasePan() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const wrapEl = wrap.current;
    const trackEl = track.current;
    if (reduce || !wrapEl || !trackEl) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const distance = () =>
        Math.max(0, trackEl.scrollWidth - window.innerWidth + 64);

      trackEl.style.overflowX = "visible";
      wrapEl.style.overflowX = "hidden";

      const tween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapEl,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(trackEl, { x: 0 });
        trackEl.style.overflowX = "";
        wrapEl.style.overflowX = "";
      };
    });

    return () => mm.revert();
  }, [reduce]);

  return (
    <div ref={wrap} className="relative lg:h-[100dvh] lg:overflow-hidden">
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 sm:scroll-px-8 sm:px-8 lg:h-full lg:items-center lg:gap-8 lg:pb-0"
      >
        {caseStudies.map((c) => (
          <article
            key={c.client}
            className="flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 sm:w-[70vw] lg:w-[56rem] lg:flex-row"
          >
            <div className="relative lg:w-[42%]">
              <Photo
                seed={c.seed}
                alt={`${c.sector} project for ${c.client}`}
                sizes="(min-width: 1024px) 24rem, 86vw"
                className="h-52 w-full lg:h-full"
                tint={58}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface-2 to-transparent p-5 lg:p-6">
                <p className="text-[0.82rem] font-medium text-ink-2">{c.sector}</p>
                <p className="text-[1.05rem] font-semibold tracking-[-0.01em] text-ink">
                  {c.client}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-6 p-6 sm:p-8 lg:p-9">
              <h3 className="max-w-[26ch] text-[1.4rem] leading-[1.2] font-semibold tracking-[-0.02em] text-ink sm:text-[1.6rem]">
                {c.title}
              </h3>

              <dl className="grid gap-4 text-[0.92rem] leading-relaxed">
                <div>
                  <dt className="font-semibold text-ink">Challenge</dt>
                  <dd className="mt-1 text-ink-2">{c.challenge}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Solution</dt>
                  <dd className="mt-1 text-ink-2">{c.solution}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Outcome</dt>
                  <dd className="mt-1 text-ink-2">{c.outcome}</dd>
                </div>
              </dl>

              <div className="mt-auto grid grid-cols-3 gap-4 border-t border-line pt-5">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-mono text-[1.35rem] leading-none font-medium text-accent-text">
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
        ))}
      </div>
    </div>
  );
}

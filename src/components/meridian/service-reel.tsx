"use client";

import { services } from "@/lib/content";
import { Icon } from "@/components/shared/icons";
import { Photo } from "@/components/shared/photo";

export function ServiceReel() {
  return (
    <div>
      <ul className="border-t border-line">
        {services.map((s) => (
          <li
            key={s.title}
            className="group border-b border-line"
          >
            <a
              href="#contact"
              className="grid gap-4 py-8 transition-transform duration-300 ease-out lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-11 lg:hover:translate-x-2 lg:active:translate-x-1"
            >
              <div className="flex items-center gap-4 lg:col-span-6">
                <Icon
                  name={s.icon}
                  size={26}
                  className="shrink-0 text-accent-text transition-opacity duration-300 ease-out lg:opacity-45 lg:group-hover:opacity-100"
                />
                <h3 className="text-[1.45rem] leading-[1.15] font-medium tracking-[-0.025em] text-ink sm:text-[1.8rem] lg:text-[2.05rem]">
                  {s.title}
                </h3>
              </div>

              <p className="text-[0.98rem] leading-relaxed text-ink-2 lg:col-span-4">
                {s.body}
              </p>

              <ul className="flex flex-wrap gap-2 lg:col-span-2 lg:justify-end">
                {s.points.slice(0, 2).map((p) => (
                  <li
                    key={p}
                    className="rounded-[var(--radius-control)] border border-line px-3 py-1.5 font-mono text-[0.7rem] whitespace-nowrap text-ink-3"
                  >
                    {p}
                  </li>
                ))}
              </ul>

              <Photo
                seed={s.seed}
                alt={s.title}
                sizes="100vw"
                tint={55}
                className="aspect-[16/9] w-full rounded-[var(--radius-card)] border border-line lg:hidden"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

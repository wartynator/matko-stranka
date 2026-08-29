"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Photography slot.
 *
 * Replace every `seed` with commissioned or licensed photography before launch.
 * Assets required, all landscape unless noted:
 *   1. Hero, 2400x1600  Switchroom or LV panel line-up, engineer in view, night
 *   2. Services x6, 1200x900  Riser, switchgear hall, panel inspection, night
 *      response, thermal survey, metering room
 *   3. Case studies x3, 2000x1400  Cold store, retail estate interior, data hall
 *   4. Why-us, 1400x1800 (portrait)  Two engineers reviewing a schematic on site
 *   5. Emergency, 2000x1200  Van and site entrance after dark
 *
 * Until then this renders seeded placeholder photography under a duotone treatment
 * so composition and tonality read correctly. If the network is unavailable the
 * slot degrades to a labelled panel rather than a broken image.
 */
export function Photo({
  seed,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  tint = 62,
  quality = 75,
}: Readonly<{
  seed: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  tint?: number;
  quality?: number;
}>) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative overflow-hidden bg-surface-2 ${className}`}
        role="img"
        aria-label={alt}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-accent/12 via-transparent to-ink/10"
        />
        <div aria-hidden className="grid-rule absolute inset-0 opacity-80" />
        <div className="absolute inset-0 flex items-end p-5">
          <p className="max-w-[40ch] font-mono text-[0.7rem] leading-relaxed text-ink-3">
            Photography slot. {alt}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={`https://picsum.photos/seed/${seed}/1800/1200`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        onError={() => setFailed(true)}
        className="duotone object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-surface mix-blend-color"
        style={{ opacity: tint / 100 }}
      />
    </div>
  );
}

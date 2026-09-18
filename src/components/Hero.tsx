"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { GalleryStage } from "./gallery/GalleryStage";
import { BigStatements } from "./BigStatements";
import { EvolutionShowcase } from "./EvolutionShowcase";

// height (in vh) reserved for the camera's 360° spin, before the page
// content starts scrolling over the still-pinned 3D canvas — short on
// purpose, so the spin feels like a quick turn, not a long dead scroll
const SPIN_VH = 140;
const STATEMENTS_VH = 400; // 4 big statements at 100svh each
const EVOLUTION_VH = 100; // the single big evolving world, still over the 3D

export function Hero() {
  const spinRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const spinWrap = spinRef.current;
    const overlay = overlayRef.current;
    if (!spinWrap || !overlay) return;

    const onScroll = () => {
      const rect = spinWrap.getBoundingClientRect();
      const total = spinWrap.offsetHeight - window.innerHeight;
      const progress =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progressRef.current = progress;

      // fades out early as the spin starts and stays gone for good — once
      // the camera turns away from "1000 worlds", the text doesn't return
      const FADE_OUT_END = 0.16;
      const fade = progress <= FADE_OUT_END ? 1 - progress / FADE_OUT_END : 0;
      overlay.style.opacity = String(fade);
      overlay.style.transform = `translateY(${(1 - fade) * -16}px)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="gallery"
      className="relative"
      style={{ height: `${SPIN_VH + STATEMENTS_VH + EVOLUTION_VH}vh` }}
    >
      {/* 3D canvas — pinned for the whole section, spin + all 4 statements */}
      <div className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-black">
        <GalleryStage progressRef={progressRef} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* scrolling content, overlaid in front of the still-pinned 3D */}
      <div className="absolute inset-0 z-10">
        <div
          ref={spinRef}
          className="relative"
          style={{ height: `${SPIN_VH}vh` }}
        >
          <div className="sticky top-0 flex h-[100svh] w-full flex-col items-center justify-center px-6 text-center">
            <div
              ref={overlayRef}
              className="pointer-events-none flex flex-col items-center"
            >
              <h1
                className="fade-up font-display text-[15vw] leading-[0.92] text-parchment sm:text-[10vw] lg:text-[7.5vw]"
                style={{ animationDelay: "0.1s" }}
              >
                1000 worlds
              </h1>
              <p
                className="fade-up mt-6 max-w-xl text-lg text-parchment-dim italic sm:text-xl"
                style={{ animationDelay: "0.25s" }}
              >
                When the apocalypse is near, the new worlds are already here.
                <br />
                Home to androids, antennas, relays, and whatever remains of
                us.
                <br />
                Claim one before the old world ends.
              </p>
              <div
                className="fade-up pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4"
                style={{ animationDelay: "0.4s" }}
              >
                <Link
                  href="/mint"
                  className="border border-gold/25 px-7 py-3 text-sm tracking-[0.2em] text-parchment-dim uppercase transition-colors hover:border-gold-bright hover:text-gold-bright"
                >
                  mint — coming soon
                </Link>
                <Link
                  href="/whitelist"
                  className="border border-gold bg-gold px-7 py-3 text-sm tracking-[0.2em] text-ink uppercase transition-colors hover:bg-gold-bright hover:border-gold-bright"
                >
                  join whitelist
                </Link>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-[10px] tracking-[0.35em] text-parchment-dim/70 uppercase">
                scroll to look around
              </p>
            </div>
          </div>
        </div>

        <BigStatements />
        <EvolutionShowcase />
      </div>
    </section>
  );
}

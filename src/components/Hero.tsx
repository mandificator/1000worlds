"use client";

import { useEffect, useRef } from "react";
import { GalleryStage } from "./gallery/GalleryStage";
import { scrollToId } from "@/lib/scroll";

export function Hero() {
  const wrapperRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const overlay = overlayRef.current;
    if (!wrapper || !overlay) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const total = wrapper.offsetHeight - window.innerHeight;
      const progress =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progressRef.current = progress;

      const fade = 1 - Math.min(1, progress / 0.16);
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
    <section id="gallery" ref={wrapperRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-ink">
        <GalleryStage progressRef={progressRef} />

        {/* vignette for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.8)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />

        <div
          ref={overlayRef}
          className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <p className="fade-up mb-5 text-xs tracking-[0.5em] text-gold-bright uppercase">
            Fully on-chain NFTs that evolve with every new owner.
          </p>
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
            a world starts almost empty: sky, horizon, ground. every time it
            changes hands, something new appears on its walls.
          </p>
          <div
            className="fade-up pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            <span
              className="cursor-not-allowed border border-gold/25 px-7 py-3 text-sm tracking-[0.2em] text-parchment-dim/60 uppercase"
              title="minting isn't open yet"
            >
              mint — coming soon
            </span>
            <a
              href="#whitelist"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("whitelist");
              }}
              className="border border-gold bg-gold px-7 py-3 text-sm tracking-[0.2em] text-ink uppercase transition-colors hover:bg-gold-bright hover:border-gold-bright"
            >
              join whitelist
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <p className="text-[10px] tracking-[0.35em] text-parchment-dim/70 uppercase">
            scroll to look around
          </p>
        </div>
      </div>
    </section>
  );
}

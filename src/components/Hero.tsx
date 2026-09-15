"use client";

import { GalleryStage } from "./gallery/GalleryStage";
import { scrollToId } from "@/lib/scroll";

export function Hero() {
  return (
    <section
      id="gallery"
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
    >
      <GalleryStage />

      {/* vignette for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.8)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="fade-up mb-5 text-xs tracking-[0.5em] text-gold uppercase">
          on Solana · no servers · no ipfs · no dead links
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
          <a
            href="#mint"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("mint");
            }}
            className="border border-gold bg-gold px-7 py-3 text-sm tracking-[0.2em] text-ink uppercase transition-colors hover:bg-gold-bright hover:border-gold-bright"
          >
            mint
          </a>
          <a
            href="#whitelist"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("whitelist");
            }}
            className="border border-gold/40 px-7 py-3 text-sm tracking-[0.2em] text-parchment uppercase transition-colors hover:border-gold hover:text-gold"
          >
            join whitelist
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="text-[10px] tracking-[0.35em] text-parchment-dim/70 uppercase">
          drag to look around the room
        </p>
      </div>
    </section>
  );
}

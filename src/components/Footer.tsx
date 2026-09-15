"use client";

import { scrollToId } from "@/lib/scroll";

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-ink px-6 py-14 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-display text-lg text-parchment">1000 worlds</p>
        <div className="flex gap-8 text-xs tracking-[0.25em] text-parchment-dim uppercase">
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gold"
          >
            X
          </a>
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("gallery");
            }}
            className="transition-colors hover:text-gold"
          >
            gallery
          </a>
          <a
            href="#mint"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("mint");
            }}
            className="transition-colors hover:text-gold"
          >
            mint
          </a>
        </div>
        <p className="text-xs text-parchment-dim/60">
          no servers · no ipfs · no dead links · on Solana
        </p>
      </div>
    </footer>
  );
}

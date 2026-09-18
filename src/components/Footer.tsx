"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToId } from "@/lib/scroll";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="border-t border-gold/10 bg-ink px-6 py-14 sm:px-10 lg:px-16 xl:px-24">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-display text-lg text-parchment">1000 worlds</p>
        <div className="flex gap-8 text-xs tracking-[0.25em] text-parchment-dim uppercase">
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gold-bright"
          >
            X
          </a>
          {isHome ? (
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("gallery");
              }}
              className="transition-colors hover:text-gold-bright"
            >
              gallery
            </a>
          ) : (
            <Link href="/#gallery" className="transition-colors hover:text-gold-bright">
              gallery
            </Link>
          )}
          <Link href="/whitelist" className="transition-colors hover:text-gold-bright">
            whitelist
          </Link>
        </div>
        <p className="text-xs text-parchment-dim/60">
          no servers · no ipfs · no dead links · on Solana
        </p>
      </div>
    </footer>
  );
}

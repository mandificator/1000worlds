"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WorldsWallet } from "./WorldsWallet";
import { scrollToId } from "@/lib/scroll";

const sectionLinks = [
  { id: "gallery", label: "gallery" },
  { id: "lore", label: "lore" },
  { id: "whitelist", label: "whitelist" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/10 bg-ink/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        {isHome ? (
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(null, "", "#top");
            }}
            className="font-display text-lg tracking-[0.08em] text-parchment"
          >
            1000 worlds
          </a>
        ) : (
          <Link
            href="/"
            className="font-display text-lg tracking-[0.08em] text-parchment"
          >
            1000 worlds
          </Link>
        )}
        <nav className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((l) =>
            isHome ? (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId(l.id);
                }}
                className="text-xs tracking-[0.25em] text-parchment-dim uppercase transition-colors hover:text-gold-bright"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.id}
                href={`/#${l.id}`}
                className="text-xs tracking-[0.25em] text-parchment-dim uppercase transition-colors hover:text-gold-bright"
              >
                {l.label}
              </Link>
            ),
          )}
          <Link
            href="/flywheel"
            className={`text-xs tracking-[0.25em] uppercase transition-colors hover:text-gold-bright ${
              pathname === "/flywheel" ? "text-gold-bright" : "text-parchment-dim"
            }`}
          >
            flywheel
          </Link>
        </nav>
        <WorldsWallet />
      </div>
    </header>
  );
}

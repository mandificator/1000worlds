"use client";

import { WalletButton } from "./WalletButton";
import { scrollToId } from "@/lib/scroll";

const links = [
  { id: "gallery", label: "gallery" },
  { id: "lore", label: "lore" },
  { id: "mint", label: "mint" },
  { id: "whitelist", label: "whitelist" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/10 bg-ink/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
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
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.id);
              }}
              className="text-xs tracking-[0.25em] text-parchment-dim uppercase transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <WalletButton />
      </div>
    </header>
  );
}

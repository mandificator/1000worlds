"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WorldsWallet } from "./WorldsWallet";
import { scrollToId } from "@/lib/scroll";

const routeLinks = [
  { href: "/whitelist", label: "whitelist" },
  { href: "/mint", label: "mint" },
  { href: "/flywheel", label: "flywheel" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/10 bg-ink/60 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16 xl:px-24">
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
          {isHome ? (
            <a
              href="#gallery"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("gallery");
              }}
              className="text-xs tracking-[0.25em] text-parchment-dim uppercase transition-colors hover:text-gold-bright"
            >
              gallery
            </a>
          ) : (
            <Link
              href="/#gallery"
              className="text-xs tracking-[0.25em] text-parchment-dim uppercase transition-colors hover:text-gold-bright"
            >
              gallery
            </Link>
          )}
          {routeLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-xs tracking-[0.25em] uppercase transition-colors hover:text-gold-bright ${
                pathname === l.href ? "text-gold-bright" : "text-parchment-dim"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <WorldsWallet />
      </div>
    </header>
  );
}

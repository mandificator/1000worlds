import Link from "next/link";

const statements = [
  {
    n: "01",
    title: "art on chain",
    body: "Made possible by Solana's v1 upgrade. A full world, one inscription.",
  },
  {
    n: "02",
    title: "evolving NFT",
    body: "Every new owner changes the world. Up to 64 times.",
  },
  {
    n: "03",
    title: "experimental whitelist",
    body: "A dutch auction in $WORLDS. One price for everyone — every token spent is burned.",
    href: "/whitelist",
    linkLabel: "see how it works",
  },
  {
    n: "04",
    title: "passive income NFT",
    body: "Trading fees and royalties pay holders directly. The rest is burned.",
    href: "/flywheel",
    linkLabel: "see the flywheel",
  },
];

export function BigStatements() {
  return (
    <>
      {statements.map((s) => (
        <section
          key={s.n}
          className="flex h-[100svh] w-full flex-col items-center justify-center gap-6 px-6 text-center sm:px-10"
        >
          <span className="font-display text-xl text-gold-bright/70">
            {s.n}
          </span>
          <h2 className="font-display text-[15vw] leading-[0.92] text-parchment sm:text-[9vw] lg:text-[6vw]">
            {s.title}
          </h2>
          <p className="max-w-2xl text-lg text-parchment-dim italic sm:text-2xl">
            {s.body}
          </p>
          {s.href && (
            <Link
              href={s.href}
              className="mt-2 text-xs tracking-[0.25em] text-gold-bright uppercase transition-colors hover:text-parchment"
            >
              {s.linkLabel} →
            </Link>
          )}
        </section>
      ))}
    </>
  );
}

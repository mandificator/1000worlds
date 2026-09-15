export function Lore() {
  return (
    <section id="lore" className="relative bg-ink px-6 py-32 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="divider-rule mx-auto mb-16 w-24" />

        <p className="font-display text-3xl leading-relaxed text-parchment sm:text-4xl md:text-5xl">
          1000 worlds. each one lives fully on Solana.{" "}
          <span className="text-gold italic">no servers, no ipfs,</span> no
          dead links.
        </p>

        <div className="mt-16 grid gap-12 text-lg leading-relaxed text-parchment-dim italic sm:text-xl md:grid-cols-2 md:gap-16">
          <p>
            A world starts almost empty — sky, horizon, ground. Its first
            owner is the founder. Every time it changes hands, it changes.
            Something new appears: a silhouette, a building, someone
            watching. It can land on any of four layers, near or far. No one
            knows where.
          </p>
          <p>
            What appears never disappears. A world can have 64 owners. At the
            64th, it closes — the landscape is complete and never changes
            again. A closed world can still be traded, but it remembers no
            one new. Only its 64 owners ever mattered.
          </p>
        </div>

        <div className="mt-24">
          <img
            src="/lore/evolution.png"
            alt="a single world across 0, 5, 12, 24, 40 and 64 hands"
            width={1208}
            height={1208}
            className="w-full border border-gold/15"
            style={{ imageRendering: "pixelated" }}
          />
          <p className="mt-4 text-center text-xs tracking-[0.3em] text-parchment-dim/70 uppercase">
            one world, at 0 — 5 — 12 — 24 — 40 — 64 hands
          </p>
        </div>
      </div>
    </section>
  );
}

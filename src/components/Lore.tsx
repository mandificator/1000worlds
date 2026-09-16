const features = [
  {
    title: "One world, one transaction.",
    body: "Each world is inscribed in a single transaction. Complete, not split.",
  },
  {
    title: "Inscriptions you can trade.",
    body: "Each world can be owned, sold and transferred like any NFT.",
  },
  {
    title: "It evolves with every new owner.",
    body: "Every new owner changes the world, up to 64 times.",
  },
  {
    title: "Then it closes.",
    body: "After the 64th owner, the world stops changing. It can still be traded, but its final form is fixed forever.",
  },
];

export function Lore() {
  return (
    <section id="lore" className="relative bg-ink px-6 py-32 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="divider-rule mx-auto mb-16 w-24" />

        <p className="text-center text-xs tracking-[0.06em] text-gold-bright uppercase sm:tracking-[0.3em] sm:whitespace-nowrap">
          Fully on-chain NFTs that evolve with every new owner.
        </p>

        <h2 className="mt-20 text-center font-display text-5xl text-parchment sm:text-6xl">
          what&apos;s new
        </h2>

        <div className="mx-auto mt-8 max-w-2xl space-y-6 text-xl leading-relaxed text-parchment-dim italic sm:text-2xl">
          <p>
            Inscriptions on Solana already exist. Data written into a
            transaction stays on-chain forever, but a transaction can&apos;t
            be owned or traded. And until September 15, 2026, any inscription
            over 1,232 bytes had to be split across multiple transactions.
          </p>
          <p>
            Solana&apos;s v1 upgrade raised the limit to{" "}
            <span className="text-parchment not-italic">4,096 bytes</span>.
            1000worlds is built on it.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-6 text-left sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="border border-gold/15 bg-wall p-6">
              <h3 className="font-display text-2xl text-parchment">
                {f.title}
              </h3>
              <p className="mt-2 text-lg text-parchment-dim">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

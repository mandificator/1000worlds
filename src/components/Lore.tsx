import Link from "next/link";

const features = [
  {
    title: "Built on Solana's v1 upgrade.",
    body: "1000worlds is the first collection built on Solana's raised transaction limit — a full world, one inscription, no compromises.",
  },
  {
    title: "It evolves with every owner.",
    body: "Every new owner changes the world, up to 64 times. Then it's fixed forever.",
  },
  {
    title: "An experimental whitelist.",
    body: "No fixed price, no raffle. Everyone deposits together and the price is set live, on-chain.",
  },
  {
    title: "A flywheel in the token.",
    body: "The first NFT collection where trading fees and royalties loop back into $WORLDS holders, automatically.",
    href: "/flywheel",
    linkLabel: "see how it works",
  },
];

export function Lore() {
  return (
    <section id="lore" className="relative bg-ink px-6 py-32 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="divider-rule mx-auto mb-16 w-24" />

        <p className="text-center text-xs tracking-[0.06em] text-gold-bright uppercase sm:tracking-[0.3em] sm:whitespace-nowrap">
          A collection like Solana hasn&apos;t seen before.
        </p>

        <h2 className="mt-20 text-center font-display text-5xl text-parchment sm:text-6xl">
          what&apos;s new
        </h2>

        <div className="mt-8 space-y-6 text-xl leading-relaxed text-parchment-dim italic sm:text-2xl">
          <p>
            This is a collection like no one has made before. Inscriptions
            already exist on Solana — data written into a transaction,
            permanent, but never ownable or tradable — and until Solana&apos;s
            v1 upgrade, anything over 1,232 bytes had to be split across
            several of them. v1 raised that to{" "}
            <span className="text-parchment not-italic">4,096 bytes</span>.
            1000worlds is the first collection built on it.
          </p>
          <p>
            The innovation doesn&apos;t stop there. The whitelist itself is
            experimental — no raffle, no fixed price, just on-chain price
            discovery. And 1000worlds is the first NFT collection with a{" "}
            <Link
              href="/flywheel"
              className="text-parchment not-italic underline decoration-gold-bright/40 underline-offset-4 transition-colors hover:text-gold-bright"
            >
              flywheel
            </Link>{" "}
            built into its own token: trading fees and royalties loop
            straight back into $WORLDS holders.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-6 text-left sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="border border-gold/15 bg-wall p-6">
              <h3 className="font-display text-2xl text-parchment">
                {f.title}
              </h3>
              <p className="mt-2 text-lg text-parchment-dim">{f.body}</p>
              {f.href && (
                <Link
                  href={f.href}
                  className="mt-4 inline-block text-xs tracking-[0.2em] text-gold-bright uppercase transition-colors hover:text-parchment"
                >
                  {f.linkLabel} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

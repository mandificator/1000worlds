"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const tiers = [
  { label: "common", count: 550, tone: "text-parchment-dim" },
  { label: "uncommon", count: 250, tone: "text-parchment" },
  { label: "rare", count: 150, tone: "text-gold-bright" },
  { label: "legendary", count: 50, tone: "text-gold-bright" },
];

export function MintSection() {
  const { publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <section
      id="mint"
      className="relative bg-wall px-6 py-32 md:px-10"
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="divider-rule mx-auto mb-10 w-24" />
        <h2 className="font-display text-5xl text-parchment sm:text-6xl">
          mint
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-parchment-dim italic">
          1000 worlds, minted on Solana as compressed NFTs. Every world begins
          almost empty. What it becomes is written by the hands that hold it.
        </p>

        <div className="mx-auto mt-14 grid max-w-sm grid-cols-2 gap-x-8 gap-y-4 text-left sm:max-w-md">
          {tiers.map((t) => (
            <div
              key={t.label}
              className="flex items-baseline justify-between border-b border-gold/10 pb-2"
            >
              <span className={`text-sm tracking-[0.15em] uppercase ${t.tone}`}>
                {t.label}
              </span>
              <span className="font-display text-lg text-parchment">
                {t.count}
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-sm border border-gold/25 bg-ink/60 px-8 py-10">
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-display text-4xl text-parchment">0</span>
            <span className="text-parchment-dim">/ 1000 minted</span>
          </div>
          <div className="mt-4 h-px w-full bg-gold/15" />
          <p className="mt-4 text-sm tracking-[0.15em] text-parchment-dim uppercase">
            price — to be announced
          </p>

          {publicKey ? (
            <button
              disabled
              className="mt-8 w-full cursor-not-allowed border border-gold/40 bg-gold/20 py-3 text-sm tracking-[0.2em] text-parchment-dim uppercase"
            >
              minting opens soon
            </button>
          ) : (
            <button
              onClick={() => setVisible(true)}
              className="mt-8 w-full border border-gold bg-gold py-3 text-sm tracking-[0.2em] text-ink uppercase transition-colors hover:bg-gold-bright hover:border-gold-bright"
            >
              connect wallet
            </button>
          )}
          <p className="mt-4 text-xs text-parchment-dim/70">
            the mint program is finishing its on-chain review before mainnet.
            connect now to be ready — nothing is charged until minting opens.
          </p>
        </div>
      </div>
    </section>
  );
}

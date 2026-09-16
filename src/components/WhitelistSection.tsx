const steps = [
  {
    n: "01",
    title: "deposit",
    body: "Lock $WORLDS in the whitelist vault. Deposit any amount, as many times as you want.",
  },
  {
    n: "02",
    title: "the price is set",
    body: "When the window closes, one price per world is set: the lowest price at which all 1,000 worlds are taken.",
  },
  {
    n: "03",
    title: "burn and refund",
    body: "For each world you get, that price is burned. Everything above it comes back to you.",
  },
  {
    n: "04",
    title: "mint",
    body: "Mint your worlds for free. You only pay network fees.",
  },
];

const faq = [
  {
    q: "Why does everyone pay the same price?",
    a: "So the leaderboard stays fair. Depositing more gets you more worlds, never a better price.",
  },
  {
    q: "Does splitting my $WORLDS across wallets help?",
    a: "No. Each wallet is rounded down on its own, so splitting can only lose you worlds.",
  },
  {
    q: "What if someone deposits at the last minute?",
    a: "It raises the price for everyone, including them. It doesn't take your worlds away at the price you pay.",
  },
  {
    q: "Can I burn $WORLDS from my wallet directly?",
    a: "It won't count. Only deposits made on this page are counted.",
  },
  {
    q: "Is the mint free?",
    a: "Yes, 0 SOL. You only pay network fees.",
  },
  {
    q: "What happens to the $WORLDS I don't use?",
    a: "It comes back to you. Claim it after the window closes.",
  },
  {
    q: "Who sets the final price?",
    a: "The program. Anyone can submit the price, and the program checks it on-chain. A wrong price is rejected.",
  },
];

export function WhitelistSection() {
  return (
    <section id="whitelist" className="relative bg-ink px-6 py-32 md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <div className="divider-rule mx-auto mb-10 w-24" />

        <span className="inline-block border border-gold/40 px-3 py-1 text-[10px] tracking-[0.3em] text-gold-bright uppercase">
          opens soon
        </span>

        <h2 className="mt-6 font-display text-5xl text-parchment sm:text-6xl">
          get your worlds
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-parchment-dim italic sm:text-xl">
          Deposit $WORLDS. Everyone pays the same price per world. The rest
          comes back to you.
        </p>

        <div className="mx-auto mt-16 grid gap-6 text-left sm:grid-cols-2">
          {steps.map((s) => (
            <div key={s.n} className="border border-gold/15 bg-wall p-6">
              <span className="font-display text-3xl text-gold-bright/70">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-2xl text-parchment">
                {s.title}
              </h3>
              <p className="mt-2 text-lg text-parchment-dim">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-xl border border-gold/25 bg-wall px-8 py-8 text-left">
          <p className="text-xs tracking-[0.25em] text-gold-bright uppercase">
            example
          </p>
          <p className="mt-3 text-lg text-parchment-dim">
            You deposit{" "}
            <span className="text-parchment">430,000 $WORLDS</span>. The
            final price is <span className="text-parchment">100,000</span>.
            <br />
            You get <span className="text-gold-bright">4 worlds</span>.
            400,000 $WORLDS are burned. 30,000 come back to you.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-sm border border-gold/25 bg-wall px-8 py-10">
          <button
            disabled
            className="w-full cursor-not-allowed border border-gold/30 bg-transparent py-3 text-sm tracking-[0.2em] text-parchment-dim uppercase"
          >
            deposits open soon
          </button>
          <p className="mt-4 text-sm text-parchment-dim/70">
            the deposit vault isn&apos;t live yet. this section previews how
            it will work — we&apos;ll open it before mint.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-2xl text-left">
          <h3 className="text-center font-display text-2xl text-parchment">
            faq
          </h3>
          <div className="mt-8 divide-y divide-gold/10 border-y border-gold/10">
            {faq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-parchment">
                  <span className="font-display text-xl">{item.q}</span>
                  <span className="text-gold-bright transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-lg text-parchment-dim">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

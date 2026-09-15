const steps = [
  {
    n: "01",
    title: "connect X",
    body: "link the X account you'll mint with.",
  },
  {
    n: "02",
    title: "post the mark",
    body: "share a short post about 1000 worlds from your account.",
  },
  {
    n: "03",
    title: "you're on the list",
    body: "your wallet is added to the whitelist once the post is seen.",
  },
];

export function WhitelistSection() {
  return (
    <section id="whitelist" className="relative bg-ink px-6 py-32 md:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <div className="divider-rule mx-auto mb-10 w-24" />
        <h2 className="font-display text-5xl text-parchment sm:text-6xl">
          whitelist
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-parchment-dim italic">
          a founder's spot, earned by putting your name on it. connect X,
          post about the collection, and your wallet joins the list.
        </p>

        <div className="mx-auto mt-16 grid gap-6 text-left sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border border-gold/15 bg-wall p-6">
              <span className="font-display text-3xl text-gold/70">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-xl text-parchment">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-parchment-dim">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-sm border border-gold/25 bg-wall px-8 py-10">
          <button
            disabled
            className="w-full cursor-not-allowed border border-gold/30 bg-transparent py-3 text-sm tracking-[0.2em] text-parchment-dim uppercase"
          >
            connect X — coming soon
          </button>
          <p className="mt-4 text-xs text-parchment-dim/70">
            the X connection and the whitelist flow are being wired up. this
            section is a preview of how it will work — we&apos;ll open it
            before mint.
          </p>
        </div>
      </div>
    </section>
  );
}

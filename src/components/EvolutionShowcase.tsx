export function EvolutionShowcase() {
  return (
    <section className="relative flex h-[100svh] w-full items-center justify-center bg-black">
      <img
        src="/lore/evolution.png"
        alt="a single world across 0, 5, 12, 24, 40 and 64 hands"
        width={1208}
        height={1208}
        className="h-full w-full object-contain"
        style={{ imageRendering: "pixelated" }}
      />
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[10px] tracking-[0.35em] text-parchment-dim/70 uppercase">
        one world, at 0 — 5 — 12 — 24 — 40 — 64 hands
      </p>
    </section>
  );
}

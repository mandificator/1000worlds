import { WorldCanvas } from "./WorldCanvas";

const WORLD = { seed: 1035439, phase: 0 }; // #298 · Asfintit, rank 1 legendary

export function EvolutionShowcase() {
  return (
    <section className="relative flex h-[100svh] w-full flex-col items-center justify-center gap-8 bg-black px-6 py-16">
      <div className="aspect-square w-full max-w-xl border border-white/80 bg-black p-1">
        <WorldCanvas seed={WORLD.seed} phase={WORLD.phase} className="block w-full" />
      </div>
      <p className="text-center text-[10px] tracking-[0.35em] text-parchment-dim/70 uppercase">
        one world, live — from 0 to 64 hands, on loop
      </p>
    </section>
  );
}

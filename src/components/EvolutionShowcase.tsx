"use client";

import { useCallback, useState } from "react";
import { WorldCanvas } from "./WorldCanvas";

const WORLD = { seed: 1035439, phase: 0 }; // #298 · Asfintit, rank 1 legendary

export function EvolutionShowcase() {
  const [hands, setHands] = useState(0);
  const onHandsChange = useCallback((h: number) => setHands(h), []);
  const holder = Math.max(1, hands);

  return (
    <section className="relative flex h-[100svh] w-full flex-col items-center justify-center gap-8 bg-black px-6 py-16">
      <div className="aspect-square w-full max-w-xl border border-white/80 bg-black p-1">
        <WorldCanvas
          seed={WORLD.seed}
          phase={WORLD.phase}
          onHandsChange={onHandsChange}
          className="block w-full"
        />
      </div>
      <p className="text-center font-display text-2xl text-parchment sm:text-3xl">
        one world, live — holder{" "}
        <span className="inline-block w-[2ch] text-right text-gold-bright tabular-nums">
          {holder}
        </span>{" "}
        of 64, on loop
      </p>
    </section>
  );
}

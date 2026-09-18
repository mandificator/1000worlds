"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WorldCanvas } from "./WorldCanvas";

const WORLD = { seed: 1035439, phase: 0 };

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { ref, visible };
}

export function EvolutionShowcase() {
  const { ref, visible } = useReveal();
  const [hands, setHands] = useState(0);
  const onHandsChange = useCallback((h: number) => setHands(h), []);
  const holder = Math.max(1, hands);

  return (
    <div className="flex h-[100svh] w-full flex-col items-center justify-center gap-10 px-6 text-center sm:px-10">
      <h2 className="font-display text-4xl text-parchment sm:text-6xl lg:text-7xl">
        each world has 64 stages of evolution
      </h2>
      <div
        ref={ref}
        className={`flex flex-col items-center gap-5 transition-all duration-1000 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        <div className="aspect-square w-[70vw] max-w-xl border-2 border-white bg-black p-1 shadow-[0_0_32px_rgba(255,255,255,0.2)] sm:w-[50vw]">
          <WorldCanvas
            seed={WORLD.seed}
            phase={WORLD.phase}
            onHandsChange={onHandsChange}
            className="block w-full"
          />
        </div>
        <p className="font-display text-xl text-parchment sm:text-2xl">
          holder{" "}
          <span className="inline-block w-[2ch] text-right text-gold-bright tabular-nums">
            {holder}
          </span>{" "}
          of 64
        </p>
      </div>
    </div>
  );
}

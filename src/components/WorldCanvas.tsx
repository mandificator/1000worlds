"use client";

import { useEffect, useRef } from "react";
import { S, scene, fill, render, PALS } from "@/lib/worldEngine";

const STEP_MS = 130; // ms per hand added
const HOLD_STEPS = 14; // pause (in step-units) once a world reaches 64 hands

export function WorldCanvas({
  seed,
  phase = 0,
  className,
}: {
  seed: number;
  phase?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const full = scene(seed);
    fill(full);
    const palette = PALS[full.pal].rgb;
    const imageData = ctx.createImageData(S, S);

    const totalSteps = 64 + HOLD_STEPS;
    let step = phase % totalSteps;
    let acc = 0;
    let raf = 0;
    let last = performance.now();

    const draw = (hands: number) => {
      const sc = { ...full, genes: full.genes.slice(0, 2 + hands) };
      const { buf } = render(sc);
      const data = imageData.data;
      for (let i = 0; i < buf.length; i++) {
        const [r, g, b] = palette[buf[i]];
        const o = i * 4;
        data[o] = r;
        data[o + 1] = g;
        data[o + 2] = b;
        data[o + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    draw(Math.min(step, 64));

    const loop = (now: number) => {
      acc += now - last;
      last = now;
      while (acc >= STEP_MS) {
        acc -= STEP_MS;
        step = (step + 1) % totalSteps;
        draw(Math.min(step, 64));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [seed, phase]);

  return (
    <canvas
      ref={canvasRef}
      width={S}
      height={S}
      className={className}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RefObject } from "react";

const TARGET = new THREE.Vector3(0, 3, 1);
// kept well inside the room's walls (halfWidth 10 / halfDepth 12) at every
// azimuth angle, so the camera never clips through a wall or its frames
// mid-spin (that clipping was the stray white flash cutting through frame)
const RADIUS = 7.5;
const POLAR = 1.533; // ~level, slightly upward — matches the original resting shot
// the spin uses the section's entire scroll range, so the 360° completes
// exactly as this block releases — no dead scroll space, no held moment
// before the page scroll takes over straight into the first statement
const SPIN_END = 1;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function easeInOut(t: number) {
  return t * t * (3 - 2 * t);
}

export function ScrollCamera({
  progressRef,
}: {
  progressRef: RefObject<number>;
}) {
  useFrame(({ camera }) => {
    const p = progressRef.current;

    // a full 360° turn (spin=1 → azimuth=2π) lands the camera back on the
    // exact same spot as azimuth=0, so it always returns to the opening shot
    const spin = easeInOut(clamp01(p / SPIN_END));
    const azimuth = spin * Math.PI * 2;

    const sinPolar = Math.sin(POLAR);
    const x = TARGET.x + RADIUS * sinPolar * Math.sin(azimuth);
    const y = TARGET.y + RADIUS * Math.cos(POLAR);
    const z = TARGET.z - RADIUS * sinPolar * Math.cos(azimuth);

    camera.position.set(x, y, z);
    camera.lookAt(TARGET);
  });

  return null;
}

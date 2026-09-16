"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RefObject } from "react";

const TARGET = new THREE.Vector3(0, 3, 1);
const RADIUS = 10.51;
const POLAR = 1.533; // ~level, slightly upward — matches the original resting shot
const SPIN_END = 0.72; // scroll progress where the 360° spin completes
const DESCEND_TARGET_Y = -3; // how far the camera sinks after the spin

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

    const spin = easeInOut(clamp01(p / SPIN_END));
    const azimuth = spin * Math.PI * 2;

    const descend = easeInOut(clamp01((p - SPIN_END) / (1 - SPIN_END)));
    const y = THREE.MathUtils.lerp(
      TARGET.y + RADIUS * Math.cos(POLAR),
      DESCEND_TARGET_Y,
      descend
    );

    const sinPolar = Math.sin(POLAR);
    const x = TARGET.x + RADIUS * sinPolar * Math.sin(azimuth);
    const z = TARGET.z - RADIUS * sinPolar * Math.cos(azimuth);

    camera.position.set(x, y, z);

    const lookY = THREE.MathUtils.lerp(TARGET.y, TARGET.y - 2.2, descend);
    camera.lookAt(TARGET.x, lookY, TARGET.z);
  });

  return null;
}

"use client";

import { Suspense, useEffect, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { PointLight } from "three";
import { Room } from "./Room";
import { Artwork } from "./Artwork";
import { ScrollCamera } from "./ScrollCamera";
import { wallPlacements } from "./featured";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

// gives each light its own out-of-sync candle/torch-like flicker, forever
function useFlicker(baseIntensity: number, speed = 7, amount = 0.35) {
  const ref = useRef<PointLight>(null);
  const seed = useRef(Math.random() * 100).current;

  useFrame(({ clock }) => {
    const light = ref.current;
    if (!light) return;
    const t = clock.getElapsedTime() * speed + seed;
    const noise =
      Math.sin(t) * 0.5 +
      Math.sin(t * 2.7 + 1.3) * 0.3 +
      Math.sin(t * 5.1 + 4.2) * 0.2;
    light.intensity = baseIntensity * (1 + noise * amount);
  });

  return ref;
}

function SceneLights() {
  const l1 = useFlicker(220);
  const l2 = useFlicker(130);
  const l3 = useFlicker(130);
  const l4 = useFlicker(70);

  return (
    <>
      <hemisphereLight args={["#3d3320", "#000000", 0.25]} />
      <ambientLight intensity={0.06} />
      <pointLight
        ref={l1}
        position={[0, 6, -10.5]}
        intensity={220}
        color="#ffe3a3"
        distance={14}
        decay={2.3}
      />
      <pointLight
        ref={l2}
        position={[-6.5, 6, 0]}
        intensity={130}
        color="#fff0cf"
        distance={12}
        decay={2.3}
      />
      <pointLight
        ref={l3}
        position={[6.5, 6, 0]}
        intensity={130}
        color="#ffd98c"
        distance={12}
        decay={2.3}
      />
      <pointLight
        ref={l4}
        position={[0, 5.5, 6]}
        intensity={70}
        color="#ffe9b8"
        distance={12}
        decay={2.3}
      />
    </>
  );
}

export default function GalleryCanvas({
  progressRef,
}: {
  progressRef: RefObject<number>;
}) {
  const mobile = useIsMobile();

  return (
    <Canvas
      shadows={false}
      dpr={mobile ? 1 : [1, 1.75]}
      gl={{ antialias: !mobile, powerPreference: "high-performance" }}
      camera={{ position: [0, 3.4, -9.5], fov: 70, near: 0.1, far: 60 }}
    >
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 12, 30]} />
      <SceneLights />
      <Suspense fallback={null}>
        <Room mobile={mobile} />
        {wallPlacements.map((placement) => (
          <Artwork key={placement.piece.id} placement={placement} />
        ))}
      </Suspense>
      <ScrollCamera progressRef={progressRef} />
    </Canvas>
  );
}

"use client";

import { Suspense, useEffect, useState, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
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

function SceneLights() {
  return (
    <>
      <hemisphereLight args={["#2a1a3d", "#000000", 0.25]} />
      <ambientLight intensity={0.06} />
      <pointLight
        position={[0, 6, -10.5]}
        intensity={220}
        color="#9945ff"
        distance={14}
        decay={2.3}
      />
      <pointLight
        position={[-6.5, 6, 0]}
        intensity={130}
        color="#9945ff"
        distance={12}
        decay={2.3}
      />
      <pointLight
        position={[6.5, 6, 0]}
        intensity={130}
        color="#14f195"
        distance={12}
        decay={2.3}
      />
      <pointLight
        position={[0, 5.5, 6]}
        intensity={70}
        color="#14f195"
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
      camera={{ position: [0, 3.4, -9.5], fov: 52, near: 0.1, far: 60 }}
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

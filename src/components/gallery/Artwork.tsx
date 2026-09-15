"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import type { WallPlacement } from "./featured";
import { roomBounds, FRAME_BORDER } from "./featured";

export function Artwork({ placement }: { placement: WallPlacement }) {
  const { piece, position, rotationY } = placement;
  const texture = useTexture(piece.file);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
  }, [texture]);

  const size = roomBounds.artSize;
  const frameDepth = 0.09;
  const frameBorder = FRAME_BORDER;

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* frame */}
      <mesh position={[0, 0, -frameDepth / 2]} castShadow>
        <boxGeometry
          args={[size + frameBorder, size + frameBorder, frameDepth]}
        />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={hovered ? 1.6 : 1.05}
          toneMapped={false}
          roughness={0.5}
          metalness={0}
        />
      </mesh>
      {/* artwork */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial
          map={texture}
          emissive={"#ffffff"}
          emissiveMap={texture}
          emissiveIntensity={hovered ? 0.85 : 0.55}
          roughness={0.95}
          metalness={0}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

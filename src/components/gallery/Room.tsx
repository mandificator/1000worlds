"use client";

import { MeshReflectorMaterial } from "@react-three/drei";
import { roomBounds } from "./featured";

export function Room({ mobile = false }: { mobile?: boolean }) {
  const { halfWidth, halfDepth, height } = roomBounds;
  const width = halfWidth * 2;
  const depth = halfDepth * 2;

  return (
    <group>
      {/* floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        {mobile ? (
          <meshStandardMaterial color="#050505" roughness={1} metalness={0} />
        ) : (
          <MeshReflectorMaterial
            blur={[300, 80]}
            resolution={1024}
            mixBlur={1}
            mixStrength={18}
            roughness={0.95}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#000000"
            metalness={0.3}
          />
        )}
      </mesh>

      {/* ceiling */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, height, 0]}
        receiveShadow
      >
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#000000" roughness={1} />
      </mesh>

      {/* back wall */}
      <mesh position={[0, height / 2, -halfDepth]} receiveShadow>
        <boxGeometry args={[width, height, 0.3]} />
        <meshStandardMaterial color="#020202" roughness={0.98} />
      </mesh>

      {/* front wall — blank, no art: the site opens facing this empty
          black wall before you turn around into the gallery */}
      <mesh position={[0, height / 2, halfDepth]} receiveShadow>
        <boxGeometry args={[width, height, 0.3]} />
        <meshStandardMaterial color="#020202" roughness={0.98} />
      </mesh>

      {/* left wall */}
      <mesh position={[-halfWidth, height / 2, 0]} receiveShadow>
        <boxGeometry args={[0.3, height, depth]} />
        <meshStandardMaterial color="#020202" roughness={0.98} />
      </mesh>

      {/* right wall */}
      <mesh position={[halfWidth, height / 2, 0]} receiveShadow>
        <boxGeometry args={[0.3, height, depth]} />
        <meshStandardMaterial color="#020202" roughness={0.98} />
      </mesh>

      {/* skirting glow strip along base of back wall */}
      <mesh position={[0, 0.04, -halfDepth + 0.2]}>
        <boxGeometry args={[width - 1, 0.02, 0.05]} />
        <meshStandardMaterial
          color="#14f195"
          emissive="#14f195"
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

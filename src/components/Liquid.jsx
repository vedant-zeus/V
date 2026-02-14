import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Liquid({ liquidLevel, liquidColor, reacting }) {
  const liquidRef = useRef();

  useFrame((state) => {
    if (liquidRef.current && liquidLevel > 0) {
      liquidRef.current.position.y =
        liquidLevel / 2 +
        Math.sin(state.clock.elapsedTime * 2) * 0.015;
    }
  });

  if (liquidLevel <= 0) return null;

  return (
    <>
      {/* Liquid Body */}
      <mesh ref={liquidRef} position={[0, liquidLevel / 2, 0]}>
        <cylinderGeometry args={[1.4, 1.4, liquidLevel, 64]} />
        <meshPhysicalMaterial
          color={liquidColor}
          transmission={0.4}
          transparent
          opacity={0.9}
          emissive={reacting ? liquidColor : "#000"}
          emissiveIntensity={reacting ? 0.5 : 0}
        />
      </mesh>

      {/* Meniscus */}
      <mesh position={[0, liquidLevel + 0.02, 0]}>
        <circleGeometry args={[1.4, 64]} />
        <meshStandardMaterial
          color={liquidColor}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

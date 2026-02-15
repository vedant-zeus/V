import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function TestTube({ liquidLevel = 1.2, liquidColor = "#3b82f6" }) {
  const liquidRef = useRef();

  useFrame((state) => {
    if (liquidRef.current) {
      liquidRef.current.position.y =
        liquidLevel / 2 - 0.6 +
        Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });

  return (
    <group position={[3, 1, 0]}>
      
      {/* GLASS BODY */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 3, 64, 1, true]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.3}
          roughness={0}
          clearcoat={1}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* CURVED BOTTOM */}
      <mesh position={[0, -1.5, 0]}>
        <sphereGeometry args={[0.5, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          transmission={1}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* LIQUID */}
      <mesh ref={liquidRef}>
        <cylinderGeometry args={[0.45, 0.45, liquidLevel, 64]} />
        <meshPhysicalMaterial
          color={liquidColor}
          transmission={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>

    </group>
  );
}

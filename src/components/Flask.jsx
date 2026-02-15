import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Flask({ liquidLevel = 1.2, liquidColor = "#60a5fa" }) {
  const liquidRef = useRef();

  useFrame((state) => {
    if (liquidRef.current) {
      liquidRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
  });

  return (
    <group position={[-3, 0.8, 0]}>
      
      {/* GLASS BODY */}
      <mesh>
        <coneGeometry args={[1.5, 2.5, 64, 1, true]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.5}
          roughness={0}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* NECK */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.5, 64, 1, true]} />
        <meshPhysicalMaterial
          transmission={1}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* LIQUID INSIDE */}
      <mesh ref={liquidRef} position={[0, -0.3, 0]}>
        <coneGeometry args={[1.3, liquidLevel, 64]} />
        <meshPhysicalMaterial
          color={liquidColor}
          transmission={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

    </group>
  );
}

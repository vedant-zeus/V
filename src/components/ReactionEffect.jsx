import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ReactionEffects({ reacting, liquidLevel }) {
  const glowRef = useRef();

  useFrame((state) => {
    if (reacting && glowRef.current) {
      glowRef.current.scale.x =
        1 + Math.sin(state.clock.elapsedTime * 5) * 0.1;
      glowRef.current.scale.z =
        1 + Math.sin(state.clock.elapsedTime * 5) * 0.1;
    }
  });

  if (!reacting) return null;

  return (
    <mesh ref={glowRef} position={[0, liquidLevel / 2, 0]}>
      <circleGeometry args={[1.5, 64]} />
      <meshStandardMaterial
        color="yellow"
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

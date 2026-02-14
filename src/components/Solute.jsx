import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Solute({ position, color }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && meshRef.current.position.y > 0.5) {
      meshRef.current.position.y -= 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

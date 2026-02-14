import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useLabStore } from "../store/labStore";
import Beaker from "./Beaker";

export default function LabScene() {
  const { liquidLevel, liquidColor, reacting } = useLabStore();

  return (
    <Canvas
      camera={{ position: [0, 2, 6], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Realistic reflections */}
      <Environment preset="warehouse" />

      {/* Lab Table */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#8b5e3c" />
      </mesh>

      {/* Beaker */}
      <Beaker
        liquidLevel={liquidLevel}
        liquidColor={liquidColor}
        reacting={reacting}
      />

      <OrbitControls />
    </Canvas>
  );
}

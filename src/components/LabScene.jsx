import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { useLabStore } from "../store/labStore";

import Beaker from "./Beaker";
import Flask from "./Flask";
import TestTube from "./TestTube";
import Pipette from "./Pipette";

export default function LabScene() {
  const {
    liquidLevel,
    liquidColor,
    reacting,
    selectedApparatus,
  } = useLabStore();

  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 8], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* ---------- LIGHTING (Balanced & Realistic) ---------- */}

      <ambientLight intensity={0.35} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={0.9}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Soft reflection environment */}
      <Environment preset="studio" />

      {/* ---------- LAB TABLE ---------- */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#8b5e3c"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Soft contact shadows under glass */}
      <ContactShadows
        position={[0, -0.99, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={5}
      />

      {/* ---------- APPARATUS RENDERING ---------- */}

      {selectedApparatus === "beaker" && (
        <Beaker
          liquidLevel={liquidLevel}
          liquidColor={liquidColor}
          reacting={reacting}
        />
      )}

      {selectedApparatus === "flask" && (
        <Flask
          liquidLevel={liquidLevel}
          liquidColor={liquidColor}
        />
      )}

      {selectedApparatus === "testtube" && (
        <TestTube
          liquidLevel={liquidLevel}
          liquidColor={liquidColor}
        />
      )}

      {selectedApparatus === "pipette" && (
        <Pipette />
      )}

      {/* ---------- CONTROLS ---------- */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={4}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  );
}

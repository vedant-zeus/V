import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useLabStore } from "../store/labStore";
import * as THREE from "three";

/* ---------------- BUBBLES ---------------- */
function Bubbles({ liquidLevel }) {
  const bubbles = useRef([]);

  useFrame(() => {
    bubbles.current.forEach((bubble) => {
      if (!bubble) return;

      bubble.position.y += 0.012;

      if (bubble.position.y > liquidLevel) {
        bubble.position.y = 0.2;
        bubble.position.x = (Math.random() - 0.5) * 2;
        bubble.position.z = (Math.random() - 0.5) * 2;
      }
    });
  });

  return (
    <>
      {[...Array(25)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (bubbles.current[i] = el)}
          position={[
            (Math.random() - 0.5) * 2,
            Math.random() * liquidLevel,
            (Math.random() - 0.5) * 2,
          ]}
        >
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.35}
            roughness={0.2}
          />
        </mesh>
      ))}
    </>
  );
}

/* ---------------- CONDENSATION ---------------- */
function Condensation() {
  const droplets = useMemo(() => {
    return [...Array(50)].map(() => ({
      x: (Math.random() - 0.5) * 2.8,
      y: Math.random() * 3,
      z: (Math.random() - 0.5) * 2.8,
    }));
  }, []);

  return (
    <>
      {droplets.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color="white"
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </>
  );
}

/* ---------------- BEAKER ---------------- */
export default function Beaker({ liquidLevel, liquidColor, reacting }) {
  const { temperature } = useLabStore();
  const liquidRef = useRef();

  /* Liquid subtle wave */
  useFrame((state) => {
    if (liquidRef.current && liquidLevel > 0) {
      liquidRef.current.position.y =
        liquidLevel / 2 +
        Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });

  return (
    <group>

      {/* OUTER GLASS */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 3, 64, 1, true]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.6}
          roughness={0}
          clearcoat={1}
          transparent
          opacity={0.25}
          color="#ffffff"
        />
      </mesh>

      {/* INNER GLASS (Thickness illusion) */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1.42, 1.42, 3, 64, 1, true]} />
        <meshPhysicalMaterial
          transmission={1}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* RIM */}
      <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#d1d5db"
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* SPOUT */}
      <mesh position={[0.45, 3, 1.4]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.5, 0.08, 0.25]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>

      {/* BASE */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.25, 64]} />
        <meshStandardMaterial
          color="#9ca3af"
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* MEASUREMENT MARKINGS */}
      {[0.5, 1, 1.5, 2, 2.5].map((height, i) => (
        <group key={i}>
          <mesh position={[1.55, height, 0]}>
            <boxGeometry args={[0.15, 0.015, 0.02]} />
            <meshStandardMaterial color="black" />
          </mesh>

          <Text
            position={[1.75, height - 0.05, 0]}
            fontSize={0.12}
            color="black"
            anchorX="left"
          >
            {height * 100} ml
          </Text>
        </group>
      ))}

      {/* LIQUID */}
      {liquidLevel > 0 && (
        <>
          <mesh ref={liquidRef} position={[0, liquidLevel / 2, 0]}>
            <cylinderGeometry args={[1.4, 1.4, liquidLevel, 64]} />
            <meshPhysicalMaterial
              color={liquidColor}
              transmission={0.3}
              transparent
              opacity={0.95}
              roughness={0.15}
              emissive={reacting ? liquidColor : "#000"}
              emissiveIntensity={reacting ? 0.4 : 0}
            />
          </mesh>

          {/* MENISCUS (slightly scaled for curve illusion) */}
          <mesh
            position={[0, liquidLevel + 0.015, 0]}
            scale={[1, 1, 1]}
          >
            <circleGeometry args={[1.42, 64]} />
            <meshStandardMaterial
              color={liquidColor}
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}

      {/* BUBBLES */}
      {reacting && liquidLevel > 0 && (
        <Bubbles liquidLevel={liquidLevel} />
      )}

      {/* CONDENSATION (Cold Reaction) */}
      {temperature < 10 && <Condensation />}

    </group>
  );
}

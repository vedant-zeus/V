export default function Pipette() {
  return (
    <mesh rotation={[0, 0, Math.PI / 4]}>
      <cylinderGeometry args={[0.1, 0.1, 4, 16]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

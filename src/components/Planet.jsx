import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 몽환 우주 색상 팔레트
const planetColors = [
  "#a29bfe", // 연보라
  "#74b9ff", // 하늘 파랑
  "#ffeaa7", // 연노랑
  "#f78fb3", // 몽환 핑크
  "#55efc4", // 민트
];

const Planet = ({
  size = 1,
  position = [0, 0, 0],
  hasRing = false,
  color = null,
  onClick = null, // ✅ 클릭 이벤트 props
}) => {
  const meshRef = useRef();

  // 회전 애니메이션
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  // 랜덤 색상 적용 (color 없으면 랜덤 선택)
  const finalColor =
    color || planetColors[Math.floor(Math.random() * planetColors.length)];

  return (
    <group position={position} onClick={onClick}>
      {/* 행성 */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshPhysicalMaterial
          color={finalColor}
          roughness={0.05}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.05}
          emissive={finalColor}
          emissiveIntensity={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* 고리 */}
      {hasRing && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size + 0.3, size + 0.5, 64]} />
          <meshBasicMaterial
            color="#ffeaa7"
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  );
};

export default Planet;

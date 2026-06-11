'use client';

import { useRef } from 'react';
import { Stars, Float, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/hooks/use-theme';

export function SpaceScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { isDark } = useTheme();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <color attach="background" args={[isDark ? '#0a0f0c' : '#eef2ef']} />
      <Stars
        radius={100}
        depth={50}
        count={isDark ? 5000 : 6500}
        factor={isDark ? 4 : 8}
        saturation={0}
        fade
        speed={isDark ? 1 : 0.6}
        color={isDark ? '#4ade80' : '#000000'}
      />
      <Stars
        radius={70}
        depth={40}
        count={isDark ? 1500 : 2000}
        factor={isDark ? 2 : 4}
        saturation={0}
        fade
        speed={isDark ? 0.5 : 0.3}
        color={isDark ? '#86efac' : '#1a1a1a'}
      />
      {isDark && (
        <>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[2, 0, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={0.2} />
            </mesh>
          </Float>
          <Float speed={2} rotationIntensity={2} floatIntensity={1}>
            <mesh position={[-2, 1, -1]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial color="#3b82f6" emissive="#1d4ed8" emissiveIntensity={0.1} />
            </mesh>
          </Float>
        </>
      )}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </group>
  );
}

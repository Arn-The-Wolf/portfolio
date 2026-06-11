'use client';

import { useRef } from 'react';
import { Stars, Float, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SpaceScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <color attach="background" args={['#0a0f0c']} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
        color="#4ade80"
      />
      <Stars
        radius={70}
        depth={40}
        count={1500}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
        color="#86efac"
      />
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
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </group>
  );
}

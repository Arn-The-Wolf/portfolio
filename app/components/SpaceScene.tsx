'use client';

import { useRef } from 'react';
import { Stars, Float, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/hooks/use-theme';
import { STARFIELD, STAR_LAYERS } from '@/lib/theme-colors';

export function SpaceScene() {
  const groupRef = useRef<THREE.Group>(null);
  const { isDark } = useTheme();
  const palette = isDark ? STARFIELD.dark : STARFIELD.light;
  const layers = isDark ? STAR_LAYERS.dark : STAR_LAYERS.light;
  const [layerA, layerB] = layers;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <color attach="background" args={[palette.background]} />
      <Stars
        key={`stars-a-${isDark ? 'dark' : 'light'}`}
        radius={layerA.radius}
        depth={layerA.depth}
        count={layerA.count}
        factor={layerA.factor}
        saturation={0}
        fade={palette.starFade}
        speed={layerA.speed}
        color={palette.starPrimary}
      />
      <Stars
        key={`stars-b-${isDark ? 'dark' : 'light'}`}
        radius={layerB.radius}
        depth={layerB.depth}
        count={layerB.count}
        factor={layerB.factor}
        saturation={0}
        fade={palette.starFade}
        speed={layerB.speed}
        color={palette.starSecondary}
      />
      <ambientLight intensity={palette.ambient} />
      <pointLight position={[10, 10, 10]} intensity={palette.point} />
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={palette.meshSphere}
            emissive={palette.meshSphereEmissive}
            emissiveIntensity={isDark ? 0.2 : 0.15}
            transparent={!isDark}
            opacity={isDark ? 1 : 0.85}
          />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-2, 1, -1]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color={palette.meshBox}
            emissive={palette.meshBoxEmissive}
            emissiveIntensity={isDark ? 0.1 : 0.12}
            transparent={!isDark}
            opacity={isDark ? 1 : 0.8}
          />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </group>
  );
}

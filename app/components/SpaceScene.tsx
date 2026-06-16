'use client';

import { useRef } from 'react';
import { Stars, Float, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { STARFIELD, STAR_LAYERS } from '@/lib/theme-colors';

const palette = STARFIELD.dark;
const [layerA, layerB] = STAR_LAYERS.dark;

export function SpaceScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <color attach="background" args={[palette.background]} />
      <Stars
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
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-2, 1, -1]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.45, 0.45, 0.45]} />
          <meshStandardMaterial
            color={palette.meshBox}
            emissive={palette.meshBoxEmissive}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </group>
  );
}

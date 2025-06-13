'use client';

import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { GeistMono } from 'geist/font/mono';

export function ClientScene() {
  return (
    <Canvas>
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font={GeistMono.style.fontFamily}
      >
        {"<CLASSIFIED/>"}
      </Text>
    </Canvas>
  );
} 
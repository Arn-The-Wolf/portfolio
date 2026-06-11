"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'

function SolarSystem() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

export function SolarSystemScene() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 15, 25], fov: 45 }}>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.3} 
          maxPolarAngle={Math.PI / 2.2} 
          minPolarAngle={Math.PI / 3}
        />
        <SolarSystem />
      </Canvas>
      {/* Ambient glass overlay so text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
    </div>
  )
}

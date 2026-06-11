"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float, MeshDistortMaterial, Sphere } from "@react-three/drei"
import * as THREE from "three"

function OrbitalRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed
  })
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.5, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  )
}

function Planet({ position, color, size = 0.3 }: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.5
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={ref} args={[size, 32, 32]} position={position}>
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.3} distort={0.2} speed={2} />
      </Sphere>
    </Float>
  )
}

function Scene({ variant = "default" }: { variant?: "default" | "arsenal" | "missions" }) {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.05
  })

  return (
    <group ref={groupRef}>
      <Stars radius={80} depth={60} count={variant === "missions" ? 8000 : 5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4ade80" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#3b82f6" />
      <OrbitalRing radius={3} speed={0.3} color="#22c55e" />
      <OrbitalRing radius={4.5} speed={-0.2} color="#4ade80" />
      {variant === "arsenal" && (
        <>
          <Planet position={[3, 0.5, 0]} color="#4ade80" size={0.25} />
          <Planet position={[-2.5, -0.8, 1]} color="#3b82f6" size={0.2} />
          <Planet position={[0, 2, -2]} color="#a855f7" size={0.18} />
          <Planet position={[-3.5, 0, -1]} color="#f59e0b" size={0.22} />
        </>
      )}
      {variant === "missions" && (
        <>
          <Planet position={[4, 0, 0]} color="#4ade80" size={0.35} />
          <Planet position={[-3, 1.5, -1]} color="#ef4444" size={0.2} />
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[0.6, 1]} />
            <meshStandardMaterial color="#22c55e" wireframe emissive="#22c55e" emissiveIntensity={0.5} />
          </mesh>
        </>
      )}
      {variant === "default" && (
        <Planet position={[2, 0, 0]} color="#4ade80" />
      )}
    </group>
  )
}

export function SpaceHud3D({ variant = "default" }: { variant?: "default" | "arsenal" | "missions" }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 2, 8], fov: 50 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <Scene variant={variant} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  )
}

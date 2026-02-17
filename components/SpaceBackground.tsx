import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const SpaceBackground: React.FC = () => {
  const starsRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Rotate stars slowly
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02;
      starsRef.current.rotation.x += delta * 0.01;
    }
    // Rotate Earth
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }
    // Rotate Clouds slightly faster
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.07;
    }
  });

  return (
    <group>
      <group ref={starsRef}>
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
      </group>
      
      <ambientLight intensity={0.1} />
      {/* Sun light coming from top right */}
      <directionalLight position={[10, 10, 5]} intensity={2.5} color="#ffedd0" />
      {/* Blue fill light from Earth */}
      <directionalLight position={[0, -10, 0]} intensity={1.0} color="#0044ff" />

      {/* EARTH SPHERE - Positioned to create a horizon at the bottom */}
      <group position={[0, -14, -8]} rotation={[0.4, 0, 0.2]}>
        {/* Main Planet Body */}
        <Sphere ref={earthRef} args={[10, 64, 64]}>
          <meshStandardMaterial 
            color="#1c4e9e"
            emissive="#051040"
            emissiveIntensity={0.2}
            roughness={0.8}
            metalness={0.1}
          />
        </Sphere>
        
        {/* Atmosphere Glow (Backside) */}
        <Sphere args={[10.2, 64, 64]}>
          <meshBasicMaterial 
            color="#4da6ff" 
            transparent 
            opacity={0.1} 
            side={THREE.BackSide} 
          />
        </Sphere>

        {/* Cloud Layer (Simulated with a slightly larger transparent sphere) */}
        <Sphere ref={cloudsRef} args={[10.05, 64, 64]}>
           <meshStandardMaterial 
             color="#ffffff"
             transparent
             opacity={0.2}
             roughness={1}
           />
        </Sphere>
      </group>
    </group>
  );
};
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// --- ANNOTATION COMPONENT ---
const Annotation: React.FC<{ position: [number, number, number]; label: string; align?: 'left' | 'right' }> = ({ position, label, align = 'right' }) => {
  return (
    <Html position={position} distanceFactor={15} zIndexRange={[100, 0]}>
      <div className={`flex items-center gap-2 w-max pointer-events-none ${align === 'left' ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 md:w-16 h-[1px] bg-white/80 shadow-[0_0_5px_white] ${align === 'left' ? 'origin-right' : 'origin-left'}`}></div>
        <div className="text-white font-rajdhani font-semibold text-xs md:text-sm bg-black/60 px-2 py-1 rounded border border-white/20 backdrop-blur-sm shadow-lg">
          {label}
        </div>
      </div>
    </Html>
  );
};

export const LVM3Model: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the GLB file
  const { scene } = useGLTF('/3D-hyphen-models/lvm3_rocket.glb');

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 - 2; // -2 offset to center rocket height
      // Very slow rotation to showcase the model
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <OrbitControls 
        enablePan={false} 
        minDistance={5} 
        maxDistance={25} 
        target={[0, 0, 0]}
      />

      {/* Scaled down slightly if the model is 1:1 scale in meters, adjusted position to center */}
      <group ref={groupRef} scale={0.8}>
        <primitive object={scene} />

        {/* === ANNOTATIONS === */}
        {/* Coordinates may need adjustment based on the exact dimensions of your GLB */}
        <Annotation position={[0, 8.5, 0]} label="Crew Escape System (CES)" align="right" />
        <Annotation position={[0.5, 5.5, 0]} label="Orbital Module Fairing" align="right" />
        <Annotation position={[0.8, 1.5, 0]} label="Cryogenic Stage (C25)" align="right" />
        <Annotation position={[1.2, -3.5, 0]} label="Solid Boosters (S200)" align="right" />
        <Annotation position={[0, -4.5, 0]} label="Core Liquid Stage (L110)" align="left" />
      </group>
    </>
  );
};
// Preload removed
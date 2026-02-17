import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// --- ANNOTATION COMPONENT ---
const Annotation: React.FC<{ position: [number, number, number]; label: string; subLabel?: string; align?: 'left' | 'right' }> = ({ position, label, subLabel, align = 'right' }) => {
  return (
    <Html position={position} distanceFactor={10} zIndexRange={[100, 0]}>
      <div className={`flex items-center gap-2 w-[300px] pointer-events-none ${align === 'left' ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 md:w-24 h-[1px] bg-white/80 shadow-[0_0_5px_white] ${align === 'left' ? 'origin-right' : 'origin-left'}`}></div>
        <div className={`flex flex-col ${align === 'left' ? 'items-end text-right' : 'items-start text-left'}`}>
            <div className="text-white font-rajdhani font-semibold text-xs md:text-sm bg-black/60 px-2 py-1 rounded border border-white/20 backdrop-blur-sm shadow-lg whitespace-nowrap">
            {label}
            </div>
            {subLabel && (
                <div className="text-gray-300 font-rajdhani text-[10px] md:text-xs mt-1 bg-black/40 px-1 rounded shadow-md leading-tight max-w-[200px]">
                    {subLabel}
                </div>
            )}
        </div>
      </div>
    </Html>
  );
};

export const CrossSectionModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Load the GLB file
  const { scene } = useGLTF('/3D-hyphen-models/cross_section.glb');

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      // Slight Sway for 3D feel
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05; 
    }
  });

  return (
    <>
      <OrbitControls 
        enablePan={false} 
        minDistance={4} 
        maxDistance={10} 
        target={[0, 0, 0]}
      />
      
      <group ref={groupRef} position={[0, -1, 0]} scale={1.0}>
        <primitive object={scene} />
        
        {/* === ANNOTATIONS === */}
        {/* Ensure these positions match your specific Cross Section model features */}
        <Annotation 
            position={[1.2, 1.2, 0]} 
            label="Air Revitalization" 
            subLabel="CO2 and Odor Removal"
            align="right" 
        />
        <Annotation 
            position={[1.4, 0.4, 0]} 
            label="Pressure Control" 
            subLabel="Oxygen Regulation System"
            align="right" 
        />
        <Annotation 
            position={[1.3, -0.6, 0]} 
            label="Thermal Control" 
            subLabel="Heat & Humidity Management"
            align="right" 
        />
        <Annotation 
            position={[0, -1.4, 0.5]} 
            label="ECLSS Controller" 
            subLabel="Environmental Systems Logic"
            align="left" 
        />
      </group>
    </>
  );
};
// Preload removed
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { ModuleView } from '../types';

// --- ANNOTATION COMPONENT ---
const Annotation: React.FC<{ position: [number, number, number]; label: string; align?: 'left' | 'right'; visible?: boolean }> = ({ position, label, align = 'right', visible = true }) => {
  if (!visible) return null;
  
  return (
    <Html position={position} distanceFactor={10} zIndexRange={[100, 0]}>
      <div className={`flex items-center gap-2 w-max pointer-events-none transition-opacity duration-300 ${align === 'left' ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 md:w-12 h-[1px] bg-white/80 shadow-[0_0_5px_white] ${align === 'left' ? 'origin-right' : 'origin-left'}`}></div>
        <div className="text-white font-rajdhani font-semibold text-xs md:text-sm bg-black/60 px-2 py-1 rounded border border-white/20 backdrop-blur-sm shadow-lg">
          {label}
        </div>
      </div>
    </Html>
  );
};

interface GaganyaanModelProps {
  interactive?: boolean;
  viewMode?: ModuleView;
}

export const GaganyaanModel: React.FC<GaganyaanModelProps> = ({ interactive = true, viewMode = 'FULL' }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the GLB file from the public directory
  const { scene } = useGLTF('/3D-hyphen-models/orbital_module.glb');

  // Animation constants
  const LERP_SPEED = 0.08;

  useFrame((state) => {
     if (groupRef.current) {
        // 1. Idle Floating Animation
        const floatY = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        
        // 2. Auto Rotation (only if not interactive)
        if (!interactive) {
             groupRef.current.rotation.y += 0.005;
        }

        // 3. View Mode Transition Logic (Position & Scale)
        // We move the model itself to frame the camera correctly
        const targetPos = new THREE.Vector3(0, floatY, 0); // Default Center
        let targetScale = interactive ? 1.0 : 1.2; // Base scale

        if (interactive) {
            if (viewMode === 'CREW') {
                // Focus on Top Part: Scale UP and Move DOWN
                targetPos.y = -1.5 + floatY; 
                targetScale = 1.8;
            } else if (viewMode === 'SERVICE') {
                // Focus on Bottom Part: Scale UP and Move UP
                targetPos.y = 1.5 + floatY;
                targetScale = 1.8;
            }
        }

        // Apply smooth transitions
        groupRef.current.position.lerp(targetPos, LERP_SPEED);
        
        const currentScale = groupRef.current.scale.x;
        const nextScale = THREE.MathUtils.lerp(currentScale, targetScale, LERP_SPEED);
        groupRef.current.scale.set(nextScale, nextScale, nextScale);
     }
  });

  // Calculate opacity for annotations based on view mode
  // If we are zoomed into CREW, hide Service labels, and vice versa.
  const showCrewLabels = viewMode === 'FULL' || viewMode === 'CREW';
  const showServiceLabels = viewMode === 'FULL' || viewMode === 'SERVICE';

  return (
    <>
      {interactive && (
        <OrbitControls 
          enablePan={false} 
          minDistance={3} 
          maxDistance={12} 
          target={[0, 0.5, 0]}
        />
      )}
      
      <group ref={groupRef}>
        {/* Render the 3D Model */}
        <primitive object={scene} />

        {/* Annotations - Adjusted positions for a standard sized model */}
        {/* Note: You may need to tweak these [x, y, z] coordinates depending on your exact GLB model size */}
        
        {interactive && (
            <group>
                {/* --- CREW MODULE LABELS (Top) --- */}
                <Annotation 
                    position={[0, 2.2, 0]} 
                    label="Apex Cover" 
                    align="left" 
                    visible={showCrewLabels}
                />
                <Annotation 
                    position={[-0.8, 1.5, 0]} 
                    label="Crew Module Hull" 
                    align="left" 
                    visible={showCrewLabels}
                />
                <Annotation 
                    position={[0.6, 1.2, 0.4]} 
                    label="View Port" 
                    align="right" 
                    visible={showCrewLabels}
                />

                {/* --- SERVICE MODULE LABELS (Bottom) --- */}
                <Annotation 
                    position={[1.2, -0.5, 0]} 
                    label="Solar Arrays" 
                    align="right" 
                    visible={showServiceLabels}
                />
                <Annotation 
                    position={[0.8, -1.5, 0]} 
                    label="Propulsion System" 
                    align="right" 
                    visible={showServiceLabels}
                />
                 <Annotation 
                    position={[-0.8, -1.0, 0]} 
                    label="Service Module Body" 
                    align="left" 
                    visible={showServiceLabels}
                />
            </group>
        )}
      </group>
    </>
  );
};
// Preload removed to avoid immediate crash on missing file
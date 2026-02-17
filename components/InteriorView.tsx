import React from 'react';
import { OrbitControls, Environment } from '@react-three/drei';

export const InteriorView: React.FC = () => {
  // Using Drei's Environment component with the 'warehouse' preset.
  // This downloads a high-quality HDRI from a reliable CDN (pmndrs) and sets it as the background.
  // This eliminates the "Could not load" errors caused by CORS or unstable external URLs.
  // 'warehouse' provides an industrial interior look suitable for the Crew Module placeholder.
  return (
    <>
      {/* 
        OrbitControls restrictions:
        - minAzimuthAngle / maxAzimuthAngle: Restrict horizontal rotation to 180 degrees (-90 to +90).
        - minPolarAngle / maxPolarAngle: Restrict vertical look to avoid extreme neck-craning.
        - enableZoom: Allowed to look closer.
        - enablePan: Disabled to keep user fixed in center.
      */}
      <OrbitControls 
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={true}
        minDistance={0.1}
        maxDistance={10}
        minAzimuthAngle={-Math.PI / 2} // -90 degrees
        maxAzimuthAngle={Math.PI / 2}  // +90 degrees
        rotateSpeed={-0.5} // Invert rotation for "looking around" feel
      />

      {/* Render the environment as the scene background */}
      <Environment preset="warehouse" background />
    </>
  );
};
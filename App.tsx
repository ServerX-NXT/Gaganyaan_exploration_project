import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader, Html } from '@react-three/drei';
import { SpaceBackground } from './components/SpaceBackground';
import { GaganyaanModel } from './components/GaganyaanModel';
import { LVM3Model } from './components/LVM3Model';
import { CrossSectionModel } from './components/CrossSectionModel';
import { InteriorView } from './components/InteriorView';
import { StartScreenOverlay } from './components/StartScreenOverlay';
import { ExplorationUI } from './components/ExplorationUI';
import { ModelErrorBoundary } from './components/ModelErrorBoundary';
import { AppState, ModuleView } from './types';

// Custom Loader specifically for Interior View
const InteriorLoader = () => (
  <Html center zIndexRange={[100, 0]}>
    <div className="flex flex-col items-center justify-center text-center bg-black/90 p-8 rounded-xl border border-cyan-500 shadow-[0_0_30px_rgba(0,240,255,0.3)] min-w-[320px] backdrop-blur-md">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-t-cyan-500 border-r-transparent border-b-cyan-500 border-l-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(0,240,255,0.5)]"></div>
      
      {/* Text */}
      <h2 className="text-cyan-400 font-orbitron text-xl font-bold tracking-widest mb-3 animate-pulse">
        ACCESSING SYSTEM
      </h2>
      <div className="h-[1px] w-20 bg-cyan-500/50 mb-3"></div>
      <p className="text-white font-rajdhani text-lg tracking-wider font-semibold">
        ENTERING GAGANYAAN<br/>CREW MODULE
      </p>
      <p className="text-cyan-200/70 font-rajdhani text-sm tracking-widest mt-2 uppercase">
        Please wait for access...
      </p>
    </div>
  </Html>
);

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.START_SCREEN);
  const [viewMode, setViewMode] = useState<ModuleView>('FULL');

  const handleStart = () => {
    setAppState(AppState.EXPLORATION);
  };

  const handleBack = () => {
    setAppState(AppState.START_SCREEN);
    setViewMode('FULL'); // Reset view when going back
  };

  const handleToggleView = (mode: ModuleView) => {
    // If clicking the currently active mode, and it's not LVM3 (since LVM3 button is explicit), toggle back to FULL
    if (viewMode === mode && mode !== 'LVM3' && mode !== 'CROSS_SECTION' && mode !== 'INTERIOR') {
      setViewMode('FULL');
    } else {
      setViewMode(mode);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
          
          {/* Main Space Scene Suspense */}
          <Suspense fallback={null}>
            {viewMode !== 'INTERIOR' && <SpaceBackground />}
            
            {/* Show Orbital Module (Full/Crew/Service) */}
            {viewMode !== 'LVM3' && viewMode !== 'CROSS_SECTION' && viewMode !== 'INTERIOR' && (
              <ModelErrorBoundary modelName="/3D-hyphen-models/orbital_module.glb">
                <GaganyaanModel 
                  interactive={appState === AppState.EXPLORATION} 
                  viewMode={viewMode}
                />
              </ModelErrorBoundary>
            )}

            {/* Show LVM3 Launch Vehicle */}
            {viewMode === 'LVM3' && (
              <ModelErrorBoundary modelName="/3D-hyphen-models/lvm3_rocket.glb">
                <LVM3Model />
              </ModelErrorBoundary>
            )}

            {/* Show Cross Section View */}
            {viewMode === 'CROSS_SECTION' && (
              <ModelErrorBoundary modelName="/3D-hyphen-models/cross_section.glb">
                <CrossSectionModel />
              </ModelErrorBoundary>
            )}
          </Suspense>

          {/* Independent Suspense for Interior View to show specific text */}
          {viewMode === 'INTERIOR' && (
            <Suspense fallback={<InteriorLoader />}>
              <InteriorView />
            </Suspense>
          )}
            
        </Canvas>
      </div>

      {/* UI Overlay Layer */}
      {appState === AppState.START_SCREEN && (
        <StartScreenOverlay onStart={handleStart} />
      )}

      {appState === AppState.EXPLORATION && (
        <ExplorationUI 
          onBack={handleBack} 
          viewMode={viewMode}
          onToggleView={handleToggleView}
        />
      )}

      {/* Global fallback loader for other assets */}
      <Loader />
    </div>
  );
};

export default App;
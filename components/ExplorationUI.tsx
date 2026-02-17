import React from 'react';
import { Logo } from './Logo';
import { ChevronLeft } from 'lucide-react';
import { ModuleView } from '../types';

interface ExplorationUIProps {
  onBack: () => void;
  viewMode: ModuleView;
  onToggleView: (mode: ModuleView) => void;
}

export const ExplorationUI: React.FC<ExplorationUIProps> = ({ onBack, viewMode, onToggleView }) => {
  
  const isLVM3 = viewMode === 'LVM3';
  const isCrossSection = viewMode === 'CROSS_SECTION';
  const isInterior = viewMode === 'INTERIOR';

  // If in Interior View, we render a minimal UI (Only Back Button)
  if (isInterior) {
    return (
      <div className="absolute inset-0 z-10 flex flex-col pointer-events-none select-none">
        {/* --- LEFT SIDEBAR (Back Button) --- */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[60%] flex items-center">
          <div 
            onClick={() => onToggleView('FULL')} // Go back to main view instead of Home, or onBack for Home
            className="pointer-events-auto cursor-pointer group flex items-center h-full"
          >
            {/* Decorative vertical bar container */}
            <div className="h-full w-12 border-y-2 border-r-2 border-cyan-500/30 rounded-r-xl bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:bg-cyan-900/20 group-hover:border-cyan-500">
              {/* Top decorative shape */}
              <div className="absolute top-0 w-full h-8 border-b border-cyan-500/50 skew-y-12"></div>
              
              <div className="flex flex-col items-center gap-4">
                 {/* Icon */}
                 <ChevronLeft className="text-cyan-400 w-8 h-8 animate-pulse" />
                 
                 {/* Vertical Text */}
                 <span 
                   className="text-white font-orbitron font-bold text-lg tracking-widest whitespace-nowrap pt-8"
                   style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                 >
                   BACK TO EXTERIOR
                 </span>
              </div>

              {/* Bottom decorative shape */}
              <div className="absolute bottom-0 w-full h-8 border-t border-cyan-500/50 -skew-y-12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper to determine Title Text
  const getTitle = () => {
    if (isLVM3) return 'HUMAN RATED LVM3 LAUNCH VEHICLE';
    if (isCrossSection) return 'CREW MODULE CROSS SECTION VIEW';
    return 'GAGANYAAN ORBITAL MODULE';
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col pointer-events-none select-none">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start p-6 md:p-8 pointer-events-auto">
        {/* Left: Logo & Text */}
        <div className="flex items-center gap-4">
          <Logo />
          <div className="flex flex-col text-white">
            <h1 className="text-xl md:text-2xl font-bold font-rajdhani leading-none tracking-wide">
              Regional Science Center, Bhopal
            </h1>
            <p className="text-xs md:text-sm text-gray-300 font-rajdhani mt-1 max-w-md leading-tight">
              (National Council of Science Museums, Ministry of Culture, Govt. of India)
            </p>
          </div>
        </div>

        {/* Right: Language Toggle */}
        <div className="border border-cyan-500/50 bg-black/40 rounded-lg px-4 py-2 flex items-center gap-3 backdrop-blur-sm">
          <span className="text-white font-rajdhani text-lg cursor-pointer hover:text-cyan-400 transition-colors">हिन्दी</span>
          <div className="h-5 w-[1px] bg-cyan-500/50"></div>
          <span className="text-white font-rajdhani font-bold text-lg cursor-pointer hover:text-cyan-400 transition-colors">ENGLISH</span>
        </div>
      </div>

      {/* --- CENTER TITLE --- */}
      <div className="absolute top-24 left-0 w-full text-center pointer-events-none">
        <h1 className="text-2xl md:text-3xl font-black font-orbitron text-white tracking-[0.15em] uppercase drop-shadow-md">
          {getTitle()}
        </h1>
      </div>

      {/* --- LEFT SIDEBAR (Back Button) --- */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[60%] flex items-center">
        <div 
          onClick={onBack}
          className="pointer-events-auto cursor-pointer group flex items-center h-full"
        >
          {/* Decorative vertical bar container */}
          <div className="h-full w-12 border-y-2 border-r-2 border-cyan-500/30 rounded-r-xl bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:bg-cyan-900/20 group-hover:border-cyan-500">
            {/* Top decorative shape */}
            <div className="absolute top-0 w-full h-8 border-b border-cyan-500/50 skew-y-12"></div>
            
            <div className="flex flex-col items-center gap-4">
               {/* Icon */}
               <ChevronLeft className="text-cyan-400 w-8 h-8 animate-pulse" />
               
               {/* Vertical Text */}
               <span 
                 className="text-white font-orbitron font-bold text-lg tracking-widest whitespace-nowrap pt-8"
                 style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
               >
                 BACK TO HOME
               </span>
            </div>

            {/* Bottom decorative shape */}
            <div className="absolute bottom-0 w-full h-8 border-t border-cyan-500/50 -skew-y-12"></div>
          </div>
        </div>
      </div>

      {/* --- LEFT INFO PANEL (Description) --- */}
      <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-80 pointer-events-none">
         <div className="bg-[#040e18]/80 backdrop-blur-md border border-cyan-500 rounded-xl p-6 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <p className="text-white font-rajdhani text-lg leading-relaxed">
              {/* NOTE: Matching text from screenshot exactly, even if it refers to LVM3 on Cross Section screen */}
              {isLVM3 || isCrossSection ? (
                <>
                  LVM3 rocket - The well proven and reliable heavy lift launcher of ISRO, is identified as the launch vehicle for Gaganyaan mission. It consists of solid stage, liquid stage and cryogenic stage. All systems in LVM3 launch vehicle are re-configured to meet human rating requirements and christened Human Rated LVM3. HLVM3 will be capable of launching the Orbital Module to an intended Low Earth Orbit of 400 km.
                </>
              ) : (
                <>
                  Orbital Module (OM) that will be Orbiting Earth comprises of Crew Module (CM) and Service Module (SM).
                  <br/><br/>
                  OM is equipped with state-of-the-art avionics systems with adequate redundancy considering human safety.
                </>
              )}
            </p>
         </div>
      </div>

      {/* --- RIGHT SIDEBAR (Menu) --- */}
      <div className="absolute right-0 top-[15%] bottom-[5%] w-80 md:w-96 px-6 py-2 flex flex-col gap-6 pointer-events-auto overflow-y-auto overflow-x-hidden">
        
        {/* Menu Group 1: Quick Explore */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-orbitron text-sm font-bold tracking-wider mb-2 text-right">
            COMPONENTS QUICK EXPLORE MENU
          </h3>
          
          <button 
            onClick={() => onToggleView('CREW')}
            className={`
              border font-rajdhani font-semibold py-3 px-4 text-right transition-all duration-300 text-sm md:text-base shadow-[0_0_10px_rgba(0,240,255,0.1)] rounded-sm clip-path-polygon
              ${viewMode === 'CREW' 
                ? 'bg-cyan-900/60 border-cyan-400 text-cyan-100' 
                : 'bg-[#0a1525] border-cyan-700/50 text-white hover:bg-cyan-900/40 hover:border-cyan-400'}
            `}
          >
            CREW MODULE
          </button>

          <button 
            onClick={() => onToggleView('SERVICE')}
            className={`
              border font-rajdhani font-semibold py-3 px-4 text-right transition-all duration-300 text-sm md:text-base shadow-[0_0_10px_rgba(0,240,255,0.1)] rounded-sm clip-path-polygon
              ${viewMode === 'SERVICE' 
                ? 'bg-cyan-900/60 border-cyan-400 text-cyan-100' 
                : 'bg-[#0a1525] border-cyan-700/50 text-white hover:bg-cyan-900/40 hover:border-cyan-400'}
            `}
          >
            SERVICE MODULE
          </button>

          <button 
            onClick={() => onToggleView('CROSS_SECTION')}
            className={`
              border font-rajdhani font-semibold py-3 px-4 text-right transition-all duration-300 text-sm md:text-base shadow-[0_0_10px_rgba(0,240,255,0.1)] rounded-sm clip-path-polygon
              ${viewMode === 'CROSS_SECTION'
                ? 'bg-cyan-900/60 border-cyan-400 text-cyan-100' 
                : 'bg-[#0a1525] border-cyan-700/50 text-white hover:bg-cyan-900/40 hover:border-cyan-400'}
            `}
          >
            CROSS-SECTION ORBITAL MODULE VIEW
          </button>

          <button 
             onClick={() => onToggleView('INTERIOR')}
             className={`
              border font-rajdhani font-semibold py-3 px-4 text-right transition-all duration-300 text-sm md:text-base shadow-[0_0_10px_rgba(0,240,255,0.1)] rounded-sm clip-path-polygon
              bg-[#0a1525] border-cyan-700/50 text-white hover:bg-cyan-900/40 hover:border-cyan-400
            `}
          >
            INTERIOR VIEW OF CREW MODULE
          </button>
        </div>

        {/* Menu Group 2: Launch Vehicle / Orbital Module Toggle */}
        <div className="flex flex-col items-end gap-1 mt-4">
           {/* Toggle Image */}
           <div 
             className="w-24 h-48 relative mb-2 cursor-pointer transition-transform hover:scale-105"
             onClick={() => onToggleView(isLVM3 ? 'FULL' : 'LVM3')}
           >
              <img 
                src={isLVM3 
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Gaganyaan_crew_module_mockup.jpg/320px-Gaganyaan_crew_module_mockup.jpg" // Orbital Module Image
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/GSLV_Mk_III_D1_launch_vehicle_on_the_pad.jpg/220px-GSLV_Mk_III_D1_launch_vehicle_on_the_pad.jpg" // LVM3 Image
                }
                alt={isLVM3 ? "Orbital Module" : "LVM3 Launch Vehicle"}
                className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] mask-image-gradient"
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
              />
           </div>
           
           <button 
             onClick={() => onToggleView(isLVM3 ? 'FULL' : 'LVM3')}
             className={`
               w-full border font-rajdhani font-semibold py-3 px-4 text-center transition-all rounded-sm
               bg-[#0a1525] border-cyan-700/50 text-white hover:bg-cyan-900/40 hover:border-cyan-400
             `}
           >
             {isLVM3 ? "GAGANYAAN ORBITAL MODULE" : "HUMAN RATED LVM3 LAUNCH VEHICLE"}
           </button>
        </div>

        {/* Menu Group 3: Mission Stages */}
        <div className="flex flex-col items-end gap-1 mt-auto">
          <h3 className="text-white font-orbitron text-sm font-bold tracking-wider mb-1 text-right uppercase">
            EXPLORE GAGAN YAAN MISSION STAGES
          </h3>
           <div className="w-full h-32 bg-black/50 border border-gray-600 rounded-lg relative overflow-hidden cursor-pointer hover:border-cyan-400 transition-colors group">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gaganyaan_mission_profile.svg/640px-Gaganyaan_mission_profile.svg.png" 
                alt="Mission Profile"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-2 right-2 text-[10px] text-cyan-500 font-mono">Tap to View</div>
           </div>
        </div>

      </div>

      {/* --- VERSION INFO --- */}
      <div className="absolute bottom-4 left-6 pointer-events-none">
        <p className="text-white font-orbitron font-bold text-sm tracking-wider opacity-50">
           VERSION 1.0
        </p>
      </div>

    </div>
  );
};
import React from 'react';
import { Logo } from './Logo';

interface StartScreenOverlayProps {
  onStart: () => void;
}

export const StartScreenOverlay: React.FC<StartScreenOverlayProps> = ({ onStart }) => {
  return (
    <div 
      className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-10 cursor-pointer select-none overflow-hidden"
      onClick={onStart}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      >
        <source src="http://serverx.in/rsc-assets/gaganyaan-screen-background.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay to ensure text readability - Increased opacity to 70% */}
      <div className="absolute inset-0 bg-black/70 -z-10"></div>

      {/* Header Section */}
      <div className="flex justify-between items-start animate-slide-up">
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

      {/* Center Main Title Section (Absolute Centered visually relative to viewport bottom-ish) */}
      <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 animate-fade-in delay-200">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-orbitron text-white tracking-widest drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] uppercase">
          GAGAN YAAN EXPLORATION
        </h1>
        <p className="text-cyan-glow font-orbitron text-xs md:text-base lg:text-lg tracking-[0.2em] mt-2 uppercase font-bold drop-shadow-md">
          Explore the gagan yaan orbital module in 3D and experience mission
        </p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-end w-full mt-auto relative animate-fade-in delay-500">
        {/* Bottom Center: Tap to Start */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4">
          <p className="text-white font-orbitron font-bold text-sm md:text-lg tracking-widest animate-pulse-slow">
            TAP ANYWHERE TO START
          </p>
        </div>

        {/* Bottom Right: Version */}
        <div className="ml-auto">
             <p className="text-white font-orbitron font-bold text-sm tracking-wider">
               VERSION 1.0
             </p>
        </div>
      </div>

      {/* Right Side Vertical Text */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 origin-right translate-x-4">
         <p 
           className="text-gray-400 text-[10px] md:text-xs font-rajdhani whitespace-nowrap"
           style={{ 
             writingMode: 'vertical-rl', 
             transform: 'rotate(180deg)',
             letterSpacing: '0.05em'
           }}
         >
           The visuals are presented by Regional Science Centre Bhopal<br/>
           based on the researches and available online/offline materials.
         </p>
      </div>
      
      {/* Decorative gradient overlay at bottom to ensure text readability */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent -z-10 pointer-events-none"></div>
    </div>
  );
};
import React from 'react';

// Using a placeholder SVG that mimics the circular logo in the screenshot
export const Logo: React.FC = () => {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
      <div className="absolute inset-0 bg-red-700 rounded-full border-2 border-white flex items-center justify-center shadow-lg shadow-red-900/50">
        <div className="text-white text-[8px] md:text-[10px] text-center font-bold leading-tight px-1">
          Regional Science Center<br/>Bhopal
        </div>
      </div>
      <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-black text-[8px] font-bold px-1 rounded">
        31st
      </div>
    </div>
  );
};
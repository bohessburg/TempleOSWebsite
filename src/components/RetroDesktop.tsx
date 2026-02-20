import React from 'react';
interface RetroDesktopProps {
  children: React.ReactNode;
}
export function RetroDesktop({ children }: RetroDesktopProps) {
  return (
    <div className="fixed inset-0 w-full h-full pt-8 pb-10 overflow-hidden bg-tos-white text-tos-black font-retro cursor-crosshair">
      {/* Windows Container */}
      <div className="relative w-full h-full p-4 md:p-0 overflow-auto md:overflow-visible z-10">
        {children}
      </div>
    </div>);

}
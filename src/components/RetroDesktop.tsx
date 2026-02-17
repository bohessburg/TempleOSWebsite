import React from 'react';
interface RetroDesktopProps {
  children: React.ReactNode;
}
export function RetroDesktop({ children }: RetroDesktopProps) {
  return (
    <div className="fixed inset-0 w-full h-full pt-8 pb-10 overflow-hidden bg-tos-white text-tos-black font-retro cursor-crosshair">
      {/* Background Grid/Pattern (Optional subtle hint of structure) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
          'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />


      {/* Desktop Icons Area - ASCII Style */}
      <div className="absolute top-12 left-4 flex flex-col space-y-8 z-0">
        {['My Computer', 'Bin', 'Network'].map((label, i) =>
        <div
          key={label}
          className="flex flex-col items-center group cursor-pointer w-24">

            <div className="w-16 h-12 mb-1 border-2 border-tos-black bg-tos-white flex items-center justify-center shadow-none group-hover:bg-tos-blue group-hover:text-tos-white transition-none">
              <span className="text-2xl font-bold">
                {i === 0 ? '[PC]' : i === 1 ? '[BIN]' : '[NET]'}
              </span>
            </div>
            <span className="text-tos-black bg-tos-white px-1 text-xl group-hover:bg-tos-blue group-hover:text-tos-white">
              {label}
            </span>
          </div>
        )}
      </div>

      {/* Windows Container */}
      <div className="relative w-full h-full p-4 md:p-0 overflow-auto md:overflow-visible z-10">
        {children}
      </div>
    </div>);

}
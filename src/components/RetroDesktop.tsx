import React from 'react';
import { ColorText } from './ColorText';

const ICON_GLYPHS: Record<string, string> = {
  about: '[USR]',
  projects: '[DIR]',
  interests: '[TXT]',
  contact: '[MSG]',
  oracle: '[???]',
};

interface RetroDesktopProps {
  children: React.ReactNode;
  windows: Array<{
    id: string;
    title: string;
    isOpen: boolean;
  }>;
  onOpenWindow: (id: string) => void;
}
export function RetroDesktop({ children, windows, onOpenWindow }: RetroDesktopProps) {
  return (
    <div className="fixed inset-0 w-full h-full pt-8 pb-10 overflow-hidden bg-tos-white text-tos-black font-retro cursor-crosshair">
      {/* Windows Container */}
      <div className="relative w-full h-full p-4 md:p-0 overflow-auto md:overflow-visible pointer-events-none [&>*]:pointer-events-auto">
        {children}
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-12 left-4 flex flex-col space-y-6" style={{ zIndex: 5 }}>
        {windows.map((w) =>
          <div
            key={w.id}
            onDoubleClick={() => onOpenWindow(w.id)}
            className="flex flex-col items-center group cursor-pointer w-24 select-none">
            <div className="w-16 h-12 mb-1 border-2 border-tos-black bg-tos-white flex items-center justify-center group-hover:bg-tos-blue group-hover:text-tos-white transition-none">
              <span className="text-lg font-bold">
                <ColorText>{ICON_GLYPHS[w.id] || '[FILE]'}</ColorText>
              </span>
            </div>
            <span className="text-tos-black bg-tos-white px-1 text-sm group-hover:bg-tos-blue group-hover:text-tos-white transition-none">
              {w.title}
            </span>
          </div>
        )}
      </div>
    </div>);

}

import React, { useState, useRef, useEffect } from 'react';
interface TaskbarProps {
  windows: Array<{
    id: string;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
  }>;
  onRestore: (id: string) => void;
}
export function Taskbar({ windows, onRestore }: TaskbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="fixed bottom-0 left-0 w-full h-10 bg-tos-white border-t-2 border-tos-black flex items-center px-1 z-50 font-retro text-xl">
      {/* Start Button + Menu */}
      <div ref={menuRef} className="relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`flex items-center px-3 py-1 mr-2 border-2 border-tos-black focus:outline-none transition-none ${menuOpen ? 'bg-tos-blue text-tos-white' : 'bg-tos-white text-tos-black hover:bg-tos-blue hover:text-tos-white active:bg-tos-black active:text-tos-white'}`}>
          <span className="font-bold tracking-wide">[MENU]</span>
        </button>

        {menuOpen &&
          <div className="absolute bottom-full left-0 mb-1 bg-tos-white border-2 border-tos-black min-w-[200px] z-[100]">
            {windows.map((w) =>
              <button
                key={w.id}
                onClick={() => {
                  onRestore(w.id);
                  setMenuOpen(false);
                }}
                className="w-full text-left px-2 py-1 hover:bg-tos-blue hover:text-tos-white flex items-center justify-between transition-none">
                <span>{w.title}</span>
                <span className="text-sm">
                  {!w.isOpen ? '[CLOSED]' : w.isMinimized ? '[MIN]' : '[OPEN]'}
                </span>
              </button>
            )}
          </div>
        }
      </div>

      {/* Divider */}
      <div className="w-0.5 h-6 bg-tos-black mx-2" />

      {/* Window Buttons */}
      <div className="flex-1 flex items-center space-x-2 overflow-x-auto px-1 scrollbar-hide">
        {windows.
        filter((w) => w.isOpen).
        map((window) =>
        <button
          key={window.id}
          onClick={() => onRestore(window.id)}
          className={`
              flex items-center px-2 py-1 min-w-[120px] max-w-[200px] h-8 truncate
              border-2 focus:outline-none transition-none
              ${!window.isMinimized ? 'bg-tos-blue text-tos-white border-tos-black' : 'bg-tos-white text-tos-black border-tos-black hover:bg-tos-cyan'}
            `}>

              <span className="truncate w-full text-left">{window.title}</span>
            </button>
        )}
      </div>
    </div>);

}

import React from 'react';
interface TaskbarProps {
  windows: Array<{
    id: string;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
  }>;
  onRestore: (id: string) => void;
  onStartClick: () => void;
}
export function Taskbar({ windows, onRestore, onStartClick }: TaskbarProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-10 bg-tos-white border-t-2 border-tos-black flex items-center px-1 z-50 font-retro text-xl">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className="flex items-center px-3 py-1 mr-2 bg-tos-white border-2 border-tos-black hover:bg-tos-blue hover:text-tos-white active:bg-tos-black active:text-tos-white focus:outline-none transition-none">

        <span className="font-bold tracking-wide">[MENU]</span>
      </button>

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
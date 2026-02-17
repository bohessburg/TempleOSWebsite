import React from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
interface RetroWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize?: () => void;
  zIndex: number;
  onFocus: () => void;
  children: React.ReactNode;
  initialPosition?: {
    x: number;
    y: number;
  };
  width?: string;
}
export function RetroWindow({
  id,
  title,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onMaximize,
  zIndex,
  onFocus,
  children,
  initialPosition = {
    x: 20,
    y: 20
  },
  width = 'w-96'
}: RetroWindowProps) {
  // Mobile check
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const dragControls = useDragControls();
  return (
    <AnimatePresence>
      {isOpen && !isMinimized &&
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        transition={{
          duration: 0
        }} // Instant transition
        drag={!isMobile}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        className={`absolute ${isMobile ? 'relative w-full mb-4 mx-auto' : width} flex flex-col bg-tos-white border-2 border-tos-black shadow-none`}
        style={{
          zIndex,
          left: isMobile ? 0 : initialPosition.x,
          top: isMobile ? 0 : initialPosition.y
        }}
        onClick={onFocus}>

          {/* Title Bar - TempleOS Style: Solid Blue, White Text */}
          <div
            onPointerDown={(e) => { if (!isMobile) dragControls.start(e); }}
            className="flex items-center justify-between px-1 py-1 bg-tos-blue text-tos-white cursor-grab active:cursor-grabbing select-none border-b-2 border-tos-black h-8">
            <div className="flex items-center space-x-2 pl-1">
              <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-tos-white hover:bg-tos-red hover:text-tos-white px-1 font-bold focus:outline-none"
              aria-label="Close">

                [X]
              </button>
            </div>

            <span className="font-bold tracking-widest text-xl uppercase truncate px-2">
              {title}
            </span>

            <div className="flex items-center space-x-2 pr-1">
              <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="text-tos-white hover:bg-tos-cyan hover:text-tos-black px-1 font-bold focus:outline-none"
              aria-label="Minimize">

                [_]
              </button>
              <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize?.();
              }}
              className="text-tos-white hover:bg-tos-cyan hover:text-tos-black px-1 font-bold focus:outline-none"
              aria-label="Maximize">

                [↑]
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div className="flex-1 p-0 bg-tos-white text-tos-black overflow-hidden">
            <div className="h-full p-2 overflow-y-auto max-h-[60vh] font-retro text-xl">
              {children}
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}
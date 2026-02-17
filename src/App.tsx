import React, { useState } from 'react';
import { RetroDesktop } from './components/RetroDesktop';
import { RetroWindow } from './components/RetroWindow';
import { MenuBar } from './components/MenuBar';
import { Taskbar } from './components/Taskbar';
// Types
type WindowId = 'about' | 'projects' | 'interests' | 'contact' | 'oracle';
interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  initialPos: {
    x: number;
    y: number;
  };
  width: string;
}
const GOD_WORDS = [
'CREATE',
'LIGHT',
'CODE',
'HOLY',
'TEMPLE',
'SYSTEM',
'COMPILER',
'DIVINE',
'SPIRIT',
'TRUTH',
'WITNESS',
'OFFERING',
'COMMAND',
'SHEPHERD',
'FLOCK',
'HYMN',
'PSALM',
'VISION',
'PROPHET',
'KING'];

const ORACLE_WORDS = [
'CREATE',
'LIGHT',
'CODE',
'KERNEL',
'SYSTEM',
'COMPILER',
'MEMORY',
'PROCESS',
'TRUTH',
'BINARY',
'STACK',
'COMMAND',
'THREAD',
'SIGNAL',
'RENDER',
'PARSE',
'EXECUTE',
'VISION',
'POINTER',
'LOOP'];

export function App() {
  const [windows, setWindows] = useState<WindowState[]>([
  {
    id: 'about',
    title: 'About.HC',
    isOpen: true,
    isMinimized: false,
    zIndex: 1,
    initialPos: {
      x: 40,
      y: 60
    },
    width: 'w-[400px]'
  },
  {
    id: 'projects',
    title: 'Projects.HC',
    isOpen: true,
    isMinimized: false,
    zIndex: 2,
    initialPos: {
      x: 460,
      y: 80
    },
    width: 'w-[450px]'
  },
  {
    id: 'interests',
    title: 'Interests.HC',
    isOpen: true,
    isMinimized: false,
    zIndex: 3,
    initialPos: {
      x: 80,
      y: 400
    },
    width: 'w-[320px]'
  },
  {
    id: 'contact',
    title: 'Contact.HC',
    isOpen: true,
    isMinimized: false,
    zIndex: 4,
    initialPos: {
      x: 500,
      y: 450
    },
    width: 'w-[350px]'
  },
  {
    id: 'oracle',
    title: 'Oracle.HC',
    isOpen: false,
    isMinimized: false,
    zIndex: 5,
    initialPos: {
      x: 300,
      y: 200
    },
    width: 'w-[300px]'
  }]
  );
  const [topZIndex, setTopZIndex] = useState(10);
  const [godWord, setGodWord] = useState('PRESS F7 FOR WORD');
  const [oracleWord, setOracleWord] = useState('PRESS F7 FOR WORD');
  const focusWindow = (id: WindowId) => {
    setTopZIndex((prev) => prev + 1);
    setWindows((prev) =>
    prev.map((w) =>
    w.id === id ?
    {
      ...w,
      zIndex: topZIndex + 1,
      isMinimized: false
    } :
    w
    )
    );
  };
  const toggleMinimize = (id: WindowId) => {
    setWindows((prev) =>
    prev.map((w) =>
    w.id === id ?
    {
      ...w,
      isMinimized: !w.isMinimized
    } :
    w
    )
    );
  };
  const closeWindow = (id: WindowId) => {
    setWindows((prev) =>
    prev.map((w) =>
    w.id === id ?
    {
      ...w,
      isOpen: false
    } :
    w
    )
    );
  };
  const openWindow = (id: WindowId) => {
    setTopZIndex((prev) => prev + 1);
    setWindows((prev) =>
    prev.map((w) =>
    w.id === id ?
    {
      ...w,
      isOpen: true,
      isMinimized: false,
      zIndex: topZIndex + 1
    } :
    w
    )
    );
  };
  const handleStartClick = () => {
    const oracleWindow = windows.find((w) => w.id === 'oracle');
    if (oracleWindow?.isOpen) {
      closeWindow('oracle');
    } else {
      openWindow('oracle');
    }
  };
  const generateGodWord = () => {
    const randomWord = GOD_WORDS[Math.floor(Math.random() * GOD_WORDS.length)];
    setGodWord(randomWord);
  };
  const generateOracleWord = () => {
    const randomWord =
    ORACLE_WORDS[Math.floor(Math.random() * ORACLE_WORDS.length)];
    setOracleWord(randomWord);
  };
  return (
    <div className="h-screen w-screen overflow-hidden font-retro text-tos-black select-none bg-tos-white">
      <MenuBar />

      <RetroDesktop>
        {/* About Me Window */}
        <RetroWindow
          {...windows.find((w) => w.id === 'about')!}
          onClose={() => closeWindow('about')}
          onMinimize={() => toggleMinimize('about')}
          onFocus={() => focusWindow('about')}>

          <div className="flex flex-col items-center text-center space-y-4 p-2">
            <div className="w-full border-2 border-tos-blue p-4 bg-tos-white">
              <pre className="text-tos-blue font-bold text-2xl leading-none">
                {`
  _____
 |     |
 | O_O |
 |_____|
 /|   |\\
/ |   | \\
`}
              </pre>
            </div>

            <div className="w-full text-left">
              <h2 className="text-3xl font-bold text-tos-red mb-2">
                Alex Developer
              </h2>
              <p className="text-tos-black text-xl">Full Stack Engineer</p>
            </div>

            <div className="w-full bg-tos-white border-2 border-tos-black p-2 text-left text-lg">
              <p>
                <span className="text-tos-blue">OS:</span> TempleOS v5.03
              </p>
              <p>
                <span className="text-tos-blue">CPU:</span> 64-bit
              </p>
              <p>
                <span className="text-tos-blue">Res:</span> 640x480 16-color
              </p>
              <p>
                <span className="text-tos-blue">Mem:</span> 128GB
              </p>
            </div>

            <p className="text-lg leading-tight text-left">
              "Building cool stuff. Keeping it simple, fast, and low-level."
            </p>
          </div>
        </RetroWindow>

        {/* Projects Window */}
        <RetroWindow
          {...windows.find((w) => w.id === 'projects')!}
          onClose={() => closeWindow('projects')}
          onMinimize={() => toggleMinimize('projects')}
          onFocus={() => focusWindow('projects')}>

          <div className="space-y-4">
            <div className="text-tos-blue mb-2 border-b-2 border-tos-black pb-1">
              DIR: /Home/Projects
            </div>
            {[
            {
              name: 'Portfolio.HC',
              desc: 'This very site',
              type: 'WEB'
            },
            {
              name: 'Weather.HC',
              desc: 'Real-time forecasts',
              type: 'API'
            },
            {
              name: 'Tasks.HC',
              desc: 'Get things done',
              type: 'APP'
            },
            {
              name: 'PixelArt.HC',
              desc: 'Draw in 16-color',
              type: 'GFX'
            }].
            map((project, i) =>
            <div
              key={i}
              className="flex items-start space-x-2 cursor-pointer hover:bg-tos-blue hover:text-tos-white p-1">

                <span className="text-tos-red font-bold">[FILE]</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl">{project.name}</h3>
                    <span className="text-sm border border-tos-black px-1 bg-tos-white text-tos-black">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-lg opacity-80">{project.desc}</p>
                </div>
              </div>
            )}
          </div>
        </RetroWindow>

        {/* Interests Window */}
        <RetroWindow
          {...windows.find((w) => w.id === 'interests')!}
          onClose={() => closeWindow('interests')}
          onMinimize={() => toggleMinimize('interests')}
          onFocus={() => focusWindow('interests')}>

          <div className="space-y-2">
            <div className="text-tos-blue mb-2 border-b-2 border-tos-black pb-1">
              cat interests.txt
            </div>
            <ul className="list-none space-y-1">
              {[
              'Gaming',
              'Music',
              'Reading',
              'Design',
              'Coffee',
              'Travel',
              'Movies',
              'Coding'].
              map((item, i) =>
              <li
                key={i}
                className="flex items-center space-x-2 hover:bg-tos-cyan hover:text-tos-black cursor-pointer px-1">

                  <span className="text-tos-green font-bold">{'>'}</span>
                  <span className="text-xl">{item}</span>
                </li>
              )}
            </ul>
          </div>
        </RetroWindow>

        {/* Contact Window */}
        <RetroWindow
          {...windows.find((w) => w.id === 'contact')!}
          onClose={() => closeWindow('contact')}
          onMinimize={() => toggleMinimize('contact')}
          onFocus={() => focusWindow('contact')}>

          <div className="space-y-4">
            <div className="border-2 border-tos-black p-2 space-y-2 bg-tos-white">
              {[
              {
                label: 'Email',
                val: 'hello@example.com'
              },
              {
                label: 'GitHub',
                val: 'github.com/alexdev'
              },
              {
                label: 'Twitter',
                val: '@alex_dev'
              }].
              map((contact, i) =>
              <div
                key={i}
                className="flex flex-col p-1 hover:bg-tos-blue hover:text-tos-white cursor-pointer">

                  <span className="text-tos-red font-bold text-sm">
                    {contact.label}:
                  </span>
                  <span className="text-xl">{contact.val}</span>
                </div>
              )}
            </div>

            <button className="w-full py-2 bg-tos-white border-2 border-tos-black hover:bg-tos-green hover:text-tos-white font-bold text-xl flex items-center justify-center space-x-2 transition-none">
              <span>[ SEND MESSAGE ]</span>
            </button>
          </div>
        </RetroWindow>

        {/* Oracle Window */}
        <RetroWindow
          {...windows.find((w) => w.id === 'oracle')!}
          onClose={() => closeWindow('oracle')}
          onMinimize={() => toggleMinimize('oracle')}
          onFocus={() => focusWindow('oracle')}>

          <div className="flex flex-col items-center justify-center space-y-4 p-4 text-center h-full">
            <h3 className="text-tos-magenta font-bold text-2xl">
              ORACLE SAYS:
            </h3>
            <div className="border-2 border-tos-black p-4 w-full bg-tos-yellow text-tos-black text-3xl font-bold animate-pulse">
              {oracleWord}
            </div>
            <button
              onClick={generateOracleWord}
              className="px-4 py-2 border-2 border-tos-black bg-tos-cyan text-tos-black hover:bg-tos-blue hover:text-tos-white font-bold text-xl">

              [ F7: RANDOM WORD ]
            </button>
          </div>
        </RetroWindow>
      </RetroDesktop>

      <Taskbar
        windows={windows}
        onRestore={openWindow}
        onStartClick={handleStartClick} />

    </div>);

}
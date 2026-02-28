import React, { useState, useRef, useEffect } from 'react';
import { RetroDesktop } from './components/RetroDesktop';
import { RetroWindow } from './components/RetroWindow';
import { MenuBar } from './components/MenuBar';
import { Taskbar } from './components/Taskbar';
import { ColorText } from './components/ColorText';
// Types
type WindowId = 'about' | 'projects' | 'interests' | 'contact' | 'chatbot';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
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
const randPos = (widthPx: number) => ({
  x: Math.floor(Math.random() * Math.max(100, window.innerWidth - widthPx - 40)) + 20,
  y: Math.floor(Math.random() * Math.max(100, window.innerHeight - 400)) + 40,
});

export function App() {
  const [windows, setWindows] = useState<WindowState[]>(() => [
  {
    id: 'about',
    title: 'About.HC',
    isOpen: false,
    isMinimized: false,
    zIndex: 1,
    initialPos: randPos(400),
    width: 'w-[400px]'
  },
  {
    id: 'projects',
    title: 'Projects.HC',
    isOpen: false,
    isMinimized: false,
    zIndex: 2,
    initialPos: randPos(450),
    width: 'w-[450px]'
  },
  {
    id: 'interests',
    title: 'Interests.HC',
    isOpen: false,
    isMinimized: false,
    zIndex: 3,
    initialPos: randPos(320),
    width: 'w-[320px]'
  },
  {
    id: 'contact',
    title: 'Contact.HC',
    isOpen: false,
    isMinimized: false,
    zIndex: 4,
    initialPos: randPos(350),
    width: 'w-[350px]'
  },
  {
    id: 'chatbot',
    title: 'Chat.HC',
    isOpen: false,
    isMinimized: false,
    zIndex: 5,
    initialPos: randPos(380),
    width: 'w-[380px]'
  }]
  );
  const [topZIndex, setTopZIndex] = useState(10);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Welcome. Type a message to begin.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
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
  const restoreWindow = (id: string) => {
    const wid = id as WindowId;
    const win = windows.find((w) => w.id === wid);
    if (!win) return;
    if (!win.isOpen) {
      openWindow(wid);
    } else if (win.isMinimized) {
      focusWindow(wid);
    } else {
      toggleMinimize(wid);
    }
  };
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    const userMsg: ChatMessage = { role: 'user', content: text };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    // TODO: Replace with Azure OpenAI API call
    // Example:
    // const res = await fetch('https://<your-resource>.openai.azure.com/openai/deployments/<deployment>/chat/completions?api-version=2024-02-01', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'api-key': '<your-key>' },
    //   body: JSON.stringify({ messages: [...chatMessages, userMsg] })
    // });
    // const data = await res.json();
    // const reply = data.choices[0].message.content;

    // Placeholder echo response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Echo: ${text}` }
      ]);
      setChatLoading(false);
    }, 500);
  };
  return (
    <div className="h-screen w-screen overflow-hidden font-retro text-tos-black select-none bg-tos-white">
      <MenuBar />

      <RetroDesktop windows={windows} onOpenWindow={(id) => openWindow(id as WindowId)}>
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
              <h2 className="text-3xl font-bold mb-2">
                <ColorText>{import.meta.env.VITE_OWNER_NAME}</ColorText>
              </h2>
              <p className="text-xl"><ColorText>Software Developer and Enthusiast</ColorText></p>
            </div>

            <div className="w-full bg-tos-white border-2 border-tos-black p-2 text-left text-lg">
              <p><ColorText>OS: TempleOS v5.03</ColorText></p>
              <p><ColorText>CPU: 64-bit</ColorText></p>
              <p><ColorText>Res: 640x480 16-color</ColorText></p>
              <p><ColorText>Mem: 128GB</ColorText></p>
            </div>

            <p className="text-lg leading-tight text-left">
              <ColorText>"Building cool stuff. Keeping it simple, fast, and low-level."</ColorText>
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
            <div className="mb-2 border-b-2 border-tos-black pb-1">
              <ColorText>DIR: /Home/Projects</ColorText>
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

                <span className="font-bold"><ColorText>[FILE]</ColorText></span>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-xl"><ColorText>{project.name}</ColorText></h3>
                    <span className="text-sm border border-tos-black px-1 bg-tos-white text-tos-black">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-lg"><ColorText>{project.desc}</ColorText></p>
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
            <div className="mb-2 border-b-2 border-tos-black pb-1">
              <ColorText>cat interests.txt</ColorText>
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

                  <span className="font-bold"><ColorText>{'>'}</ColorText></span>
                  <span className="text-xl"><ColorText>{item}</ColorText></span>
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
                val: import.meta.env.VITE_OWNER_EMAIL
              },
              {
                label: 'GitHub',
                val: import.meta.env.VITE_GITHUB_URL
              }].
              map((contact, i) =>
              <div
                key={i}
                className="flex flex-col p-1 hover:bg-tos-blue hover:text-tos-white cursor-pointer">

                  <span className="font-bold text-sm">
                    <ColorText>{contact.label + ':'}</ColorText>
                  </span>
                  <span className="text-xl"><ColorText>{contact.val}</ColorText></span>
                </div>
              )}
            </div>

            <button className="w-full py-2 bg-tos-white border-2 border-tos-black hover:bg-tos-blue hover:text-tos-white font-bold text-xl flex items-center justify-center space-x-2 transition-none">
              <span><ColorText>[ SEND MESSAGE ]</ColorText></span>
            </button>
          </div>
        </RetroWindow>

        {/* Chatbot Window */}
        <RetroWindow
          {...windows.find((w) => w.id === 'chatbot')!}
          onClose={() => closeWindow('chatbot')}
          onMinimize={() => toggleMinimize('chatbot')}
          onFocus={() => focusWindow('chatbot')}>

          <div className="flex flex-col h-[350px]">
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-2 py-1 border-2 border-tos-black text-lg ${
                    msg.role === 'user'
                      ? 'bg-tos-cyan text-tos-black'
                      : 'bg-tos-blue text-tos-white'
                  }`}>
                    <span className="font-bold text-sm">
                      {msg.role === 'user' ? 'YOU>' : 'BOT>'}
                    </span>
                    <br />
                    <ColorText>{msg.content}</ColorText>
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="px-2 py-1 border-2 border-tos-black bg-tos-blue text-tos-white text-lg">
                    <ColorText>...</ColorText>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="border-t-2 border-tos-black p-2 flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type here..."
                className="flex-1 border-2 border-tos-black px-2 py-1 bg-tos-white text-tos-black font-retro text-lg outline-none focus:border-tos-blue"
              />
              <button
                onClick={sendMessage}
                disabled={chatLoading}
                className="px-3 py-1 border-2 border-tos-black bg-tos-cyan text-tos-black hover:bg-tos-blue hover:text-tos-white font-bold text-lg disabled:opacity-50">
                [SEND]
              </button>
            </div>
          </div>
        </RetroWindow>
      </RetroDesktop>

      <Taskbar
        windows={windows}
        onRestore={restoreWindow} />

    </div>);

}
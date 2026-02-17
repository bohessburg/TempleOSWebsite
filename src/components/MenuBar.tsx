import React, { useEffect, useState } from 'react';
export function MenuBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };
  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-tos-white border-b-2 border-tos-black flex items-center justify-between px-2 z-50 select-none font-retro text-xl text-tos-black">
      <div className="flex items-center h-full space-x-4">
        <div className="px-2 hover:bg-tos-blue hover:text-tos-white cursor-pointer transition-none">
          <span className="font-bold">TOS</span>
        </div>

        {['File', 'Edit', 'View', 'Help'].map((item) =>
        <div
          key={item}
          className="px-2 h-full flex items-center hover:bg-tos-blue hover:text-tos-white cursor-pointer transition-none">

            {item}
          </div>
        )}
      </div>

      <div className="flex items-center px-2 bg-tos-white h-full border-l-2 border-tos-black">
        <span className="font-bold">{formatTime(time)}</span>
      </div>
    </div>);

}
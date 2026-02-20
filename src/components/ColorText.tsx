import { useMemo } from 'react';

const TOS_COLORS = [
  '#000000', // black
  '#0000AA', // blue
  '#00AA00', // green
  '#00AAAA', // cyan
  '#AA0000', // red
  '#AA00AA', // magenta
  '#AA5500', // brown
  '#555555', // dark gray
  '#5555FF', // bright blue
  '#55FF55', // bright green
  '#55FFFF', // bright cyan
  '#FF5555', // bright red
  '#FF55FF', // bright magenta
  '#FFFF55', // yellow
];

export function ColorText({ children }: { children: string }) {
  const colored = useMemo(() => {
    return children.split(/(\s+)/).map((segment, i) => {
      if (/^\s+$/.test(segment)) return segment;
      const color = TOS_COLORS[Math.floor(Math.random() * TOS_COLORS.length)];
      return (
        <span key={i} style={{ color }}>
          {segment}
        </span>
      );
    });
  }, [children]);

  return <>{colored}</>;
}

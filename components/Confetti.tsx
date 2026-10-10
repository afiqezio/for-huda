import React, { useMemo } from 'react';

const PIECE_COUNT = 24;
const COLORS = ['#a87b3d', '#e88a9b', '#7a2236', '#f0c6cc', '#d9b26f'];

const Confetti: React.FC = () => {
  const pieces = useMemo(
    () =>
      Array.from({ length: PIECE_COUNT }, (_, i) => {
        const width = 6 + Math.random() * 6;
        return {
          left: `${Math.random() * 100}%`,
          width: `${width}px`,
          height: `${width * 1.6}px`,
          background: COLORS[i % COLORS.length],
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${5 + Math.random() * 5}s`,
        };
      }),
    []
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((style, i) => (
        <span key={i} style={style} />
      ))}
    </div>
  );
};

export default Confetti;

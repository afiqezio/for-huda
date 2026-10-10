import React, { useMemo } from 'react';

const HEART_COUNT = 14;

const FloatingHearts: React.FC<{ tone?: 'light' | 'dark' }> = ({ tone = 'light' }) => {
  const hearts = useMemo(
    () =>
      Array.from({ length: HEART_COUNT }, () => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        size: `${10 + Math.random() * 16}px`,
        duration: `${12 + Math.random() * 8}s`,
      })),
    []
  );

  return (
    <div className={`petals petals--${tone}`} aria-hidden="true">
      {hearts.map((heart, i) => (
        <span
          key={i}
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;

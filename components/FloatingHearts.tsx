
import React, { useEffect, useState } from 'react';

interface HeartProps {
  id: number;
  left: string;
  delay: string;
  size: string;
  duration: string;
}

const FloatingHearts: React.FC<{ color?: string }> = ({ color = 'text-pink-200' }) => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 1.5 + 0.5}rem`,
      duration: `${Math.random() * 5 + 7}s`,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute bottom-[-50px] animate-float ${color} opacity-40`}
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            fontSize: heart.size,
            animationDuration: heart.duration,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;

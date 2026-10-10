import { useEffect, useState } from 'react';

const pad = (n: number) => String(n).padStart(2, '0');

export const useCountdown = (target: number) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (Date.now() >= target) return;
    const id = setInterval(() => {
      const n = Date.now();
      setNow(n);
      if (n >= target) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const diff = Math.max(0, target - now);
  const units = [
    { label: 'Days', value: pad(Math.floor(diff / 864e5)) },
    { label: 'Hours', value: pad(Math.floor(diff / 36e5) % 24) },
    { label: 'Minutes', value: pad(Math.floor(diff / 6e4) % 60) },
    { label: 'Seconds', value: pad(Math.floor(diff / 1e3) % 60) },
  ];

  return { reached: diff === 0, units };
};

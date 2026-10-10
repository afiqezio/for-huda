import React, { useEffect, useRef, useState } from 'react';
import { cloudinaryFillUrl } from './Photo';

interface PhotoSlotProps {
  src: string;
  label?: string;
  priority?: boolean;
}

const STEP = 100;
const MAX_DPR = 2;

// Frames crop photos to their own shape (full-screen hero, tall month cards, 3D ring), so a width-only
// srcset gets stretched to fill them. Measure the frame and ask Cloudinary for exactly that crop instead.
const useFrameSize = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const { offsetWidth: w, offsetHeight: h } = el;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      // Round up to a step so small layout shifts reuse the same cached image.
      const width = Math.ceil((w * dpr) / STEP) * STEP;
      const height = Math.round((width * h) / w);
      setSize((prev) => (prev && prev.width === width && prev.height === height ? prev : { width, height }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
};

// Renders the photo, or an empty labelled frame until one is added in data/config.ts.
const PhotoSlot: React.FC<PhotoSlotProps> = ({ src, label = 'Photo', priority = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const size = useFrameSize(ref);

  if (!src) {
    return (
      <div className="photo-slot photo-slot--empty" aria-hidden="true">
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div ref={ref} className="photo-slot">
      {size && (
        <img
          src={cloudinaryFillUrl(src, size.width, size.height)}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      )}
    </div>
  );
};

export default PhotoSlot;

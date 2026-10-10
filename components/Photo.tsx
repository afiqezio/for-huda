import React from 'react';

const UPLOAD_SEGMENT = '/image/upload/';
const WIDTHS = [400, 800, 1200];

// Originals are multi-megabyte phone photos; let Cloudinary pick the format and resize on delivery.
const cloudinaryUrl = (src: string, width: number) =>
  src.replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}f_auto,q_auto,c_limit,w_${width}/`);

// Crops on the server to the exact frame shape, centred on the subject, without upscaling past the original.
export const cloudinaryFillUrl = (src: string, width: number, height: number) =>
  src.replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}f_auto,q_auto,c_lfill,g_auto,w_${width},h_${height}/`);

interface PhotoProps {
  src: string;
  sizes: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}

const Photo: React.FC<PhotoProps> = ({ src, sizes, alt = '', priority = false, className }) => (
  <img
    src={cloudinaryUrl(src, 800)}
    srcSet={WIDTHS.map((w) => `${cloudinaryUrl(src, w)} ${w}w`).join(', ')}
    sizes={sizes}
    alt={alt}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'}
    decoding="async"
    className={className}
  />
);

export default Photo;

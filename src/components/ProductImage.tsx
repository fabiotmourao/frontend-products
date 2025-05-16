// src/components/ProductImage.tsx
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || '/images/default-placeholder.png');

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={48}
      height={48}
      className="rounded object-cover w-12 h-12"
      onError={() => setImgSrc('/images/default-placeholder.png')}
    />
  );
}

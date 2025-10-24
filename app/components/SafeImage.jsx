"use client";

import { useState } from "react";
import Image from "next/image";

export default function SafeImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  fill, 
  sizes, 
  priority, 
  unoptimized,
  onLoad,
  onError,
  ...props 
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = (e) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  // If there's an error or no src, show fallback
  if (hasError || !src) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className || ''}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <span className="text-gray-400 text-sm">📷</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      fill={fill}
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
}

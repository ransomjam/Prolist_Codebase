import { useState } from 'react';
import { Package } from 'lucide-react';

interface SimpleImageDisplayProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export default function SimpleImageDisplay({
  src,
  alt,
  className = '',
  fallbackIcon = <Package className="w-12 h-12 text-gray-400" />
}: SimpleImageDisplayProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (!src || hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        {fallbackIcon}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
import { useState } from 'react';
import { Button } from './button';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  showIndicators?: boolean;
  showFullscreenButton?: boolean;
}

export function ImageSlider({ 
  images, 
  alt, 
  className = "", 
  aspectRatio = "auto",
  showIndicators = true,
  showFullscreenButton = true
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video", 
    auto: ""
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Main image */}
      <div className={`relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 ${aspectRatioClasses[aspectRatio]}`}>
        <ImageWithFallback
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Fullscreen button */}
        {showFullscreenButton && (
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
              <div className="relative w-full h-full">
                <ImageWithFallback
                  src={images[currentIndex]}
                  alt={`${alt} - Fullscreen view`}
                  className="w-full h-full object-contain"
                />
                
                {/* Fullscreen navigation */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    
                    {/* Fullscreen indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-amber-600 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail strip for multiple images */}
      {images.length > 1 && images.length <= 6 && (
        <div className="flex space-x-2 mt-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex 
                  ? 'border-amber-600 ring-2 ring-amber-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <ImageWithFallback
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
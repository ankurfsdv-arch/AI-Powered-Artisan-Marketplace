import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Badge, Sparkles, Zap, Percent } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';

interface BannerSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  offer?: string;
  badgeText?: string;
  ctaText: string;
  ctaAction: () => void;
  overlayPosition: 'left' | 'right' | 'center';
  backgroundColor?: string;
}

interface HeroBannerSliderProps {
  onNavigate: (page: string, category?: string) => void;
}

export function HeroBannerSlider({ onNavigate }: HeroBannerSliderProps) {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: BannerSlide[] = [
    {
      id: 'handicrafts-sale',
      image: 'https://images.unsplash.com/photo-1571953585082-be28e9606b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kaWNyYWZ0cyUyMHNhbGUlMjBiYW5uZXJ8ZW58MXx8fHwxNzU3MDA2MjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Exclusive Handicrafts Sale',
      subtitle: 'Discover authentic Indian crafts with special discounts',
      offer: 'Up to 50% OFF',
      badgeText: 'Limited Time',
      ctaText: 'Shop Now',
      ctaAction: () => onNavigate('products'),
      overlayPosition: 'left',
      backgroundColor: 'from-amber-900/80 to-orange-900/60'
    },
    {
      id: 'pottery-ceramics',
      image: 'https://images.unsplash.com/photo-1719852255246-898f965e04e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHBvdHRlcnklMjBjZXJhbWljJTIwYXJ0d29ya3xlbnwxfHx8fDE3NTcwMDYyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Traditional Pottery Collection',
      subtitle: 'Hand-crafted ceramics by master artisans',
      offer: '30% OFF',
      badgeText: 'New Arrivals',
      ctaText: 'Explore Collection',
      ctaAction: () => onNavigate('categories', 'pottery-ceramics'),
      overlayPosition: 'right',
      backgroundColor: 'from-stone-800/80 to-slate-700/60'
    },
    {
      id: 'textile-weaving',
      image: 'https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwd2VhdmluZyUyMHBhdHRlcm5zfGVufDF8fHx8MTc1NzAwNjI3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Heritage Textiles',
      subtitle: 'Exquisite handwoven fabrics and patterns',
      offer: 'Buy 2 Get 1 Free',
      badgeText: 'AI Verified',
      ctaText: 'Shop Textiles',
      ctaAction: () => onNavigate('categories', 'textiles'),
      overlayPosition: 'center',
      backgroundColor: 'from-purple-900/80 to-indigo-800/60'
    },
    {
      id: 'jewelry-ornaments',
      image: 'https://images.unsplash.com/photo-1589095053205-8fc842336f4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBqZXdlbHJ5JTIwb3JuYW1lbnRzJTIwZ29sZHxlbnwxfHx8fDE3NTcwMDYyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Handcrafted Jewelry',
      subtitle: 'Traditional ornaments with modern elegance',
      offer: '25% OFF',
      badgeText: 'Premium',
      ctaText: 'View Jewelry',
      ctaAction: () => onNavigate('categories', 'jewelry'),
      overlayPosition: 'left',
      backgroundColor: 'from-yellow-900/80 to-amber-800/60'
    },
    {
      id: 'wood-carving',
      image: 'https://images.unsplash.com/photo-1715541208310-444818e3a0b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwY2FydmluZyUyMHNjdWxwdHVyZSUyMGFydHxlbnwxfHx8fDE3NTcwMDYyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Artisan Wood Carvings',
      subtitle: 'Intricate sculptures and decorative pieces',
      offer: 'Free Shipping',
      badgeText: 'Bestseller',
      ctaText: 'Browse Art',
      ctaAction: () => onNavigate('categories', 'wood-carving'),
      overlayPosition: 'right',
      backgroundColor: 'from-brown-900/80 to-orange-900/60'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const currentSlideData = slides[currentSlide];

  return (
    <section 
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Banner Container */}
      <div className="relative w-full h-full">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={currentSlideData.image}
            alt={currentSlideData.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.backgroundColor || 'from-black/50 to-black/30'}`} />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className={`max-w-lg ${
              currentSlideData.overlayPosition === 'right' 
                ? 'ml-auto text-right' 
                : currentSlideData.overlayPosition === 'center'
                ? 'mx-auto text-center'
                : 'text-left'
            }`}>
              
              {/* Badge */}
              {currentSlideData.badgeText && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-600/90 text-white backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {currentSlideData.badgeText}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight">
                {currentSlideData.title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
                {currentSlideData.subtitle}
              </p>

              {/* Offer */}
              {currentSlideData.offer && (
                <div className="mb-6">
                  <span className="inline-flex items-center text-2xl md:text-3xl text-yellow-400 font-bold">
                    <Percent className="w-6 h-6 mr-2" />
                    {currentSlideData.offer}
                  </span>
                </div>
              )}

              {/* CTA Button */}
              <Button
                onClick={currentSlideData.ctaAction}
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white border-none text-lg px-8 py-4 transition-all duration-300 hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                {currentSlideData.ctaText}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-amber-600 scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-6 right-6 z-20 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </section>
  );
}
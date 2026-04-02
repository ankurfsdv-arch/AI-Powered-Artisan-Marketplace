import { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  artisan: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

interface ProductShowcaseSliderProps {
  title: string;
  products: Product[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  itemsToShow?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
}

export function ProductShowcaseSlider({
  title,
  products,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  itemsToShow = { desktop: 4, tablet: 2, mobile: 1 }
}: ProductShowcaseSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(itemsToShow.desktop);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(itemsToShow.desktop);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(itemsToShow.tablet);
      } else {
        setItemsPerView(itemsToShow.mobile);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsToShow]);

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, products.length - itemsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, products.length, itemsPerView]);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        {showArrows && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0 && !autoPlay}
              className="hover:bg-amber-50 hover:border-amber-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex && !autoPlay}
              className="hover:bg-amber-50 hover:border-amber-200"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(products.length / itemsPerView) * 100}%`
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none px-2"
              style={{ width: `${100 / products.length}%` }}
            >
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                <div className="relative">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                      {product.isNew && (
                        <Badge className="bg-green-500 text-white text-xs">New</Badge>
                      )}
                      {product.isBestseller && (
                        <Badge className="bg-amber-500 text-white text-xs">Bestseller</Badge>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <Badge className="absolute bottom-2 left-2 bg-red-500 text-white text-xs">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Product Info */}
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {/* Category & Artisan */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{product.category}</span>
                        <span>by {product.artisan}</span>
                      </div>

                      {/* Product Name */}
                      <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h4>

                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg text-gray-900 dark:text-white">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-amber-600 w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
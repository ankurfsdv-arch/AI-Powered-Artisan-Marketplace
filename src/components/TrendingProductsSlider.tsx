import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  artisanName: string;
  artisanStory?: boolean;
  category: string;
  discount?: number;
}

// Mock trending products data - in real app, this would come from the database
const mockTrendingProducts: Product[] = [
  {
    id: '1',
    name: 'Handwoven Banarasi Silk Saree',
    price: 12500,
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 156,
    artisanName: 'Meera Devi',
    artisanStory: true,
    category: 'Textiles',
    discount: 17
  },
  {
    id: '2',
    name: 'Carved Wooden Elephant Sculpture',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 89,
    artisanName: 'Ravi Kumar',
    artisanStory: true,
    category: 'Sculptures'
  },
  {
    id: '3',
    name: 'Blue Pottery Serving Set',
    price: 1850,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 234,
    artisanName: 'Priya Sharma',
    category: 'Pottery',
    discount: 16
  },
  {
    id: '4',
    name: 'Embroidered Kashmiri Shawl',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1594736797933-d0d8d508cd73?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 127,
    artisanName: 'Abdul Rahman',
    artisanStory: true,
    category: 'Textiles'
  },
  {
    id: '5',
    name: 'Brass Temple Lamp',
    price: 1200,
    originalPrice: 1400,
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 98,
    artisanName: 'Lakshmi Nair',
    category: 'Metalwork',
    discount: 14
  },
  {
    id: '6',
    name: 'Jute Eco-Friendly Tote Bag',
    price: 450,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 312,
    artisanName: 'Sunita Das',
    category: 'Accessories'
  },
  {
    id: '7',
    name: 'Terracotta Garden Planters Set',
    price: 1650,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 156,
    artisanName: 'Mohan Patel',
    artisanStory: true,
    category: 'Pottery'
  },
  {
    id: '8',
    name: 'Organic Neem Wood Spice Box',
    price: 890,
    image: 'https://images.unsplash.com/photo-1586380951230-3b678e1bd637?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 203,
    artisanName: 'Kavita Singh',
    category: 'Kitchenware'
  }
];

interface TrendingProductsSliderProps {
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

export function TrendingProductsSlider({ onProductClick, onAddToCart }: TrendingProductsSliderProps) {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [products, setProducts] = useState<Product[]>(mockTrendingProducts);
  const [loading, setLoading] = useState(true);

  // Fetch trending products from backend
  useEffect(() => {
    fetchTrendingProducts();
  }, []);

  const fetchTrendingProducts = async () => {
    try {
      const { projectId, publicAnonKey } = await import('../utils/supabase/info');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/products/trending`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const formattedProducts = (data.products || []).map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.original_price,
          image: product.image,
          rating: product.rating || 4.5,
          reviewCount: product.reviews || 0,
          artisanName: product.artisan_name || product.artisan || 'Unknown Artisan',
          artisanStory: product.has_story || false,
          category: product.category || 'General',
          discount: product.original_price ? Math.round(((product.original_price - product.price) / product.original_price) * 100) : undefined
        }));
        
        if (formattedProducts.length > 0) {
          setProducts(formattedProducts);
        }
      }
    } catch (error) {
      console.error('Error fetching trending products:', error);
      // Keep using mock data as fallback
    } finally {
      setLoading(false);
    }
  };

  // Responsive items per view
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4; // Desktop
      if (window.innerWidth >= 768) return 2;  // Tablet
      return 1; // Mobile
    }
    return 4;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, products.length - itemsPerView);
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, itemsPerView]);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    setTimeout(() => setIsAutoPlaying(true), 3000); // Resume autoplay after 3 seconds
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    setTimeout(() => setIsAutoPlaying(true), 3000); // Resume autoplay after 3 seconds
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              -{product.discount}%
            </Badge>
          )}
          
          {/* Artisan Story Badge */}
          {product.artisanStory && (
            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
              {t('story')}
            </Badge>
          )}
          
          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ right: product.artisanStory ? '60px' : '8px' }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <h3 
            className="font-medium text-sm leading-tight line-clamp-2 hover:text-primary transition-colors cursor-pointer"
            onClick={() => onProductClick?.(product.id)}
          >
            {product.name}
          </h3>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Artisan Name */}
          <p className="text-xs text-muted-foreground">
            {t('by')} {product.artisanName}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-8 text-xs"
              onClick={() => onAddToCart?.(product.id)}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              {t('addToCart')}
            </Button>
            <Button
              size="sm"
              className="flex-1 h-8 text-xs"
              onClick={() => onProductClick?.(product.id)}
            >
              {t('buyNow')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-8 bg-gradient-to-br from-background via-card/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t('trendingProducts')}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t('discoverPopularCrafts')}
            </p>
          </div>
          
          {/* Navigation Arrows - only show if more than itemsPerView products */}
          {products.length > itemsPerView && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="h-9 w-9 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className="h-9 w-9 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Products Slider */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">{t('common.loading')}</p>
            </div>
          </div>
        ) : products.length > 0 ? (
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-4"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(products.length * 100) / itemsPerView}%`
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / products.length}%` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{t('noTrendingProducts')}</p>
          </div>
        )}

        {/* Dots Indicator - only show if more than itemsPerView products */}
        {products.length > itemsPerView && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-6'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAutoPlaying(true), 3000);
                }}
              />
            ))}
          </div>
        )}

        {/* Auto-scroll Indicator - only show if more than itemsPerView products */}
        {products.length > itemsPerView && (
          <div className="text-center mt-4">
            <p className="text-xs text-muted-foreground">
              {isAutoPlaying ? t('autoScrolling') : t('autoScrollPaused')} • {t('clickToNavigate')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
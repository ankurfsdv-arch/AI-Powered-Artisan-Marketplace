import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ProductShowcaseSlider } from './ui/product-showcase-slider';
import { unsplash_tool } from '../tools/unsplash';

const curatedCollections = [
  {
    id: '1',
    title: 'Festival Essentials',
    description: 'Handcrafted items perfect for celebrating traditional Indian festivals',
    itemCount: 45,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600',
    gradient: 'from-orange-500 to-red-500',
    featured: true
  },
  {
    id: '2',
    title: 'Bridal Collection',
    description: 'Exquisite jewelry and accessories for the perfect wedding',
    itemCount: 32,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
    gradient: 'from-pink-500 to-rose-500',
    featured: false
  },
  {
    id: '3',
    title: 'Home Decor Treasures',
    description: 'Transform your space with traditional Indian home decor',
    itemCount: 67,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
    gradient: 'from-amber-500 to-yellow-500',
    featured: false
  },
  {
    id: '4',
    title: 'Artisan Textiles',
    description: 'Premium handwoven fabrics and traditional clothing',
    itemCount: 89,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600',
    gradient: 'from-blue-500 to-indigo-500',
    featured: true
  }
];

const featuredProducts = [
  {
    id: '1',
    name: 'Handwoven Banarasi Silk Saree',
    price: 8500,
    originalPrice: 12000,
    rating: 4.8,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400',
    artisan: 'Priya Sharma',
    category: 'Textiles',
    isNew: false,
    isBestseller: true
  },
  {
    id: '2',
    name: 'Traditional Brass Diya Set',
    price: 1200,
    rating: 4.6,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    artisan: 'Rajesh Kumar',
    category: 'Home Decor',
    isNew: true,
    isBestseller: false
  },
  {
    id: '3',
    name: 'Handcrafted Silver Jhumkas',
    price: 2800,
    originalPrice: 3500,
    rating: 4.9,
    reviews: 31,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    artisan: 'Meera Devi',
    category: 'Jewelry',
    isNew: false,
    isBestseller: true
  },
  {
    id: '4',
    name: 'Wooden Hand-carved Elephant',
    price: 950,
    rating: 4.5,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1602736499584-d714bb20e640?w=400',
    artisan: 'Amit Singh',
    category: 'Art & Sculptures',
    isNew: true,
    isBestseller: false
  },
  {
    id: '5',
    name: 'Block Print Cotton Kurta',
    price: 1800,
    originalPrice: 2200,
    rating: 4.7,
    reviews: 22,
    image: 'https://images.unsplash.com/photo-1583846499562-b5932bf0b2a6?w=400',
    artisan: 'Kiran Verma',
    category: 'Clothing',
    isNew: false,
    isBestseller: true
  },
  {
    id: '6',
    name: 'Handmade Ceramic Tea Set',
    price: 2200,
    rating: 4.4,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400',
    artisan: 'Sunita Patel',
    category: 'Home Decor',
    isNew: true,
    isBestseller: false
  }
];

export function CuratedCollections() {
  const [currentCollection, setCurrentCollection] = useState(0);

  const nextCollection = () => {
    setCurrentCollection((prev) => (prev + 1) % curatedCollections.length);
  };

  const prevCollection = () => {
    setCurrentCollection((prev) => (prev - 1 + curatedCollections.length) % curatedCollections.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-amber-900/20 to-orange-900/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-amber-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Curated Collections
            </h2>
            <Sparkles className="h-6 w-6 text-amber-400" />
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover our handpicked selections of the finest traditional crafts, 
            thoughtfully curated for every occasion and aesthetic
          </p>
        </div>

        {/* Collections Slider */}
        <div className="relative mb-16">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentCollection * 100}%)` }}
            >
              {curatedCollections.map((collection, index) => (
                <div key={collection.id} className="w-full flex-shrink-0">
                  <Card className="relative overflow-hidden border-0 bg-transparent">
                    <div className="relative h-64 md:h-80">
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-r ${collection.gradient} opacity-75`} />
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                        <div className="text-white">
                          {collection.featured && (
                            <Badge className="bg-white/20 text-white border-white/30 mb-4">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Featured Collection
                            </Badge>
                          )}
                          <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            {collection.title}
                          </h3>
                          <p className="text-lg md:text-xl mb-6 max-w-2xl">
                            {collection.description}
                          </p>
                          <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="text-sm">
                              {collection.itemCount} handcrafted items
                            </span>
                            <span className="text-sm opacity-75">•</span>
                            <span className="text-sm">
                              From verified artisans
                            </span>
                          </div>
                          <Button 
                            size="lg" 
                            className="bg-white text-gray-900 hover:bg-gray-100 font-medium"
                          >
                            Explore Collection
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevCollection}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-white/30"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextCollection}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-white/30"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {curatedCollections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCollection(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentCollection
                    ? 'bg-amber-400 w-8'
                    : 'bg-gray-400 hover:bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Featured Products Slider */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <ProductShowcaseSlider
            title="Trending This Week"
            products={featuredProducts}
            autoPlay={true}
            autoPlayInterval={4000}
            itemsToShow={{ desktop: 3, tablet: 2, mobile: 1 }}
          />
        </div>

        {/* Collection Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { name: 'Festival Special', count: '120+ items', color: 'bg-orange-500' },
            { name: 'Wedding Collection', count: '85+ items', color: 'bg-pink-500' },
            { name: 'Home Decor', count: '200+ items', color: 'bg-amber-500' },
            { name: 'Daily Wear', count: '150+ items', color: 'bg-blue-500' }
          ].map((category, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1">{category.name}</h4>
                <p className="text-gray-300 text-sm">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
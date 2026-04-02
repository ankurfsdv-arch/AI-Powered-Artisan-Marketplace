import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Star, Heart, ShoppingCart, Eye, Plus, Loader2, Camera, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CustomerHomepageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function CustomerHomepage({ onNavigate }: CustomerHomepageProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [publicProducts, setPublicProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { projectId, publicAnonKey } = await import('../utils/supabase/info');
      
      // Fetch all public products
      const publicResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/products/public`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (publicResponse.ok) {
        const publicData = await publicResponse.json();
        setPublicProducts(publicData.products || []);
      }
      
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data if API fails
      setPublicProducts(mockPublicProducts);
    } finally {
      setLoading(false);
    }
  };

  // Mock data as fallback
  const mockPublicProducts = [
    {
      id: '5',
      name: 'Terracotta Vase',
      price: 800,
      original_price: 950,
      rating: 4.7,
      reviews: 15,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwdmFzZXxlbnwxfHx8fDE3NTY4MzQ0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      artisan_id: 'mock-artisan-3'
    }
  ];

  // Artisan Stories
  const artisanStories = [
    {
      id: '1',
      artisan: 'Meera Devi',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFydGlzYW58ZW58MXx8fHwxNzU2ODM0NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hasNewStory: true,
      craft: 'Silk Weaving'
    },
    {
      id: '2',
      artisan: 'Raj Kumar',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBhcnRpc2FufGVufDF8fHx8MTc1NjgzNDQ3OXww&ixlib=rb-4.1.0&q=80&w=1080',
      hasNewStory: true,
      craft: 'Metalwork'
    },
    {
      id: '3',
      artisan: 'Sita Sharma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGluZGlhbnxlbnwxfHx8fDE3NTY4MzQ0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hasNewStory: false,
      craft: 'Textile'
    },
    {
      id: '4',
      artisan: 'Mohan Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBpbmRpYW58ZW58MXx8fHwxNzU2ODM0NTE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hasNewStory: true,
      craft: 'Woodwork'
    },
    {
      id: '5',
      artisan: 'Lakshmi Bai',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGVsZGVybHklMjBpbmRpYW58ZW58MXx8fHwxNzU2ODM0NTM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      hasNewStory: false,
      craft: 'Pottery'
    }
  ];

  // Helper function to get artisan name from product
  const getArtisanName = (product: any) => {
    return product.artisan_name || product.artisan || 'Unknown Artisan';
  };



  const ProductCard = ({ product, isSmall = false }: { product: any, isSmall?: boolean }) => {
    // Convert database field names to frontend format
    const formattedProduct = {
      ...product,
      originalPrice: product.original_price,
      artisan: getArtisanName(product),
      rating: product.rating || 4.5,
      reviews: product.reviews || 0
    };
    
    return (
      <Card className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${isSmall ? 'h-fit' : 'h-full'}`}>
        <CardContent className={`p-0 ${isSmall ? '' : 'h-full flex flex-col'}`}>
          <div className="relative overflow-hidden">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                isSmall ? 'h-40' : 'h-56'
              }`}
            />
            {product.badge && (
              <Badge className={`absolute top-2 left-2 ${
                product.badge === 'Trending' ? 'bg-red-500' :
                product.badge === 'Best Seller' ? 'bg-green-500' :
                product.badge === 'New Arrival' ? 'bg-blue-500' :
                'bg-purple-500'
              } text-white`}>
                {product.badge}
              </Badge>
            )}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className={`p-4 ${isSmall ? '' : 'flex-1 flex flex-col'}`}>
            <h3 className={`font-medium line-clamp-2 mb-2 ${isSmall ? 'text-sm' : ''}`}>{formattedProduct.name}</h3>
            <p className={`text-muted-foreground mb-2 ${isSmall ? 'text-xs' : 'text-sm'}`}>by {formattedProduct.artisan}</p>
            
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center gap-1">
                <Star className={`fill-amber-400 text-amber-400 ${isSmall ? 'w-3 h-3' : 'w-4 h-4'}`} />
                <span className={`${isSmall ? 'text-xs' : 'text-sm'}`}>{formattedProduct.rating}</span>
              </div>
              <span className={`text-muted-foreground ${isSmall ? 'text-xs' : 'text-sm'}`}>({formattedProduct.reviews})</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className={`font-bold ${isSmall ? 'text-sm' : 'text-lg'}`}>₹{formattedProduct.price.toLocaleString()}</span>
              {formattedProduct.originalPrice && (
                <span className={`text-muted-foreground line-through ${isSmall ? 'text-xs' : 'text-sm'}`}>
                  ₹{formattedProduct.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            <div className={`flex gap-2 ${isSmall ? 'mt-auto' : 'mt-auto'}`}>
              <Button 
                size={isSmall ? "sm" : "default"} 
                className="flex-1 bg-amber-600 hover:bg-amber-700"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to cart logic
                }}
              >
                <ShoppingCart className={`mr-2 ${isSmall ? 'w-3 h-3' : 'w-4 h-4'}`} />
                Add to Cart
              </Button>
              <Button 
                size={isSmall ? "sm" : "default"} 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('product-detail', product.id);
                }}
              >
                <Eye className={`${isSmall ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading authentic crafts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* AI Image Assistant Feature */}
      <section className="container mx-auto px-4 py-8">
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-amber-500 rounded-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    ✨ AI Powered
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-amber-900 dark:text-amber-100">
                  Find Products with AI Image Search
                </h2>
                <p className="text-amber-700 dark:text-amber-200 mb-4">
                  Upload any image and let our AI find similar handcrafted products from our artisan marketplace. 
                  Discover beautiful crafts that match your style instantly!
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-300">
                    Smart Recognition
                  </Badge>
                  <Badge variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-300">
                    Visual Search
                  </Badge>
                  <Badge variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-300">
                    Instant Results
                  </Badge>
                </div>
                <Button 
                  onClick={() => onNavigate('profile')}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Try AI Image Search
                </Button>
              </div>
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                  <div className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 mx-auto mb-3 text-amber-500" />
                    <p className="text-sm text-muted-foreground mb-2">Upload Image Here</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-around text-xs text-muted-foreground">
                    <span>JPG, PNG</span>
                    <span>AI Analysis</span>
                    <span>Find Similar</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Artisan Stories Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">Artisan Stories</h2>
          <Badge variant="secondary">Live Updates</Badge>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {artisanStories.map((story) => (
            <div key={story.id} className="flex-shrink-0 text-center cursor-pointer group">
              <div className={`relative w-20 h-20 mx-auto mb-2 ${
                story.hasNewStory ? 'p-1 bg-gradient-to-tr from-amber-400 to-pink-500 rounded-full' : ''
              }`}>
                <ImageWithFallback
                  src={story.avatar}
                  alt={story.artisan}
                  className="w-full h-full object-cover rounded-full border-2 border-background"
                />
                {story.hasNewStory && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <Plus className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm font-medium truncate w-20">{story.artisan}</p>
              <p className="text-xs text-muted-foreground truncate w-20">{story.craft}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Category-wise Products */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        
        {['Textiles & Clothing', 'Jewelry & Accessories', 'Home Decor'].map((category) => {
          const categoryProducts = publicProducts.filter(product => product.category === category).slice(0, 4);
          
          if (categoryProducts.length === 0) return null;
          
          return (
            <div key={category} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{category}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Navigate to category page - you can implement this later
                    console.log(`Navigate to ${category} category`);
                  }}
                >
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                  <div key={product.id} onClick={() => onNavigate('product-detail', product.id)}>
                    <ProductCard product={product} isSmall />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <Separator />

      {/* Published Products Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Discover Authentic Crafts</h2>
          <Button variant="outline" onClick={() => onNavigate('products')}>
            View All Products
          </Button>
        </div>

        {publicProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {publicProducts.slice(0, 8).map((product) => (
              <div key={product.id} onClick={() => onNavigate('product-detail', product.id)}>
                <ProductCard product={product} isSmall />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available. Artisans are working hard to bring you amazing crafts!</p>
          </div>
        )}
      </section>

      {/* Frequently Bought Together Preview */}
      {publicProducts.length >= 2 && (
        <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-lg mx-4">
          <h2 className="text-2xl font-bold mb-6">Complete Your Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4">
              <div className="text-center">
                <ImageWithFallback
                  src={publicProducts[0]?.image || mockPublicProducts[0]?.image}
                  alt={publicProducts[0]?.name || mockPublicProducts[0]?.name}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h3 className="font-medium text-sm mb-1">{publicProducts[0]?.name || mockPublicProducts[0]?.name}</h3>
                <p className="text-lg font-bold">₹{(publicProducts[0]?.price || mockPublicProducts[0]?.price)?.toLocaleString()}</p>
              </div>
            </Card>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Plus className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Often bought with</p>
              </div>
            </div>
            
            <Card className="p-4">
              <div className="text-center">
                <ImageWithFallback
                  src={publicProducts[1]?.image || mockPublicProducts[1]?.image}
                  alt={publicProducts[1]?.name || mockPublicProducts[1]?.name}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h3 className="font-medium text-sm mb-1">{publicProducts[1]?.name || mockPublicProducts[1]?.name}</h3>
                <p className="text-lg font-bold">₹{(publicProducts[1]?.price || mockPublicProducts[1]?.price)?.toLocaleString()}</p>
              </div>
            </Card>
          </div>
          
          <div className="text-center mt-6">
            <Button className="bg-amber-600 hover:bg-amber-700">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add Both to Cart - Save 10%
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
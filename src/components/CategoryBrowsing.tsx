import { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Search, Grid, List, ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLanguage } from './LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  artisanName: string;
  artisanLocation: string;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
  inStock: boolean;
  isFeatured?: boolean;
}

interface CategoryBrowsingProps {
  selectedCategory?: string;
  onBack: () => void;
  onProductClick: (productId: string) => void;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Blue Pottery Vase',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    artisanName: 'Raj Kumar',
    artisanLocation: 'Jaipur, Rajasthan',
    rating: 4.8,
    reviewCount: 34,
    category: 'pottery',
    description: 'Beautiful handcrafted blue pottery vase with traditional Jaipur designs',
    inStock: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Traditional Ceramic Bowl Set',
    price: 899,
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400',
    artisanName: 'Priya Sharma',
    artisanLocation: 'Khurja, Uttar Pradesh',
    rating: 4.6,
    reviewCount: 28,
    category: 'pottery',
    description: 'Set of 4 handmade ceramic bowls perfect for daily use',
    inStock: true
  },
  {
    id: '3',
    name: 'Handwoven Banarasi Silk Saree',
    price: 8999,
    originalPrice: 12999,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
    artisanName: 'Mohit Verma',
    artisanLocation: 'Varanasi, Uttar Pradesh',
    rating: 4.9,
    reviewCount: 67,
    category: 'textiles',
    description: 'Pure silk Banarasi saree with intricate gold zari work',
    inStock: true,
    isFeatured: true
  },
  {
    id: '4',
    name: 'Block Printed Cotton Bedsheet',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
    artisanName: 'Sunita Devi',
    artisanLocation: 'Jaipur, Rajasthan',
    rating: 4.5,
    reviewCount: 89,
    category: 'textiles',
    description: 'Hand block printed cotton bedsheet with matching pillow covers',
    inStock: true
  },
  {
    id: '5',
    name: 'Carved Wooden Elephant',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1611895916604-7d6c10d2a3de?w=400',
    artisanName: 'Arjun Singh',
    artisanLocation: 'Saharanpur, Uttar Pradesh',
    rating: 4.7,
    reviewCount: 45,
    category: 'woodwork',
    description: 'Intricately carved wooden elephant showpiece',
    inStock: true
  },
  {
    id: '6',
    name: 'Sandalwood Jewelry Box',
    price: 1899,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400',
    artisanName: 'Kiran Gupta',
    artisanLocation: 'Mysore, Karnataka',
    rating: 4.8,
    reviewCount: 52,
    category: 'woodwork',
    description: 'Handcrafted sandalwood jewelry box with intricate carvings',
    inStock: true
  }
];

export function CategoryBrowsing({ selectedCategory, onBack, onProductClick }: CategoryBrowsingProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  const categories = [
    { key: 'pottery', nameKey: 'categories.pottery' },
    { key: 'textiles', nameKey: 'categories.textiles' },
    { key: 'woodwork', nameKey: 'categories.woodwork' },
    { key: 'metalwork', nameKey: 'categories.metalwork' },
    { key: 'jewelry', nameKey: 'categories.jewelry' },
    { key: 'paintings', nameKey: 'categories.paintings' }
  ];

  const getCurrentCategoryName = () => {
    if (!selectedCategory) return 'All Categories';
    const category = categories.find(cat => cat.key === selectedCategory);
    return category ? t(category.nameKey) : 'All Categories';
  };

  useEffect(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.artisanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price
    if (priceFilter !== 'all') {
      filtered = filtered.filter(product => {
        switch (priceFilter) {
          case 'under500':
            return product.price < 500;
          case '500to2000':
            return product.price >= 500 && product.price <= 2000;
          case '2000to5000':
            return product.price >= 2000 && product.price <= 5000;
          case 'above5000':
            return product.price > 5000;
          default:
            return true;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priceLowToHigh':
          return a.price - b.price;
        case 'priceHighToLow':
          return b.price - a.price;
        case 'newest':
          return b.id.localeCompare(a.id); // Assuming higher IDs are newer
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating;
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, sortBy, priceFilter]);

  const ProductCard = ({ product }: { product: Product }) => (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-card border-border"
      onClick={() => onProductClick(product.id)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {product.originalPrice && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-amber-500 text-white">
              Featured
            </Badge>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {t('by')} {product.artisanName}
          </p>
          <p className="text-xs text-muted-foreground mb-3">{product.artisanLocation}</p>
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                // Handle add to cart
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ListProductCard = ({ product }: { product: Product }) => (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-card border-border"
      onClick={() => onProductClick(product.id)}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            {product.originalPrice && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {t('by')} {product.artisanName}
                </p>
                <p className="text-xs text-muted-foreground mb-2">{product.artisanLocation}</p>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-lg text-foreground">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle add to cart
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t('addToCart')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.back')}
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{getCurrentCategoryName()}</h1>
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t('products.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('products.sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{t('products.featured')}</SelectItem>
                  <SelectItem value="newest">{t('products.newest')}</SelectItem>
                  <SelectItem value="priceLowToHigh">{t('products.priceLowToHigh')}</SelectItem>
                  <SelectItem value="priceHighToLow">{t('products.priceHighToLow')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('products.price')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('products.all')}</SelectItem>
                  <SelectItem value="under500">{t('products.under500')}</SelectItem>
                  <SelectItem value="500to2000">{t('products.500to2000')}</SelectItem>
                  <SelectItem value="2000to5000">{t('products.2000to5000')}</SelectItem>
                  <SelectItem value="above5000">{t('products.above5000')}</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
            <Button onClick={() => {
              setSearchTerm('');
              setPriceFilter('all');
              setSortBy('featured');
            }}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredProducts.map(product => (
              viewMode === 'grid'
                ? <ProductCard key={product.id} product={product} />
                : <ListProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
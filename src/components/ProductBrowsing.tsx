import { useState } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

const products = [
  {
    id: 1,
    name: "Traditional Blue Pottery Vase",
    price: 2500,
    originalPrice: 3000,
    rating: 4.8,
    reviews: 127,
    artisan: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    category: "Pottery & Ceramics",
    image: "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwYXJ0aXNhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1ODAxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isNew: false,
    isBestseller: true,
    inStock: true,
    discount: 17
  },
  {
    id: 2,
    name: "Handwoven Kanchipuram Silk Saree",
    price: 15000,
    originalPrice: 18000,
    rating: 4.9,
    reviews: 89,
    artisan: "Lakshmi Devi",
    location: "Kanchipuram, Tamil Nadu",
    category: "Handwoven Textiles",
    image: "https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kd292ZW4lMjB0ZXh0aWxlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU1ODAxNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isNew: true,
    isBestseller: false,
    inStock: true,
    discount: 17
  },
  {
    id: 3,
    name: "Carved Wooden Elephant Sculpture",
    price: 4200,
    originalPrice: 5000,
    rating: 4.7,
    reviews: 156,
    artisan: "Ravi Kumar",
    location: "Channapatna, Karnataka",
    category: "Wood Carving",
    image: "https://images.unsplash.com/photo-1676190365174-c6d1f21fab51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3b29kJTIwY2FydmluZyUyMHRyYWRpdGlvbmFsJTIwY3JhZnR8ZW58MXx8fHwxNzU1ODAxNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isNew: false,
    isBestseller: true,
    inStock: true,
    discount: 16
  },
  {
    id: 4,
    name: "Brass Handcrafted Jewelry Set",
    price: 3500,
    originalPrice: 4000,
    rating: 4.6,
    reviews: 203,
    artisan: "Mohd. Hassan",
    location: "Moradabad, Uttar Pradesh",
    category: "Metal Crafts",
    image: "https://images.unsplash.com/photo-1644341129908-6477e0157037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtZXRhbHdvcmslMjBqZXdlbHJ5JTIwYnJhc3N8ZW58MXx8fHwxNzU1ODAxNzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isNew: false,
    isBestseller: false,
    inStock: true,
    discount: 13
  },
  {
    id: 5,
    name: "Traditional Home Decor Set",
    price: 1800,
    originalPrice: 2200,
    rating: 4.5,
    reviews: 92,
    artisan: "Sunita Patel",
    location: "Kutch, Gujarat",
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1655103715406-8ab5d9b3ee84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBob21lJTIwZGVjb3IlMjB0cmFkaXRpb25hbCUyMGl0ZW1zfGVufDF8fHx8MTc1NTgwMTc2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    isNew: true,
    isBestseller: false,
    inStock: false,
    discount: 18
  },
  {
    id: 6,
    name: "Embroidered Kashmiri Shawl",
    price: 8500,
    originalPrice: 10000,
    rating: 4.9,
    reviews: 67,
    artisan: "Farida Khan",
    location: "Srinagar, Kashmir",
    category: "Handwoven Textiles",
    image: "https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kd292ZW4lMjB0ZXh0aWxlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU1ODAxNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isNew: false,
    isBestseller: true,
    inStock: true,
    discount: 15
  }
];

const categories = [
  "All Categories",
  "Pottery & Ceramics",
  "Handwoven Textiles", 
  "Wood Carving",
  "Metal Crafts",
  "Jewelry & Accessories",
  "Home Decor"
];

const states = [
  "All States",
  "Rajasthan",
  "Tamil Nadu",
  "Karnataka",
  "Uttar Pradesh",
  "Gujarat",
  "Kashmir"
];

interface ProductBrowsingProps {
  onBack?: () => void;
  onProductClick?: (productId: number) => void;
}

export function ProductBrowsing({ onBack, onProductClick }: ProductBrowsingProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedState, setSelectedState] = useState("All States");
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.artisan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesState = selectedState === "All States" || product.location.includes(selectedState);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesState && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "newest": return a.isNew ? -1 : 1;
      default: return b.reviews - a.reviews; // popularity
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        {onBack && (
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        )}
        
        {/* Search and Sort Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search crafts, artisans, or categories..."
                className="pl-10 pr-4 py-3 w-full text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`bg-white rounded-lg shadow-sm p-6 h-fit ${showFilters ? 'block' : 'hidden lg:block'} w-80`}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">State</label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-4 block">
                      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={20000}
                      min={0}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>₹0</span>
                      <span>₹20,000+</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">Special Offers</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bestseller" />
                        <label htmlFor="bestseller" className="text-sm">Bestsellers</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="new" />
                        <label htmlFor="new" className="text-sm">New Arrivals</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="discount" />
                        <label htmlFor="discount" className="text-sm">On Sale</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </p>
              {selectedCategory !== "All Categories" && (
                <Badge variant="secondary" className="px-3 py-1">
                  {selectedCategory}
                </Badge>
              )}
            </div>

            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        viewMode === "grid" ? "h-64" : "h-48 md:h-32"
                      }`}
                    />
                    
                    {product.discount > 0 && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                        {product.discount}% OFF
                      </Badge>
                    )}

                    {product.isNew && (
                      <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                        New
                      </Badge>
                    )}

                    {product.isBestseller && (
                      <Badge className="absolute top-10 right-3 bg-orange-500 text-white">
                        Bestseller
                      </Badge>
                    )}

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-white">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className={`${viewMode === "list" ? "flex gap-4" : ""}`}>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-gray-500">({product.reviews})</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                          <MapPin className="w-3 h-3" />
                          <span className="font-medium">{product.artisan}</span>
                          <span>•</span>
                          <span>{product.location}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>

                        <Badge variant="outline" className="text-xs mb-3">
                          {product.category}
                        </Badge>
                      </div>

                      <div className={`${viewMode === "list" ? "flex flex-col gap-2 w-32" : "flex gap-2"}`}>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-orange-600 hover:bg-orange-700"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => onProductClick?.(product.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                    setSelectedState("All States");
                    setPriceRange([0, 20000]);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
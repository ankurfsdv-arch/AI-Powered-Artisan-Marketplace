import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Upload, Camera, Search, Star, ShoppingCart, 
  Trash2, Eye, Clock, Image as ImageIcon, Sparkles,
  Filter, ArrowRight
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface AIImageAssistantProps {
  onNavigate: (page: string, productId?: string) => void;
}

interface SearchHistory {
  id: string;
  uploadedImage: string;
  timestamp: Date;
  category: string;
  resultCount: number;
}

interface ProductRecommendation {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  artisan: string;
  category: string;
  confidence: number;
  matchType: string;
}

export function AIImageAssistant({ onNavigate }: AIImageAssistantProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock search history
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([
    {
      id: '1',
      uploadedImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwbXVnfGVufDF8fHx8MTc1NjgzNDU5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      timestamp: new Date('2024-01-20'),
      category: 'Kitchen & Dining',
      resultCount: 8
    },
    {
      id: '2',
      uploadedImage: 'https://images.unsplash.com/photo-1632925077146-8df4b0578e3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMG5lY2tsYWNlfGVufDF8fHx8MTc1NjgzNDYxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      timestamp: new Date('2024-01-18'),
      category: 'Jewelry',
      resultCount: 12
    }
  ]);

  // Mock AI analysis and product matching
  const analyzeImage = async (imageFile: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI detection results based on common craft categories
    const mockCategories = [
      'Kitchen & Dining', 'Jewelry', 'Home Decor', 'Textiles', 
      'Bags & Accessories', 'Art & Paintings', 'Pottery'
    ];
    
    const detectedCategory = mockCategories[Math.floor(Math.random() * mockCategories.length)];
    setCurrentCategory(detectedCategory);
    
    // Mock product recommendations
    const mockRecommendations: ProductRecommendation[] = [
      {
        id: '1',
        name: 'Handmade Ceramic Tea Cup',
        price: 450,
        originalPrice: 600,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwY3VwfGVufDF8fHx8MTc1NjgzNDY0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        artisan: 'Priya Pottery Works',
        category: detectedCategory,
        confidence: 95,
        matchType: 'Exact Style'
      },
      {
        id: '2',
        name: 'Blue Glazed Mug Set',
        price: 850,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwbXVnfGVufDF8fHx8MTc1NjgzNDY3MXww&ixlib=rb-4.1.0&q=80&w=1080',
        artisan: 'Ceramic Craft Studio',
        category: detectedCategory,
        confidence: 88,
        matchType: 'Similar Color'
      },
      {
        id: '3',
        name: 'Traditional Clay Kulhad',
        price: 320,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwY3VwfGVufDF8fHx8MTc1NjgzNDY5NHww&ixlib=rb-4.1.0&q=80&w=1080',
        artisan: 'Village Ceramics',
        category: detectedCategory,
        confidence: 82,
        matchType: 'Similar Material'
      },
      {
        id: '4',
        name: 'Artisan Coffee Cup',
        price: 650,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1516401266446-6432a8a07d41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXB8ZW58MXx8fHwxNzU2ODM0NzE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        artisan: 'Handcraft Pottery',
        category: detectedCategory,
        confidence: 79,
        matchType: 'Similar Shape'
      },
      {
        id: '5',
        name: 'Decorative Ceramic Bowl',
        price: 750,
        originalPrice: 950,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1578575437130-527ecdcdea1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwYm93bHxlbnwxfHx8fDE3NTY4MzQ3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        artisan: 'Traditional Arts',
        category: detectedCategory,
        confidence: 75,
        matchType: 'Complete the Look'
      }
    ];
    
    setRecommendations(mockRecommendations);
    
    // Add to search history
    const newSearch: SearchHistory = {
      id: Date.now().toString(),
      uploadedImage: uploadedImage!,
      timestamp: new Date(),
      category: detectedCategory,
      resultCount: mockRecommendations.length
    };
    
    setSearchHistory(prev => [newSearch, ...prev]);
    setIsAnalyzing(false);
    
    toast.success(`Found ${mockRecommendations.length} similar products in ${detectedCategory}!`);
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (JPG, PNG, JPEG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      setUploadedImage(imageUrl);
      analyzeImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Excellent Match</Badge>;
    if (confidence >= 80) return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Good Match</Badge>;
    return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Similar Item</Badge>;
  };

  const clearSearch = () => {
    setUploadedImage(null);
    setRecommendations([]);
    setCurrentCategory(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const repeatSearch = (historyItem: SearchHistory) => {
    setUploadedImage(historyItem.uploadedImage);
    setCurrentCategory(historyItem.category);
    // Simulate re-running the search with the same image
    analyzeImage(new File([], 'repeat-search.jpg', { type: 'image/jpeg' }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            AI Image Assistant
          </CardTitle>
          <CardDescription>
            Upload an image to find similar handcrafted products using AI-powered visual search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Image Search
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Search History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              {/* Image Upload Section */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging 
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20' 
                    : 'border-muted-foreground/25 hover:border-amber-400'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {uploadedImage ? (
                  <div className="space-y-4">
                    <ImageWithFallback
                      src={uploadedImage}
                      alt="Uploaded image"
                      className="w-32 h-32 object-cover rounded-lg mx-auto border"
                    />
                    <div>
                      <p className="font-medium">Image uploaded successfully!</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearSearch}
                        className="mt-2"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium">Upload Image to Find Products</p>
                      <p className="text-muted-foreground">
                        Drag & drop an image here, or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Supports JPG, PNG, JPEG • Max 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Analysis Status */}
              {isAnalyzing && (
                <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200">
                          AI is analyzing your image...
                        </p>
                        <p className="text-sm text-amber-600 dark:text-amber-300">
                          Detecting patterns, colors, and matching with artisan products
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Results Section */}
              {recommendations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Product Recommendations</h3>
                      <p className="text-sm text-muted-foreground">
                        Found {recommendations.length} similar products in {currentCategory}
                      </p>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Filter className="w-3 h-3" />
                      {currentCategory}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.map((product) => (
                      <Card key={product.id} className="group hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="relative">
                            <ImageWithFallback
                              src={product.image}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 left-2">
                              {getConfidenceBadge(product.confidence)}
                            </div>
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary" className="text-xs">
                                {product.matchType}
                              </Badge>
                            </div>
                          </div>

                          <div className="p-4">
                            <h4 className="font-medium mb-1">{product.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">by {product.artisan}</p>
                            
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="text-sm">{product.rating}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {product.confidence}% match
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              <span className="font-bold">₹{product.price.toLocaleString()}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ₹{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="flex-1 bg-amber-600 hover:bg-amber-700"
                                onClick={() => toast.success('Added to cart!')}
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onNavigate('product-detail', product.id)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Complete the Look Section */}
                  {currentCategory === 'Jewelry' && (
                    <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-amber-800 dark:text-amber-200">
                              Complete the Look
                            </h4>
                            <p className="text-sm text-amber-600 dark:text-amber-300">
                              Browse matching earrings and bracelets to complete your jewelry set
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                            onClick={() => onNavigate('products')}
                          >
                            Browse More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Search History</h3>
                <p className="text-sm text-muted-foreground">
                  {searchHistory.length} previous searches
                </p>
              </div>

              {searchHistory.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h4 className="font-medium mb-2">No search history yet</h4>
                    <p className="text-muted-foreground">
                      Upload your first image to start building your search history
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {searchHistory.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <ImageWithFallback
                            src={item.uploadedImage}
                            alt="Search image"
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">{item.category}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {item.resultCount} products found
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Searched on {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => repeatSearch(item)}
                            >
                              <Search className="w-4 h-4 mr-2" />
                              Search Again
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from 'react';
import { ArrowLeft, Star, Heart, Share2, Shield, Truck, RotateCcw, MessageCircle, Plus, Minus, ShoppingCart, Zap, User, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

const product = {
  id: 1,
  name: "Traditional Blue Pottery Vase",
  price: 2500,
  originalPrice: 3000,
  rating: 4.8,
  reviews: 127,
  description: "Exquisite handcrafted blue pottery vase featuring traditional Jaipur patterns. Each piece is uniquely made using centuries-old techniques passed down through generations. The intricate floral motifs and geometric patterns represent the rich cultural heritage of Rajasthan.",
  features: [
    "Handcrafted using traditional techniques",
    "Lead-free and food-safe glazes",
    "Unique blue and white color palette",
    "Perfect for both decorative and functional use",
    "Dishwasher safe",
    "Dimension: 12\" H x 6\" W"
  ],
  images: [
    "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwYXJ0aXNhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1ODAxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwYXJ0aXNhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1ODAxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwYXJ0aXNhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1ODAxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  ],
  artisan: {
    name: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    bio: "Third-generation potter specializing in traditional blue pottery. Priya learned the art from her grandmother and has been creating beautiful pieces for over 15 years. Her work has been featured in numerous exhibitions and she's passionate about preserving this ancient craft.",
    experience: "15+ years",
    specialties: ["Blue Pottery", "Traditional Patterns", "Custom Designs"],
    avatar: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGFydGlzYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTU4MDEyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    totalProducts: 45,
    rating: 4.9
  },
  inStock: true,
  stockCount: 8,
  category: "Pottery & Ceramics",
  tags: ["Handmade", "Traditional", "Blue Pottery", "Rajasthani", "Home Decor"],
  deliveryInfo: {
    standard: "5-7 business days",
    express: "2-3 business days (+₹200)",
    cod: true,
    freeShipping: true
  }
};

const reviews = [
  {
    id: 1,
    name: "Anjali Mehta",
    rating: 5,
    date: "2 weeks ago",
    comment: "Absolutely beautiful! The craftsmanship is exceptional and it looks even better in person. Priya's work is truly amazing.",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 4,
    date: "1 month ago", 
    comment: "Good quality product. Delivery was quick and packaging was excellent. Would recommend.",
    verified: true
  },
  {
    id: 3,
    name: "Sarah Wilson",
    rating: 5,
    date: "2 months ago",
    comment: "Purchased this as a gift and it was perfect! The recipient loved it. Great work by the artisan.",
    verified: true
  }
];

const relatedProducts = [
  {
    id: 2,
    name: "Blue Pottery Bowl Set",
    price: 1800,
    originalPrice: 2200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwYXJ0aXNhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1ODAxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "Traditional Tea Set",
    price: 3200,
    originalPrice: 3800,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwYXJ0aXNhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1ODAxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

interface ProductDetailProps {
  onBack?: () => void;
}

export function ProductDetail({ onBack }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Button variant="ghost" size="sm" className="p-0" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <span>•</span>
          <span>{product.category}</span>
          <span>•</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white">
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <span className="text-green-600 font-medium">In Stock ({product.stockCount} left)</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <Badge className="bg-red-500 text-white">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              </div>
            </div>

            {/* Artisan Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={product.artisan.avatar} />
                    <AvatarFallback>{product.artisan.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{product.artisan.name}</span>
                      <Badge variant="outline" className="text-xs">Verified Artisan</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{product.artisan.location} • {product.artisan.experience}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button size="lg" className="flex-1 bg-orange-600 hover:bg-orange-700">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <Zap className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Free Delivery</p>
                    <p className="text-sm text-gray-600">Standard: {product.deliveryInfo.standard}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">30-Day Returns</p>
                    <p className="text-sm text-gray-600">Free returns on all orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Authenticity Guaranteed</p>
                    <p className="text-sm text-gray-600">AI-verified genuine craft</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="artisan">Artisan Story</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
            </TabsList>
            
            <div className="p-6">
              <TabsContent value="description" className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="artisan" className="space-y-6">
                <div className="flex items-start gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={product.artisan.avatar} />
                    <AvatarFallback>{product.artisan.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{product.artisan.name}</h3>
                    <p className="text-gray-600 mb-4">{product.artisan.location} • {product.artisan.experience}</p>
                    <p className="text-gray-700 leading-relaxed">{product.artisan.bio}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{product.artisan.totalProducts}</div>
                      <div className="text-sm text-gray-600">Products</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{product.artisan.rating}</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">{product.artisan.experience}</div>
                      <div className="text-sm text-gray-600">Experience</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <Button variant="outline">
                    Write a Review
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {reviews.map(review => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.name}</span>
                              {review.verified && (
                                <Badge variant="outline" className="text-xs">Verified Purchase</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="qa" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Questions & Answers</h3>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask Question
                  </Button>
                </div>
                <div className="text-center py-8">
                  <p className="text-gray-500">No questions yet. Be the first to ask!</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        {/* Frequently Bought Together */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6">Frequently Bought Together</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-6">
              {/* Current Product */}
              <div className="text-center">
                <div className="relative">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg border-2 border-amber-500"
                  />
                  <Badge className="absolute -top-2 -left-2 bg-amber-600 text-white">This item</Badge>
                </div>
                <h4 className="font-medium mt-2 text-sm">{product.name}</h4>
                <p className="font-bold">₹{product.price.toLocaleString()}</p>
              </div>

              {/* Plus Symbol */}
              <div className="flex items-center justify-center">
                <div className="bg-gray-100 rounded-full p-3">
                  <Plus className="w-6 h-6 text-gray-600" />
                </div>
              </div>

              {/* Linked Product */}
              <div className="text-center">
                <ImageWithFallback
                  src={relatedProducts[0].image}
                  alt={relatedProducts[0].name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h4 className="font-medium mt-2 text-sm">{relatedProducts[0].name}</h4>
                <p className="font-bold">₹{relatedProducts[0].price.toLocaleString()}</p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-lg font-bold">Total: ₹{(product.price + relatedProducts[0].price).toLocaleString()}</span>
                <Badge className="bg-green-100 text-green-800">Save 10%</Badge>
              </div>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add Both to Cart
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Artisan Profile Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6">Meet the Artisan</h3>
            <div className="flex items-start gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={product.artisan.avatar} />
                <AvatarFallback className="bg-amber-600 text-white text-xl">
                  {product.artisan.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h4 className="text-xl font-bold mb-2">{product.artisan.name}</h4>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.artisan.rating} (127 reviews)</span>
                  </div>
                  <span className="text-gray-600">{product.artisan.experience}</span>
                  <span className="text-gray-600">{product.artisan.location}</span>
                </div>
                
                <p className="text-gray-700 mb-4">
                  {product.artisan.bio}
                </p>
                
                <div className="flex gap-3">
                  <Button variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline">
                    <Package className="w-4 h-4 mr-2" />
                    More Products ({product.artisan.totalProducts})
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Artisan
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Products */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6">You might also like</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map(item => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square overflow-hidden rounded-t-lg relative">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2 line-clamp-2">{item.name}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
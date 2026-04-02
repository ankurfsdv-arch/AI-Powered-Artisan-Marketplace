import { useState } from 'react';
import { Minus, Plus, X, ArrowRight, ArrowLeft, ShoppingBag, Truck, Shield, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

const cartItems = [
  {
    id: 1,
    name: "Traditional Blue Pottery Vase",
    price: 2500,
    originalPrice: 3000,
    quantity: 1,
    artisan: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwYXJ0aXNhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1ODAxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    maxQuantity: 8
  },
  {
    id: 2,
    name: "Handwoven Kanchipuram Silk Saree",
    price: 15000,
    originalPrice: 18000,
    quantity: 1,
    artisan: "Lakshmi Devi",
    image: "https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kd292ZW4lMjB0ZXh0aWxlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU1ODAxNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    maxQuantity: 3
  },
  {
    id: 3,
    name: "Carved Wooden Elephant Sculpture",
    price: 4200,
    originalPrice: 5000,
    quantity: 2,
    artisan: "Ravi Kumar",
    image: "https://images.unsplash.com/photo-1676190365174-c6d1f21fab51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3b29kJTIwY2FydmluZyUyMHRyYWRpdGlvbmFsJTIwY3JhZnR8ZW58MXx8fHwxNzU1ODAxNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    inStock: true,
    maxQuantity: 5
  }
];

const suggestedItems = [
  {
    id: 4,
    name: "Blue Pottery Bowl Set",
    price: 1800,
    originalPrice: 2200,
    image: "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwYXJ0aXNhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1ODAxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    artisan: "Priya Sharma"
  },
  {
    id: 5,
    name: "Traditional Incense Holder",
    price: 950,
    originalPrice: 1200,
    image: "https://images.unsplash.com/photo-1655103715406-8ab5d9b3ee84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBob21lJTIwZGVjb3IlMjB0cmFkaXRpb25hbCUyMGl0ZW1zfGVufDF8fHx8MTc1NTgwMTc2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    artisan: "Sunita Patel"
  }
];

export function ShoppingCart() {
  const [items, setItems] = useState(cartItems);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity)) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "welcome10") {
      setAppliedCoupon("WELCOME10");
      setCouponCode("");
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = items.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const couponDiscount = appliedCoupon ? Math.min(500, subtotal * 0.1) : 0;
  const shipping = subtotal >= 2000 ? 0 : 199;
  const total = subtotal - couponDiscount + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Discover amazing handcrafted products from local artisans</p>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{items.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600">by {item.artisan}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                          )}
                          {item.originalPrice > item.price && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Save ₹{(item.originalPrice - item.price).toLocaleString()}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-3 py-1 font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxQuantity}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</div>
                            {item.quantity > 1 && (
                              <div className="text-xs text-gray-500">₹{item.price.toLocaleString()} each</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {item.quantity === item.maxQuantity && (
                        <p className="text-xs text-amber-600 mt-2">Maximum available quantity reached</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Suggested Items */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Frequently bought together</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestedItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">by {item.artisan}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm">₹{item.price.toLocaleString()}</span>
                            <span className="text-xs text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs">
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You saved</span>
                      <span>-₹{savings.toLocaleString()}</span>
                    </div>
                  )}
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon ({appliedCoupon})</span>
                      <span>-₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  
                  {shipping === 0 && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Truck className="w-4 h-4" />
                      <span>Free shipping on orders over ₹2,000</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={applyCoupon}>
                      Apply
                    </Button>
                  </div>
                  {!appliedCoupon && (
                    <p className="text-xs text-gray-500 mt-1">Try: WELCOME10 for 10% off</p>
                  )}
                </div>

                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 mb-4">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping on orders over ₹2,000</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="text-center">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
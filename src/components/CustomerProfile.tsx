import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  User, Package, MapPin, Heart, CreditCard, Settings, 
  Edit, Trash2, Download, Star, Eye, Plus, Calendar,
  Phone, Mail, Home, Camera, Sparkles
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AIImageAssistant } from './AIImageAssistant';
import { toast } from 'sonner@2.0.3';

interface CustomerProfileProps {
  user: {
    id: string;
    fullName: string;
    mobileNumber: string;
    email?: string;
  };
  onNavigate: (page: string, productId?: string) => void;
  initialTab?: string;
}

export function CustomerProfile({ user, onNavigate, initialTab = 'details' }: CustomerProfileProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);

  // Mock user data
  const [userDetails, setUserDetails] = useState({
    fullName: user.fullName,
    email: user.email || `${user.mobileNumber}@kalakriti.com`,
    phone: user.mobileNumber,
    dateOfBirth: '1990-05-15',
    gender: 'Female',
    anniversary: '2018-12-10'
  });

  // Mock orders data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 8500,
      items: [
        {
          name: 'Handwoven Silk Saree',
          price: 8500,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2FyZWV8ZW58MXx8fHwxNzU2ODM0MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
          artisan: 'Meera Devi'
        }
      ],
      deliveredDate: '2024-01-20',
      trackingId: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 2400,
      items: [
        {
          name: 'Brass Traditional Lamp',
          price: 2400,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMGxhbXB8ZW58MXx8fHwxNzU2ODM0MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
          artisan: 'Raj Kumar'
        }
      ],
      estimatedDelivery: '2024-01-25',
      trackingId: 'TRK987654321'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'Processing',
      total: 1500,
      items: [
        {
          name: 'Cotton Kurta Set',
          price: 1500,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1583391733975-b8b3ac1b2e4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBrdXJ0YXxlbnwxfHx8fDE3NTY4MzQzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
          artisan: 'Sita Sharma'
        }
      ],
      estimatedDelivery: '2024-01-30'
    }
  ];

  // Mock addresses
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      type: 'Home',
      name: 'Priya Sharma',
      phone: '+91 9876543210',
      address: '123, Green Valley Apartments',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    {
      id: '2',
      type: 'Office',
      name: 'Priya Sharma',
      phone: '+91 9876543210',
      address: '456, Tech Park, Sector 5',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      isDefault: false
    }
  ]);

  // Mock wishlist
  const wishlistItems = [
    {
      id: '1',
      name: 'Terracotta Vase',
      price: 800,
      originalPrice: 950,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwdmFzZXxlbnwxfHx8fDE3NTY4MzQ0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      artisan: 'Lakshmi Bai',
      addedDate: '2024-01-12'
    },
    {
      id: '2',
      name: 'Silver Earrings',
      price: 2200,
      originalPrice: null,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBlYXJyaW5nc3xlbnwxfHx8fDE3NTY4MzQ1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      artisan: 'Anita Kumari',
      addedDate: '2024-01-08'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Delivered</Badge>;
      case 'Shipped':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Shipped</Badge>;
      case 'Processing':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Processing</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const saveDetails = () => {
    toast.success('Profile updated successfully!');
  };

  const addAddress = () => {
    toast.success('Address added successfully!');
  };

  const removeFromWishlist = (itemId: string) => {
    toast.success('Item removed from wishlist');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="details" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">My Details</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">My Orders</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* My Details */}
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-amber-600 text-white text-xl">
                      {userDetails.fullName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG. Max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={userDetails.fullName}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, fullName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={userDetails.dateOfBirth}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Input
                      id="gender"
                      value={userDetails.gender}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, gender: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="anniversary">Anniversary (Optional)</Label>
                    <Input
                      id="anniversary"
                      type="date"
                      value={userDetails.anniversary}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, anniversary: e.target.value }))}
                    />
                  </div>
                </div>

                <Button onClick={saveDetails} className="bg-amber-600 hover:bg-amber-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Orders */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Track and manage your orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(order.status)}
                          <p className="text-lg font-bold mt-1">₹{order.total.toLocaleString()}</p>
                        </div>
                      </div>

                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 mb-4">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">by {item.artisan}</p>
                            <p className="text-sm">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}

                      <Separator className="my-4" />

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {order.status === 'Delivered' && order.deliveredDate && (
                            <span>Delivered on {new Date(order.deliveredDate).toLocaleDateString()}</span>
                          )}
                          {order.status === 'Shipped' && order.estimatedDelivery && (
                            <span>Expected delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                          )}
                          {order.trackingId && (
                            <span className="ml-4">Tracking: {order.trackingId}</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Invoice
                          </Button>
                          {order.status === 'Delivered' && (
                            <Button variant="outline" size="sm">
                              <Star className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Track
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Addresses */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Saved Addresses</CardTitle>
                    <CardDescription>Manage your delivery addresses</CardDescription>
                  </div>
                  <Button onClick={addAddress} className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <Card key={address.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={address.type === 'Home' ? 'default' : 'secondary'}>
                            {address.type}
                          </Badge>
                          {address.isDefault && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => setEditingAddress(address.id)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-sm">
                        <p className="font-medium">{address.name}</p>
                        <p>{address.address}</p>
                        <p>{address.city}, {address.state} - {address.pincode}</p>
                        <p className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {address.phone}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <Card key={item.id} className="group">
                      <CardContent className="p-0">
                        <div className="relative">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">by {item.artisan}</p>
                          
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm">{item.rating}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-bold">₹{item.price.toLocaleString()}</span>
                            {item.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ₹{item.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700">
                              Add to Cart
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onNavigate('product-detail', item.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mt-2">
                            Added on {new Date(item.addedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Image Assistant */}
          <TabsContent value="ai-assistant">
            <AIImageAssistant onNavigate={onNavigate} />
          </TabsContent>

          {/* Payment Methods */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-12">
                    <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium mb-2">No payment methods saved</h3>
                    <p className="text-muted-foreground mb-4">Add a payment method for faster checkout</p>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotional Emails</p>
                        <p className="text-sm text-muted-foreground">Receive offers and recommendations</p>
                      </div>
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-4">Privacy</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
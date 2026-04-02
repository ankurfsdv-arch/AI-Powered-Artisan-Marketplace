import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User, Package, BarChart3, Settings, Plus, Edit, Eye, Trash2, Camera, Star, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { KalaKritiLogo } from '../KalaKritiLogo';
import { ArtisanProfile } from './ArtisanProfile';
import { ProductManagement } from './ProductManagement';
import { AnalyticsDashboard } from './AnalyticsDashboard';

interface ArtisanDashboardProps {
  artisan: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    location: string;
    craft: string;
    experience: number;
    rating: number;
    totalProducts: number;
    totalSales: number;
    revenue: number;
  };
  onLogout: () => void;
}

export function ArtisanDashboard({ artisan, onLogout }: ArtisanDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/20 dark:to-orange-900/20">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <KalaKritiLogo size="sm" />
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={artisan.avatar} alt={artisan.name} />
                  <AvatarFallback className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    {artisan.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Welcome back, {artisan.name}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {artisan.craft} Artisan • {artisan.location}
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout} className="border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 dark:bg-gray-800/60">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Total Products
                  </CardTitle>
                  <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {artisan.totalProducts}
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
                    Total Sales
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-green-600 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {artisan.totalSales}
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">
                    Revenue
                  </CardTitle>
                  <Star className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                    ₹{artisan.revenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    +8% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Rating
                  </CardTitle>
                  <Star className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {artisan.rating.toFixed(1)}
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    Based on 47 reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest business updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'sale', title: 'New order received', desc: 'Handwoven silk saree', time: '2 hours ago', amount: '₹8,500' },
                    { type: 'review', title: 'New review received', desc: '5-star rating on cotton kurta', time: '5 hours ago' },
                    { type: 'product', title: 'Product updated', desc: 'Added new images to brass lamp', time: '1 day ago' },
                    { type: 'inquiry', title: 'Customer inquiry', desc: 'Bulk order request for 20 items', time: '2 days ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'sale' ? 'bg-green-500' :
                        activity.type === 'review' ? 'bg-blue-500' :
                        activity.type === 'product' ? 'bg-amber-500' : 'bg-purple-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.desc}</p>
                      </div>
                      <div className="text-right">
                        {activity.amount && (
                          <p className="font-medium text-green-600 dark:text-green-400">{activity.amount}</p>
                        )}
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement artisanId={artisan.id} />
          </TabsContent>

          <TabsContent value="profile">
            <ArtisanProfile artisan={artisan} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard artisanId={artisan.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
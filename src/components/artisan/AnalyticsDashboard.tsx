import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Users, Package, IndianRupee, Star, Eye, ShoppingCart } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AnalyticsDashboardProps {
  artisanId: string;
}

const salesData = [
  { month: 'Jan', sales: 12000, orders: 45, visitors: 1200 },
  { month: 'Feb', sales: 15000, orders: 52, visitors: 1450 },
  { month: 'Mar', sales: 18000, orders: 61, visitors: 1680 },
  { month: 'Apr', sales: 22000, orders: 72, visitors: 1920 },
  { month: 'May', sales: 25000, orders: 85, visitors: 2100 },
  { month: 'Jun', sales: 28000, orders: 92, visitors: 2350 }
];

const productPerformance = [
  { name: 'Silk Sarees', sales: 45, revenue: 180000, color: '#8B5CF6' },
  { name: 'Brass Items', sales: 32, revenue: 95000, color: '#F59E0B' },
  { name: 'Cotton Fabrics', sales: 28, revenue: 112000, color: '#10B981' },
  { name: 'Jewelry', sales: 15, revenue: 75000, color: '#EF4444' }
];

const customerInsights = [
  { region: 'Mumbai', customers: 35, color: '#8B5CF6' },
  { region: 'Delhi', customers: 28, color: '#F59E0B' },
  { region: 'Bangalore', customers: 22, color: '#10B981' },
  { region: 'Kolkata', customers: 15, color: '#EF4444' }
];

const topProducts = [
  { name: 'Handwoven Silk Saree', views: 2341, sales: 12, rating: 4.8, revenue: 102000 },
  { name: 'Brass Oil Lamp Set', views: 1890, sales: 18, rating: 4.6, revenue: 21600 },
  { name: 'Block Print Cotton Kurta', views: 1654, sales: 8, rating: 4.7, revenue: 32000 },
  { name: 'Silver Anklet Pair', views: 1432, sales: 6, rating: 4.9, revenue: 18000 }
];

export function AnalyticsDashboard({ artisanId }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Business Analytics</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your business performance and customer insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 dark:text-green-300">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">₹28,000</p>
                <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </div>
              </div>
              <IndianRupee className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">Total Orders</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">92</p>
                <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% from last month
                </div>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 dark:text-purple-300">Profile Views</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">2,350</p>
                <div className="flex items-center text-xs text-purple-600 dark:text-purple-400 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +22% from last month
                </div>
              </div>
              <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 dark:text-amber-300">Avg Rating</p>
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">4.8</p>
                <div className="flex items-center text-xs text-amber-600 dark:text-amber-400 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +0.3 from last month
                </div>
              </div>
              <Star className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <CardDescription>Revenue and order trends over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.3}
                  name="Revenue (₹)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="Orders"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Product Category Performance</CardTitle>
            <CardDescription>Sales distribution by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productPerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="sales"
                  >
                    {productPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Customer Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Geographic Distribution</CardTitle>
            <CardDescription>Where your customers are located</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerInsights}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="customers" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Your most popular and profitable items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {product.views} views
                    </div>
                    <div className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {product.sales} sales
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-500" />
                      {product.rating}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">₹{product.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights & Recommendations</CardTitle>
          <CardDescription>Personalized suggestions to grow your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-200">Growing Demand</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Silk sarees are trending 25% higher this season. Consider creating more variations with contemporary patterns.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Customer Feedback</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Customers love your product photography! Your detailed shots increase purchase rate by 35%.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <Package className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 dark:text-amber-200">Inventory Optimization</h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Your brass items have low stock. Based on demand patterns, consider restocking before the festival season.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
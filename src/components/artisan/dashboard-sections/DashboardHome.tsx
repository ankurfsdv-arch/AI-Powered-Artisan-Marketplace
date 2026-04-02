import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Package, BarChart3, Star, TrendingUp, Eye, Heart, ShoppingCart, MessageCircle } from 'lucide-react';
import { TestProductCreator } from '../../TestProductCreator';

interface DashboardHomeProps {
  artisan: {
    id: string;
    name: string;
    totalProducts: number;
    totalSales: number;
    revenue: number;
    rating: number;
  };
}

export function DashboardHome({ artisan }: DashboardHomeProps) {
  const stats = [
    {
      title: 'Total Products',
      value: artisan.totalProducts.toString(),
      description: '+2 from last month',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Total Sales',
      value: artisan.totalSales.toString(),
      description: '+12% from last month',
      icon: BarChart3,
      color: 'green'
    },
    {
      title: 'Revenue',
      value: `₹${artisan.revenue.toLocaleString()}`,
      description: '+8% from last month',
      icon: TrendingUp,
      color: 'amber'
    },
    {
      title: 'Rating',
      value: artisan.rating.toFixed(1),
      description: 'Based on 47 reviews',
      icon: Star,
      color: 'purple'
    }
  ];

  const recentActivity = [
    {
      type: 'sale',
      title: 'New order received',
      desc: 'Handwoven silk saree - Premium Collection',
      time: '2 hours ago',
      amount: '₹8,500',
      icon: ShoppingCart,
      color: 'green'
    },
    {
      type: 'review',
      title: 'New review received',
      desc: '5-star rating: "Beautiful craftsmanship!"',
      time: '5 hours ago',
      icon: Star,
      color: 'amber'
    },
    {
      type: 'view',
      title: 'Product views increased',
      desc: 'Brass traditional lamp gained 45 new views',
      time: '8 hours ago',
      icon: Eye,
      color: 'blue'
    },
    {
      type: 'inquiry',
      title: 'Customer inquiry',
      desc: 'Bulk order request for wedding collection',
      time: '1 day ago',
      icon: MessageCircle,
      color: 'purple'
    },
    {
      type: 'wishlist',
      title: 'Added to wishlists',
      desc: 'Cotton kurta set added to 12 wishlists',
      time: '2 days ago',
      icon: Heart,
      color: 'red'
    }
  ];

  const trendingProducts = [
    {
      name: 'Handwoven Silk Saree',
      views: 245,
      sales: 8,
      revenue: 68000,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2FyZWV8ZW58MXx8fHwxNzU2ODM0MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Brass Traditional Lamp',
      views: 189,
      sales: 12,
      revenue: 24000,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMGxhbXB8ZW58MXx8fHwxNzU2ODM0MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Cotton Kurta Set',
      views: 156,
      sales: 15,
      revenue: 22500,
      image: 'https://images.unsplash.com/photo-1583391733975-b8b3ac1b2e4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBrdXJ0YXxlbnwxfHx8fDE3NTY4MzQzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {artisan.name}! 👋</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your craft business today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`bg-gradient-to-br ${
              stat.color === 'blue' ? 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20' :
              stat.color === 'green' ? 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20' :
              stat.color === 'amber' ? 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20' :
              'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
            }`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${
                  stat.color === 'blue' ? 'text-blue-700 dark:text-blue-300' :
                  stat.color === 'green' ? 'text-green-700 dark:text-green-300' :
                  stat.color === 'amber' ? 'text-amber-700 dark:text-amber-300' :
                  'text-purple-700 dark:text-purple-300'
                }`}>
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${
                  stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                  stat.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                  'text-purple-600 dark:text-purple-400'
                }`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${
                  stat.color === 'blue' ? 'text-blue-900 dark:text-blue-100' :
                  stat.color === 'green' ? 'text-green-900 dark:text-green-100' :
                  stat.color === 'amber' ? 'text-amber-900 dark:text-amber-100' :
                  'text-purple-900 dark:text-purple-100'
                }`}>
                  {stat.value}
                </div>
                <p className={`text-xs mt-1 ${
                  stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                  stat.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                  'text-purple-600 dark:text-purple-400'
                }`}>
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest business updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <div className={`p-2 rounded-full ${
                      activity.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                      activity.color === 'amber' ? 'bg-amber-100 dark:bg-amber-900/30' :
                      activity.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                      activity.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                      'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        activity.color === 'green' ? 'text-green-600 dark:text-green-400' :
                        activity.color === 'amber' ? 'text-amber-600 dark:text-amber-400' :
                        activity.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                        activity.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                        'text-red-600 dark:text-red-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.desc}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                    {activity.amount && (
                      <div className="font-bold text-green-600 dark:text-green-400 text-sm">
                        {activity.amount}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Trending Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trending Products
            </CardTitle>
            <CardDescription>Your top performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trendingProducts.map((product, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">{product.views} views</span>
                      <span className="text-xs text-muted-foreground">{product.sales} sales</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-green-600 dark:text-green-400">
                      ₹{product.revenue.toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="text-xs bg-amber-600 text-white">
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Development Helper - Remove in production */}
      <div className="pt-8 border-t">
        <h3 className="text-lg font-semibold mb-4">Development Tools</h3>
        <TestProductCreator />
      </div>
    </div>
  );
}
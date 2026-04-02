import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { BarChart3, Eye, ShoppingCart, TrendingUp, Users } from 'lucide-react';

interface AnalyticsSectionProps {
  artisanId: string;
}

export function AnalyticsSection({ artisanId }: AnalyticsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your product performance and business insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,845</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Unique Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,247</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">+0.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Revenue Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,600</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Handwoven Silk Saree', views: 2456, sales: 8, revenue: 68000 },
              { name: 'Brass Traditional Lamp', views: 1890, sales: 12, revenue: 28800 },
              { name: 'Cotton Kurta Set', views: 1567, sales: 15, revenue: 22500 }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.views} views • {product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">₹{product.revenue.toLocaleString()}</p>
                  <Badge variant="secondary">#{index + 1}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
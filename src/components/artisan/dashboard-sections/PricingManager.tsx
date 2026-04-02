import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { DollarSign, TrendingUp, TrendingDown, Percent, Edit, Save, X, Tag } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PricingManagerProps {
  artisanId: string;
}

export function PricingManager({ artisanId }: PricingManagerProps) {
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [bulkDiscount, setBulkDiscount] = useState({ enabled: false, percentage: 0, minQuantity: 2 });

  const products = [
    {
      id: '1',
      name: 'Handwoven Silk Saree',
      currentPrice: 8500,
      originalPrice: 9500,
      costPrice: 6000,
      margin: 41.7,
      discountPercentage: 10.5,
      sales: 8,
      revenue: 68000,
      category: 'Textiles',
      status: 'active',
      lastPriceUpdate: '2 weeks ago'
    },
    {
      id: '2', 
      name: 'Brass Traditional Lamp',
      currentPrice: 2400,
      originalPrice: 2400,
      costPrice: 1600,
      margin: 33.3,
      discountPercentage: 0,
      sales: 12,
      revenue: 28800,
      category: 'Home Decor',
      status: 'active',
      lastPriceUpdate: '1 month ago'
    },
    {
      id: '3',
      name: 'Cotton Kurta Set',
      currentPrice: 1500,
      originalPrice: 1800,
      costPrice: 900,
      margin: 40,
      discountPercentage: 16.7,
      sales: 15,
      revenue: 22500,
      category: 'Clothing',
      status: 'active',
      lastPriceUpdate: '3 days ago'
    }
  ];

  const marketTrends = [
    { category: 'Textiles', trend: 'up', percentage: 15, description: 'High demand for handwoven items' },
    { category: 'Home Decor', trend: 'stable', percentage: 2, description: 'Steady market conditions' },
    { category: 'Clothing', trend: 'down', percentage: -5, description: 'Seasonal decline expected' }
  ];

  const updatePrice = (productId: string) => {
    // Price update logic
    setEditingProduct(null);
    toast.success('Price updated successfully!');
  };

  const applyBulkDiscount = () => {
    toast.success('Bulk discount settings updated!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Pricing Manager</h1>
        <p className="text-muted-foreground">
          Manage prices, discounts, and track market trends
        </p>
      </div>

      {/* Market Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketTrends.map((trend, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{trend.category}</span>
                  <div className="flex items-center gap-1">
                    {trend.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : trend.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    ) : (
                      <div className="w-4 h-4 bg-gray-400 rounded-full" />
                    )}
                    <span className={`text-sm font-medium ${
                      trend.trend === 'up' ? 'text-green-600' : 
                      trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {trend.percentage > 0 ? '+' : ''}{trend.percentage}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{trend.description}</p>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Pricing Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Bulk Discount Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Bulk Discounts</Label>
              <p className="text-sm text-muted-foreground">Offer discounts for multiple item purchases</p>
            </div>
            <Switch
              checked={bulkDiscount.enabled}
              onCheckedChange={(checked) => setBulkDiscount(prev => ({ ...prev, enabled: checked }))}
            />
          </div>

          {bulkDiscount.enabled && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <Label>Discount Percentage</Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={bulkDiscount.percentage}
                    onChange={(e) => setBulkDiscount(prev => ({ ...prev, percentage: Number(e.target.value) }))}
                    placeholder="10"
                    className="pr-8"
                  />
                  <Percent className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              <div>
                <Label>Minimum Quantity</Label>
                <Input
                  type="number"
                  value={bulkDiscount.minQuantity}
                  onChange={(e) => setBulkDiscount(prev => ({ ...prev, minQuantity: Number(e.target.value) }))}
                  placeholder="2"
                />
              </div>
              <div className="col-span-2">
                <Button onClick={applyBulkDiscount} size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Bulk Settings
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Pricing Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id} className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <Badge className={product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {product.status}
                  </Badge>
                </div>

                {editingProduct === product.id ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                    <div>
                      <Label>Current Price</Label>
                      <Input type="number" defaultValue={product.currentPrice} />
                    </div>
                    <div>
                      <Label>Original Price</Label>
                      <Input type="number" defaultValue={product.originalPrice} />
                    </div>
                    <div>
                      <Label>Cost Price</Label>
                      <Input type="number" defaultValue={product.costPrice} />
                    </div>
                    <div className="flex items-end gap-2">
                      <Button size="sm" onClick={() => updatePrice(product.id)}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingProduct(null)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Price</p>
                      <p className="font-bold text-lg">₹{product.currentPrice.toLocaleString()}</p>
                      {product.discountPercentage > 0 && (
                        <p className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Margin</p>
                      <p className="font-medium text-green-600">{product.margin}%</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Sales</p>
                      <p className="font-medium">{product.sales} units</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="font-medium">₹{product.revenue.toLocaleString()}</p>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingProduct(product.id)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Price
                      </Button>
                    </div>
                  </div>
                )}

                <div className="mt-3 text-xs text-muted-foreground">
                  Last updated: {product.lastPriceUpdate}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
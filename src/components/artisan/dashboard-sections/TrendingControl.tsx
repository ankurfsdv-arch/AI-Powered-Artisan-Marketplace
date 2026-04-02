import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Badge } from '../../ui/badge';
import { Star, TrendingUp, Eye, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TrendingControlProps {
  artisanId: string;
}

export function TrendingControl({ artisanId }: TrendingControlProps) {
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Handwoven Silk Saree',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2FyZWV8ZW58MXx8fHwxNzU2ODM0MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      isTrending: true,
      views: 2456,
      sales: 8,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Brass Traditional Lamp',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMGxhbXB8ZW58MXx8fHwxNzU2ODM0MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      isTrending: true,
      views: 1890,
      sales: 12,
      rating: 4.6
    },
    {
      id: '3',
      name: 'Cotton Kurta Set',
      image: 'https://images.unsplash.com/photo-1583391733975-b8b3ac1b2e4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBrdXJ0YXxlbnwxfHx8fDE3NTY4MzQzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isTrending: false,
      views: 1567,
      sales: 15,
      rating: 4.9
    },
    {
      id: '4',
      name: 'Wooden Jewelry Box',
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBqZXdlbHJ5JTIwYm94fGVufDF8fHx8MTc1NjgzNDM5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      isTrending: false,
      views: 834,
      sales: 3,
      rating: 4.2
    }
  ]);

  const toggleTrending = (productId: string) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isTrending: !product.isTrending }
          : product
      )
    );
    toast.success('Trending status updated!');
  };

  const trendingProducts = products.filter(p => p.isTrending);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trending Control</h1>
        <p className="text-muted-foreground">
          Manage which products appear in the homepage trending slider
        </p>
      </div>

      {/* Current Trending Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            Currently Trending ({trendingProducts.length}/4)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingProducts.map((product) => (
              <Card key={product.id} className="p-4 border-amber-200">
                <div className="flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {product.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" />
                        {product.sales}
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-amber-600 text-white">Trending</Badge>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Products */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded">
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {product.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {product.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" />
                        {product.sales} sales
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {product.isTrending && (
                    <Badge className="bg-amber-600 text-white">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  <Switch
                    checked={product.isTrending}
                    onCheckedChange={() => toggleTrending(product.id)}
                    disabled={!product.isTrending && trendingProducts.length >= 4}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
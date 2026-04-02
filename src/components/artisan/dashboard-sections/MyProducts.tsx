import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { 
  Edit, Trash2, Eye, MoreHorizontal, Filter, Grid, List, 
  Star, TrendingUp, Package, Search 
} from 'lucide-react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface MyProductsProps {
  artisanId: string;
  searchQuery: string;
}

export function MyProducts({ artisanId, searchQuery }: MyProductsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock products data
  const products = [
    {
      id: '1',
      name: 'Handwoven Silk Saree',
      price: 8500,
      originalPrice: 9500,
      category: 'Textiles',
      status: 'active',
      sales: 8,
      views: 245,
      rating: 4.8,
      reviews: 12,
      inventory: 5,
      featured: true,
      trending: true,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2FyZWV8ZW58MXx8fHwxNzU2ODM0MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      name: 'Brass Traditional Lamp',
      price: 2400,
      originalPrice: 2400,
      category: 'Home Decor',
      status: 'active',
      sales: 12,
      views: 189,
      rating: 4.6,
      reviews: 8,
      inventory: 12,
      featured: false,
      trending: true,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMGxhbXB8ZW58MXx8fHwxNzU2ODM0MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      name: 'Cotton Kurta Set',
      price: 1500,
      originalPrice: 1800,
      category: 'Clothing',
      status: 'active',
      sales: 15,
      views: 156,
      rating: 4.9,
      reviews: 15,
      inventory: 8,
      featured: true,
      trending: false,
      image: 'https://images.unsplash.com/photo-1583391733975-b8b3ac1b2e4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3R0b24lMjBrdXJ0YXxlbnwxfHx8fDE3NTY4MzQzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      lastUpdated: '3 days ago'
    },
    {
      id: '4',
      name: 'Wooden Jewelry Box',
      price: 1200,
      originalPrice: 1200,
      category: 'Accessories',
      status: 'draft',
      sales: 0,
      views: 23,
      rating: 0,
      reviews: 0,
      inventory: 15,
      featured: false,
      trending: false,
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBqZXdlbHJ5JTIwYm94fGVufDF8fHx8MTc1NjgzNDM5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      lastUpdated: '5 days ago'
    },
    {
      id: '5',
      name: 'Embroidered Cushion Cover',
      price: 450,
      originalPrice: 500,
      category: 'Home Decor',
      status: 'inactive',
      sales: 25,
      views: 98,
      rating: 4.3,
      reviews: 6,
      inventory: 0,
      featured: false,
      trending: false,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXNoaW9uJTIwY292ZXJ8ZW58MXx8fHwxNzU2ODM0NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      lastUpdated: '1 month ago'
    },
    {
      id: '6',
      name: 'Terracotta Vase',
      price: 800,
      originalPrice: 950,
      category: 'Pottery',
      status: 'active',
      sales: 6,
      views: 134,
      rating: 4.7,
      reviews: 4,
      inventory: 20,
      featured: false,
      trending: false,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwdmFzZXxlbnwxfHx8fDE3NTY4MzQ0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      lastUpdated: '2 weeks ago'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Draft</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const ProductCard = ({ product }: { product: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="relative">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="absolute top-2 left-2 flex gap-1">
            {product.featured && (
              <Badge className="bg-amber-600 text-white text-xs">Featured</Badge>
            )}
            {product.trending && (
              <Badge className="bg-green-600 text-white text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm truncate pr-2">{product.name}</h3>
            {getStatusBadge(product.status)}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm">{product.rating}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{product.views} views</span>
            <span>{product.sales} sales</span>
            <span>Stock: {product.inventory}</span>
          </div>

          <div className="text-xs text-muted-foreground">
            Updated {product.lastUpdated}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProductRow = ({ product }: { product: any }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-2">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
            
            <div>
              <div className="font-bold">₹{product.price.toLocaleString()}</div>
              {product.originalPrice > product.price && (
                <div className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </div>
              )}
            </div>
            
            <div className="text-center">
              <div className="text-sm font-medium">{product.sales}</div>
              <div className="text-xs text-muted-foreground">sales</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm font-medium">{product.views}</div>
              <div className="text-xs text-muted-foreground">views</div>
            </div>
            
            <div className="flex items-center justify-between">
              {getStatusBadge(product.status)}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Products</h1>
          <p className="text-muted-foreground">
            Manage and track your product listings
          </p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Package className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  readOnly
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Updated</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} products found
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Try adjusting your search criteria' : 'Start by adding your first product'}
              </p>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Package className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus, Edit, Eye, Trash2, Camera, Star, Package, IndianRupee, Bot, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageSlider } from '../ui/image-slider';
import { useLanguage } from '../LanguageContext';
import { useTranslationService } from '../TranslationService';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  status: 'active' | 'draft' | 'sold';
  stock: number;
  rating: number;
  reviews: number;
  tags: string[];
}

interface ProductManagementProps {
  artisanId: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Handwoven Silk Saree',
    description: 'Exquisite Banarasi silk saree with traditional gold zari work',
    price: 8500,
    category: 'Textiles',
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400'
    ],
    status: 'active',
    stock: 3,
    rating: 4.8,
    reviews: 12,
    tags: ['Handwoven', 'Silk', 'Traditional', 'Wedding']
  },
  {
    id: '2',
    name: 'Brass Oil Lamp',
    description: 'Traditional brass diya with intricate carved patterns',
    price: 1200,
    category: 'Home Decor',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      'https://images.unsplash.com/photo-1585314061503-7d9622a7c9c7?w=400'
    ],
    status: 'active',
    stock: 15,
    rating: 4.5,
    reviews: 8,
    tags: ['Brass', 'Traditional', 'Diwali', 'Handcrafted']
  }
];

export function ProductManagement({ artisanId }: ProductManagementProps) {
  const { t } = useLanguage();
  const { generateAIDescription, currentLanguage } = useTranslationService();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);

  const ProductCard = ({ product }: { product: Product }) => {
    return (
      <Card className="overflow-hidden">
        <div className="relative">
          {/* Image Slider */}
          <div className="relative">
            <ImageSlider
              images={product.images}
              alt={product.name}
              className="h-48"
              aspectRatio="auto"
              showIndicators={false}
              showFullscreenButton={false}
            />
          </div>
          
          <Badge 
            className={`absolute top-2 right-2 ${
              product.status === 'active' ? 'bg-green-500' :
              product.status === 'draft' ? 'bg-yellow-500' : 'bg-gray-500'
            }`}
          >
            {product.status}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {product.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <IndianRupee className="h-4 w-4 text-green-600" />
                <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm">{product.rating} ({product.reviews})</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Stock: {product.stock} units
              </span>
              <Badge variant="outline">{product.category}</Badge>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.tags.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="text-red-600">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const AddProductForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      tags: ''
    });

    const handleGenerateDescription = async () => {
      if (!formData.name || !formData.category) {
        toast.error("Please enter product name and category first");
        return;
      }

      setIsGeneratingDescription(true);
      try {
        const aiDescription = await generateAIDescription(formData.name, formData.category, currentLanguage);
        setFormData(prev => ({ ...prev, description: aiDescription }));
        toast.success("AI description generated successfully!");
      } catch (error) {
        toast.error("Failed to generate description");
      } finally {
        setIsGeneratingDescription(false);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      toast.success("Product added successfully!");
      setIsAddingProduct(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        tags: ''
      });
    };

    return (
      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('productMgmt.addNew')}</DialogTitle>
            <DialogDescription>
              Create a new product listing for your craft marketplace
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">{t('productMgmt.productName')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Handwoven Silk Saree"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">{t('productMgmt.category')}</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="textiles">Textiles</SelectItem>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="home-decor">Home Decor</SelectItem>
                    <SelectItem value="pottery">Pottery</SelectItem>
                    <SelectItem value="artwork">Artwork</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="description">{t('productMgmt.description')}</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateDescription}
                  disabled={isGeneratingDescription || !formData.name || !formData.category}
                  className="gap-2"
                >
                  {isGeneratingDescription ? (
                    <Sparkles className="h-4 w-4 animate-spin" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  {t('productMgmt.generateDescription')}
                </Button>
              </div>
              <Textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your product, its materials, techniques, and cultural significance..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">{t('productMgmt.price')} (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="e.g., handwoven, silk, traditional, wedding"
              />
            </div>

            <div>
              <Label>Product Images</Label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Click to upload product images or drag and drop
                </p>
                <Button type="button" variant="outline">
                  Choose Images
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Support: JPG, PNG, WebP (max 5MB each)
                </p>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="flex-1">
                {t('productMgmt.save')}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddingProduct(false)}
                className="flex-1"
              >
                {t('productMgmt.cancel')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('productMgmt.title')}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your craft inventory and showcase your artistry
          </p>
        </div>
        <Button onClick={() => setIsAddingProduct(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t('productMgmt.addNew')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                <p className="text-lg font-bold">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-green-500 rounded-full" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-lg font-bold">{products.filter(p => p.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-yellow-500 rounded-full" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Draft</p>
                <p className="text-lg font-bold">{products.filter(p => p.status === 'draft').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                <p className="text-lg font-bold">
                  {(products.reduce((acc, p) => acc + p.rating, 0) / products.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <AddProductForm />
    </div>
  );
}
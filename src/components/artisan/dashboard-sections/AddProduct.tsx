import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Badge } from '../../ui/badge';
import { 
  Upload, Sparkles, Save, Eye, X, Plus, Tag, 
  Package, ImageIcon, Loader2, Wand2, CheckCircle 
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AddProductProps {
  artisanId: string;
}

interface ProductData {
  name: string;
  category: string;
  subcategory: string;
  price: string;
  originalPrice: string;
  description: string;
  shortDescription: string;
  materials: string[];
  dimensions: string;
  weight: string;
  origin: string;
  artisanStory: string;
  isCustomizable: boolean;
  isFeatured: boolean;
  isPublic: boolean;
  isTrending: boolean;
  tags: string[];
}

export function AddProduct({ artisanId }: AddProductProps) {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    originalPrice: '',
    description: '',
    shortDescription: '',
    materials: [],
    dimensions: '',
    weight: '',
    origin: '',
    artisanStory: '',
    isCustomizable: false,
    isFeatured: false,
    isPublic: true,
    isTrending: false,
    tags: []
  });

  const [images, setImages] = useState<string[]>([]);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    description: string;
    keywords: string[];
    shortDescription: string;
  } | null>(null);
  const [currentTag, setCurrentTag] = useState('');

  const categories = [
    'Textiles & Clothing',
    'Jewelry & Accessories', 
    'Home Decor',
    'Pottery & Ceramics',
    'Woodwork',
    'Metalwork',
    'Art & Paintings',
    'Religious Items'
  ];

  const subcategories = {
    'Textiles & Clothing': ['Sarees', 'Kurtas', 'Scarves', 'Bedsheets', 'Curtains'],
    'Jewelry & Accessories': ['Necklaces', 'Earrings', 'Bracelets', 'Rings', 'Bags'],
    'Home Decor': ['Lamps', 'Vases', 'Wall Hangings', 'Cushions', 'Candles'],
    'Pottery & Ceramics': ['Bowls', 'Plates', 'Vases', 'Decorative Items', 'Planters'],
    'Woodwork': ['Furniture', 'Sculptures', 'Boxes', 'Kitchen Items', 'Toys'],
    'Metalwork': ['Brass Items', 'Silver Items', 'Copper Items', 'Iron Craft', 'Decorative'],
    'Art & Paintings': ['Canvas Paintings', 'Wall Art', 'Miniatures', 'Folk Art', 'Modern Art'],
    'Religious Items': ['Idols', 'Prayer Items', 'Temple Decor', 'Spiritual Items', 'Incense']
  };

  const generateAIDescription = async () => {
    if (!productData.name.trim()) {
      toast.error('Please enter a product name first');
      return;
    }

    setIsGeneratingDescription(true);
    
    try {
      // Simulate AI API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiResponse = {
        description: `Experience the timeless elegance of our ${productData.name}, meticulously handcrafted by skilled artisans who have inherited centuries-old techniques passed down through generations. This exquisite piece showcases the rich cultural heritage of traditional Indian craftsmanship, where every detail reflects the artisan's dedication to preserving authentic artistic traditions.

Made using premium materials and traditional methods, this ${productData.name} represents the perfect fusion of cultural authenticity and contemporary appeal. Each piece tells a unique story of craftsmanship, making it not just a product, but a treasured artifact that connects you to India's vibrant artistic legacy.

Perfect for those who appreciate genuine handcrafted artistry and wish to support traditional craftspeople while adding a touch of cultural elegance to their collection.`,
        
        shortDescription: `Handcrafted ${productData.name} showcasing traditional Indian artistry with authentic techniques and premium materials. A perfect blend of cultural heritage and contemporary appeal.`,
        
        keywords: ['handcrafted', 'traditional', 'artisan-made']
      };

      setAiSuggestions(aiResponse);
      toast.success('AI description generated successfully! Review and edit as needed.');
      
    } catch (error) {
      toast.error('Failed to generate description. Please try again.');
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const acceptAIDescription = () => {
    if (aiSuggestions) {
      setProductData(prev => ({
        ...prev,
        description: aiSuggestions.description,
        shortDescription: aiSuggestions.shortDescription,
        tags: [...prev.tags, ...aiSuggestions.keywords.filter(k => !prev.tags.includes(k))]
      }));
      setAiSuggestions(null);
      toast.success('AI description applied successfully!');
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !productData.tags.includes(currentTag.trim())) {
      setProductData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setProductData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addMaterial = () => {
    const material = (document.getElementById('material-input') as HTMLInputElement)?.value;
    if (material && !productData.materials.includes(material)) {
      setProductData(prev => ({
        ...prev,
        materials: [...prev.materials, material]
      }));
      (document.getElementById('material-input') as HTMLInputElement).value = '';
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload these to a server
      // For now, we'll just create object URLs for preview
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages].slice(0, 6)); // Max 6 images
    }
  };

  const saveProduct = async () => {
    // Validation
    if (!productData.name || !productData.category || !productData.price || !productData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    try {
      // Prepare product data for API
      const productPayload = {
        ...productData,
        artisan_id: artisanId,
        image: images[0], // Use first image as main image
        images: images,
        price: parseFloat(productData.price),
        original_price: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
        is_public: productData.isPublic,
        is_trending: productData.isTrending,
        is_featured: productData.isFeatured,
        is_customizable: productData.isCustomizable,
        materials: productData.materials.join(', '),
        tags: productData.tags.join(', ')
      };

      // Import project info for API calls
      const { projectId, publicAnonKey } = await import('../../../utils/supabase/info');
      
      // Call API to save product
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(productPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      const result = await response.json();
      toast.success('Product saved successfully!');
      
      // Reset form
      setProductData({
        name: '',
        category: '',
        subcategory: '',
        price: '',
        originalPrice: '',
        description: '',
        shortDescription: '',
        materials: [],
        dimensions: '',
        weight: '',
        origin: '',
        artisanStory: '',
        isCustomizable: false,
        isFeatured: false,
        isPublic: true,
        isTrending: false,
        tags: []
      });
      setImages([]);
      setAiSuggestions(null);
      
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-muted-foreground">
          Create a new product listing with AI-powered descriptions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={productData.name}
                  onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Handwoven Silk Saree"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select 
                    value={productData.category} 
                    onValueChange={(value) => setProductData(prev => ({ ...prev, category: value, subcategory: '' }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select 
                    value={productData.subcategory} 
                    onValueChange={(value) => setProductData(prev => ({ ...prev, subcategory: value }))}
                    disabled={!productData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {productData.category && subcategories[productData.category as keyof typeof subcategories]?.map(subcat => (
                        <SelectItem key={subcat} value={subcat}>{subcat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Enter price in ₹"
                  />
                </div>

                <div>
                  <Label htmlFor="originalPrice">Original Price (if discounted)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={productData.originalPrice}
                    onChange={(e) => setProductData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="Enter original price"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Description Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                AI-Powered Product Description
              </CardTitle>
              <CardDescription>
                Generate professional, culturally-rich descriptions using AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Button
                  onClick={generateAIDescription}
                  disabled={isGeneratingDescription || !productData.name}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  {isGeneratingDescription ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  {isGeneratingDescription ? 'Generating...' : 'Generate AI Description'}
                </Button>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Enhanced
                </Badge>
              </div>

              {aiSuggestions && (
                <Card className="border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        AI Generated Content
                      </h4>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={acceptAIDescription} className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setAiSuggestions(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div>
                        <Label className="text-xs font-medium text-amber-700 dark:text-amber-400">Short Description:</Label>
                        <p className="text-foreground mt-1">{aiSuggestions.shortDescription}</p>
                      </div>
                      
                      <div>
                        <Label className="text-xs font-medium text-amber-700 dark:text-amber-400">Full Description:</Label>
                        <p className="text-foreground mt-1 line-clamp-4">{aiSuggestions.description}</p>
                      </div>
                      
                      <div>
                        <Label className="text-xs font-medium text-amber-700 dark:text-amber-400">SEO Keywords:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {aiSuggestions.keywords.map((keyword, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div>
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  value={productData.shortDescription}
                  onChange={(e) => setProductData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Brief description for product listings (max 150 characters)"
                  className="h-20"
                />
              </div>

              <div>
                <Label htmlFor="description">Full Description *</Label>
                <Textarea
                  id="description"
                  value={productData.description}
                  onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed product description including materials, craftsmanship, and cultural significance"
                  className="h-32"
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Materials Used</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="material-input"
                    placeholder="Enter material (e.g., Cotton, Silk, Brass)"
                    onKeyPress={(e) => e.key === 'Enter' && addMaterial()}
                  />
                  <Button type="button" onClick={addMaterial} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {productData.materials.map((material, i) => (
                    <Badge key={i} variant="outline">
                      {material}
                      <button
                        onClick={() => setProductData(prev => ({
                          ...prev,
                          materials: prev.materials.filter((_, index) => index !== i)
                        }))}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={productData.dimensions}
                    onChange={(e) => setProductData(prev => ({ ...prev, dimensions: e.target.value }))}
                    placeholder="e.g., 30cm x 20cm x 5cm"
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={productData.weight}
                    onChange={(e) => setProductData(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="e.g., 250g"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="origin">Origin/Region</Label>
                <Input
                  id="origin"
                  value={productData.origin}
                  onChange={(e) => setProductData(prev => ({ ...prev, origin: e.target.value }))}
                  placeholder="e.g., Varanasi, Uttar Pradesh"
                />
              </div>

              <div>
                <Label htmlFor="artisanStory">Artisan Story (Optional)</Label>
                <Textarea
                  id="artisanStory"
                  value={productData.artisanStory}
                  onChange={(e) => setProductData(prev => ({ ...prev, artisanStory: e.target.value }))}
                  placeholder="Share the story behind this craft or technique"
                  className="h-24"
                />
              </div>

              {/* Tags */}
              <div>
                <Label>Product Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add tags (e.g., wedding, festive, traditional)"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {productData.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Visibility & Options */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public">Make Product Public</Label>
                    <p className="text-xs text-muted-foreground">Show this product on customer homepage</p>
                  </div>
                  <Switch
                    id="public"
                    checked={productData.isPublic}
                    onCheckedChange={(checked) => setProductData(prev => ({ ...prev, isPublic: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="trending">Mark as Trending</Label>
                    <p className="text-xs text-muted-foreground">Show in trending products slider</p>
                  </div>
                  <Switch
                    id="trending"
                    checked={productData.isTrending}
                    onCheckedChange={(checked) => setProductData(prev => ({ ...prev, isTrending: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="featured">Feature this Product</Label>
                    <p className="text-xs text-muted-foreground">Show in featured collections</p>
                  </div>
                  <Switch
                    id="featured"
                    checked={productData.isFeatured}
                    onCheckedChange={(checked) => setProductData(prev => ({ ...prev, isFeatured: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="customizable">Customizable Product</Label>
                    <p className="text-xs text-muted-foreground">Allow customers to request customizations</p>
                  </div>
                  <Switch
                    id="customizable"
                    checked={productData.isCustomizable}
                    onCheckedChange={(checked) => setProductData(prev => ({ ...prev, isCustomizable: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Image Upload Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Product Images *
              </CardTitle>
              <CardDescription>Upload up to 6 high-quality images</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Click to upload images</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB each</p>
                    </div>
                  </label>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded border"
                        />
                        <button
                          onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {index === 0 && (
                          <Badge className="absolute bottom-1 left-1 text-xs bg-green-600">
                            Main
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Button onClick={saveProduct} className="w-full bg-amber-600 hover:bg-amber-700">
                <Save className="w-4 h-4 mr-2" />
                Save Product
              </Button>
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Preview Product
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
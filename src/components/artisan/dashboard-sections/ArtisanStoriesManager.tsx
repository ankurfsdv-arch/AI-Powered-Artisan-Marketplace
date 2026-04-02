import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, ExternalLink, Video, Upload, Save, X, Play } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

interface ArtisanStory {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  productId: string;
  duration: string;
  views: number;
  likes: number;
  createdAt: string;
  status: 'active' | 'draft' | 'pending';
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface ArtisanStoriesManagerProps {
  artisanId?: string;
}

export function ArtisanStoriesManager({ artisanId = 'current_artisan_id' }: ArtisanStoriesManagerProps) {
  const [stories, setStories] = useState<ArtisanStory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStory, setEditingStory] = useState<ArtisanStory | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    productId: '',
    duration: ''
  });

  // Mock data
  const mockStories: ArtisanStory[] = [
    {
      id: '1',
      title: 'Creating My Signature Blue Pottery',
      description: 'Watch as I demonstrate the traditional techniques passed down through generations.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      productId: 'prod-1',
      duration: '8:45',
      views: 2340,
      likes: 189,
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      title: 'The Story Behind My Craft',
      description: 'A personal journey of how I learned this ancient art form.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      productId: 'prod-2',
      duration: '12:30',
      views: 1850,
      likes: 142,
      createdAt: '2024-01-10',
      status: 'active'
    }
  ];

  const mockProducts: Product[] = [
    { id: 'prod-1', name: 'Blue Pottery Vase', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop', price: 2500 },
    { id: 'prod-2', name: 'Traditional Bowl Set', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=100&h=100&fit=crop', price: 1800 },
    { id: 'prod-3', name: 'Decorative Plates', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop', price: 3200 }
  ];

  useEffect(() => {
    fetchStories();
    fetchProducts();
  }, [artisanId]);

  const fetchStories = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/artisan/${artisanId}/stories`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setStories(data.stories || []);
      } else {
        // Fallback to mock data if API fails
        setStories(mockStories);
      }
    } catch (error) {
      console.log('Error fetching stories:', error);
      setStories(mockStories);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/artisan/${artisanId}/products`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products.map((p: any) => ({
          id: p.id,
          name: p.name,
          image: p.image,
          price: p.price
        })) || []);
      } else {
        // Fallback to mock data if API fails
        setProducts(mockProducts);
      }
    } catch (error) {
      console.log('Error fetching products:', error);
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.videoUrl || !formData.productId) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingStory) {
        // Update existing story
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/story/${editingStory.id}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStories(stories.map(story => 
            story.id === editingStory.id ? data.story : story
          ));
          toast.success('Story updated successfully!');
        } else {
          throw new Error('Failed to update story');
        }
      } else {
        // Create new story
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/artisan/${artisanId}/stories`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStories([data.story, ...stories]);
          toast.success('Story uploaded successfully!');
        } else {
          throw new Error('Failed to create story');
        }
      }

      setFormData({ title: '', description: '', videoUrl: '', productId: '', duration: '' });
      setShowAddForm(false);
      setEditingStory(null);
    } catch (error) {
      console.log('Error saving story:', error);
      toast.error('Failed to save story. Please try again.');
    }
  };

  const handleEdit = (story: ArtisanStory) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      description: story.description,
      videoUrl: story.videoUrl,
      productId: story.productId,
      duration: story.duration
    });
    setShowAddForm(true);
  };

  const handleDelete = async (storyId: string) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/story/${storyId}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          setStories(stories.filter(story => story.id !== storyId));
          toast.success('Story deleted successfully!');
        } else {
          throw new Error('Failed to delete story');
        }
      } catch (error) {
        console.log('Error deleting story:', error);
        toast.error('Failed to delete story. Please try again.');
      }
    }
  };

  const getVideoThumbnail = (url: string) => {
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop';
  };

  const formatViewCount = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="aspect-video bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Artisan Stories</h2>
          <p className="text-muted-foreground">
            Share your craft journey and connect your stories to products
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Story
        </Button>
      </div>

      {/* Add/Edit Form Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingStory ? 'Edit Story' : 'Add New Story'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Story Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter an engaging title for your story"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell viewers what they can expect from this story"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL *</Label>
              <Input
                id="videoUrl"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
              <p className="text-xs text-muted-foreground">
                Supports YouTube, Vimeo, or direct MP4 links
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Video Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="8:45"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productId">Link to Product *</Label>
              <Select
                value={formData.productId}
                onValueChange={(value) => setFormData({ ...formData, productId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product to showcase" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center gap-2">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div>
                          <span className="font-medium">{product.name}</span>
                          <div className="text-xs text-muted-foreground">₹{product.price.toLocaleString()}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {editingStory ? 'Update Story' : 'Upload Story'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingStory(null);
                  setFormData({ title: '', description: '', videoUrl: '', productId: '', duration: '' });
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Stories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => {
          const linkedProduct = products.find(p => p.id === story.productId);
          
          return (
            <Card key={story.id} className="overflow-hidden">
              <div className="relative">
                {/* Video Thumbnail */}
                <div className="aspect-video relative group">
                  <img
                    src={getVideoThumbnail(story.videoUrl)}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge 
                      variant={story.status === 'active' ? 'default' : story.status === 'pending' ? 'secondary' : 'outline'}
                      className={story.status === 'active' ? 'bg-green-500' : ''}
                    >
                      {story.status}
                    </Badge>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {story.duration}
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{story.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {story.description}
                  </p>

                  {/* Linked Product */}
                  {linkedProduct && (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded-lg mb-3">
                      <img 
                        src={linkedProduct.image} 
                        alt={linkedProduct.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{linkedProduct.name}</p>
                        <p className="text-xs text-muted-foreground">₹{linkedProduct.price.toLocaleString()}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{formatViewCount(story.views)} views</span>
                    <span>{formatViewCount(story.likes)} likes</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEdit(story)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(story.videoUrl, '_blank')}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(story.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {stories.length === 0 && (
        <Card className="p-8 text-center">
          <Video className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Stories Yet</h3>
          <p className="text-muted-foreground mb-4">
            Start sharing your craft journey with engaging video stories
          </p>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Story
          </Button>
        </Card>
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Play, ExternalLink, ArrowLeft, Heart, Share2, Clock, User, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ArtisanStory {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  productUrl: string;
  artisan: {
    name: string;
    photo: string;
    location: string;
    craft: string;
    experience: number;
  };
  duration: string;
  views: number;
  likes: number;
  createdAt: string;
  isYouTube: boolean;
}

interface ArtisanStoriesProps {
  onBack: () => void;
  onNavigateToProduct: (productId: string) => void;
}

export function ArtisanStories({ onBack, onNavigateToProduct }: ArtisanStoriesProps) {
  const { t } = useLanguage();
  const [stories, setStories] = useState<ArtisanStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<ArtisanStory | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with API call
  const mockStories: ArtisanStory[] = [
    {
      id: '1',
      title: 'The Art of Varanasi Silk Weaving',
      description: 'Join master weaver Ramesh Kumar as he shares the centuries-old tradition of creating exquisite Banarasi silk sarees.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      productUrl: '/product/banarasi-silk-saree',
      artisan: {
        name: 'Ramesh Kumar',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        location: 'Varanasi, Uttar Pradesh',
        craft: 'Silk Weaving',
        experience: 25
      },
      duration: '8:45',
      views: 15420,
      likes: 1240,
      createdAt: '2024-01-15',
      isYouTube: true
    },
    {
      id: '2',
      title: 'Traditional Pottery Making in Rajasthan',
      description: 'Experience the magic of blue pottery with artisan Meera Sharma from Jaipur.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      productUrl: '/product/blue-pottery-vase',
      artisan: {
        name: 'Meera Sharma',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        location: 'Jaipur, Rajasthan',
        craft: 'Blue Pottery',
        experience: 18
      },
      duration: '6:30',
      views: 12800,
      likes: 980,
      createdAt: '2024-01-12',
      isYouTube: true
    },
    {
      id: '3',
      title: 'Handcrafted Wooden Sculptures',
      description: 'Watch as Raj Patel brings life to wood with his incredible carving skills.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      productUrl: '/product/wooden-ganesha',
      artisan: {
        name: 'Raj Patel',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        location: 'Channapatna, Karnataka',
        craft: 'Wood Carving',
        experience: 22
      },
      duration: '10:15',
      views: 8900,
      likes: 750,
      createdAt: '2024-01-10',
      isYouTube: true
    }
  ];

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/artisan-stories`,
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
    } finally {
      setLoading(false);
    }
  };

  const formatViewCount = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const handleViewStory = async (storyId: string) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/story/${storyId}/view`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Update local state
      setStories(stories.map(story => 
        story.id === storyId 
          ? { ...story, views: story.views + 1 }
          : story
      ));
    } catch (error) {
      console.log('Error tracking story view:', error);
    }
  };

  const handleLikeStory = async (storyId: string) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/story/${storyId}/like`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Update local state
      setStories(stories.map(story => 
        story.id === storyId 
          ? { ...story, likes: story.likes + 1 }
          : story
      ));
    } catch (error) {
      console.log('Error liking story:', error);
    }
  };

  const getEmbedUrl = (url: string) => {
    // Convert YouTube URL to embed format
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-muted rounded-full"></div>
                      <div className="h-3 bg-muted rounded w-24"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Artisan Stories</h1>
            <p className="text-muted-foreground">
              Discover the passion and heritage behind every handcrafted masterpiece
            </p>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative group">
                {/* Video Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden">
                  <ImageWithFallback
                    src={`https://img.youtube.com/vi/${story.videoUrl.split('/embed/')[1]}/maxresdefault.jpg`}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Button Overlay */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button 
                        className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors"
                        onClick={() => handleViewStory(story.id)}
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                          <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0">
                      <div className="aspect-video">
                        <iframe
                          src={getEmbedUrl(story.videoUrl)}
                          title={story.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {story.duration}
                  </div>
                </div>

                <CardContent className="p-4">
                  {/* Story Info */}
                  <h3 className="font-semibold mb-2 line-clamp-2">{story.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {story.description}
                  </p>

                  {/* Artisan Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={story.artisan.photo} alt={story.artisan.name} />
                      <AvatarFallback>
                        {story.artisan.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{story.artisan.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {story.artisan.location}
                      </div>
                    </div>
                  </div>

                  {/* Craft Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                      {story.artisan.craft}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {story.artisan.experience} years experience
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <span>{formatViewCount(story.views)} views</span>
                    <div className="flex items-center gap-3">
                      <button 
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                        onClick={() => handleLikeStory(story.id)}
                      >
                        <Heart className="w-4 h-4" />
                        {formatViewCount(story.likes)}
                      </button>
                      <button className="hover:text-foreground transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                    onClick={() => onNavigateToProduct(story.productUrl.split('/').pop() || '')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Products
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {stories.length === 0 && !loading && (
          <div className="text-center py-16">
            <User className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Stories Available</h3>
            <p className="text-muted-foreground">
              Check back soon for inspiring artisan stories!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';

export function TestProductCreator() {
  const [creating, setCreating] = useState(false);

  const createTestProducts = async () => {
    setCreating(true);
    
    try {
      const { projectId, publicAnonKey } = await import('../utils/supabase/info');
      
      const testProducts = [
        {
          name: 'Handwoven Silk Saree',
          category: 'Textiles & Clothing',
          subcategory: 'Sarees',
          price: 8500,
          original_price: 9500,
          description: 'Experience the timeless elegance of our Handwoven Silk Saree, meticulously handcrafted by skilled artisans who have inherited centuries-old techniques passed down through generations.',
          shortDescription: 'Handcrafted silk saree showcasing traditional Indian artistry with authentic techniques and premium materials.',
          image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2FyZWV8ZW58MXx8fHwxNzU2ODM0MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
          images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2FyZWV8ZW58MXx8fHwxNzU2ODM0MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080'],
          materials: 'Silk, Gold Thread',
          dimensions: '6m x 1.2m',
          weight: '400g',
          origin: 'Varanasi, Uttar Pradesh',
          artisanStory: 'Created by master weaver Meera Devi with 25 years of experience',
          tags: 'handcrafted, traditional, silk, wedding',
          artisan_id: 'test-artisan-1',
          is_public: true,
          is_trending: true,
          is_featured: true,
          is_customizable: false
        },
        {
          name: 'Brass Traditional Lamp',
          category: 'Home Decor',
          subcategory: 'Lamps',
          price: 2400,
          original_price: null,
          description: 'Authentic brass lamp crafted using traditional techniques, perfect for adding warmth and cultural elegance to your home.',
          shortDescription: 'Traditional brass lamp handcrafted with intricate patterns and authentic metalwork techniques.',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMGxhbXB8ZW58MXx8fHwxNzU2ODM0MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
          images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFzcyUyMGxhbXB8ZW58MXx8fHwxNzU2ODM0MzQ3fDA&ixlib=rb-4.1.0&q=80&w=1080'],
          materials: 'Brass',
          dimensions: '25cm x 15cm',
          weight: '800g',
          origin: 'Moradabad, Uttar Pradesh',
          artisanStory: 'Handcrafted by metalwork artisan Raj Kumar',
          tags: 'brass, traditional, lamp, home-decor',
          artisan_id: 'test-artisan-2',
          is_public: true,
          is_trending: true,
          is_featured: false,
          is_customizable: true
        },
        {
          name: 'Silver Jewelry Set',
          category: 'Jewelry & Accessories',
          subcategory: 'Necklaces',
          price: 4200,
          original_price: 4800,
          description: 'Exquisite silver jewelry set featuring traditional Indian motifs, perfect for special occasions and festivals.',
          shortDescription: 'Traditional silver jewelry set with intricate craftsmanship and cultural motifs.',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBlYXJyaW5nc3xlbnwxfHx8fDE3NTY4MzQ1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
          images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBlYXJyaW5nc3xlbnwxfHx8fDE3NTY4MzQ1NjB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
          materials: 'Sterling Silver',
          dimensions: 'Adjustable',
          weight: '45g',
          origin: 'Jaipur, Rajasthan',
          artisanStory: 'Created by silver artisan Anita Kumari',
          tags: 'silver, jewelry, traditional, festival',
          artisan_id: 'test-artisan-3',
          is_public: true,
          is_trending: false,
          is_featured: true,
          is_customizable: false
        }
      ];

      // Create each test product
      for (const product of testProducts) {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4763b19b/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(product),
        });

        if (!response.ok) {
          throw new Error(`Failed to create product: ${product.name}`);
        }
      }

      toast.success('Test products created successfully! Refresh to see them on the homepage.');

    } catch (error) {
      console.error('Error creating test products:', error);
      toast.error('Failed to create test products. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Test Product Creator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Create sample products to test the artisan upload flow and customer homepage display.
        </p>
        <Button 
          onClick={createTestProducts} 
          disabled={creating}
          className="w-full bg-amber-600 hover:bg-amber-700"
        >
          {creating ? 'Creating Products...' : 'Create Test Products'}
        </Button>
      </CardContent>
    </Card>
  );
}
import { Play, Eye, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const stories = [
  {
    id: 1,
    title: "The Art of Clay: A Potter's Journey",
    description: "Follow master potter Raj Kumar as he shapes clay into beautiful vessels using techniques passed down through generations.",
    image: "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXIlMjBoYW5kcyUyMGNsYXklMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTY3NTQ0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "5:30",
    views: "12.5K",
    category: "Pottery",
    featured: true
  },
  {
    id: 2,
    title: "Weaving Dreams in Silk",
    description: "Discover the intricate process of creating Kanchipuram silk sarees with master weaver Lakshmi Devi.",
    image: "https://images.unsplash.com/photo-1599303000936-1cf21eac4456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWF2ZXIlMjB3b3JraW5nJTIwbG9vbSUyMHRyYWRpdGlvbmFsJTIwY3JhZnR8ZW58MXx8fHwxNzU2NzU0MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "8:45",
    views: "8.9K",
    category: "Textiles",
    featured: false
  }
];

export function StoriesSection() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl lg:text-5xl text-white font-bold mb-4">
              Stories from the Soil
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              Immerse yourself in the rich heritage and artistry of traditional Indian crafts
            </p>
          </div>
          <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hidden lg:flex">
            View All Stories
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <Card key={story.id} className={`group bg-gray-900 border-gray-700 hover:border-amber-600/50 transition-all duration-300 overflow-hidden ${
              index === 0 ? 'lg:row-span-1' : ''
            }`}>
              <div className="relative">
                <ImageWithFallback
                  src={story.image}
                  alt={story.title}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                    index === 0 ? 'h-80' : 'h-64'
                  }`}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {story.featured && (
                  <Badge className="absolute top-4 left-4 bg-amber-600 text-white border-none">
                    Featured
                  </Badge>
                )}

                <Badge className="absolute top-4 right-4 bg-black/50 text-white border-none">
                  {story.category}
                </Badge>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full w-16 h-16 p-0">
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-4 text-white/80 text-sm mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {story.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {story.views}
                    </div>
                  </div>
                </div>
              </div>

              {index === 0 && (
                <CardContent className="p-6">
                  <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-amber-400 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {story.description}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 lg:hidden">
          <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
            View All Stories
          </Button>
        </div>
      </div>
    </section>
  );
}
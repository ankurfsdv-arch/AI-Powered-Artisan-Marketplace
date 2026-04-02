import { MapPin, Star, Sparkles, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';

const artisans = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    craft: "Blue Pottery",
    rating: 4.9,
    reviewCount: 156,
    story: "Third-generation potter creating vibrant blue pottery using traditional Jaipur techniques passed down from her grandmother.",
    image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGFydGlzYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTU4MDEyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    craftImage: "https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwYXJ0aXNhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzU1ODAxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    products: 45,
    yearsExperience: 15,
    isVerified: true
  },
  {
    id: 2,
    name: "Mohd. Hassan",
    location: "Agra, Uttar Pradesh", 
    craft: "Marble Inlay",
    rating: 4.8,
    reviewCount: 89,
    story: "Master craftsman specializing in intricate marble inlay work inspired by Taj Mahal's architectural beauty.",
    image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGFydGlzYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTU4MDEyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    craftImage: "https://images.unsplash.com/photo-1644341129908-6477e0157037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtZXRhbHdvcmslMjBqZXdlbHJ5JTIwYnJhc3N8ZW58MXx8fHwxNzU1ODAxNzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    products: 32,
    yearsExperience: 22,
    isVerified: true
  },
  {
    id: 3,
    name: "Lakshmi Devi",
    location: "Kanchipuram, Tamil Nadu",
    craft: "Silk Weaving",
    rating: 4.9,
    reviewCount: 234,
    story: "Award-winning weaver creating exquisite Kanchipuram silk sarees with traditional patterns and modern color palettes.",
    image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGFydGlzYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTU4MDEyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    craftImage: "https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kd292ZW4lMjB0ZXh0aWxlJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU1ODAxNzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    products: 67,
    yearsExperience: 18,
    isVerified: true
  }
];

export function FeaturedArtisans() {
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl lg:text-5xl text-white font-bold mb-4">
              {t('artisans.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl">
              {t('artisans.subtitle')}
            </p>
          </div>
          <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hidden lg:flex">
            <Sparkles className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <Card key={artisan.id} className="group bg-gray-800 border-gray-700 hover:border-amber-600/50 transition-all duration-300 overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={artisan.craftImage}
                  alt={`${artisan.craft} by ${artisan.name}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="ghost" size="sm" className="bg-black/50 hover:bg-black/70 text-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={artisan.image}
                      alt={artisan.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-amber-600"
                    />
                    {artisan.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-800">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white mb-1 font-semibold group-hover:text-amber-400 transition-colors">{artisan.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
                      <MapPin className="w-3 h-3" />
                      {artisan.location}
                    </div>
                    <Badge variant="secondary" className="text-xs bg-amber-600/20 text-amber-300 border-amber-600/30">
                      {artisan.craft}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {artisan.story}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="text-center p-2 bg-gray-700 rounded-lg">
                    <div className="text-white font-semibold">{artisan.products}</div>
                    <div className="text-gray-400">{t('artisans.products')}</div>
                  </div>
                  <div className="text-center p-2 bg-gray-700 rounded-lg">
                    <div className="text-white font-semibold">{artisan.yearsExperience}+</div>
                    <div className="text-gray-400">{t('artisans.experience')}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-white font-semibold">{artisan.rating}</span>
                    <span className="text-gray-400 text-sm">({artisan.reviewCount})</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 lg:hidden">
          <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            Discover All Artisans
          </Button>
        </div>
      </div>
    </section>
  );
}
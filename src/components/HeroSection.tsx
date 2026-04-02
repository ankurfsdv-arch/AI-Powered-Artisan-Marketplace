import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sparkles, Play, ArrowRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted to-background min-h-screen">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="bg-amber-600/20 text-amber-300 border-amber-600/30 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Enhanced Marketplace
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl text-foreground leading-tight font-bold">
                {t('hero.title')}
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white border-none text-lg px-8 py-4">
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button variant="outline" size="lg" className="group border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Stories
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-700">
              <div className="text-center">
                <div className="text-3xl text-white font-bold">500+</div>
                <div className="text-sm text-gray-400">Master Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-white font-bold">50+</div>
                <div className="text-sm text-gray-400">Craft Types</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-white font-bold">15+</div>
                <div className="text-sm text-gray-400">Indian States</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1599303000936-1cf21eac4456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWF2ZXIlMjB3b3JraW5nJTIwbG9vbSUyMHRyYWRpdGlvbmFsJTIwY3JhZnR8ZW58MXx8fHwxNzU2NzU0MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Indian weaver working on traditional loom"
                className="rounded-2xl shadow-2xl w-full"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700">
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMGFydGlzYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTU4MDEyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Artisan profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white font-semibold">Maya Sharma</div>
                    <div className="text-sm text-gray-400">Master Weaver • Gujarat</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-amber-600 text-white rounded-xl p-3 shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            {/* Ambient lighting effects */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/20 rounded-full opacity-30 blur-3xl" />
            <div className="absolute -z-10 top-1/4 right-1/4 w-64 h-64 bg-orange-600/20 rounded-full opacity-20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
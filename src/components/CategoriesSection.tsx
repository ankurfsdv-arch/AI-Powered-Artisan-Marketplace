import { ArrowRight, Palette, Scissors, Hammer, Gem, Home, Shirt } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useLanguage } from './LanguageContext';

const getCategoriesData = (t: (key: string) => string) => [
  {
    nameKey: "categories.pottery",
    icon: Palette,
    color: "from-orange-400 to-red-500"
  },
  {
    nameKey: "categories.textiles",
    icon: Scissors,
    color: "from-blue-400 to-purple-500"
  },
  {
    nameKey: "categories.woodwork",
    icon: Hammer,
    color: "from-amber-400 to-orange-500"
  },
  {
    nameKey: "categories.metalwork",
    icon: Gem,
    color: "from-gray-400 to-gray-600"
  },
  {
    nameKey: "categories.jewelry",
    icon: Gem,
    color: "from-yellow-400 to-amber-500"
  },
  {
    nameKey: "categories.paintings",
    icon: Hammer,
    color: "from-green-400 to-teal-500"
  }
];

interface CategoriesSectionProps {
  onCategoryClick?: (categoryKey: string) => void;
  onViewAll?: () => void;
}

export function CategoriesSection({ onCategoryClick, onViewAll }: CategoriesSectionProps) {
  const { t } = useLanguage();
  const categories = getCategoriesData(t);
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-white mb-4 font-bold">
            {t('categories.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover authentic handmade treasures across traditional Indian craft forms
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="group cursor-pointer"
              onClick={() => onCategoryClick?.(category.nameKey.split('.')[1])}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold group-hover:text-amber-400 transition-colors">
                    {t(category.nameKey)}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={() => onViewAll?.()}
          >
            View All Categories
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
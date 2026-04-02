import { Bot, Camera, BookOpen, TrendingUp, MessageCircle, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { useLanguage } from './LanguageContext';

const getFeaturesData = (t: (key: string) => string) => [
  {
    icon: MessageCircle,
    titleKey: "ai.smartCoaching",
    descriptionKey: "ai.smartCoachingDesc",
    color: "bg-green-500"
  },
  {
    icon: Bot,
    titleKey: "ai.autoTranslation",
    descriptionKey: "ai.autoTranslationDesc",
    color: "bg-blue-500"
  },
  {
    icon: BookOpen,
    titleKey: "ai.storyGeneration",
    descriptionKey: "ai.storyGenerationDesc",
    color: "bg-purple-500"
  },
  {
    icon: Camera,
    title: "AI Product Enhancement",
    description: "Automatically enhance product photos, generate compelling descriptions, and suggest optimal pricing based on market trends.",
    color: "bg-orange-500"
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Get real-time analytics on trending crafts, customer preferences, and personalized recommendations to boost sales.",
    color: "bg-red-500"
  },
  {
    icon: Award,
    title: "Quality Certification",
    description: "AI-powered quality assessment and authenticity verification to build trust with customers worldwide.",
    color: "bg-indigo-500"
  }
];

export function AIFeaturesSection() {
  const { t } = useLanguage();
  const features = getFeaturesData(t);
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            <Bot className="w-3 h-3 mr-1" />
            Powered by AI
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('ai.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform empowers artisans with modern tools while preserving the authenticity 
            and cultural heritage of traditional crafts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`${feature.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.titleKey ? t(feature.titleKey) : feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.descriptionKey ? t(feature.descriptionKey) : feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Craft Business?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Join thousands of artisans who are already using AI to grow their businesses, 
              reach global customers, and preserve their traditional crafts for future generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Selling Today
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
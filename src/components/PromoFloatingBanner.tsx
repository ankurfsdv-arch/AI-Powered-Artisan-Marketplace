import { useState } from 'react';
import { X, Sparkles, ArrowRight, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { KalaKritiLogo } from './KalaKritiLogo';

export function PromoFloatingBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-right duration-500">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/20 rounded-2xl shadow-2xl p-6 backdrop-blur-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <KalaKritiLogo size="sm" showText={false} />
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              New Feature
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-white h-6 w-6 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-lg leading-tight">
            AI-Powered Product Descriptions
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Generate professional, culturally-rich descriptions for your crafts in seconds with our AI assistant.
          </p>
          
          {/* Features List */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              Auto-translation to Hindi & Regional languages
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
              SEO-optimized for better visibility
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              Cultural heritage storytelling
            </div>
          </div>

          {/* Special Offer */}
          <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-lg p-3 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-amber-400" />
              <span className="text-white font-medium text-sm">Limited Time</span>
            </div>
            <p className="text-amber-200 text-xs">
              Get 50 free AI descriptions for new artisan accounts!
            </p>
          </div>

          {/* CTA Button */}
          <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-none shadow-lg">
            Try AI Assistant
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-b-2xl"></div>
      </div>
    </div>
  );
}
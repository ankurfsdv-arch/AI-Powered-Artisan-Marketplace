import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, User, Palette, ShoppingBag, BarChart3, Users, Sparkles } from 'lucide-react';
import { KalaKritiLogo } from '../KalaKritiLogo';

interface UserTypeSelectionProps {
  onUserTypeSelect: (userType: 'customer' | 'artisan') => void;
}

export function UserTypeSelection({ onUserTypeSelect }: UserTypeSelectionProps) {
  const [selectedType, setSelectedType] = useState<'customer' | 'artisan' | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      onUserTypeSelect(selectedType);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-amber-900/20 dark:to-orange-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <KalaKritiLogo size="lg" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to KalaKriti
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Choose how you'd like to join our community of traditional craftspeople and craft enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Customer Card */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedType === 'customer' 
                ? 'ring-2 ring-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedType('customer')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit">
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">I'm a Customer</CardTitle>
              <CardDescription>
                Discover and purchase authentic handcrafted items
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Browse thousands of authentic crafts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Connect directly with artisans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Learn craft stories and traditions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm">Support traditional artisans</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  Perfect for craft lovers
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Artisan Card */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedType === 'artisan' 
                ? 'ring-2 ring-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedType('artisan')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full w-fit">
                <Palette className="h-8 w-8 text-amber-600" />
              </div>
              <CardTitle className="text-xl">I'm an Artisan</CardTitle>
              <CardDescription>
                Showcase and sell your traditional crafts globally
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-sm">Create your craft portfolio</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-sm">Reach global customers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-sm">AI-powered business insights</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span className="text-sm">Share your craft heritage</span>
                </div>
              </div>
              
              <div className="pt-4 flex space-x-2">
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                  Dashboard included
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Features
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={handleContinue}
            disabled={!selectedType}
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg"
          >
            Continue as {selectedType === 'customer' ? 'Customer' : selectedType === 'artisan' ? 'Artisan' : '...'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {!selectedType && (
            <p className="text-sm text-gray-500 mt-2">
              Please select your user type to continue
            </p>
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <Users className="h-8 w-8 mx-auto mb-3 text-amber-600" />
            <h3 className="font-medium mb-2">Community Driven</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect with a vibrant community of artisans and craft enthusiasts
            </p>
          </div>
          <div className="p-4">
            <BarChart3 className="h-8 w-8 mx-auto mb-3 text-amber-600" />
            <h3 className="font-medium mb-2">AI-Powered Insights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get intelligent recommendations and business analytics
            </p>
          </div>
          <div className="p-4">
            <Sparkles className="h-8 w-8 mx-auto mb-3 text-amber-600" />
            <h3 className="font-medium mb-2">Cultural Heritage</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Preserve and celebrate traditional crafting techniques
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
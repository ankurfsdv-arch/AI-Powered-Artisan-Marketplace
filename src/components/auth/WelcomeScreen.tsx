import { useState } from 'react';
import { ArrowRight, ShoppingBag, Palette, Star, Users, TrendingUp, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { AuthenticatedUser } from './AuthFlow';

interface WelcomeScreenProps {
  user: AuthenticatedUser;
  onContinue: () => void;
}

export function WelcomeScreen({ user, onContinue }: WelcomeScreenProps) {
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | null>(null);

  const buyerActions = [
    {
      id: 'browse',
      title: 'Browse Crafts',
      description: 'Discover unique handmade items',
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      id: 'trending',
      title: 'Trending Now',
      description: 'See what\'s popular this week',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      id: 'wishlist',
      title: 'My Wishlist',
      description: 'Items you\'ve saved for later',
      icon: Heart,
      color: 'bg-pink-500'
    }
  ];

  const artisanActions = [
    {
      id: 'dashboard',
      title: 'Artisan Dashboard',
      description: 'Manage your profile and products',
      icon: Palette,
      color: 'bg-orange-500'
    },
    {
      id: 'add-product',
      title: 'Add New Product',
      description: 'Upload your latest creation',
      icon: Star,
      color: 'bg-purple-500'
    },
    {
      id: 'community',
      title: 'Artisan Community',
      description: 'Connect with fellow creators',
      icon: Users,
      color: 'bg-indigo-500'
    }
  ];

  const actions = user.userType === 'buyer' ? buyerActions : artisanActions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">K</span>
              </div>
              <span className="text-3xl font-bold text-gray-900">KalaKriti</span>
            </div>

            <div className="mb-4">
              {user.isNewUser ? (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome to KalaKriti, {user.fullName}! 🎉
                  </h1>
                  <p className="text-gray-600">
                    Your account has been created successfully. Let's get you started!
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back, {user.fullName}!
                  </h1>
                  <p className="text-gray-600">
                    Great to see you again. What would you like to do today?
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {user.userType === 'buyer' ? 'Craft Enthusiast' : 'Artisan'}
              </Badge>
              {user.primaryCraft && (
                <Badge variant="outline">
                  {user.primaryCraft}
                </Badge>
              )}
              <Badge className="bg-green-100 text-green-800">
                +91 {user.mobileNumber}
              </Badge>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-gray-900 text-center">Quick Actions</h3>
            <div className="grid gap-3">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => setSelectedQuickAction(action.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedQuickAction === action.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                      {selectedQuickAction === action.id && (
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {user.isNewUser && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">🎯 Quick Setup Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                {user.userType === 'buyer' ? (
                  <>
                    <li>• Complete your profile to get personalized recommendations</li>
                    <li>• Follow your favorite artisans to stay updated</li>
                    <li>• Add items to wishlist for easy access later</li>
                  </>
                ) : (
                  <>
                    <li>• Upload high-quality photos of your crafts</li>
                    <li>• Share your story and heritage in your profile</li>
                    <li>• Connect with the artisan community</li>
                  </>
                )}
              </ul>
            </div>
          )}

          <Button 
            size="lg" 
            className="w-full bg-orange-600 hover:bg-orange-700 h-12"
            onClick={onContinue}
          >
            {selectedQuickAction ? 'Continue with Selected Action' : 'Explore KalaKriti'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help getting started?{' '}
              <a href="#" className="text-orange-600 hover:underline font-medium">
                Visit our Help Center
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
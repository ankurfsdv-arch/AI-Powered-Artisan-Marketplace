import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { KalaKritiLogo } from './KalaKritiLogo';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <KalaKritiLogo size="sm" />
              <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">AI-Powered</Badge>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering Indian artisans with AI-powered tools to showcase their crafts to the world 
              while preserving traditional techniques and cultural heritage.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-400 p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-400 p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-400 p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-amber-400 p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Buyers</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Browse Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Featured Artisans</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Orders</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Artisans</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Start Selling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Training Hub</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact & Support</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91-XXXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@kalakriti.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>New Delhi, India</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Stay Updated</h4>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700 text-white text-sm"
                />
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
            </div>
            
            <div className="text-sm text-gray-400">
              © 2024 KalaKriti. All rights reserved. Made with ❤️ for Indian artisans.
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
            <Badge variant="outline" className="text-gray-500 border-gray-700">
              🇮🇳 Proudly Indian
            </Badge>
            <Badge variant="outline" className="text-gray-500 border-gray-700">
              🌱 Sustainable Crafts
            </Badge>
            <Badge variant="outline" className="text-gray-500 border-gray-700">
              🤖 AI-Enhanced
            </Badge>
            <Badge variant="outline" className="text-gray-500 border-gray-700">
              🌍 Global Shipping
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
}
import { Search, ShoppingCart, User, Globe, Menu, LogOut, Settings, Package, Heart, Bell, ChevronDown, MapPin, CreditCard, Grid3X3, Camera, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { AuthenticatedUser } from './auth/AuthFlow';
import { KalaKritiLogo } from './KalaKritiLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from './LanguageContext';

interface HeaderProps {
  onNavigate: (page: 'home' | 'products' | 'product-detail' | 'cart' | 'auth' | 'artisan-dashboard' | 'profile' | 'wishlist' | 'orders' | 'artisan-stories' | 'about') => void;
  currentPage: string;
  authenticatedUser?: AuthenticatedUser | null;
  onLogin: () => void;
  onLogout: () => void;
  onAIAssistant?: () => void;
}

export function Header({ onNavigate, currentPage, authenticatedUser, onLogin, onLogout, onAIAssistant }: HeaderProps) {
  const { t } = useLanguage();
  
  const categories = [
    { name: 'Textiles & Clothing', icon: '👗' },
    { name: 'Jewelry & Accessories', icon: '💍' },
    { name: 'Home Decor', icon: '🏠' },
    { name: 'Pottery & Ceramics', icon: '🏺' },
    { name: 'Woodwork', icon: '🪵' },
    { name: 'Metalwork', icon: '🔨' },
    { name: 'Art & Paintings', icon: '🎨' },
    { name: 'Religious Items', icon: '🕉️' }
  ];

  const notifications = [
    { id: 1, title: 'Your order has shipped!', desc: 'Handwoven silk saree is on the way', time: '2 hours ago', unread: true },
    { id: 2, title: 'Flash Sale: 30% off on home decor', desc: 'Limited time offer on selected items', time: '4 hours ago', unread: true },
    { id: 3, title: 'New artisan story available', desc: 'See how traditional lamps are made', time: '1 day ago', unread: false },
    { id: 4, title: 'Order delivered successfully', desc: 'Cotton kurta set has been delivered', time: '2 days ago', unread: false }
  ];
  
  return (
    <header className="border-b bg-background border-border sticky top-0 z-50 backdrop-blur-sm bg-background/80">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Support: +91-XXXX-XXXX</span>
            {authenticatedUser?.userType !== 'artisan' && (
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                {t('hero.joinArtisan')}
              </Button>
            )}
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <KalaKritiLogo size="md" />
              <Badge variant="secondary" className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-sm">
                AI-Powered
              </Badge>
            </button>

            <nav className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('home')}
                className={`transition-colors ${currentPage === 'home' ? 'text-amber-400' : 'text-muted-foreground hover:text-amber-400'}`}
              >
                Home
              </button>
              
              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-amber-400 transition-colors">
                    Categories
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <div className="grid grid-cols-1 gap-1 p-2">
                    {categories.map((category, index) => (
                      <DropdownMenuItem key={index} className="flex items-center gap-3 p-3 cursor-pointer">
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-sm">{category.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 p-3 cursor-pointer">
                    <Grid3X3 className="w-4 h-4" />
                    View All Categories
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <button 
                onClick={() => onNavigate('products')}
                className={`transition-colors ${currentPage === 'products' ? 'text-amber-400' : 'text-muted-foreground hover:text-amber-400'}`}
              >
                Products
              </button>
              <button 
                onClick={() => onNavigate('artisan-stories')}
                className={`transition-colors ${currentPage === 'artisan-stories' ? 'text-amber-400' : 'text-muted-foreground hover:text-amber-400'}`}
              >
                Artisan Stories
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`transition-colors ${currentPage === 'about' ? 'text-amber-400' : 'text-muted-foreground hover:text-amber-400'}`}
              >
                About
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Input 
                type="search" 
                placeholder={t('header.search')}
                className="w-80 pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications - only for authenticated users */}
              {authenticatedUser && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="relative text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <Bell className="w-5 h-5" />
                      {notifications.some(n => n.unread) && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="px-3 py-2 border-b">
                      <h4 className="font-medium">Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        {notifications.filter(n => n.unread).length} unread notifications
                      </p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium text-sm">{notification.title}</span>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.desc}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Shopping Cart */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={() => onNavigate('cart')}
              >
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-amber-600 text-white">
                  3
                </Badge>
              </Button>

              {authenticatedUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 text-muted-foreground hover:text-foreground hover:bg-muted">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-amber-600 text-white">
                          {authenticatedUser.fullName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <div className="text-sm font-medium text-foreground">{authenticatedUser.fullName}</div>
                        <div className="text-xs text-muted-foreground capitalize">{authenticatedUser.userType}</div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
                    <div className="px-2 py-1.5">
                      <div className="font-medium text-popover-foreground">{authenticatedUser.fullName}</div>
                      <div className="text-sm text-muted-foreground">+91 {authenticatedUser.mobileNumber}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary" className="text-xs capitalize bg-amber-600 text-white">
                          {authenticatedUser.userType}
                        </Badge>
                        {authenticatedUser.primaryCraft && (
                          <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                            {authenticatedUser.primaryCraft}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    
                    {authenticatedUser.userType === 'buyer' ? (
                      <>
                        <DropdownMenuItem 
                          onClick={() => onNavigate('profile')}
                          className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          <User className="w-4 h-4 mr-2" />
                          My Account
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={onAIAssistant}
                          className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div className="w-4 h-4 mr-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm flex items-center justify-center">
                              <Sparkles className="w-2.5 h-2.5 text-white" />
                            </div>
                            AI Assistant
                          </div>
                          <Badge className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                            New
                          </Badge>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onNavigate('orders')}
                          className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          <Package className="w-4 h-4 mr-2" />
                          My Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onNavigate('wishlist')}
                          className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          My Wishlist
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          Saved Addresses
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Payment Methods
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem 
                          onClick={() => onNavigate('artisan-dashboard')}
                          className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        >
                          <Package className="w-4 h-4 mr-2" />
                          {t('header.dashboard')}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <Heart className="w-4 h-4 mr-2" />
                          My Products
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem onClick={onLogout} className="text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      <LogOut className="w-4 h-4 mr-2" />
                      {t('header.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onLogin}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline">{t('header.login')}</span>
                </Button>
              )}

              <Button variant="ghost" size="sm" className="md:hidden text-muted-foreground hover:text-foreground hover:bg-muted">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
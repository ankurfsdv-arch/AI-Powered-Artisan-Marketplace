import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { 
  Search, Bell, Settings, LogOut, Home, Package, Plus, 
  DollarSign, BarChart3, Star, User, Menu, X, Video
} from 'lucide-react';
import { KalaKritiLogo } from '../KalaKritiLogo';

// Dashboard sections
import { DashboardHome } from './dashboard-sections/DashboardHome';
import { MyProducts } from './dashboard-sections/MyProducts';
import { AddProduct } from './dashboard-sections/AddProduct';
import { PricingManager } from './dashboard-sections/PricingManager';
import { AnalyticsSection } from './dashboard-sections/AnalyticsSection';
import { TrendingControl } from './dashboard-sections/TrendingControl';
import { ArtisanSettings } from './dashboard-sections/ArtisanSettings';
import { ArtisanStoriesManager } from './dashboard-sections/ArtisanStoriesManager';

interface ArtisanDashboardLayoutProps {
  artisan: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    location: string;
    craft: string;
    experience: number;
    rating: number;
    totalProducts: number;
    totalSales: number;
    revenue: number;
  };
  onLogout: () => void;
  onBackToHome: () => void;
}

type SidebarSection = 'dashboard' | 'products' | 'add-product' | 'pricing' | 'analytics' | 'trending' | 'stories' | 'settings';

export function ArtisanDashboardLayout({ artisan, onLogout, onBackToHome }: ArtisanDashboardLayoutProps) {
  const [activeSection, setActiveSection] = useState<SidebarSection>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New order received', desc: 'Handwoven silk saree order', time: '2 hours ago', unread: true },
    { id: 2, title: 'Product featured', desc: 'Your brass lamp is trending', time: '5 hours ago', unread: true },
    { id: 3, title: 'Review received', desc: '5-star rating on cotton kurta', time: '1 day ago', unread: false }
  ]);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview & Stats' },
    { id: 'products', label: 'My Products', icon: Package, description: 'Manage Products' },
    { id: 'add-product', label: 'Add Product', icon: Plus, description: 'Create New Product' },
    { id: 'pricing', label: 'Pricing Manager', icon: DollarSign, description: 'Update Prices' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Performance Insights' },
    { id: 'trending', label: 'Trending Control', icon: Star, description: 'Featured Products' },
    { id: 'stories', label: 'Artisan Stories', icon: Video, description: 'Manage Video Stories' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Profile & Business' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome artisan={artisan} />;
      case 'products':
        return <MyProducts artisanId={artisan.id} searchQuery={searchQuery} />;
      case 'add-product':
        return <AddProduct artisanId={artisan.id} />;
      case 'pricing':
        return <PricingManager artisanId={artisan.id} />;
      case 'analytics':
        return <AnalyticsSection artisanId={artisan.id} />;
      case 'trending':
        return <TrendingControl artisanId={artisan.id} />;
      case 'stories':
        return <ArtisanStoriesManager artisanId={artisan.id} />;
      case 'settings':
        return <ArtisanSettings artisan={artisan} />;
      default:
        return <DashboardHome artisan={artisan} />;
    }
  };

  return (
    <div className="min-h-screen bg-background dark">
      {/* Top Navbar */}
      <header className="border-b bg-card border-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Logo and menu toggle */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <button 
              onClick={onBackToHome}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <KalaKritiLogo size="sm" />
            </button>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search your products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.some(n => n.unread) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full"></div>
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
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.desc}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={artisan.avatar} alt={artisan.name} />
                    <AvatarFallback className="bg-amber-600 text-white">
                      {artisan.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium">{artisan.name}</div>
                    <div className="text-xs text-muted-foreground">{artisan.craft}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <div className="font-medium">{artisan.name}</div>
                  <div className="text-sm text-muted-foreground">{artisan.email}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs bg-amber-600 text-white">
                      {artisan.craft}
                    </Badge>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveSection('settings')}>
                  <User className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out`}>
          
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-end p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <nav className="flex flex-col h-full p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as SidebarSection);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-amber-600 text-white'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs opacity-75">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sidebar Footer */}
            <div className="mt-auto pt-4 border-t border-border">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors hover:bg-destructive hover:text-destructive-foreground text-muted-foreground"
              >
                <LogOut className="h-5 w-5" />
                <div>
                  <div className="font-medium text-sm">Logout</div>
                  <div className="text-xs opacity-75">Sign out of account</div>
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
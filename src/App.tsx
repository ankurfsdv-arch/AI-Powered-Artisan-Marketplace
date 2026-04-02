import { useState } from 'react';
import { Header } from './components/Header';
import { HeroBannerSlider } from './components/HeroBannerSlider';
import { TrendingProductsSlider } from './components/TrendingProductsSlider';
import { CategoriesSection } from './components/CategoriesSection';
import { CategoryBrowsing } from './components/CategoryBrowsing';
import { FeaturedArtisans } from './components/FeaturedArtisans';
import { AIFeaturesSection } from './components/AIFeaturesSection';
import { CustomerHomepage } from './components/CustomerHomepage';
import { CustomerProfile } from './components/CustomerProfile';
import { ProductBrowsing } from './components/ProductBrowsing';
import { ProductDetail } from './components/ProductDetail';
import { ShoppingCart } from './components/ShoppingCart';
import { AuthFlow, AuthenticatedUser } from './components/auth/AuthFlow';
import { WelcomeScreen } from './components/auth/WelcomeScreen';
import { ArtisanDashboardLayout } from './components/artisan/ArtisanDashboardLayout';
import { Footer } from './components/Footer';
import { PromoFloatingBanner } from './components/PromoFloatingBanner';
import { ArtisanStories } from './components/ArtisanStories';
import { AboutPage } from './components/AboutPage';
import { Toaster } from './components/ui/sonner';
import { LanguageProvider } from './components/LanguageContext';

type Page = 'home' | 'products' | 'product-detail' | 'cart' | 'auth' | 'welcome' | 'artisan-dashboard' | 'profile' | 'wishlist' | 'orders' | 'categories' | 'artisan-stories' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [profileTab, setProfileTab] = useState<string>('details');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [previousPage, setPreviousPage] = useState<Page>('home');

  const handleAuthSuccess = (userData: AuthenticatedUser) => {
    setAuthenticatedUser(userData);
    if (userData.isNewUser) {
      setShowWelcome(true);
      setCurrentPage('welcome');
    } else {
      // Route users based on their type
      if (userData.userType === 'artisan') {
        setCurrentPage('artisan-dashboard');
      } else {
        setCurrentPage('home');
      }
    }
  };

  const handleWelcomeContinue = () => {
    setShowWelcome(false);
    // Route based on user type after welcome
    if (authenticatedUser?.userType === 'artisan') {
      setCurrentPage('artisan-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    setShowWelcome(false);
    setCurrentPage('home');
  };

  const handleNavigateWithBack = (newPage: Page, category?: string) => {
    setPreviousPage(currentPage);
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentPage(newPage);
  };

  const handleBackNavigation = () => {
    setCurrentPage(previousPage);
    setSelectedCategory('');
  };

  const renderPage = () => {
    if (currentPage === 'auth') {
      return <AuthFlow onAuthSuccess={handleAuthSuccess} />;
    }

    if (currentPage === 'welcome' && showWelcome && authenticatedUser) {
      return (
        <WelcomeScreen 
          user={authenticatedUser} 
          onContinue={handleWelcomeContinue} 
        />
      );
    }

    switch (currentPage) {
      case 'products':
        return (
          <ProductBrowsing 
            onBack={handleBackNavigation}
            onProductClick={(productId) => {
              setPreviousPage('products');
              setCurrentPage('product-detail');
            }}
          />
        );
      case 'product-detail':
        return (
          <ProductDetail 
            onBack={handleBackNavigation}
          />
        );
      case 'cart':
        return (
          <ShoppingCart 
            onBack={handleBackNavigation}
          />
        );
      case 'categories':
        return (
          <CategoryBrowsing
            selectedCategory={selectedCategory}
            onBack={handleBackNavigation}
            onProductClick={(productId) => {
              setPreviousPage('categories');
              setCurrentPage('product-detail');
            }}
          />
        );
      case 'artisan-stories':
        return (
          <ArtisanStories 
            onBack={handleBackNavigation}
            onNavigateToProduct={(productId) => {
              setPreviousPage('artisan-stories');
              setCurrentPage('product-detail');
            }}
          />
        );
      case 'about':
        return (
          <AboutPage 
            onBack={handleBackNavigation}
            onNavigate={(page) => {
              setPreviousPage('about');
              setCurrentPage(page);
            }}
          />
        );
      case 'profile':
      case 'wishlist':
      case 'orders':
        if (authenticatedUser && authenticatedUser.userType === 'buyer') {
          return (
            <CustomerProfile 
              user={authenticatedUser}
              onNavigate={setCurrentPage}
              initialTab={profileTab}
            />
          );
        }
        return <div>Please log in to access this page</div>;
      case 'artisan-dashboard':
        if (authenticatedUser && authenticatedUser.userType === 'artisan') {
          return (
            <ArtisanDashboardLayout 
              artisan={{
                id: authenticatedUser.id,
                name: authenticatedUser.fullName,
                email: `${authenticatedUser.mobileNumber}@kalakriti.com`,
                phone: authenticatedUser.mobileNumber,
                location: 'Varanasi, Uttar Pradesh',
                craft: authenticatedUser.primaryCraft || 'Traditional Crafts',
                experience: 15,
                rating: 4.8,
                totalProducts: 24,
                totalSales: 186,
                revenue: 45600
              }}
              onLogout={handleLogout}
              onBackToHome={() => setCurrentPage('home')}
            />
          );
        }
        return <div>Access Denied</div>;
      default:
        return (
          <>
            {/* Show enhanced homepage for authenticated customers, original for visitors */}
            {authenticatedUser && authenticatedUser.userType === 'buyer' ? (
              <>
                <CustomerHomepage onNavigate={(page, productId) => {
                  if (page === 'profile') {
                    // Navigate to AI Assistant tab in profile
                    setProfileTab('ai-assistant');
                    setCurrentPage('profile');
                  } else if (productId) {
                    // Store productId for product detail page
                    setCurrentPage(page as Page);
                  } else {
                    setCurrentPage(page as Page);
                  }
                }} />
                <TrendingProductsSlider 
                  onProductClick={(productId) => setCurrentPage('product-detail')}
                  onAddToCart={(productId) => {
                    // Add to cart logic here
                    console.log('Adding product to cart:', productId);
                  }}
                />
              </>
            ) : (
              <>
                <HeroBannerSlider 
                  onNavigate={(page, category) => {
                    if (category) {
                      setSelectedCategory(category);
                      setCurrentPage('categories' as Page);
                    } else {
                      setCurrentPage(page as Page);
                    }
                    setPreviousPage('home');
                  }}
                />
                <TrendingProductsSlider 
                  onProductClick={(productId) => {
                    setPreviousPage('home');
                    setCurrentPage('product-detail');
                  }}
                  onAddToCart={(productId) => {
                    // Add to cart logic here  
                    console.log('Adding product to cart:', productId);
                  }}
                />
                <CategoriesSection 
                  onCategoryClick={(categoryKey) => {
                    setSelectedCategory(categoryKey);
                    setPreviousPage('home');
                    setCurrentPage('categories');
                  }}
                  onViewAll={() => {
                    setSelectedCategory('');
                    setPreviousPage('home');
                    setCurrentPage('categories');
                  }}
                />
                <FeaturedArtisans />
                <AIFeaturesSection />
              </>
            )}
          </>
        );
    }
  };

  // Don't show header/footer for auth, welcome, and artisan dashboard screens
  const showHeaderFooter = currentPage !== 'auth' && currentPage !== 'welcome' && currentPage !== 'artisan-dashboard';

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background dark">
        {showHeaderFooter && (
          <Header 
            onNavigate={setCurrentPage} 
            currentPage={currentPage}
            authenticatedUser={authenticatedUser}
            onLogin={() => setCurrentPage('auth')}
            onLogout={handleLogout}
            onAIAssistant={() => {
              // Navigate to AI Assistant tab in profile
              setProfileTab('ai-assistant');
              setCurrentPage('profile');
            }}
          />
        )}
        
        <main>
          {renderPage()}
        </main>
        
        {showHeaderFooter && currentPage === 'home' && <Footer />}
        
        {/* Show promotional banner only on homepage for non-artisan users */}
        {currentPage === 'home' && (!authenticatedUser || authenticatedUser.userType !== 'artisan') && (
          <PromoFloatingBanner />
        )}
        
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #374151',
            },
          }}
        />
      </div>
    </LanguageProvider>
  );
}
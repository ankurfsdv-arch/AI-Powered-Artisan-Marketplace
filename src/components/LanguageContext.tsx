import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    // Header
    'header.search': 'Search for traditional crafts, artisans...',
    'header.login': 'Login',
    'header.logout': 'Logout',
    'header.cart': 'Cart',
    'header.profile': 'Profile',
    'header.dashboard': 'Dashboard',
    'header.language': 'Language',
    
    // Hero Section
    'hero.title': 'Discover Authentic Indian Crafts',
    'hero.subtitle': 'Connect directly with skilled artisans and bring home the heritage of India',
    'hero.cta': 'Explore Crafts',
    'hero.joinArtisan': 'Join as Artisan',
    
    // Categories
    'categories.title': 'Explore Categories',
    'categories.textiles': 'Textiles & Fabrics',
    'categories.pottery': 'Pottery & Ceramics',
    'categories.jewelry': 'Jewelry & Accessories',
    'categories.woodwork': 'Woodwork & Carving',
    'categories.metalwork': 'Metalwork & Brass',
    'categories.paintings': 'Paintings & Art',
    
    // Featured Artisans
    'artisans.title': 'Featured Artisans',
    'artisans.subtitle': 'Meet the master craftspeople preserving India\'s cultural heritage',
    'artisans.experience': 'years experience',
    'artisans.viewProfile': 'View Profile',
    'artisans.products': 'Products',
    'artisans.rating': 'Rating',
    
    // AI Features
    'ai.title': 'AI-Powered Features',
    'ai.smartCoaching': 'Smart Coaching',
    'ai.smartCoachingDesc': 'Get personalized business advice and marketing tips powered by AI',
    'ai.autoTranslation': 'Auto Translation',
    'ai.autoTranslationDesc': 'Reach customers in their preferred language with AI translation',
    'ai.storyGeneration': 'Story Generation',
    'ai.storyGenerationDesc': 'Create compelling product stories that highlight your craft\'s heritage',
    
    // Product Browsing
    'products.title': 'Browse Products',
    'products.search': 'Search products...',
    'products.sortBy': 'Sort by',
    'products.filterBy': 'Filter by',
    'products.price': 'Price',
    'products.category': 'Category',
    'products.location': 'Location',
    'products.all': 'All',
    'products.under500': 'Under ₹500',
    'products.500to2000': '₹500 - ₹2,000',
    'products.2000to5000': '₹2,000 - ₹5,000',
    'products.above5000': 'Above ₹5,000',
    'products.featured': 'Featured',
    'products.newest': 'Newest',
    'products.priceLowToHigh': 'Price: Low to High',
    'products.priceHighToLow': 'Price: High to Low',
    
    // Product Detail
    'product.addToCart': 'Add to Cart',
    'product.buyNow': 'Buy Now',
    'product.aboutArtisan': 'About the Artisan',
    'product.craftStory': 'Craft Story',
    'product.specifications': 'Specifications',
    'product.reviews': 'Reviews',
    'product.deliveryInfo': 'Delivery Information',
    'product.returnPolicy': 'Return Policy',
    
    // Shopping Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',
    'cart.checkout': 'Proceed to Checkout',
    'cart.total': 'Total',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.free': 'Free',
    'cart.remove': 'Remove',
    'cart.updateQuantity': 'Update Quantity',
    
    // Authentication
    'auth.welcome': 'Welcome to KalaKriti',
    'auth.subtitle': 'Discover authentic Indian crafts',
    'auth.enterMobile': 'Enter your mobile number',
    'auth.mobileNumber': 'Mobile Number',
    'auth.sendOTP': 'Send OTP',
    'auth.verifyOTP': 'Verify OTP',
    'auth.otpSent': 'OTP sent to',
    'auth.resendOTP': 'Resend OTP',
    'auth.verify': 'Verify',
    'auth.selectUserType': 'How do you want to use KalaKriti?',
    'auth.customer': 'Customer',
    'auth.customerDesc': 'I want to buy authentic crafts',
    'auth.artisan': 'Artisan',
    'auth.artisanDesc': 'I want to sell my crafts',
    'auth.continue': 'Continue',
    'auth.fullName': 'Full Name',
    'auth.primaryCraft': 'Primary Craft',
    'auth.createAccount': 'Create Account',
    
    // Artisan Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': 'Dashboard Overview',
    'dashboard.totalProducts': 'Total Products',
    'dashboard.totalSales': 'Total Sales',
    'dashboard.revenue': 'Revenue',
    'dashboard.rating': 'Rating',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.addProduct': 'Add New Product',
    'dashboard.viewAnalytics': 'View Analytics',
    'dashboard.editProfile': 'Edit Profile',
    'dashboard.manageProducts': 'Manage Products',
    'dashboard.recentOrders': 'Recent Orders',
    'dashboard.viewAll': 'View All',
    
    // Product Management
    'productMgmt.title': 'Product Management',
    'productMgmt.addNew': 'Add New Product',
    'productMgmt.productName': 'Product Name',
    'productMgmt.price': 'Price',
    'productMgmt.description': 'Description',
    'productMgmt.generateDescription': 'Generate with AI',
    'productMgmt.category': 'Category',
    'productMgmt.images': 'Product Images',
    'productMgmt.save': 'Save Product',
    'productMgmt.cancel': 'Cancel',
    'productMgmt.edit': 'Edit',
    'productMgmt.delete': 'Delete',
    'productMgmt.trending': 'Mark as Trending',
    'productMgmt.featured': 'Mark as Featured',
    
    // Trending Products Slider
    'trendingProducts': 'Trending Products',
    'discoverPopularCrafts': 'Discover the most popular crafts loved by our customers',
    'story': 'Story',
    'by': 'by',
    'addToCart': 'Add to Cart',
    'buyNow': 'Buy Now',
    'autoScrolling': 'Auto-scrolling every 5 seconds',
    'autoScrollPaused': 'Auto-scroll paused',
    'clickToNavigate': 'Click arrows or dots to navigate',
    'noTrendingProducts': 'No trending products at the moment. Check back soon!',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.rupees': '₹',
  },
  hi: {
    // Header
    'header.search': 'पारंपरिक शिल्प, कारीगर खोजें...',
    'header.login': 'लॉगिन',
    'header.logout': 'लॉगआउट',
    'header.cart': 'कार्ट',
    'header.profile': 'प्रोफाइल',
    'header.dashboard': 'डैशबोर्ड',
    'header.language': 'भाषा',
    
    // Hero Section
    'hero.title': 'प्रामाणिक भारतीय शिल्प खोजें',
    'hero.subtitle': 'कुशल कारीगरों से सीधे जुड़ें और भारत की विरासत को घर लाएं',
    'hero.cta': 'शिल्प देखें',
    'hero.joinArtisan': 'कारीगर बनें',
    
    // Categories
    'categories.title': 'श्रेणियां देखें',
    'categories.textiles': 'वस्त्र और कपड़े',
    'categories.pottery': 'मिट्टी के बर्तन',
    'categories.jewelry': 'आभूषण और सहायक वस्तुएं',
    'categories.woodwork': 'लकड़ी का काम',
    'categories.metalwork': 'धातु का काम',
    'categories.paintings': 'चित्रकारी और कला',
    
    // Featured Artisans
    'artisans.title': 'विशेष कारीगर',
    'artisans.subtitle': 'भारत की सांस्कृतिक विरासत को संरक्षित करने वाले मास्टर शिल्पकारों से मिलें',
    'artisans.experience': 'साल का अनुभव',
    'artisans.viewProfile': 'प्रोफाइल देखें',
    'artisans.products': 'उत्पाद',
    'artisans.rating': 'रेटिंग',
    
    // AI Features
    'ai.title': 'AI-संचालित सुविधाएं',
    'ai.smartCoaching': 'स्मार्ट कोचिंग',
    'ai.smartCoachingDesc': 'AI द्वारा संचालित व्यक्तिगत व्यापारिक सलाह और मार्केटिंग टिप्स प्राप्त करें',
    'ai.autoTranslation': 'स्वचालित अनुवाद',
    'ai.autoTranslationDesc': 'AI अनुवाद के साथ ग्राहकों तक उनकी पसंदीदा भाषा में पहुंचें',
    'ai.storyGeneration': 'कहानी निर्माण',
    'ai.storyGenerationDesc': 'अपने शिल्प की विरासत को उजागर करने वाली आकर्षक उत्पाद कहानियां बनाएं',
    
    // Product Browsing
    'products.title': 'उत्पाद ब्राउज़ करें',
    'products.search': 'उत्पाद खोजें...',
    'products.sortBy': 'क्रमबद्ध करें',
    'products.filterBy': 'फ़िल्टर करें',
    'products.price': 'मूल्य',
    'products.category': 'श्रेणी',
    'products.location': 'स्थान',
    'products.all': 'सभी',
    'products.under500': '₹500 से कम',
    'products.500to2000': '₹500 - ₹2,000',
    'products.2000to5000': '₹2,000 - ₹5,000',
    'products.above5000': '₹5,000 से अधिक',
    'products.featured': 'विशेष',
    'products.newest': 'नवीनतम',
    'products.priceLowToHigh': 'मूल्य: कम से अधिक',
    'products.priceHighToLow': 'मूल्य: अधिक से कम',
    
    // Product Detail
    'product.addToCart': 'कार्ट में जोड़ें',
    'product.buyNow': 'अभी खरीदें',
    'product.aboutArtisan': 'कारीगर के बारे में',
    'product.craftStory': 'शिल्प की कहानी',
    'product.specifications': 'विशेषताएं',
    'product.reviews': 'समीक्षाएं',
    'product.deliveryInfo': 'डिलीवरी की जानकारी',
    'product.returnPolicy': 'वापसी नीति',
    
    // Shopping Cart
    'cart.title': 'शॉपिंग कार्ट',
    'cart.empty': 'आपका कार्ट खाली है',
    'cart.continueShopping': 'खरीदारी जारी रखें',
    'cart.checkout': 'चेकआउट करें',
    'cart.total': 'कुल',
    'cart.subtotal': 'उप-योग',
    'cart.shipping': 'शिपिंग',
    'cart.free': 'मुफ्त',
    'cart.remove': 'हटाएं',
    'cart.updateQuantity': 'मात्रा अपडेट करें',
    
    // Authentication
    'auth.welcome': 'कलाकृति में आपका स्वागत है',
    'auth.subtitle': 'प्रामाणिक भारतीय शिल्प खोजें',
    'auth.enterMobile': 'अपना मोबाइल नंबर दर्ज करें',
    'auth.mobileNumber': 'मोबाइल नंबर',
    'auth.sendOTP': 'OTP भेजें',
    'auth.verifyOTP': 'OTP सत्यापित करें',
    'auth.otpSent': 'OTP भेजा गया',
    'auth.resendOTP': 'OTP पुनः भेजें',
    'auth.verify': 'सत्यापित करें',
    'auth.selectUserType': 'आप कलाकृति का उपयोग कैसे करना चाहते हैं?',
    'auth.customer': 'ग्राहक',
    'auth.customerDesc': 'मैं प्रामाणिक शिल्प खरीदना चाहता हूं',
    'auth.artisan': 'कारीगर',
    'auth.artisanDesc': 'मैं अपने शिल्प बेचना चाहता हूं',
    'auth.continue': 'जारी रखें',
    'auth.fullName': 'पूरा नाम',
    'auth.primaryCraft': 'मुख्य शिल्प',
    'auth.createAccount': 'खाता बनाएं',
    
    // Artisan Dashboard
    'dashboard.welcome': 'वापसी पर स्वागत है',
    'dashboard.overview': 'डैशबोर्ड अवलोकन',
    'dashboard.totalProducts': 'कुल उत्पाद',
    'dashboard.totalSales': 'कुल बिक्री',
    'dashboard.revenue': 'आय',
    'dashboard.rating': 'रेटिंग',
    'dashboard.quickActions': 'त्वरित क्रियाएं',
    'dashboard.addProduct': 'नया उत्पाद जोड़ें',
    'dashboard.viewAnalytics': 'एनालिटिक्स देखें',
    'dashboard.editProfile': 'प्रोफाइल संपादित करें',
    'dashboard.manageProducts': 'उत्पाद प्रबंधन',
    'dashboard.recentOrders': 'हाल के ऑर्डर',
    'dashboard.viewAll': 'सभी देखें',
    
    // Product Management
    'productMgmt.title': 'उत्पाद प्रबंध��',
    'productMgmt.addNew': 'नया उत्पाद जोड़ें',
    'productMgmt.productName': 'उत्पाद का नाम',
    'productMgmt.price': 'मूल्य',
    'productMgmt.description': 'विवरण',
    'productMgmt.generateDescription': 'AI के साथ बनाएं',
    'productMgmt.category': 'श्रेणी',
    'productMgmt.images': 'उत्पाद की छवियां',
    'productMgmt.save': 'उत्पाद सेव करें',
    'productMgmt.cancel': 'रद्द करें',
    'productMgmt.edit': 'संपादित करें',
    'productMgmt.delete': 'हटाएं',
    'productMgmt.trending': 'ट्रेंडिंग के रूप में चिह्नित करें',
    'productMgmt.featured': 'विशेष के रूप में चिह्नित करें',
    
    // Trending Products Slider
    'trendingProducts': 'ट्रेंडिंग उत्पाद',
    'discoverPopularCrafts': 'हमारे ग्राहकों द्वारा पसंद किए जाने वाले सबसे लोकप्रिय शिल्प खोजें',
    'story': 'कहानी',
    'by': 'द्वारा',
    'addToCart': 'कार्ट में जोड़ें',
    'buyNow': 'अभी खरीदें',
    'autoScrolling': 'हर 5 सेकंड में ऑटो-स्क्रॉलिंग',
    'autoScrollPaused': 'ऑटो-स्क्रॉल रोका गया',
    'clickToNavigate': 'नेविगेट करने के लिए तीर या डॉट्स पर क्लिक करें',
    'noTrendingProducts': 'इस समय कोई ट्रेंडिंग उत्पाद नहीं हैं। जल्द ही वापस देखें!',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.close': 'बंद करें',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.edit': 'संपादित करें',
    'common.delete': 'हटाएं',
    'common.view': 'देखें',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.rupees': '₹',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    // Store language preference in localStorage
    localStorage.setItem('kalakriti-language', lang);
  };

  const t = (key: string, fallback?: string): string => {
    const translation = translations[currentLanguage][key];
    return translation || fallback || key;
  };

  // Initialize language from localStorage on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('kalakriti-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
import { useState } from 'react';
import { ArrowRight, Phone, Shield, Heart, Users, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { motion } from 'motion/react';

interface MobileEntryProps {
  onContinue: (mobileNumber: string) => void;
  onBack?: () => void;
}

export function MobileEntry({ onContinue, onBack }: MobileEntryProps) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      onContinue(mobileNumber);
    }
  };

  const isValidMobile = mobileNumber.length === 10 && /^\d+$/.test(mobileNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-8 -left-8 w-32 h-32 bg-orange-200 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-1/3 -right-12 w-40 h-40 bg-amber-200 rounded-full opacity-20"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute -bottom-12 left-1/3 w-28 h-28 bg-rose-200 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
        
        {/* Enhanced traditional pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="fill-current text-orange-900">
            <defs>
              <pattern id="paisley" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M25,75 Q25,25 50,25 Q75,25 75,50 Q75,75 50,85 Q25,95 25,75 Z" fill="currentColor"/>
                <circle cx="50" cy="45" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#paisley)"/>
          </svg>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Back Button */}
            {onBack && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4"
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBack}
                  className="hover:bg-orange-50 hover:text-orange-700 -ml-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to User Type
                </Button>
              </motion.div>
            )}
            {/* Enhanced Brand Header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                  <span className="text-white text-2xl font-bold relative z-10">K</span>
                </motion.div>
                <div className="text-left">
                  <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    KalaKriti
                  </span>
                  <p className="text-sm text-gray-500 mt-1">हस्तशिल्प की दुनिया में आपका स्वागत है</p>
                </div>
              </div>

              <motion.h1 
                className="text-3xl font-bold text-gray-900 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Welcome to India's<br />
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Artisan Marketplace
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Discover authentic handmade crafts from talented artisans across India
              </motion.p>
            </motion.div>

            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-orange-500" />
                  <label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                    Mobile Number (Secure & Private)
                  </label>
                </div>
                
                <motion.div 
                  className="relative"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 transition-all duration-300 ${
                    isFocused ? 'text-orange-600' : 'text-gray-400'
                  }`}>
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">+91</span>
                    <div className={`w-px h-5 transition-colors duration-300 ${
                      isFocused ? 'bg-orange-300' : 'bg-gray-300'
                    }`}></div>
                  </div>
                  
                  <Input
                    id="mobile"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter your mobile number"
                    className={`pl-24 pr-4 text-lg h-16 border-2 rounded-xl transition-all duration-300 ${
                      isFocused 
                        ? 'border-orange-300 bg-orange-25 ring-4 ring-orange-100' 
                        : isValidMobile 
                        ? 'border-green-300 bg-green-50'
                        : mobileNumber.length > 0 && !isValidMobile
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    required
                  />
                  
                  {/* Input indicator */}
                  {mobileNumber.length > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${
                        isValidMobile ? 'bg-green-500 text-white' : 'bg-gray-300'
                      }`}
                    >
                      {isValidMobile ? '✓' : mobileNumber.length}
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Enhanced error message */}
                {mobileNumber.length > 0 && !isValidMobile && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 mt-2 flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    Please enter a valid 10-digit mobile number
                  </motion.p>
                )}
                
                {/* Progress indicator */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{mobileNumber.length}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <motion.div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        isValidMobile ? 'bg-green-500' : 'bg-orange-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(mobileNumber.length / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 h-16 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={!isValidMobile || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Checking your number...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span>Continue to KalaKriti</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </motion.div>
            </motion.form>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 grid grid-cols-3 gap-4 text-center"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs text-gray-600 font-medium">Secure</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-xs text-gray-600 font-medium">Trusted</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-gray-600 font-medium">Community</span>
              </div>
            </motion.div>

            {/* Terms and Privacy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 text-center text-sm text-gray-600 leading-relaxed"
            >
              By continuing, you join our artisan community and agree to{' '}
              <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors">
                Privacy Policy
              </a>
            </motion.div>

            {/* Enhanced community stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-6 text-center"
            >
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">Trusted by 2000+ artisans</span>
                  <Sparkles className="w-4 h-4 text-orange-500" />
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              </div>
            </motion.div>

            {/* Demo tip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-4 text-center text-xs text-gray-500 bg-gray-50 rounded-lg p-3"
            >
              📱 Demo: Try numbers 9876543210 (returning user) or any new number
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
import { useState } from 'react';
import { ArrowRight, User, ShoppingBag, Hammer, ChevronDown, Sparkles, Heart, Palette, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { motion, AnimatePresence } from 'motion/react';

interface NewUserSignupProps {
  mobileNumber: string;
  onSendOTP: (userData: NewUserData) => void;
  onBack: () => void;
}

export interface NewUserData {
  mobileNumber: string;
  fullName: string;
  userType: 'buyer' | 'artisan';
  primaryCraft?: string;
}

const craftOptions = [
  'Pottery & Ceramics',
  'Handwoven Textiles',
  'Wood Carving',
  'Metal Crafts',
  'Jewelry & Accessories',
  'Embroidery (Chikankari)',
  'Zardozi Work',
  'Block Printing',
  'Leather Craft',
  'Paper Craft',
  'Bamboo Craft',
  'Stone Carving',
  'Glass Work',
  'Miniature Painting',
  'Other Traditional Crafts'
];

export function NewUserSignup({ mobileNumber, onSendOTP, onBack }: NewUserSignupProps) {
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'buyer' | 'artisan'>('buyer');
  const [primaryCraft, setPrimaryCraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const validateName = (name: string) => {
    if (!name.trim()) {
      setNameError('Name is required');
      return false;
    }
    if (name.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      setNameError('Name should only contain letters and spaces');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateName(fullName)) return;
    if (userType === 'artisan' && !primaryCraft) return;

    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    const userData: NewUserData = {
      mobileNumber,
      fullName: fullName.trim(),
      userType,
      ...(userType === 'artisan' && { primaryCraft })
    };

    onSendOTP(userData);
  };

  const isFormValid = fullName.trim() && (userType === 'buyer' || (userType === 'artisan' && primaryCraft));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-6 -left-6 w-24 h-24 bg-orange-200 rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 10, 0],
            y: [0, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/4 -right-8 w-32 h-32 bg-amber-200 rounded-full opacity-20"
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute -bottom-4 left-1/4 w-20 h-20 bg-rose-200 rounded-full opacity-20"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Enhanced header */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-white text-xl font-bold">K</span>
                </motion.div>
                <div className="text-left">
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    KalaKriti
                  </span>
                  <p className="text-xs text-gray-500 mt-1">आपकी कलात्मक यात्रा शुरू करें</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  Join Our Artisan Family
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Creating your KalaKriti profile for{' '}
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium text-sm">
                    📱 +91 {mobileNumber}
                  </span>
                </p>
              </motion.div>

              {/* Progress indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <div className="flex items-center justify-center gap-2">
                  {[0, 1, 2].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        step <= currentStep ? 'bg-orange-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Step {currentStep + 1} of 3</p>
              </motion.div>
            </motion.div>

            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    What should we call you?
                  </label>
                </div>
                <div className="relative">
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (e.target.value.trim()) {
                        validateName(e.target.value);
                        setCurrentStep(1);
                      } else {
                        setCurrentStep(0);
                      }
                    }}
                    placeholder="Enter your full name"
                    className={`pl-12 pr-4 h-14 text-lg border-2 rounded-xl transition-all duration-300 ${
                      nameError 
                        ? 'border-red-300 bg-red-50' 
                        : fullName.trim() && !nameError
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-white focus:border-orange-300'
                    }`}
                    required
                  />
                  <User className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  
                  {fullName.trim() && !nameError && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-sm">✓</span>
                    </motion.div>
                  )}
                </div>
                
                <AnimatePresence>
                  {nameError && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-red-600 mt-2 flex items-center gap-1"
                    >
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {nameError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* User Type Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-4 h-4 text-orange-500" />
                  <label className="text-sm font-medium text-gray-700">
                    Choose your KalaKriti journey:
                  </label>
                </div>
                
                <RadioGroup 
                  value={userType} 
                  onValueChange={(value) => {
                    setUserType(value as 'buyer' | 'artisan');
                    setCurrentStep(2);
                  }}
                >
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                        userType === 'buyer' 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-3 p-5">
                        <RadioGroupItem value="buyer" id="buyer" className="text-blue-600" />
                        <Label htmlFor="buyer" className="flex items-center gap-4 cursor-pointer flex-1">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            userType === 'buyer' ? 'bg-blue-200' : 'bg-blue-100'
                          }`}>
                            <ShoppingBag className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-lg">🛍️ Art Enthusiast</div>
                            <div className="text-sm text-gray-600">Discover and buy authentic handcrafted treasures</div>
                          </div>
                        </Label>
                      </div>
                      {userType === 'buyer' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="border-t border-blue-200 bg-blue-25 p-3"
                        >
                          <p className="text-xs text-blue-700">
                            Join thousands of art lovers supporting local artisans
                          </p>
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                        userType === 'artisan' 
                          ? 'border-orange-500 bg-orange-50 shadow-lg' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center space-x-3 p-5">
                        <RadioGroupItem value="artisan" id="artisan" className="text-orange-600" />
                        <Label htmlFor="artisan" className="flex items-center gap-4 cursor-pointer flex-1">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            userType === 'artisan' ? 'bg-orange-200' : 'bg-orange-100'
                          }`}>
                            <Palette className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <div className="font-medium text-lg">🎨 Master Artisan</div>
                            <div className="text-sm text-gray-600">Share your craft with the world and build your business</div>
                          </div>
                        </Label>
                      </div>
                      {userType === 'artisan' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="border-t border-orange-200 bg-orange-25 p-3"
                        >
                          <p className="text-xs text-orange-700">
                            Get AI-powered tools, training, and global market access
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </RadioGroup>
              </motion.div>

              {/* Craft Selection for Artisans */}
              <AnimatePresence>
                {userType === 'artisan' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Hammer className="w-4 h-4 text-orange-500" />
                      <label htmlFor="primaryCraft" className="text-sm font-medium text-gray-700">
                        What's your craft mastery?
                      </label>
                    </div>
                    
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Select value={primaryCraft} onValueChange={setPrimaryCraft}>
                        <SelectTrigger className={`h-14 border-2 rounded-xl transition-all duration-300 ${
                          primaryCraft 
                            ? 'border-orange-300 bg-orange-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <SelectValue placeholder="Choose your traditional craft specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {craftOptions.map((craft) => (
                            <SelectItem key={craft} value={craft} className="py-3">
                              <div className="flex items-center gap-2">
                                <span className="text-orange-600">🎨</span>
                                {craft}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                    
                    {primaryCraft && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
                      >
                        <p className="text-sm text-orange-700 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Great choice! We'll help you showcase your {primaryCraft.toLowerCase()} expertise.
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onBack}
                    className="w-full h-14 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Change Number
                  </Button>
                </motion.div>
                
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={!isFormValid || isLoading}
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating your account...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <span>Join KalaKriti</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </motion.form>

            {/* Terms and Privacy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 text-center text-sm text-gray-600 leading-relaxed"
            >
              By joining, you become part of India's largest artisan community and agree to{' '}
              <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors">
                Privacy Policy
              </a>
            </motion.div>

            {/* Motivation message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-4 text-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100"
            >
              <div className="flex items-center justify-center gap-2 text-orange-700">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {userType === 'artisan' 
                    ? "Ready to share your craft with the world?" 
                    : "Excited to discover authentic handmade treasures?"
                  }
                </span>
                <Sparkles className="w-4 h-4" />
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
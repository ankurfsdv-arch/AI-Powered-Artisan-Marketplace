import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Phone, RefreshCw, Shield, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { NewUserData } from './NewUserSignup';
import { motion, AnimatePresence } from 'motion/react';

interface OTPVerificationProps {
  mobileNumber: string;
  isNewUser: boolean;
  userData?: NewUserData;
  onVerify: (otp: string) => void;
  onBack: () => void;
  onResendOTP: () => void;
}

export function OTPVerification({ 
  mobileNumber, 
  isNewUser, 
  userData, 
  onVerify, 
  onBack, 
  onResendOTP 
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple digits
    
    // Clear any previous errors
    setOtpError(null);
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    } else if (!value && index > 0) {
      setFocusedIndex(index);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length === 6) {
      setIsLoading(true);
      setOtpError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if OTP is correct (simulate backend validation)
      if (otpString === '123456' || otpString === '000000') {
        setShowSuccess(true);
        setTimeout(() => {
          setIsLoading(false);
          onVerify(otpString);
        }, 1500);
      } else {
        setIsLoading(false);
        setOtpError('Invalid OTP. Please check and try again.');
        // Clear OTP and focus first input
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        setFocusedIndex(0);
      }
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setResendTimer(30);
    setOtp(['', '', '', '', '', '']);
    setOtpError(null);
    inputRefs.current[0]?.focus();
    setFocusedIndex(0);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onResendOTP();
  };

  const isOTPComplete = otp.every(digit => digit !== '');
  const maskedNumber = `+91 ${mobileNumber.slice(0, 2)}${'*'.repeat(6)}${mobileNumber.slice(-2)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 -right-8 w-32 h-32 bg-amber-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/4 w-20 h-20 bg-rose-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        
        {/* Traditional pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="fill-current text-orange-900">
            <defs>
              <pattern id="mandala" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="60" cy="60" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mandala)"/>
          </svg>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Brand Header */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-white text-xl font-bold">K</span>
                </motion.div>
                <div className="text-left">
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    KalaKriti
                  </span>
                  <p className="text-xs text-gray-500 mt-1">हस्तशिल्प की दुनिया</p>
                </div>
              </div>

              {/* Status Icon */}
              <motion.div 
                className="relative mx-auto mb-6 w-20 h-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="phone"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-600/20 rounded-full animate-ping"></div>
                      <Shield className="w-10 h-10 text-orange-600 relative z-10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Title and Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  {showSuccess ? 'Verification Successful!' : 
                   isNewUser ? 'Complete Your Journey' : 'Welcome Back!'}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {showSuccess ? 'Redirecting you to KalaKriti...' :
                   isNewUser 
                     ? `Your artisan journey begins with verifying ${maskedNumber}`
                     : `Enter the OTP sent to ${maskedNumber}`
                  }
                </p>
              </motion.div>
            </motion.div>

            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <label className="text-sm font-medium text-gray-700 text-center">
                    Enter 6-digit OTP
                  </label>
                  <Sparkles className="w-4 h-4 text-orange-500" />
                </div>
                
                <div className="flex gap-3 justify-center mb-4">
                  {otp.map((digit, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileFocus={{ scale: 1.05 }}
                    >
                      <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        onFocus={() => setFocusedIndex(index)}
                        onBlur={() => setFocusedIndex(null)}
                        className={`w-14 h-16 text-center text-xl font-bold border-2 rounded-xl transition-all duration-300 ${
                          digit 
                            ? 'border-orange-500 bg-orange-50 text-orange-900 shadow-md' 
                            : focusedIndex === index
                            ? 'border-orange-400 bg-orange-25 shadow-lg ring-4 ring-orange-100'
                            : otpError
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        } focus:outline-none`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {otpError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 text-red-600 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {otpError}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-center">
                <AnimatePresence mode="wait">
                  {canResend ? (
                    <motion.div
                      key="resend-button"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleResend}
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-all duration-300"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resend OTP
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="timer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-gray-600"
                    >
                      Resend OTP in{' '}
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 rounded-full font-bold text-xs mx-1">
                        {resendTimer}
                      </span>
                      seconds
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-4">
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
                    {isNewUser ? 'Back' : 'Change Number'}
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
                    disabled={!isOTPComplete || isLoading || showSuccess}
                  >
                    <AnimatePresence mode="wait">
                      {showSuccess ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Success!
                        </motion.div>
                      ) : isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Verifying...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          {isNewUser ? 'Join KalaKriti' : 'Welcome Back'}
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </motion.form>

            {/* User Details Preview */}
            {isNewUser && userData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <h3 className="font-medium text-gray-900">Your KalaKriti Profile</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-gray-900">{userData.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Journey as:</span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {userData.userType === 'buyer' ? '🛍️ Art Lover' : '🎨 Artisan'}
                    </span>
                  </div>
                  {userData.primaryCraft && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Craft:</span>
                      <span className="font-medium text-orange-700">{userData.primaryCraft}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Terms and Privacy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 text-center text-sm text-gray-600 leading-relaxed"
            >
              By verifying, you join our community and agree to KalaKriti's{' '}
              <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-orange-600 hover:text-orange-700 hover:underline font-medium transition-colors">
                Privacy Policy
              </a>
            </motion.div>

            {/* Help Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-4 text-center text-xs text-gray-500"
            >
              📱 Tip: Use test OTP "123456" or "000000" for demo
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
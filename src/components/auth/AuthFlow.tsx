import { useState } from 'react';
import { MobileEntry } from './MobileEntry';
import { NewUserSignup, NewUserData } from './NewUserSignup';
import { OTPVerification } from './OTPVerification';
import { UserTypeSelection } from './UserTypeSelection';
import { toast } from 'sonner@2.0.3';

type AuthStep = 'user-type-selection' | 'mobile-entry' | 'new-user-signup' | 'otp-verification';

interface AuthFlowProps {
  onAuthSuccess: (userData: AuthenticatedUser) => void;
}

export interface AuthenticatedUser {
  id: string;
  mobileNumber: string;
  fullName: string;
  userType: 'buyer' | 'artisan';
  primaryCraft?: string;
  isNewUser: boolean;
}

// Simulated database of existing users
const existingUsers = [
  { 
    id: '1', 
    mobileNumber: '9876543210', 
    fullName: 'Priya Sharma', 
    userType: 'artisan' as const,
    primaryCraft: 'Pottery & Ceramics'
  },
  { 
    id: '2', 
    mobileNumber: '9123456789', 
    fullName: 'Rajesh Kumar', 
    userType: 'buyer' as const
  }
];

export function AuthFlow({ onAuthSuccess }: AuthFlowProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>('user-type-selection');
  const [userType, setUserType] = useState<'customer' | 'artisan' | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [newUserData, setNewUserData] = useState<NewUserData | null>(null);
  const [existingUser, setExistingUser] = useState<AuthenticatedUser | null>(null);

  // Simulate backend check for existing user
  const checkUserExists = (mobile: string): boolean => {
    return existingUsers.some(user => user.mobileNumber === mobile);
  };

  const handleUserTypeSelect = (selectedUserType: 'customer' | 'artisan') => {
    setUserType(selectedUserType);
    setCurrentStep('mobile-entry');
  };

  const handleMobileContinue = (mobile: string) => {
    setMobileNumber(mobile);
    const userExists = checkUserExists(mobile);
    
    if (userExists) {
      // Existing user - go directly to OTP
      const user = existingUsers.find(u => u.mobileNumber === mobile);
      if (user) {
        setExistingUser({
          ...user,
          isNewUser: false
        });
        setIsNewUser(false);
        setCurrentStep('otp-verification');
        toast.success('OTP sent to your mobile number');
      }
    } else {
      // New user - show signup form
      setIsNewUser(true);
      setCurrentStep('new-user-signup');
    }
  };

  const handleNewUserSignup = (userData: NewUserData) => {
    setNewUserData(userData);
    setCurrentStep('otp-verification');
    toast.success('OTP sent to your mobile number');
  };

  const handleOTPVerify = (otp: string) => {
    // Simulate OTP verification (in real app, this would be verified on backend)
    if (otp === '123456' || otp === '000000') {
      if (isNewUser && newUserData) {
        // Create new user
        const newUser: AuthenticatedUser = {
          id: Date.now().toString(),
          mobileNumber: newUserData.mobileNumber,
          fullName: newUserData.fullName,
          userType: newUserData.userType,
          primaryCraft: newUserData.primaryCraft,
          isNewUser: true
        };
        
        toast.success(`Welcome to KalaKriti, ${newUser.fullName}!`);
        onAuthSuccess(newUser);
      } else if (existingUser) {
        // Login existing user
        toast.success(`Welcome back, ${existingUser.fullName}!`);
        onAuthSuccess(existingUser);
      }
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const handleResendOTP = () => {
    toast.success('OTP sent again to your mobile number');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'mobile-entry':
        setCurrentStep('user-type-selection');
        setUserType(null);
        break;
      case 'new-user-signup':
        setCurrentStep('mobile-entry');
        setMobileNumber('');
        break;
      case 'otp-verification':
        if (isNewUser) {
          setCurrentStep('new-user-signup');
        } else {
          setCurrentStep('mobile-entry');
          setMobileNumber('');
        }
        break;
    }
  };

  switch (currentStep) {
    case 'user-type-selection':
      return <UserTypeSelection onUserTypeSelect={handleUserTypeSelect} />;
    
    case 'mobile-entry':
      return <MobileEntry onContinue={handleMobileContinue} onBack={handleBack} />;
    
    case 'new-user-signup':
      return (
        <NewUserSignup 
          mobileNumber={mobileNumber}
          onSendOTP={handleNewUserSignup}
          onBack={handleBack}
        />
      );
    
    case 'otp-verification':
      return (
        <OTPVerification 
          mobileNumber={mobileNumber}
          isNewUser={isNewUser}
          userData={newUserData || undefined}
          onVerify={handleOTPVerify}
          onBack={handleBack}
          onResendOTP={handleResendOTP}
        />
      );
    
    default:
      return <MobileEntry onContinue={handleMobileContinue} />;
  }
}
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../components/AppIcon';
import PhoneInput from './components/PhoneInput';
import OTPInput from './components/OTPInput';
import SuccessMessage from './components/SuccessMessage';

const AuthenticationModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'success'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  // Handle escape key and background click
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleClose = () => {
    const from = location.state?.from || '/';
    navigate(from);
  };

  const handlePhoneSubmit = async (phone) => {
    setError('');
    setIsLoading(true);
    setPhoneNumber(phone);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation - all valid Indian numbers work
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        throw new Error(currentLanguage === 'hi' ? 'अवैध फोन नंबर' : 'Invalid phone number');
      }

      setStep('otp');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (otp) => {
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Magic OTP for demo
      if (otp !== '123456') {
        throw new Error(currentLanguage === 'hi' ? 'गलत OTP। कृपया 123456 का उपयोग करें।' : 'Invalid OTP. Please use 123456 for demo.');
      }

      // Set authentication
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userPhone', phoneNumber);
      localStorage.setItem('authTimestamp', Date.now().toString());

      setStep('success');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setError('');
    setPhoneNumber('');
  };

  const handleSuccess = () => {
    // Redirect to intended page or dashboard
    const from = location.state?.from || '/dashboard';
    navigate(from);
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const content = {
    en: {
      close: "Close"
    },
    hi: {
      close: "बंद करें"
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackgroundClick}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          className="relative w-full max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Modal Card */}
          <div className="glass-card bg-surface/95 backdrop-blur-[25px] border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-sm border border-border hover:bg-surface hover:border-border-secondary transition-all duration-200 spring-transition flex items-center justify-center group touch-target"
                aria-label={text.close}
              >
                <Icon 
                  name="X" 
                  size={20} 
                  className="text-text-secondary group-hover:text-text-primary transition-colors duration-200" 
                />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 pt-12">
              <AnimatePresence mode="wait">
                {step === 'phone' && (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PhoneInput
                      onSubmit={handlePhoneSubmit}
                      isLoading={isLoading}
                      error={error}
                      currentLanguage={currentLanguage}
                    />
                  </motion.div>
                )}

                {step === 'otp' && (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <OTPInput
                      phoneNumber={phoneNumber}
                      onSubmit={handleOTPSubmit}
                      onBack={handleBackToPhone}
                      isLoading={isLoading}
                      error={error}
                      currentLanguage={currentLanguage}
                    />
                  </motion.div>
                )}

                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SuccessMessage
                      onClose={handleSuccess}
                      currentLanguage={currentLanguage}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Background Glow Effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthenticationModal;
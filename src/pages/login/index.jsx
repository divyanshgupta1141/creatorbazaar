import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { authenticateUser, isAuthenticated } from '../../utils/authUtils';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [step, setStep] = useState('phone'); // phone, otp, success
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpInputRefs = React.useRef([]);

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (isAuthenticated()) {
      navigate('/dashboard');
      return;
    }
    
    // Load language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, [navigate]);

  useEffect(() => {
    // Focus first OTP input when step changes to OTP
    if (step === 'otp' && otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, [step]);

  useEffect(() => {
    // Countdown timer for OTP resend
    if (timeLeft > 0 && step === 'otp') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, step]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    
    if (phoneNumber.length !== 10) {
      setError(currentLanguage === 'hi' 
        ? 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें'
        : 'Please enter a 10-digit mobile number');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, any valid 10-digit number works
      if (/^[6-9]\d{9}$/.test(phoneNumber)) {
        setStep('otp');
        setTimeLeft(30);
        setCanResend(false);
      } else {
        throw new Error(currentLanguage === 'hi'
          ? 'अमान्य फोन नंबर। कृपया भारतीय मोबाइल नंबर दर्ज करें।'
          : 'Invalid phone number. Please enter an Indian mobile number.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleOtpSubmit();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length === 0) return;
    
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus appropriate field
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    if (nextEmptyIndex === -1) {
      otpInputRefs.current[5]?.focus();
      // If all fields are filled, submit OTP
      if (newOtp.every(digit => digit !== '')) {
        setTimeout(() => handleOtpSubmit(), 300);
      }
    } else {
      otpInputRefs.current[nextEmptyIndex]?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError(currentLanguage === 'hi'
        ? 'कृपया 6 अंकों का OTP दर्ज करें'
        : 'Please enter a 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, 123456 is the valid OTP
      if (otpValue === '123456') {
        // Authenticate user
        authenticateUser({
          phone: phoneNumber,
          name: 'Demo User',
          email: `user${phoneNumber.slice(-4)}@example.com`
        });
        
        // Redirect to success then dashboard
        setStep('success');
        setTimeout(() => {
          // Redirect to the page user was trying to access, or dashboard
          const from = location.state?.from || '/dashboard';
          navigate(from);
        }, 2000);
      } else {
        throw new Error(currentLanguage === 'hi'
          ? 'गलत OTP। कृपया 123456 का उपयोग करें।'
          : 'Incorrect OTP. Please use 123456 for demo.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    setTimeLeft(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    
    // Focus first input
    otpInputRefs.current[0]?.focus();
    
    // Show success message
    alert(currentLanguage === 'hi'
      ? 'OTP फिर से भेजा गया!'
      : 'OTP resent successfully!');
  };

  const content = {
    en: {
      title: "Welcome to CreatorBazaar",
      subtitle: "Sign in to continue",
      phonePlaceholder: "Enter 10-digit mobile number",
      sendOtp: "Send OTP",
      verifyOtp: "Verify OTP",
      otpTitle: "Enter Verification Code",
      otpSubtitle: "We've sent a 6-digit code to +91 ",
      resend: "Resend OTP",
      resendIn: "Resend in",
      seconds: "seconds",
      back: "Change Number",
      otpHint: "Demo OTP: 123456",
      successTitle: "Welcome Back!",
      successSubtitle: "You've successfully logged in",
      redirecting: "Redirecting to dashboard..."
    },
    hi: {
      title: "CreatorBazaar में आपका स्वागत है",
      subtitle: "जारी रखने के लिए साइन इन करें",
      phonePlaceholder: "10 अंकों का मोबाइल नंबर दर्ज करें",
      sendOtp: "OTP भेजें",
      verifyOtp: "OTP सत्यापित करें",
      otpTitle: "सत्यापन कोड दर्ज करें",
      otpSubtitle: "हमने +91 पर 6 अंकों का कोड भेजा है",
      resend: "OTP पुनः भेजें",
      resendIn: "पुनः भेजें",
      seconds: "सेकंड में",
      back: "नंबर बदलें",
      otpHint: "डेमो OTP: 123456",
      successTitle: "वापसी पर स्वागत है!",
      successSubtitle: "आप सफलतापूर्वक लॉग इन हो गए हैं",
      redirecting: "डैशबोर्ड पर रीडायरेक्ट कर रहे हैं..."
    }
  };

  const text = content[currentLanguage];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-secondary to-accent">
      <Helmet>
        <title>{text.title} - CreatorBazaar</title>
      </Helmet>
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-highlight rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Main Container */}
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glass Card */}
        <div className="bg-white/10 backdrop-blur-[20px] border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Logo & Header */}
          <div className="pt-8 pb-6 px-6 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-1">{text.title}</h2>
            <p className="text-white/80">{text.subtitle}</p>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 'phone' && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handlePhoneSubmit} className="space-y-6">
                    <div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
                          <div className="w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-blue-900 flex items-center justify-center">
                              <div className="w-1 h-1 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <span className="text-white font-medium text-sm">+91</span>
                          <div className="w-px h-4 bg-white/30"></div>
                        </div>
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setPhoneNumber(value);
                            setError('');
                          }}
                          placeholder={text.phonePlaceholder}
                          className="pl-20 pr-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-white/60 focus:ring-white focus:border-white min-h-[50px]"
                          required
                        />
                      </div>
                      
                      {error && (
                        <div className="mt-2 flex items-center space-x-2 text-white/90">
                          <Icon name="AlertCircle" size={16} />
                          <span className="text-sm">{error}</span>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      loading={isLoading}
                      className="bg-gradient-to-r from-[#003366] to-[#00B4C6] text-white py-3 text-lg font-semibold hover:shadow-lg transition-shadow min-h-[50px]"
                    >
                      {text.sendOtp}
                    </Button>
                  </form>
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
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{text.otpTitle}</h3>
                    <p className="text-white/80">{text.otpSubtitle} {phoneNumber}</p>
                  </div>

                  <div className="mb-6">
                    {/* OTP Input Grid */}
                    <div className="flex justify-between mb-4" onPaste={handlePaste}>
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpInputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          maxLength={1}
                          className={`w-12 h-12 text-center text-xl font-bold bg-white/10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent transition-all duration-200 ${
                            digit 
                              ? 'border-highlight text-white' 
                              : 'border-white/30 text-white'
                          } ${error ? 'border-red-500' : ''}`}
                        />
                      ))}
                    </div>

                    {/* Demo Hint */}
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg">
                        <Icon name="Info" size={16} className="text-white" />
                        <span className="text-white text-sm font-medium">{text.otpHint}</span>
                      </div>
                    </div>

                    {error && (
                      <div className="mt-3 flex items-center justify-center space-x-2 text-red-300">
                        <Icon name="AlertCircle" size={16} />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant="primary"
                      fullWidth
                      disabled={otp.some(digit => digit === '') || isLoading}
                      loading={isLoading}
                      onClick={handleOtpSubmit}
                      className="bg-gradient-to-r from-[#003366] to-[#00B4C6] text-white py-3 text-lg font-semibold hover:shadow-lg transition-shadow min-h-[50px]"
                    >
                      {text.verifyOtp}
                    </Button>

                    <div className="flex flex-col items-center space-y-3">
                      {/* Resend OTP */}
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-white hover:text-highlight font-medium transition-colors"
                        >
                          {text.resend}
                        </button>
                      ) : (
                        <p className="text-white/60">
                          {text.resendIn} {timeLeft} {text.seconds}
                        </p>
                      )}

                      {/* Back Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setStep('phone');
                          setError('');
                        }}
                        className="flex items-center space-x-1 text-white/60 hover:text-white"
                      >
                        <Icon name="ArrowLeft" size={14} />
                        <span>{text.back}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-gradient-to-br from-highlight to-success rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Icon name="CheckCircle" size={32} color="white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{text.successTitle}</h3>
                  <p className="text-white/80 mb-4">{text.successSubtitle}</p>
                  <p className="text-white/60 text-sm">{text.redirecting}</p>

                  {/* Loading indicator */}
                  <div className="flex justify-center mt-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Platform Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: 'Upload', label: currentLanguage === 'hi' ? 'तुरंत अपलोड' : 'Instant Upload' },
            { icon: 'Zap', label: currentLanguage === 'hi' ? '0% फीस (बीटा)' : '0% Fees (Beta)' },
            { icon: 'Shield', label: currentLanguage === 'hi' ? 'सुरक्षित भुगतान' : 'Secure Payments' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mb-2">
                  <Icon name={feature.icon} size={16} color="white" />
                </div>
                <span className="text-white text-xs">{feature.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
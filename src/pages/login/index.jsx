import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const LoginPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = currentLanguage === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = currentLanguage === 'hi' ? 'वैध ईमेल दर्ज करें' : 'Enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('authTimestamp', Date.now().toString());
      
      navigate('/creator-dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', 'user@gmail.com');
    localStorage.setItem('authTimestamp', Date.now().toString());
    navigate('/creator-dashboard');
  };

  const content = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to your CreatorBazaar account",
      email: "Email Address",
      password: "Password",
      login: "Sign In",
      google: "Continue with Google",
      forgot: "Forgot Password?",
      noAccount: "Don't have an account?",
      signup: "Sign up here",
      or: "or"
    },
    hi: {
      title: "वापस स्वागत है",
      subtitle: "अपने CreatorBazaar खाते में साइन इन करें",
      email: "ईमेल पता",
      password: "पासवर्ड",
      login: "साइन इन करें",
      google: "Google के साथ जारी रखें",
      forgot: "पासवर्ड भूल गए?",
      noAccount: "खाता नहीं है?",
      signup: "यहाँ साइन अप करें",
      or: "या"
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <>
      <Helmet>
        <title>{text.title} - CreatorBazaar</title>
        <meta name="description" content={text.subtitle} />
      </Helmet>

      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header />
        
        <main className="pt-20 pb-20 md:pb-8">
          <div className="container-responsive">
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-surface rounded-2xl shadow-lg border border-border p-8 transition-colors duration-300"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="LogIn" size={32} color="white" strokeWidth={2} />
                  </div>
                  <h1 className="text-2xl font-bold text-primary mb-2">{text.title}</h1>
                  <p className="text-text-secondary">{text.subtitle}</p>
                </div>

                {/* Google Login */}
                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
                  iconName="Chrome"
                  iconPosition="left"
                  fullWidth
                  className="mb-6"
                >
                  {text.google}
                </Button>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-surface text-text-secondary">{text.or}</span>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {text.email}
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className={errors.email ? 'border-error focus:ring-error' : ''}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {text.password}
                    </label>
                    <Input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      className={errors.password ? 'border-error focus:ring-error' : ''}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.password}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-text-secondary">
                        {currentLanguage === 'hi' ? 'मुझे याद रखें' : 'Remember me'}
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-primary-600 font-medium"
                    >
                      {text.forgot}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    fullWidth
                    className="py-3"
                  >
                    {text.login}
                  </Button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-text-secondary">
                    {text.noAccount}{' '}
                    <Link
                      to="/signup"
                      className="text-primary hover:text-primary-600 font-medium"
                    >
                      {text.signup}
                    </Link>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <MobileNavigation />
      </div>
    </>
  );
};

export default LoginPage;
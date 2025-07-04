import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SignupPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
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

    if (!formData.name.trim()) {
      newErrors.name = currentLanguage === 'hi' ? 'नाम आवश्यक है' : 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = currentLanguage === 'hi' ? 'नाम कम से कम 2 अक्षर का होना चाहिए' : 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = currentLanguage === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = currentLanguage === 'hi' ? 'वैध ईमेल दर्ज करें' : 'Enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए' : 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = currentLanguage === 'hi' ? 'पासवर्ड मेल नहीं खाते' : 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = currentLanguage === 'hi' ? 'नियम और शर्तों से सहमति आवश्यक है' : 'You must agree to the terms and conditions';
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('authTimestamp', Date.now().toString());
      
      navigate('/creator-dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Mock Google signup
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', 'user@gmail.com');
    localStorage.setItem('userName', 'Google User');
    localStorage.setItem('authTimestamp', Date.now().toString());
    navigate('/creator-dashboard');
  };

  const content = {
    en: {
      title: "Join CreatorBazaar",
      subtitle: "Start selling your digital products today",
      name: "Full Name",
      email: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      signup: "Create Account",
      google: "Continue with Google",
      terms: "I agree to the Terms of Service and Privacy Policy",
      hasAccount: "Already have an account?",
      login: "Sign in here",
      or: "or"
    },
    hi: {
      title: "CreatorBazaar में शामिल हों",
      subtitle: "आज ही अपने डिजिटल उत्पाद बेचना शुरू करें",
      name: "पूरा नाम",
      email: "ईमेल पता",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      signup: "खाता बनाएं",
      google: "Google के साथ जारी रखें",
      terms: "मैं नियम और शर्तों और गोपनीयता नीति से सहमत हूं",
      hasAccount: "पहले से खाता है?",
      login: "यहाँ साइन इन करें",
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

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-20 md:pb-8">
          <div className="container-responsive">
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-surface rounded-2xl shadow-lg border border-border p-8"
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="UserPlus" size={32} color="white" strokeWidth={2} />
                  </div>
                  <h1 className="text-2xl font-bold text-primary mb-2">{text.title}</h1>
                  <p className="text-text-secondary">{text.subtitle}</p>
                </div>

                {/* Google Signup */}
                <Button
                  variant="outline"
                  onClick={handleGoogleSignup}
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

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {text.name}
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={currentLanguage === 'hi' ? 'आपका नाम' : 'Your name'}
                      className={errors.name ? 'border-error focus:ring-error' : ''}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

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

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      {text.confirmPassword}
                    </label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      className={errors.confirmPassword ? 'border-error focus:ring-error' : ''}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.confirmPassword}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="mt-1 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary">
                        {text.terms.split(' ').map((word, index) => {
                          if (word === 'Terms' || word === 'Service' || word === 'Privacy' || word === 'Policy' || 
                              word === 'नियम' || word === 'शर्तों' || word === 'गोपनीयता' || word === 'नीति') {
                            return (
                              <Link
                                key={index}
                                to={word.includes('Privacy') || word === 'गोपनीयता' ? '/privacy' : '/terms'}
                                className="text-primary hover:text-primary-600 font-medium"
                              >
                                {word}{' '}
                              </Link>
                            );
                          }
                          return word + ' ';
                        })}
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.agreeToTerms}</span>
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    fullWidth
                    className="py-3"
                  >
                    {text.signup}
                  </Button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-text-secondary">
                    {text.hasAccount}{' '}
                    <Link
                      to="/login"
                      className="text-primary hover:text-primary-600 font-medium"
                    >
                      {text.login}
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

export default SignupPage;
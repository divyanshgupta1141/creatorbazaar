import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ContactPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    }

    if (!formData.email.trim()) {
      newErrors.email = currentLanguage === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = currentLanguage === 'hi' ? 'वैध ईमेल दर्ज करें' : 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = currentLanguage === 'hi' ? 'विषय आवश्यक है' : 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = currentLanguage === 'hi' ? 'संदेश आवश्यक है' : 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = currentLanguage === 'hi' ? 'संदेश कम से कम 10 अक्षर का होना चाहिए' : 'Message must be at least 10 characters';
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

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'Mail',
      title: currentLanguage === 'hi' ? 'ईमेल' : 'Email',
      value: 'support@creatorbazaar.com',
      description: currentLanguage === 'hi' ? 'हम 24 घंटे में जवाब देते हैं' : 'We reply within 24 hours'
    },
    {
      icon: 'MessageCircle',
      title: currentLanguage === 'hi' ? 'लाइव चैट' : 'Live Chat',
      value: currentLanguage === 'hi' ? 'तुरंत सहायता' : 'Instant Help',
      description: currentLanguage === 'hi' ? 'सोमवार से शुक्रवार, 9 AM - 6 PM' : 'Monday to Friday, 9 AM - 6 PM'
    },
    {
      icon: 'HelpCircle',
      title: currentLanguage === 'hi' ? 'हेल्प सेंटर' : 'Help Center',
      value: currentLanguage === 'hi' ? 'FAQ देखें' : 'Browse FAQs',
      description: currentLanguage === 'hi' ? 'सामान्य प्रश्नों के उत्तर' : 'Answers to common questions'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - CreatorBazaar</title>
        <meta name="description" content="Get in touch with CreatorBazaar. We're here to help with any questions or support you need." />
      </Helmet>

      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header />
        
        <main className="pt-20 pb-20 md:pb-8">
          <div className="container-responsive">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="MessageSquare" size={32} color="white" strokeWidth={2} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {currentLanguage === 'hi' ? 'संपर्क करें' : 'Contact Us'}
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                {currentLanguage === 'hi'
                  ? 'हमसे संपर्क करें। हम आपकी मदद के लिए यहाँ हैं।'
                  : 'Get in touch with us. We\'re here to help you succeed.'
                }
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {isSubmitted ? (
                  <div className="bg-surface rounded-2xl p-8 border border-border text-center">
                    <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="CheckCircle" size={32} className="text-success" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      {currentLanguage === 'hi' ? 'संदेश भेजा गया!' : 'Message Sent!'}
                    </h2>
                    <p className="text-text-secondary mb-6">
                      {currentLanguage === 'hi'
                        ? 'धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।'
                        : 'Thank you! We\'ll get back to you soon.'
                      }
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      {currentLanguage === 'hi' ? 'नया संदेश भेजें' : 'Send Another Message'}
                    </Button>
                  </div>
                ) : (
                  <div className="bg-surface rounded-2xl p-8 border border-border">
                    <h2 className="text-2xl font-bold text-primary mb-6">
                      {currentLanguage === 'hi' ? 'हमें संदेश भेजें' : 'Send us a message'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            {currentLanguage === 'hi' ? 'नाम' : 'Name'} *
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
                            {currentLanguage === 'hi' ? 'ईमेल' : 'Email'} *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder={currentLanguage === 'hi' ? 'आपका ईमेल' : 'Your email'}
                            className={errors.email ? 'border-error focus:ring-error' : ''}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-error flex items-center space-x-1">
                              <Icon name="AlertCircle" size={14} />
                              <span>{errors.email}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          {currentLanguage === 'hi' ? 'विषय' : 'Subject'} *
                        </label>
                        <Input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder={currentLanguage === 'hi' ? 'संदेश का विषय' : 'Message subject'}
                          className={errors.subject ? 'border-error focus:ring-error' : ''}
                        />
                        {errors.subject && (
                          <p className="mt-1 text-sm text-error flex items-center space-x-1">
                            <Icon name="AlertCircle" size={14} />
                            <span>{errors.subject}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          {currentLanguage === 'hi' ? 'संदेश' : 'Message'} *
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder={currentLanguage === 'hi' ? 'अपना संदेश यहाँ लिखें...' : 'Write your message here...'}
                          rows={6}
                          className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.message 
                              ? 'border-error focus:ring-error' 
                              : 'border-border focus:ring-primary focus:border-primary'
                          }`}
                        />
                        {errors.message && (
                          <p className="mt-1 text-sm text-error flex items-center space-x-1">
                            <Icon name="AlertCircle" size={14} />
                            <span>{errors.message}</span>
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        loading={isSubmitting}
                        iconName="Send"
                        iconPosition="right"
                        fullWidth
                        className="py-3 text-lg font-semibold"
                      >
                        {isSubmitting 
                          ? (currentLanguage === 'hi' ? 'भेजा जा रहा है...' : 'Sending...')
                          : (currentLanguage === 'hi' ? 'संदेश भेजें' : 'Send Message')
                        }
                      </Button>
                    </form>
                  </div>
                )}
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    {currentLanguage === 'hi' ? 'अन्य तरीके' : 'Other ways to reach us'}
                  </h2>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="bg-surface rounded-xl p-6 border border-border hover:border-primary-300 transition-colors duration-200">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name={info.icon} size={24} className="text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary mb-1">{info.title}</h3>
                            <p className="text-text-primary font-medium mb-1">{info.value}</p>
                            <p className="text-text-secondary text-sm">{info.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
                  <h3 className="font-semibold text-primary mb-4 flex items-center space-x-2">
                    <Icon name="Lightbulb" size={20} />
                    <span>{currentLanguage === 'hi' ? 'त्वरित सुझाव' : 'Quick Tips'}</span>
                  </h3>
                  <ul className="space-y-2 text-sm text-primary">
                    <li className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>
                        {currentLanguage === 'hi' 
                          ? 'तकनीकी समस्याओं के लिए स्क्रीनशॉट शामिल करें'
                          : 'Include screenshots for technical issues'
                        }
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>
                        {currentLanguage === 'hi' 
                          ? 'अपना प्रश्न जितना विस्तार से हो सके बताएं'
                          : 'Be as detailed as possible with your question'
                        }
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>
                        {currentLanguage === 'hi' 
                          ? 'हेल्प सेंटर में पहले से उत्तर मिल सकते हैं'
                          : 'Check our Help Center for instant answers'
                        }
                      </span>
                    </li>
                  </ul>
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

export default ContactPage;
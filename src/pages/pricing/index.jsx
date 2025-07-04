import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PricingPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const pricingPlans = [
    {
      id: 'starter',
      name: currentLanguage === 'hi' ? 'स्टार्टर' : 'Starter',
      description: currentLanguage === 'hi' ? 'व्यक्तिगत रचनाकारों के लिए' : 'For individual creators',
      price: 0,
      period: currentLanguage === 'hi' ? 'हमेशा के लिए' : 'Forever',
      features: [
        currentLanguage === 'hi' ? 'असीमित उत्पाद अपलोड' : 'Unlimited product uploads',
        currentLanguage === 'hi' ? '0% प्लेटफॉर्म फीस (बीटा)' : '0% platform fee (Beta)',
        currentLanguage === 'hi' ? 'तुरंत UPI भुगतान' : 'Instant UPI payments',
        currentLanguage === 'hi' ? 'बेसिक एनालिटिक्स' : 'Basic analytics',
        currentLanguage === 'hi' ? 'ईमेल सहायता' : 'Email support'
      ],
      popular: true,
      cta: currentLanguage === 'hi' ? 'मुफ्त में शुरू करें' : 'Start Free',
      color: 'from-primary to-accent'
    },
    {
      id: 'pro',
      name: currentLanguage === 'hi' ? 'प्रो' : 'Pro',
      description: currentLanguage === 'hi' ? 'बढ़ते व्यवसायों के लिए' : 'For growing businesses',
      price: 99,
      period: currentLanguage === 'hi' ? 'महीना' : 'month',
      features: [
        currentLanguage === 'hi' ? 'स्टार्टर की सभी सुविधाएं' : 'Everything in Starter',
        currentLanguage === 'hi' ? 'उन्नत एनालिटिक्स' : 'Advanced analytics',
        currentLanguage === 'hi' ? 'कस्टम डोमेन' : 'Custom domain',
        currentLanguage === 'hi' ? 'प्राथमिकता सहायता' : 'Priority support',
        currentLanguage === 'hi' ? 'टीम सहयोग' : 'Team collaboration'
      ],
      popular: false,
      cta: currentLanguage === 'hi' ? 'प्रो चुनें' : 'Choose Pro',
      color: 'from-accent to-highlight'
    },
    {
      id: 'enterprise',
      name: currentLanguage === 'hi' ? 'एंटरप्राइज' : 'Enterprise',
      description: currentLanguage === 'hi' ? 'बड़े संगठनों के लिए' : 'For large organizations',
      price: 'Custom',
      period: '',
      features: [
        currentLanguage === 'hi' ? 'प्रो की सभी सुविधाएं' : 'Everything in Pro',
        currentLanguage === 'hi' ? 'व्हाइट लेबल समाधान' : 'White-label solution',
        currentLanguage === 'hi' ? 'समर्पित खाता प्रबंधक' : 'Dedicated account manager',
        currentLanguage === 'hi' ? 'कस्टम इंटीग्रेशन' : 'Custom integrations',
        currentLanguage === 'hi' ? '24/7 फोन सहायता' : '24/7 phone support'
      ],
      popular: false,
      cta: currentLanguage === 'hi' ? 'संपर्क करें' : 'Contact Us',
      color: 'from-highlight to-secondary'
    }
  ];

  const faqs = [
    {
      question: currentLanguage === 'hi' ? 'क्या वास्तव में कोई प्लेटफॉर्म फीस नहीं है?' : 'Is there really no platform fee?',
      answer: currentLanguage === 'hi' 
        ? 'बीटा अवधि के दौरान, हम 0% प्लेटफॉर्म फीस लेते हैं। आप अपनी 100% कमाई रख सकते हैं।'
        : 'During our beta period, we charge 0% platform fees. You keep 100% of your earnings.'
    },
    {
      question: currentLanguage === 'hi' ? 'मैं कैसे भुगतान प्राप्त करूं?' : 'How do I receive payments?',
      answer: currentLanguage === 'hi'
        ? 'हम UPI, कार्ड और नेट बैंकिंग के माध्यम से तुरंत भुगतान प्रदान करते हैं।'
        : 'We provide instant payments through UPI, cards, and net banking.'
    },
    {
      question: currentLanguage === 'hi' ? 'क्या मैं प्लान बदल सकता हूं?' : 'Can I change my plan?',
      answer: currentLanguage === 'hi'
        ? 'हां, आप किसी भी समय अपना प्लान अपग्रेड या डाउनग्रेड कर सकते हैं।'
        : 'Yes, you can upgrade or downgrade your plan at any time.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing - CreatorBazaar</title>
        <meta name="description" content="Simple, transparent pricing for creators. Start selling with 0% platform fees during beta." />
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
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {currentLanguage === 'hi' ? 'सरल, पारदर्शी मूल्य निर्धारण' : 'Simple, Transparent Pricing'}
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                {currentLanguage === 'hi'
                  ? 'बीटा अवधि के दौरान 0% प्लेटफॉर्म फीस के साथ बेचना शुरू करें'
                  : 'Start selling with 0% platform fees during our beta period'
                }
              </p>
            </motion.div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  className={`relative bg-surface rounded-2xl p-8 border transition-all duration-300 ${
                    plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border hover:border-primary-300'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {currentLanguage === 'hi' ? 'सबसे लोकप्रिय' : 'Most Popular'}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                    <p className="text-text-secondary mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      {typeof plan.price === 'number' ? (
                        <>
                          <span className="text-4xl font-bold text-primary">₹{plan.price}</span>
                          <span className="text-text-secondary ml-2">/{plan.period}</span>
                        </>
                      ) : (
                        <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    fullWidth
                    onClick={() => navigate('/product-upload')}
                    className="py-3 text-lg font-semibold"
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">
                  {currentLanguage === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
                </h2>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-surface rounded-lg p-6 border border-border">
                    <h3 className="font-semibold text-primary mb-2">{faq.question}</h3>
                    <p className="text-text-secondary">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="text-center mt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-4">
                  {currentLanguage === 'hi' ? 'आज ही शुरू करें' : 'Start Today'}
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  {currentLanguage === 'hi'
                    ? 'बीटा में शामिल हों और 0% फीस के साथ बेचना शुरू करें'
                    : 'Join the beta and start selling with 0% fees'
                  }
                </p>
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={() => navigate('/product-upload')}
                  iconName="Rocket"
                  iconPosition="left"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  {currentLanguage === 'hi' ? 'मुफ्त में शुरू करें' : 'Get Started Free'}
                </Button>
              </div>
            </motion.div>
          </div>
        </main>

        <MobileNavigation />
      </div>
    </>
  );
};

export default PricingPage;
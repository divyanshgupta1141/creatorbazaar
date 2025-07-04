import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';

const HelpPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const categories = [
    { id: 'all', label: currentLanguage === 'hi' ? 'सभी' : 'All', icon: 'Grid3x3' },
    { id: 'getting-started', label: currentLanguage === 'hi' ? 'शुरुआत' : 'Getting Started', icon: 'Rocket' },
    { id: 'selling', label: currentLanguage === 'hi' ? 'बेचना' : 'Selling', icon: 'ShoppingCart' },
    { id: 'payments', label: currentLanguage === 'hi' ? 'भुगतान' : 'Payments', icon: 'CreditCard' },
    { id: 'technical', label: currentLanguage === 'hi' ? 'तकनीकी' : 'Technical', icon: 'Settings' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: currentLanguage === 'hi' ? 'CreatorBazaar कैसे शुरू करें?' : 'How to get started with CreatorBazaar?',
      answer: currentLanguage === 'hi'
        ? 'साइन अप करें, अपना पहला उत्पाद अपलोड करें, और तुरंत बेचना शुरू करें। यह बहुत सरल है!'
        : 'Sign up, upload your first product, and start selling immediately. It\'s that simple!'
    },
    {
      id: 2,
      category: 'selling',
      question: currentLanguage === 'hi' ? 'मैं कौन से उत्पाद बेच सकता हूं?' : 'What products can I sell?',
      answer: currentLanguage === 'hi'
        ? 'आप कोई भी डिजिटल उत्पाद बेच सकते हैं जैसे PDF, वीडियो, टेम्प्लेट्स, कोर्स, ई-बुक्स आदि।'
        : 'You can sell any digital products like PDFs, videos, templates, courses, e-books, and more.'
    },
    {
      id: 3,
      category: 'payments',
      question: currentLanguage === 'hi' ? 'मुझे भुगतान कैसे मिलेगा?' : 'How will I receive payments?',
      answer: currentLanguage === 'hi'
        ? 'हम UPI के माध्यम से तुरंत भुगतान प्रदान करते हैं। आप अपना UPI ID सेट करें और तुरंत पैसे प्राप्त करें।'
        : 'We provide instant payments through UPI. Set up your UPI ID and receive money immediately.'
    },
    {
      id: 4,
      category: 'payments',
      question: currentLanguage === 'hi' ? 'प्लेटफॉर्म फीस कितनी है?' : 'What are the platform fees?',
      answer: currentLanguage === 'hi'
        ? 'बीटा अवधि के दौरान 0% प्लेटफॉर्म फीस! आप अपनी 100% कमाई रख सकते हैं।'
        : '0% platform fees during beta! You keep 100% of your earnings.'
    },
    {
      id: 5,
      category: 'technical',
      question: currentLanguage === 'hi' ? 'फ़ाइल अपलोड की सीमा क्या है?' : 'What are the file upload limits?',
      answer: currentLanguage === 'hi'
        ? 'अधिकतम फ़ाइल साइज 100MB है। समर्थित फॉर्मेट: PDF, MP4, ZIP।'
        : 'Maximum file size is 100MB. Supported formats: PDF, MP4, ZIP.'
    },
    {
      id: 6,
      category: 'selling',
      question: currentLanguage === 'hi' ? 'मैं अपने उत्पादों का प्रचार कैसे करूं?' : 'How can I promote my products?',
      answer: currentLanguage === 'hi'
        ? 'शेयर करने योग्य लिंक का उपयोग करें, सोशल मीडिया पर साझा करें, और WhatsApp पर भेजें।'
        : 'Use shareable links, share on social media, and send via WhatsApp.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quickLinks = [
    {
      title: currentLanguage === 'hi' ? 'पहला उत्पाद अपलोड करें' : 'Upload First Product',
      description: currentLanguage === 'hi' ? 'स्टेप-बाई-स्टेप गाइड' : 'Step-by-step guide',
      icon: 'Upload',
      color: 'bg-primary'
    },
    {
      title: currentLanguage === 'hi' ? 'UPI सेटअप करें' : 'Setup UPI',
      description: currentLanguage === 'hi' ? 'भुगतान प्राप्त करने के लिए' : 'To receive payments',
      icon: 'Smartphone',
      color: 'bg-accent'
    },
    {
      title: currentLanguage === 'hi' ? 'बिक्री ट्रैक करें' : 'Track Sales',
      description: currentLanguage === 'hi' ? 'एनालिटिक्स डैशबोर्ड' : 'Analytics dashboard',
      icon: 'BarChart3',
      color: 'bg-secondary'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Help Center - CreatorBazaar</title>
        <meta name="description" content="Get help with CreatorBazaar. Find answers to frequently asked questions." />
      </Helmet>

      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header />
        
        <main className="pt-20 pb-20 md:pb-8">
          <div className="container-responsive">
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="HelpCircle" size={32} color="white" strokeWidth={2} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {currentLanguage === 'hi' ? 'हेल्प सेंटर' : 'Help Center'}
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                {currentLanguage === 'hi'
                  ? 'आपके सवालों के जवाब यहाँ हैं। अगर कुछ और चाहिए तो हमसे संपर्क करें।'
                  : 'Find answers to your questions. Contact us if you need more help.'
                }
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              className="max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <Input
                  type="search"
                  placeholder={currentLanguage === 'hi' ? 'अपना सवाल खोजें...' : 'Search your question...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-4 text-lg"
                />
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {quickLinks.map((link, index) => (
                <div
                  key={index}
                  className={`${link.color} rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform duration-200`}
                >
                  <Icon name={link.icon} size={32} className="mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                  <p className="text-white/80">{link.description}</p>
                </div>
              ))}
            </motion.div>

            {/* Categories */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-surface text-text-secondary hover:text-primary hover:bg-primary-50 border border-border'
                  }`}
                >
                  <Icon name={category.icon} size={16} />
                  <span>{category.label}</span>
                </button>
              ))}
            </motion.div>

            {/* FAQ List */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-surface rounded-lg border border-border overflow-hidden transition-colors duration-300"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-primary-50 transition-colors duration-200"
                    >
                      <span className="font-semibold text-primary">{faq.question}</span>
                      <Icon 
                        name={expandedFaq === faq.id ? "ChevronUp" : "ChevronDown"} 
                        size={20} 
                        className="text-text-secondary"
                      />
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-4">
                        <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-tertiary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {currentLanguage === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No results found'}
                  </h3>
                  <p className="text-text-secondary">
                    {currentLanguage === 'hi' 
                      ? 'अपनी खोज को समायोजित करें या हमसे संपर्क करें'
                      : 'Try adjusting your search or contact us'
                    }
                  </p>
                </div>
              )}
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-surface rounded-2xl p-8 border border-border max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  {currentLanguage === 'hi' ? 'अभी भी मदद चाहिए?' : 'Still need help?'}
                </h2>
                <p className="text-text-secondary mb-6">
                  {currentLanguage === 'hi'
                    ? 'हमारी सहायता टीम आपकी मदद के लिए तैयार है'
                    : 'Our support team is ready to help you'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="Mail" size={16} />
                    <span>support@creatorbazaar.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="Clock" size={16} />
                    <span>{currentLanguage === 'hi' ? '24 घंटे में जवाब' : 'Reply within 24h'}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <MobileNavigation />
      </div>
    </>
  );
};

export default HelpPage;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ExplorePage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

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
    { id: 'courses', label: currentLanguage === 'hi' ? 'कोर्स' : 'Courses', icon: 'BookOpen' },
    { id: 'templates', label: currentLanguage === 'hi' ? 'टेम्प्लेट्स' : 'Templates', icon: 'Layout' },
    { id: 'ebooks', label: currentLanguage === 'hi' ? 'ई-बुक्स' : 'E-books', icon: 'FileText' },
    { id: 'tools', label: currentLanguage === 'hi' ? 'टूल्स' : 'Tools', icon: 'Wrench' },
    { id: 'graphics', label: currentLanguage === 'hi' ? 'ग्राफिक्स' : 'Graphics', icon: 'Image' },
  ];

  const sortOptions = [
    { value: 'popular', label: currentLanguage === 'hi' ? 'लोकप्रिय' : 'Popular' },
    { value: 'recent', label: currentLanguage === 'hi' ? 'नवीनतम' : 'Recent' },
    { value: 'price-low', label: currentLanguage === 'hi' ? 'कम कीमत' : 'Price: Low to High' },
    { value: 'price-high', label: currentLanguage === 'hi' ? 'अधिक कीमत' : 'Price: High to Low' },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container-responsive">
          {/* Page Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {currentLanguage === 'hi' ? 'उत्पाद एक्सप्लोर करें' : 'Explore Products'}
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                {currentLanguage === 'hi' 
                  ? 'भारतीय रचनाकारों द्वारा बनाए गए बेहतरीन डिजिटल उत्पादों की खोज करें'
                  : 'Discover amazing digital products created by Indian creators'
                }
              </p>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-surface rounded-xl border border-border p-6 shadow-sm transition-colors duration-300">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                  />
                  <Input
                    type="search"
                    placeholder={currentLanguage === 'hi' ? 'उत्पाद खोजें...' : 'Search products...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Sort */}
                <div className="lg:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-surface border border-border rounded-lg px-4 py-3 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-surface text-text-secondary hover:text-primary hover:bg-primary-50 border border-border'
                  }`}
                >
                  <Icon name={category.icon} size={16} />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Coming Soon Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center py-20"
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-8">
                <Icon name="Rocket" size={48} color="white" strokeWidth={2} />
              </div>
              
              <h2 className="text-3xl font-bold text-primary mb-4">
                {currentLanguage === 'hi' ? 'जल्द आ रहा है!' : 'Coming Soon!'}
              </h2>
              
              <p className="text-lg text-text-secondary mb-8">
                {currentLanguage === 'hi' 
                  ? 'हम जल्द ही अद्भुत डिजिटल उत्पादों से भरा मार्केटप्लेस लॉन्च कर रहे हैं। बीटा लॉन्च के लिए साइन अप करें।'
                  : 'We\'re launching a marketplace full of amazing digital products soon. Sign up for our beta launch.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={() => navigate('/product-upload')}
                  iconName="Upload"
                  iconPosition="left"
                  className="bg-primary hover:bg-primary-600"
                >
                  {currentLanguage === 'hi' ? 'पहले बेचना शुरू करें' : 'Start Selling First'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/authentication-modal')}
                  iconName="Bell"
                  iconPosition="left"
                >
                  {currentLanguage === 'hi' ? 'लॉन्च की सूचना पाएं' : 'Get Launch Notification'}
                </Button>
              </div>

              {/* Beta Features */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: 'Zap',
                    title: currentLanguage === 'hi' ? 'तुरंत सेटअप' : 'Instant Setup',
                    description: currentLanguage === 'hi' ? '5 मिनट में बेचना शुरू करें' : 'Start selling in 5 minutes'
                  },
                  {
                    icon: 'Shield',
                    title: currentLanguage === 'hi' ? 'सुरक्षित पेमेंट' : 'Secure Payments',
                    description: currentLanguage === 'hi' ? 'UPI के साथ तुरंत पेमेंट' : 'Instant payments with UPI'
                  },
                  {
                    icon: 'Users',
                    title: currentLanguage === 'hi' ? 'बढ़ता समुदाय' : 'Growing Community',
                    description: currentLanguage === 'hi' ? 'रचनाकारों का नेटवर्क' : 'Network of creators'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon name={feature.icon} size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">{feature.title}</h3>
                    <p className="text-sm text-text-secondary">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
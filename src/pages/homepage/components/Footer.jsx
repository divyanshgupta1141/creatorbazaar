import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: {
      title: currentLanguage === 'hi' ? 'उत्पाद' : 'Product',
      links: [
        { label: currentLanguage === 'hi' ? 'अपलोड करें' : 'Upload', path: '/product-upload' },
        { label: currentLanguage === 'hi' ? 'डैशबोर्ड' : 'Dashboard', path: '/creator-dashboard' },
        { label: currentLanguage === 'hi' ? 'खोजें' : 'Explore', path: '/explore' },
        { label: currentLanguage === 'hi' ? 'मूल्य निर्धारण' : 'Pricing', path: '/pricing' }
      ]
    },
    support: {
      title: currentLanguage === 'hi' ? 'सहायता' : 'Support',
      links: [
        { label: currentLanguage === 'hi' ? 'हेल्प सेंटर' : 'Help Center', path: '/help' },
        { label: currentLanguage === 'hi' ? 'संपर्क' : 'Contact', path: '/contact' },
        { label: currentLanguage === 'hi' ? 'नियम और शर्तें' : 'Terms', path: '/terms' },
        { label: currentLanguage === 'hi' ? 'गोपनीयता' : 'Privacy', path: '/privacy' }
      ]
    },
    legal: {
      title: currentLanguage === 'hi' ? 'कानूनी' : 'Legal',
      links: [
        { label: currentLanguage === 'hi' ? 'नियम और शर्तें' : 'Terms of Service', path: '/terms' },
        { label: currentLanguage === 'hi' ? 'प्राइवेसी पॉलिसी' : 'Privacy Policy', path: '/privacy' },
        { label: currentLanguage === 'hi' ? 'रिफंड पॉलिसी' : 'Refund Policy', path: '/refunds' },
        { label: currentLanguage === 'hi' ? 'संपर्क' : 'Contact', path: '/contact' }
      ]
    }
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/creatorbazaar' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/creatorbazaar' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/company/creatorbazaar' },
    { name: 'YouTube', icon: 'Youtube', url: 'https://youtube.com/creatorbazaar' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-dark-bg text-white">
      <div className="container-responsive">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <motion.div
                className="flex items-center space-x-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-highlight rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-2xl font-bold">CreatorBazaar</div>
                  <div className="text-sm text-white/80">
                    {currentLanguage === 'hi' ? 'रचनाकारों का बाज़ार' : 'Creator Marketplace'}
                  </div>
                </div>
              </motion.div>

              <motion.p
                className="text-white/80 leading-relaxed mb-6 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {currentLanguage === 'hi' 
                  ? 'भारतीय रचनाकारों के लिए डिजिटल उत्पाद बेचने का सबसे आसान और भरोसेमंद प्लेटफॉर्म। UPI के साथ तुरंत पेमेंट पाएं।'
                  : 'The easiest and most trusted platform for Indian creators to sell digital products. Get paid instantly with UPI.'
                }
              </motion.p>

              {/* Social Links */}
              <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 touch-target"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon name={social.icon} size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([key, section], sectionIndex) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (sectionIndex + 1) }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <button
                        onClick={() => handleNavigation(link.path)}
                        className="text-white/80 hover:text-white transition-colors duration-200 text-left touch-target"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="py-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-2">
                {currentLanguage === 'hi' ? 'अपडेट्स पाएं' : 'Stay Updated'}
              </h3>
              <p className="text-white/80">
                {currentLanguage === 'hi' 
                  ? 'नए फीचर्स और टिप्स के लिए न्यूज़लेटर सब्स्क्राइब करें'
                  : 'Subscribe to our newsletter for new features and tips'
                }
              </p>
            </div>
            <div className="flex w-full lg:w-auto max-w-md">
              <input
                type="email"
                placeholder={currentLanguage === 'hi' ? 'आपका ईमेल' : 'Your email'}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent min-h-touch"
              />
              <button className="px-6 py-3 bg-accent hover:bg-accent/90 rounded-r-lg transition-colors duration-200 flex items-center min-h-touch">
                <Icon name="Send" size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-white/60 text-sm text-center sm:text-left">
            © {currentYear} CreatorBazaar. {currentLanguage === 'hi' ? 'सभी अधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-white/60">
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} />
              <span>{currentLanguage === 'hi' ? 'भारत में बनाया गया' : 'Made in India'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>{currentLanguage === 'hi' ? 'SSL सुरक्षित' : 'SSL Secured'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
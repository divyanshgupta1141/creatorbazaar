import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, productData, currentLanguage }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [productLink, setProductLink] = useState('');

  useEffect(() => {
    if (isOpen && productData) {
      setShowConfetti(true);
      setProductLink(`${window.location.origin}/p/${productData.id}`);
      
      // Hide confetti after animation
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, productData]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(productLink);
      // Show toast notification
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          type: 'success',
          message: currentLanguage === 'hi' ?'लिंक कॉपी हो गया!' :'Link copied to clipboard!'
        }
      }));
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      currentLanguage === 'hi'
        ? `मेरा नया डिजिटल उत्पाद देखें: ${productData?.title}\n${productLink}`
        : `Check out my new digital product: ${productData?.title}\n${productLink}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const shareOnTwitter = () => {
    const message = encodeURIComponent(
      currentLanguage === 'hi'
        ? `मैंने अभी-अभी CreatorBazaar पर अपना डिजिटल उत्पाद लॉन्च किया है! ${productData?.title}`
        : `Just launched my digital product on CreatorBazaar! ${productData?.title}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${message}&url=${encodeURIComponent(productLink)}`, '_blank');
  };

  if (!isOpen || !productData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                  transition: {
                    duration: Math.random() * 2 + 2,
                    ease: "easeOut"
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-surface rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Icon name="CheckCircle" size={32} color="white" strokeWidth={2.5} />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentLanguage === 'hi' ? 'बधाई हो!' : 'Congratulations!'}
            </h2>
            <p className="text-white/90">
              {currentLanguage === 'hi' ?'आपका उत्पाद सफलतापूर्वक बनाया गया है' :'Your product has been created successfully'
              }
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Product Info */}
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-primary">
                {productData.title}
              </h3>
              <p className="text-2xl font-bold text-accent">
                ₹{productData.price?.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Product Link */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-primary">
                {currentLanguage === 'hi' ? 'शेयर करने योग्य लिंक:' : 'Shareable Link:'}
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-secondary truncate">
                  {productLink}
                </div>
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  iconName="Copy"
                  className="flex-shrink-0"
                  aria-label={currentLanguage === 'hi' ? 'लिंक कॉपी करें' : 'Copy link'}
                />
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-text-primary">
                {currentLanguage === 'hi' ? 'अभी शेयर करें:' : 'Share now:'}
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="success"
                  onClick={shareOnWhatsApp}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="flex-1"
                >
                  WhatsApp
                </Button>
                <Button
                  variant="info"
                  onClick={shareOnTwitter}
                  iconName="Twitter"
                  iconPosition="left"
                  className="flex-1"
                >
                  Twitter
                </Button>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-primary-50 rounded-lg p-4">
              <h4 className="font-semibold text-primary mb-2 flex items-center space-x-2">
                <Icon name="Lightbulb" size={16} />
                <span>
                  {currentLanguage === 'hi' ? 'अगले कदम:' : 'Next Steps:'}
                </span>
              </h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>
                    {currentLanguage === 'hi' ?'अपने सोशल मीडिया पर लिंक शेयर करें' :'Share the link on your social media'
                    }
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>
                    {currentLanguage === 'hi' ?'डैशबोर्ड में अपनी बिक्री ट्रैक करें' :'Track your sales in the dashboard'
                    }
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                  <span>
                    {currentLanguage === 'hi' ?'और भी उत्पाद बनाएं' :'Create more products'
                    }
                  </span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                {currentLanguage === 'hi' ? 'बंद करें' : 'Close'}
              </Button>
              <Button
                variant="primary"
                onClick={() => window.open(`/creator-dashboard`, '_self')}
                iconName="BarChart3"
                iconPosition="left"
                className="flex-1"
              >
                {currentLanguage === 'hi' ? 'डैशबोर्ड देखें' : 'View Dashboard'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SuccessModal;
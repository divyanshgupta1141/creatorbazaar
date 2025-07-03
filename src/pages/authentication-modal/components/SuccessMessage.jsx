import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessMessage = ({ onClose, currentLanguage }) => {
  useEffect(() => {
    // Auto-close after 2 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const content = {
    en: {
      title: "Welcome to CreatorBazaar!",
      subtitle: "Your account has been verified successfully",
      message: "You can now upload and sell your digital products",
      button: "Get Started"
    },
    hi: {
      title: "CreatorBazaar में आपका स्वागत है!",
      subtitle: "आपका खाता सफलतापूर्वक सत्यापित हो गया है",
      message: "अब आप अपने डिजिटल उत्पाद अपलोड और बेच सकते हैं",
      button: "शुरू करें"
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <motion.div 
      className="text-center space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Success Icon with Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5, type: "spring", bounce: 0.5 }}
        className="relative mx-auto w-20 h-20"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-success to-success-600 rounded-full flex items-center justify-center shadow-lg">
          <Icon name="Check" size={40} color="white" strokeWidth={3} />
        </div>
        
        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-success"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.div>

      {/* Success Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="space-y-3"
      >
        <h2 className="text-2xl font-bold text-text-primary">
          {text.title}
        </h2>
        <p className="text-success-600 font-medium">
          {text.subtitle}
        </p>
        <p className="text-text-secondary text-sm">
          {text.message}
        </p>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Button
          variant="success"
          onClick={onClose}
          iconName="ArrowRight"
          iconPosition="right"
          className="px-8 py-3 text-lg font-semibold spring-transition glow-effect"
        >
          {text.button}
        </Button>
      </motion.div>

      {/* Confetti Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-accent to-primary rounded-full"
            style={{
              left: `${20 + (i * 5)}%`,
              top: `${30 + (i % 3) * 10}%`,
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1, 0], 
              rotate: [0, 180, 360],
              y: [0, -20, 20]
            }}
            transition={{ 
              delay: 0.3 + (i * 0.1), 
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SuccessMessage;
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ currentLanguage }) => {
  const navigate = useNavigate();

  const handleStartSelling = () => {
    navigate('/product-upload');
  };

  const handleViewProducts = () => {
    navigate('/explore');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container-responsive text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-white via-highlight to-accent bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                {currentLanguage === 'hi' ? 'एक बार अपलोड करें।' : 'Upload Once.'}
              </motion.span>
              <br />
              <motion.span
                className="inline-block bg-gradient-to-r from-highlight via-accent to-white bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.5
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                {currentLanguage === 'hi' ? 'हमेशा के लिए बेचें।' : 'Sell Forever.'}
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {currentLanguage === 'hi' 
                ? 'भारतीय रचनाकारों के लिए डिजिटल उत्पाद बेचने का सबसे आसान तरीका। UPI के साथ तुरंत पेमेंट पाएं।'
                : 'The easiest way for Indian creators to sell digital products. Get paid instantly with UPI.'
              }
            </motion.p>
          </motion.div>

          {/* Dual CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="primary"
                size="xl"
                onClick={handleStartSelling}
                iconName="Zap"
                iconPosition="left"
                className="bg-highlight hover:bg-highlight-600 text-black font-bold px-8 py-4 text-lg shadow-2xl glow-effect w-full sm:w-auto"
              >
                {currentLanguage === 'hi' ? 'बेचना शुरू करें' : 'Start Selling Now'}
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handleViewProducts}
                iconName="Search"
                iconPosition="left"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
              >
                {currentLanguage === 'hi' ? 'उत्पाद देखें' : 'View Products'}
              </Button>
            </motion.div>
          </motion.div>

          {/* Real Stats Only */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { 
                number: currentLanguage === 'hi' ? 'बीटा में' : 'Beta Launch', 
                label: currentLanguage === 'hi' ? 'प्लेटफॉर्म' : 'Platform' 
              },
              { 
                number: '0%', 
                label: currentLanguage === 'hi' ? 'प्लेटफॉर्म फीस' : 'Platform Fee' 
              },
              { 
                number: currentLanguage === 'hi' ? 'तुरंत' : 'Instant', 
                label: currentLanguage === 'hi' ? 'UPI पेमेंट' : 'UPI Payments' 
              },
              { 
                number: '100%', 
                label: currentLanguage === 'hi' ? 'आपकी कमाई' : 'Your Earnings' 
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-lg sm:text-xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon name="ChevronDown" size={32} color="white" className="opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
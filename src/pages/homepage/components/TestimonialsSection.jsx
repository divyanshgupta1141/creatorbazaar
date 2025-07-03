import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = ({ currentLanguage }) => {
  // Removed fake testimonials - showing placeholder for beta launch
  const placeholderContent = {
    en: {
      title: "Join the Beta Launch",
      subtitle: "Be among the first creators to launch on CreatorBazaar",
      description: "We're launching soon with a select group of creators. Join our beta program and get early access with exclusive benefits.",
      benefits: [
        "0% platform fees during beta",
        "Priority support and feedback",
        "Early access to new features",
        "Featured creator spotlight"
      ],
      cta: "Join Beta Program"
    },
    hi: {
      title: "बीटा लॉन्च में शामिल हों",
      subtitle: "CreatorBazaar पर लॉन्च करने वाले पहले रचनाकारों में से बनें",
      description: "हम जल्द ही चुनिंदा रचनाकारों के साथ लॉन्च कर रहे हैं। हमारे बीटा प्रोग्राम में शामिल हों और विशेष लाभों के साथ जल्दी पहुंच पाएं।",
      benefits: [
        "बीटा के दौरान 0% प्लेटफॉर्म फीस",
        "प्राथमिकता सहायता और फीडबैक",
        "नई सुविधाओं तक जल्दी पहुंच",
        "फीचर्ड क्रिएटर स्पॉटलाइट"
      ],
      cta: "बीटा प्रोग्राम में शामिल हों"
    }
  };

  const content = placeholderContent[currentLanguage] || placeholderContent.en;

  return (
    <section className="py-20 bg-surface">
      <div className="container-responsive">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {content.title}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 lg:p-12 text-center border border-primary-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Rocket" size={40} color="white" strokeWidth={2} />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              {content.description}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 max-w-2xl mx-auto">
              {content.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 text-left"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={14} color="white" strokeWidth={3} />
                  </div>
                  <span className="text-text-primary font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="btn-highlight text-lg px-8 py-4">
                {content.cta}
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="text-sm font-medium text-text-secondary">
                {currentLanguage === 'hi' ? 'SSL सुरक्षित' : 'SSL Secured'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={20} className="text-highlight" />
              <span className="text-sm font-medium text-text-secondary">
                {currentLanguage === 'hi' ? 'तुरंत पेमेंट' : 'Instant Payments'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-primary" />
              <span className="text-sm font-medium text-text-secondary">
                {currentLanguage === 'hi' ? '24/7 सपोर्ट' : '24/7 Support'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={20} className="text-accent" />
              <span className="text-sm font-medium text-text-secondary">
                {currentLanguage === 'hi' ? 'भारत में बनाया गया' : 'Made in India'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
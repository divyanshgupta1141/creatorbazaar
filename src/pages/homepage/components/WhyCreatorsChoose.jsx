import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WhyCreatorsChoose = ({ currentLanguage }) => {
  const features = [
    {
      icon: 'Zap',
      title: currentLanguage === 'hi' ? 'Auto Delivery' : 'Auto Delivery',
      description: currentLanguage === 'hi' 
        ? 'भुगतान के बाद WhatsApp और Email के माध्यम से तुरंत फ़ाइल डिलीवरी'
        : 'Instant file delivery via WhatsApp & Email after payment',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500'
    },
    {
      icon: 'CreditCard',
      title: currentLanguage === 'hi' ? 'UPI Payments' : 'UPI Payments',
      description: currentLanguage === 'hi'
        ? 'UPI, कार्ड और नेट बैंकिंग के माध्यम से भुगतान स्वीकार करें'
        : 'Accept payments through UPI, cards, and net banking',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-500'
    },
    {
      icon: 'Shield',
      title: currentLanguage === 'hi' ? 'Instant Setup' : 'Instant Setup',
      description: currentLanguage === 'hi'
        ? 'शून्य सेटअप फीस के साथ 2 मिनट से कम में बेचना शुरू करें'
        : 'Start selling in under 2 minutes with zero setup fees',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container-responsive">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {currentLanguage === 'hi' ? 'क्यों रचनाकार चुनते हैं ' : 'Why creators choose '}
            <span className="text-highlight">CreatorBazaar</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {currentLanguage === 'hi'
              ? 'आपकी रचनात्मकता को एक समृद्ध व्यवसाय में बदलने के लिए आवश्यक सब कुछ'
              : 'Everything you need to turn your creativity into a thriving business'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-dark-surface rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <Icon name={feature.icon} size={32} color="white" strokeWidth={2} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-white/80 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCreatorsChoose;
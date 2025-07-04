import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestimonialsSection = ({ currentLanguage }) => {
  const navigate = useNavigate();

  const content = {
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
      cta: "Join Beta Program",
      faq: "Frequently Asked Questions"
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
      cta: "बीटा प्रोग्राम में शामिल हों",
      faq: "अक्सर पूछे जाने वाले प्रश्न"
    }
  };

  const text = content[currentLanguage] || content.en;

  const faqs = [
    {
      question: currentLanguage === 'hi' ? 'CreatorBazaar क्या है?' : 'What is CreatorBazaar?',
      answer: currentLanguage === 'hi' 
        ? 'CreatorBazaar एक डिजिटल मार्केटप्लेस है जहाँ भारतीय रचनाकार अपने डिजिटल उत्पाद बेच सकते हैं और UPI के माध्यम से तुरंत पेमेंट प्राप्त कर सकते हैं।'
        : 'CreatorBazaar is a digital marketplace where Indian creators can sell their digital products and receive instant payments via UPI.'
    },
    {
      question: currentLanguage === 'hi' ? 'कौन से उत्पाद बेच सकते हैं?' : 'What products can I sell?',
      answer: currentLanguage === 'hi' 
        ? 'आप PDF, वीडियो कोर्स, टेम्प्लेट्स, ई-बुक्स, डिज़ाइन फाइलें और अन्य डिजिटल उत्पाद बेच सकते हैं।'
        : 'You can sell PDFs, video courses, templates, e-books, design files, and other digital products.'
    },
    {
      question: currentLanguage === 'hi' ? 'प्लेटफॉर्म फीस कितनी है?' : 'What are the platform fees?',
      answer: currentLanguage === 'hi' 
        ? 'बीटा अवधि के दौरान 0% प्लेटफॉर्म फीस। आपकी 100% कमाई आपकी!'
        : '0% platform fees during beta period. Keep 100% of your earnings!'
    }
  ];

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
            {text.title}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Beta Program CTA */}
          <motion.div
            className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-200"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Rocket" size={40} color="white" strokeWidth={2} />
            </div>

            <h3 className="text-2xl font-bold text-primary mb-4 text-center">
              {text.description}
            </h3>

            <div className="space-y-3 mb-6">
              {text.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
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
              className="text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                onClick={() => navigate('/signup')}
                iconName="ArrowRight"
                iconPosition="right"
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold"
              >
                {text.cta}
              </Button>
            </motion.div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-primary mb-6">{text.faq}</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-background rounded-lg border border-border p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-text-primary mb-2 flex items-center space-x-2">
                    <Icon name="HelpCircle" size={16} className="text-primary" />
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
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
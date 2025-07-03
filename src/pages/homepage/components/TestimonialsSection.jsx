import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = ({ currentLanguage }) => {
  const testimonials = [
    {
      id: 1,
      name: currentLanguage === 'hi' ? 'प्रिया शर्मा' : 'Priya Sharma',
      role: currentLanguage === 'hi' ? 'ग्राफिक डिज़ाइनर' : 'Graphic Designer',
      location: currentLanguage === 'hi' ? 'मुंबई' : 'Mumbai',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      earnings: '₹85,000',
      period: currentLanguage === 'hi' ? 'पिछले महीने' : 'Last Month',
      content: currentLanguage === 'hi' 
        ? `CreatorBazaar ने मेरी जिंदगी बदल दी! मैं अपने डिज़ाइन टेम्प्लेट्स बेचकर हर महीने अच्छी कमाई कर रही हूं। UPI पेमेंट तुरंत मिल जाती है।`
        : `CreatorBazaar changed my life! I'm earning great money every month selling my design templates. UPI payments are instant and hassle-free.`,
      rating: 5,
      productsSold: 450
    },
    {
      id: 2,
      name: currentLanguage === 'hi' ? 'राहुल गुप्ता' : 'Rahul Gupta',
      role: currentLanguage === 'hi' ? 'कोडिंग इंस्ट्रक्टर' : 'Coding Instructor',
      location: currentLanguage === 'hi' ? 'बैंगलोर' : 'Bangalore',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',earnings: '₹1,20,000',
      period: currentLanguage === 'hi' ? 'पिछले महीने' : 'Last Month',
      content: currentLanguage === 'hi'
        ? `मैं अपने कोडिंग कोर्स और PDF गाइड्स बेचता हूं। प्लेटफॉर्म बहुत user-friendly है और कोई hidden charges नहीं हैं।`
        : `I sell my coding courses and PDF guides here. The platform is super user-friendly and there are no hidden charges.`,
      rating: 5,
      productsSold: 280
    },
    {
      id: 3,
      name: currentLanguage === 'hi' ? 'अनीता पटेल' : 'Anita Patel',
      role: currentLanguage === 'hi' ? 'योग इंस्ट्रक्टर' : 'Yoga Instructor',
      location: currentLanguage === 'hi' ? 'अहमदाबाद' : 'Ahmedabad',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',earnings: '₹65,000',
      period: currentLanguage === 'hi' ? 'पिछले महीने' : 'Last Month',
      content: currentLanguage === 'hi'? `मैं अपनी योग वीडियो सीरीज़ और meditation guides बेचती हूं। बहुत आसान है और customers भी खुश रहते हैं।`: `I sell my yoga video series and meditation guides. It's so easy to use and customers are always happy.`,
      rating: 5,
      productsSold: 320
    },
    {
      id: 4,
      name: currentLanguage === 'hi' ? 'विकास कुमार' : 'Vikas Kumar',
      role: currentLanguage === 'hi' ? 'फोटोग्राफर' : 'Photographer',
      location: currentLanguage === 'hi' ? 'दिल्ली' : 'Delhi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      earnings: '₹95,000',
      period: currentLanguage === 'hi' ? 'पिछले महीने' : 'Last Month',
      content: currentLanguage === 'hi'
        ? `मैं अपने photography presets और editing tutorials बेचता हूं। यहां selling process बहुत smooth है।`
        : `I sell my photography presets and editing tutorials. The selling process here is incredibly smooth.`,
      rating: 5,
      productsSold: 380
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {currentLanguage === 'hi' ? 'सफल रचनाकारों की कहानियां' : 'Success Stories from Creators'}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {currentLanguage === 'hi' ?'देखें कि कैसे हजारों रचनाकार CreatorBazaar के साथ अपने सपने पूरे कर रहे हैं' :'See how thousands of creators are achieving their dreams with CreatorBazaar'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-primary-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">
                      {testimonial.name}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      {testimonial.role} • {testimonial.location}
                    </p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={14} className="text-warning-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Earnings Badge */}
                <div className="text-right">
                  <div className="bg-gradient-to-r from-success-500 to-success-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {testimonial.earnings}
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {testimonial.period}
                  </p>
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-text-primary leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Package" size={16} className="text-primary" />
                    <span>{testimonial.productsSold} {currentLanguage === 'hi' ? 'बेचे गए' : 'sold'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={16} className="text-success-600" />
                    <span>{currentLanguage === 'hi' ? 'बढ़ रहा है' : 'Growing'}</span>
                  </div>
                </div>
                <div className="text-xs text-text-tertiary">
                  {currentLanguage === 'hi' ? 'सत्यापित रचनाकार' : 'Verified Creator'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              {currentLanguage === 'hi' ?'आप भी बन सकते हैं अगली सफलता की कहानी!' :'You Could Be Our Next Success Story!'
              }
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              {currentLanguage === 'hi' ?'आज ही शुरू करें और अपने डिजिटल उत्पादों से कमाई करना शुरू करें' :'Start today and begin earning from your digital products'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-sm text-success-700 bg-success-50 px-4 py-2 rounded-full">
                <Icon name="Users" size={16} />
                <span>
                  {currentLanguage === 'hi' ?'25,000+ रचनाकार पहले से जुड़े हैं' :'25,000+ creators already joined'
                  }
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-primary bg-primary-50 px-4 py-2 rounded-full">
                <Icon name="Clock" size={16} />
                <span>
                  {currentLanguage === 'hi' ?'5 मिनट में सेटअप' :'5 minute setup'
                  }
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
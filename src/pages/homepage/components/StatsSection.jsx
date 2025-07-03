import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsSection = ({ currentLanguage }) => {
  const stats = [
    {
      icon: 'TrendingUp',
      number: '₹2,50,000',
      label: currentLanguage === 'hi' ? 'औसत मासिक कमाई' : 'Average Monthly Earnings',
      description: currentLanguage === 'hi' ? 'टॉप क्रिएटर्स की' : 'of Top Creators',
      color: 'text-success-600'
    },
    {
      icon: 'Users',
      number: '50,000+',
      label: currentLanguage === 'hi' ? 'सक्रिय खरीदार' : 'Active Buyers',
      description: currentLanguage === 'hi' ? 'हर महीने' : 'Every Month',
      color: 'text-primary'
    },
    {
      icon: 'Clock',
      number: '< 5 मिनट',
      label: currentLanguage === 'hi' ? 'सेटअप टाइम' : 'Setup Time',
      description: currentLanguage === 'hi' ? 'बेचना शुरू करने के लिए' : 'to Start Selling',
      color: 'text-accent'
    },
    {
      icon: 'Shield',
      number: '100%',
      label: currentLanguage === 'hi' ? 'सुरक्षित पेमेंट' : 'Secure Payments',
      description: currentLanguage === 'hi' ? 'UPI के साथ' : 'with UPI',
      color: 'text-warning-600'
    }
  ];

  const achievements = [
    {
      title: currentLanguage === 'hi' ? '₹1 करोड़+' : '₹1 Crore+',
      subtitle: currentLanguage === 'hi' ? 'कुल पेआउट' : 'Total Payouts',
      icon: 'IndianRupee'
    },
    {
      title: '25,000+',
      subtitle: currentLanguage === 'hi' ? 'रचनाकार' : 'Creators',
      icon: 'Users'
    },
    {
      title: '4.9/5',
      subtitle: currentLanguage === 'hi' ? 'रेटिंग' : 'Rating',
      icon: 'Star'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-surface rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 10 }}
              >
                <Icon name={stat.icon} size={28} className={stat.color} strokeWidth={2.5} />
              </motion.div>

              <motion.div
                className="text-3xl sm:text-4xl font-bold text-primary mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>

              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {stat.label}
              </h3>
              <p className="text-text-secondary text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Banner */}
        <motion.div
          className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 lg:p-12 text-white text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {currentLanguage === 'hi' ?'भारत का #1 क्रिएटर मार्केटप्लेस' : "India's #1 Creator Marketplace"
            }
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl opacity-90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {currentLanguage === 'hi' ?'हजारों रचनाकारों का भरोसा, लाखों खुश ग्राहक' :'Trusted by thousands of creators, loved by millions of customers'
            }
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon name={achievement.icon} size={24} color="white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  {achievement.title}
                </div>
                <div className="text-white/80">
                  {achievement.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success-600" />
              <span className="text-sm font-medium text-text-secondary">
                {currentLanguage === 'hi' ? 'SSL सुरक्षित' : 'SSL Secured'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={20} className="text-warning-600" />
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
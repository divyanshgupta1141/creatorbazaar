import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessSteps = ({ currentLanguage }) => {
  const steps = [
    {
      icon: 'Upload',
      title: currentLanguage === 'hi' ? 'अपलोड करें' : 'Upload',
      description: currentLanguage === 'hi' ?'अपने डिजिटल उत्पाद (PDF, वीडियो, टेम्प्लेट) को ड्रैग एंड ड्रॉप से अपलोड करें' :'Drag and drop your digital products (PDFs, videos, templates) to upload',
      color: 'from-primary to-secondary'
    },
    {
      icon: 'Share2',
      title: currentLanguage === 'hi' ? 'शेयर करें' : 'Share',
      description: currentLanguage === 'hi' ?'अपने उत्पाद का लिंक सोशल मीडिया, WhatsApp या ईमेल पर शेयर करें' :'Share your product link on social media, WhatsApp, or email',
      color: 'from-secondary to-accent'
    },
    {
      icon: 'IndianRupee',
      title: currentLanguage === 'hi' ? 'पैसे कमाएं' : 'Get Paid',
      description: currentLanguage === 'hi' ?'UPI के जरिए तुरंत पेमेंट पाएं। कोई प्लेटफॉर्म फीस नहीं!' :'Get paid instantly via UPI. No platform fees during beta!',
      color: 'from-accent to-warning'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {currentLanguage === 'hi' ? 'सिर्फ 3 आसान स्टेप्स में' : 'Just 3 Simple Steps'}
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            {currentLanguage === 'hi' ?'अपने डिजिटल उत्पादों को बेचना कभी इतना आसान नहीं था। आज ही शुरू करें!' :'Selling your digital products has never been easier. Start today!'
            }
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                {index + 1}
              </div>

              {/* Card */}
              <motion.div
                className="glass-card p-8 h-full text-center group cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 180, 198, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <Icon name={step.icon} size={32} color="white" strokeWidth={2.5} />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>

              {/* Connecting Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-12 w-6 lg:w-12 h-0.5 bg-gradient-to-r from-primary to-accent opacity-30 z-0">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: (index + 1) * 0.3 }}
                    viewport={{ once: true }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-success-50 text-success-700 px-6 py-3 rounded-full font-medium">
            <Icon name="Zap" size={20} />
            <span>
              {currentLanguage === 'hi' ?'बीटा में 0% प्लेटफॉर्म फीस - सीमित समय!' :'0% Platform Fee During Beta - Limited Time!'
              }
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSteps;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Icon from '../../components/AppIcon';

const TermsPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const content = {
    en: {
      title: "Terms of Service",
      lastUpdated: "Last updated: December 2024",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing and using CreatorBazaar, you accept and agree to be bound by the terms and provision of this agreement."
        },
        {
          title: "2. Platform Description",
          content: "CreatorBazaar is a digital marketplace that enables Indian creators to sell digital products and receive payments via UPI. We provide the platform and tools for creators to upload, manage, and sell their digital content."
        },
        {
          title: "3. User Accounts",
          content: "You must create an account to use our services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
        },
        {
          title: "4. Creator Responsibilities",
          content: "As a creator, you must ensure that your content is original, does not infringe on any copyrights, and complies with all applicable laws. You retain ownership of your content but grant us a license to display and distribute it through our platform."
        },
        {
          title: "5. Payment Terms",
          content: "We facilitate payments through UPI and other supported payment methods. Platform fees may apply as outlined in our pricing policy. Payments are processed securely through our payment partners."
        },
        {
          title: "6. Prohibited Content",
          content: "You may not upload content that is illegal, harmful, threatening, abusive, defamatory, or violates any intellectual property rights. We reserve the right to remove any content that violates these terms."
        },
        {
          title: "7. Platform Fees",
          content: "During our beta period, we charge 0% platform fees. After the beta period, fees will be clearly communicated and updated in these terms."
        },
        {
          title: "8. Limitation of Liability",
          content: "CreatorBazaar shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform."
        },
        {
          title: "9. Termination",
          content: "We may terminate or suspend your account at any time for violations of these terms. You may also terminate your account at any time by contacting our support team."
        },
        {
          title: "10. Changes to Terms",
          content: "We reserve the right to modify these terms at any time. We will notify users of any significant changes via email or platform notifications."
        }
      ]
    },
    hi: {
      title: "सेवा की शर्तें",
      lastUpdated: "अंतिम अपडेट: दिसंबर 2024",
      sections: [
        {
          title: "1. शर्तों की स्वीकृति",
          content: "CreatorBazaar का उपयोग करके, आप इस समझौते की शर्तों और प्रावधानों से बंधे होने के लिए सहमत हैं।"
        },
        {
          title: "2. प्लेटफॉर्म विवरण",
          content: "CreatorBazaar एक डिजिटल मार्केटप्लेस है जो भारतीय रचनाकारों को डिजिटल उत्पाद बेचने और UPI के माध्यम से भुगतान प्राप्त करने में सक्षम बनाता है।"
        },
        {
          title: "3. उपयोगकर्ता खाते",
          content: "हमारी सेवाओं का उपयोग करने के लिए आपको एक खाता बनाना होगा। आप अपने खाते की गोपनीयता बनाए रखने के लिए जिम्मेदार हैं।"
        },
        {
          title: "4. रचनाकार की जिम्मेदारियां",
          content: "एक रचनाकार के रूप में, आपको यह सुनिश्चित करना होगा कि आपकी सामग्री मूल है और कॉपीराइट का उल्लंघन नहीं करती है।"
        },
        {
          title: "5. भुगतान शर्तें",
          content: "हम UPI और अन्य समर्थित भुगतान विधियों के माध्यम से भुगतान की सुविधा प्रदान करते हैं। प्लेटफॉर्म फीस लागू हो सकती है।"
        },
        {
          title: "6. निषिद्ध सामग्री",
          content: "आप ऐसी सामग्री अपलोड नहीं कर सकते जो अवैध, हानिकारक, या बौद्धिक संपदा अधिकारों का उल्लंघन करती है।"
        },
        {
          title: "7. प्लेटफॉर्म फीस",
          content: "हमारी बीटा अवधि के दौरान, हम 0% प्लेटफॉर्म फीस लेते हैं। बीटा अवधि के बाद, फीस स्पष्ट रूप से बताई जाएगी।"
        },
        {
          title: "8. दायित्व की सीमा",
          content: "CreatorBazaar प्लेटफॉर्म के उपयोग से होने वाले किसी भी अप्रत्यक्ष नुकसान के लिए जिम्मेदार नहीं होगा।"
        },
        {
          title: "9. समाप्ति",
          content: "हम इन शर्तों के उल्लंघन के लिए किसी भी समय आपका खाता समाप्त कर सकते हैं।"
        },
        {
          title: "10. शर्तों में परिवर्तन",
          content: "हम किसी भी समय इन शर्तों को संशोधित करने का अधिकार सुरक्षित रखते हैं।"
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <>
      <Helmet>
        <title>{text.title} - CreatorBazaar</title>
        <meta name="description" content="Terms of Service for CreatorBazaar - Digital marketplace for Indian creators" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-20 md:pb-8">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name="FileText" size={32} color="white" strokeWidth={2} />
                  </div>
                  <h1 className="text-4xl font-bold text-primary mb-4">{text.title}</h1>
                  <p className="text-text-secondary">{text.lastUpdated}</p>
                </div>

                {/* Content */}
                <div className="bg-surface rounded-2xl shadow-lg border border-border p-8">
                  <div className="prose prose-gray max-w-none">
                    {text.sections.map((section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="mb-8"
                      >
                        <h2 className="text-xl font-semibold text-primary mb-4 flex items-center space-x-2">
                          <Icon name="ChevronRight" size={16} />
                          <span>{section.title}</span>
                        </h2>
                        <p className="text-text-secondary leading-relaxed pl-6">
                          {section.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contact Information */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="bg-primary-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
                        <Icon name="Mail" size={20} />
                        <span>{currentLanguage === 'hi' ? 'संपर्क करें' : 'Contact Us'}</span>
                      </h3>
                      <p className="text-text-secondary">
                        {currentLanguage === 'hi' 
                          ? 'यदि आपके पास इन शर्तों के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:'
                          : 'If you have any questions about these Terms of Service, please contact us:'
                        }
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-primary font-medium">support@creatorbazaar.com</p>
                        <p className="text-text-secondary">
                          {currentLanguage === 'hi' ? 'या हमारे हेल्प सेंटर पर जाएं' : 'Or visit our Help Center'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <MobileNavigation />
      </div>
    </>
  );
};

export default TermsPage;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Icon from '../../components/AppIcon';

const PrivacyPage = () => {
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
      title: "Privacy Policy",
      lastUpdated: "Last updated: December 2024",
      sections: [
        {
          title: "1. Information We Collect",
          content: "We collect information you provide directly to us, such as when you create an account, upload products, or contact us for support. This includes your name, email address, payment information, and product content."
        },
        {
          title: "2. How We Use Your Information",
          content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products and services."
        },
        {
          title: "3. Information Sharing",
          content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with service providers who assist us in operating our platform."
        },
        {
          title: "4. Data Security",
          content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment information is processed securely through our payment partners."
        },
        {
          title: "5. Cookies and Tracking",
          content: "We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences."
        },
        {
          title: "6. Your Rights",
          content: "You have the right to access, update, or delete your personal information. You can also opt out of certain communications from us. Contact us to exercise these rights."
        },
        {
          title: "7. Data Retention",
          content: "We retain your information for as long as your account is active or as needed to provide you services. We may retain certain information for legitimate business purposes or legal requirements."
        },
        {
          title: "8. International Transfers",
          content: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers."
        },
        {
          title: "9. Children's Privacy",
          content: "Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13."
        },
        {
          title: "10. Changes to Privacy Policy",
          content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'last updated' date."
        }
      ]
    },
    hi: {
      title: "गोपनीयता नीति",
      lastUpdated: "अंतिम अपडेट: दिसंबर 2024",
      sections: [
        {
          title: "1. हम जो जानकारी एकत्र करते हैं",
          content: "हम वह जानकारी एकत्र करते हैं जो आप हमें सीधे प्रदान करते हैं, जैसे कि जब आप खाता बनाते हैं, उत्पाद अपलोड करते हैं, या सहायता के लिए संपर्क करते हैं।"
        },
        {
          title: "2. हम आपकी जानकारी का उपयोग कैसे करते हैं",
          content: "हम एकत्रित जानकारी का उपयोग अपनी सेवाएं प्रदान करने, बनाए रखने और सुधारने, लेनदेन को संसाधित करने के लिए करते हैं।"
        },
        {
          title: "3. जानकारी साझाकरण",
          content: "हम आपकी सहमति के बिना आपकी व्यक्तिगत जानकारी को तीसरे पक्ष को नहीं बेचते, व्यापार नहीं करते या स्थानांतरित नहीं करते हैं।"
        },
        {
          title: "4. डेटा सुरक्षा",
          content: "हम अनधिकृत पहुंच, परिवर्तन, प्रकटीकरण या विनाश के खिलाफ आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए उपयुक्त सुरक्षा उपाय लागू करते हैं।"
        },
        {
          title: "5. कुकीज़ और ट्रैकिंग",
          content: "हम आपके प्लेटफॉर्म अनुभव को बेहतर बनाने के लिए कुकीज़ और समान ट्रैकिंग तकनीकों का उपयोग करते हैं।"
        },
        {
          title: "6. आपके अधिकार",
          content: "आपको अपनी व्यक्तिगत जानकारी तक पहुंचने, अपडेट करने या हटाने का अधिकार है।"
        },
        {
          title: "7. डेटा प्रतिधारण",
          content: "हम आपकी जानकारी तब तक बनाए रखते हैं जब तक आपका खाता सक्रिय है या सेवाएं प्रदान करने के लिए आवश्यक है।"
        },
        {
          title: "8. अंतर्राष्ट्रीय स्थानांतरण",
          content: "आपकी जानकारी को आपके देश के अलावा अन्य देशों में स्थानांतरित और संसाधित किया जा सकता है।"
        },
        {
          title: "9. बच्चों की गोपनीयता",
          content: "हमारी सेवाएं 13 वर्ष से कम उम्र के बच्चों के लिए नहीं हैं। हम जानबूझकर 13 वर्ष से कम उम्र के बच्चों से व्यक्तिगत जानकारी एकत्र नहीं करते हैं।"
        },
        {
          title: "10. गोपनीयता नीति में परिवर्तन",
          content: "हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पृष्ठ पर नई नीति पोस्ट करके किसी भी बदलाव की सूचना देंगे।"
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <>
      <Helmet>
        <title>{text.title} - CreatorBazaar</title>
        <meta name="description" content="Privacy Policy for CreatorBazaar - How we collect, use, and protect your data" />
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
                    <Icon name="Shield" size={32} color="white" strokeWidth={2} />
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
                          <Icon name="Lock" size={16} />
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
                        <span>{currentLanguage === 'hi' ? 'गोपनीयता संबंधी प्रश्न' : 'Privacy Questions'}</span>
                      </h3>
                      <p className="text-text-secondary">
                        {currentLanguage === 'hi' 
                          ? 'यदि आपके पास इस गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:'
                          : 'If you have any questions about this Privacy Policy, please contact us:'
                        }
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-primary font-medium">privacy@creatorbazaar.com</p>
                        <p className="text-text-secondary">
                          {currentLanguage === 'hi' ? 'या हमारे डेटा सुरक्षा टीम से संपर्क करें' : 'Or contact our Data Protection Team'}
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

export default PrivacyPage;
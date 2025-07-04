import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Icon from '../../components/AppIcon';

const RefundsPage = () => {
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
      title: "Refund Policy",
      lastUpdated: "Last updated: December 2024",
      sections: [
        {
          title: "1. Digital Product Refunds",
          content: "Due to the nature of digital products, all sales are generally final. However, we offer refunds in specific circumstances outlined in this policy."
        },
        {
          title: "2. Refund Eligibility",
          content: "You may be eligible for a refund if: the product is significantly different from its description, the download link is broken or inaccessible, or there are technical issues preventing access to the product."
        },
        {
          title: "3. Refund Timeline",
          content: "Refund requests must be submitted within 7 days of purchase. Requests submitted after this period will not be considered unless there are exceptional circumstances."
        },
        {
          title: "4. How to Request a Refund",
          content: "To request a refund, contact our support team at support@creatorbazaar.com with your order details and reason for the refund request. Include any relevant screenshots or documentation."
        },
        {
          title: "5. Refund Processing",
          content: "Approved refunds will be processed within 5-7 business days. Refunds will be issued to the original payment method used for the purchase."
        },
        {
          title: "6. Non-Refundable Items",
          content: "The following items are not eligible for refunds: products that have been fully downloaded and accessed, custom or personalized products, and products purchased more than 30 days ago."
        },
        {
          title: "7. Partial Refunds",
          content: "In some cases, we may offer partial refunds if only part of the product is defective or inaccessible. The refund amount will be proportional to the affected content."
        },
        {
          title: "8. Creator Refund Policy",
          content: "Creators can set their own refund policies for their products. These policies will be clearly displayed on the product page and take precedence over our general policy."
        },
        {
          title: "9. Dispute Resolution",
          content: "If you're not satisfied with our refund decision, you can escalate the matter to our dispute resolution team. We aim to resolve all disputes fairly and promptly."
        },
        {
          title: "10. Policy Changes",
          content: "We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting on our website."
        }
      ]
    },
    hi: {
      title: "रिफंड नीति",
      lastUpdated: "अंतिम अपडेट: दिसंबर 2024",
      sections: [
        {
          title: "1. डिजिटल उत्पाद रिफंड",
          content: "डिजिटल उत्पादों की प्रकृति के कारण, सभी बिक्री आम तौर पर अंतिम होती है। हालांकि, हम इस नीति में उल्लिखित विशिष्ट परिस्थितियों में रिफंड प्रदान करते हैं।"
        },
        {
          title: "2. रिफंड पात्रता",
          content: "आप रिफंड के लिए पात्र हो सकते हैं यदि: उत्पाद अपने विवरण से काफी अलग है, डाउनलोड लिंक टूटा हुआ या दुर्गम है, या उत्पाद तक पहुंच को रोकने वाली तकनीकी समस्याएं हैं।"
        },
        {
          title: "3. रिफंड समयसीमा",
          content: "रिफंड अनुरोध खरीदारी के 7 दिनों के भीतर जमा किया जाना चाहिए। इस अवधि के बाद जमा किए गए अनुरोधों पर विचार नहीं किया जाएगा।"
        },
        {
          title: "4. रिफंड का अनुरोध कैसे करें",
          content: "रिफंड का अनुरोध करने के लिए, अपने ऑर्डर विवरण और रिफंड अनुरोध के कारण के साथ support@creatorbazaar.com पर हमारी सहायता टीम से संपर्क करें।"
        },
        {
          title: "5. रिफंड प्रसंस्करण",
          content: "स्वीकृत रिफंड 5-7 व्यावसायिक दिनों के भीतर संसाधित किए जाएंगे। रिफंड खरीदारी के लिए उपयोग की गई मूल भुगतान विधि में जारी किए जाएंगे।"
        },
        {
          title: "6. गैर-वापसी योग्य आइटम",
          content: "निम्नलिखित आइटम रिफंड के लिए पात्र नहीं हैं: पूरी तरह से डाउनलोड और एक्सेस किए गए उत्पाद, कस्टम या व्यक्तिगत उत्पाद।"
        },
        {
          title: "7. आंशिक रिफंड",
          content: "कुछ मामलों में, हम आंशिक रिफंड की पेशकश कर सकते हैं यदि उत्पाद का केवल हिस्सा दोषपूर्ण या दुर्गम है।"
        },
        {
          title: "8. रचनाकार रिफंड नीति",
          content: "रचनाकार अपने उत्पादों के लिए अपनी रिफंड नीतियां निर्धारित कर सकते हैं। ये नीतियां उत्पाद पृष्ठ पर स्पष्ट रूप से प्रदर्शित होंगी।"
        },
        {
          title: "9. विवाद समाधान",
          content: "यदि आप हमारे रिफंड निर्णय से संतुष्ट नहीं हैं, तो आप मामले को हमारी विवाद समाधान टीम तक बढ़ा सकते हैं।"
        },
        {
          title: "10. नीति परिवर्तन",
          content: "हम किसी भी समय इस रिफंड नीति को संशोधित करने का अधिकार सुरक्षित रखते हैं। परिवर्तन हमारी वेबसाइट पर पोस्ट करने पर तुरंत प्रभावी होंगे।"
        }
      ]
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <>
      <Helmet>
        <title>{text.title} - CreatorBazaar</title>
        <meta name="description" content="Refund Policy for CreatorBazaar - Digital product refund terms and conditions" />
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
                    <Icon name="RefreshCw" size={32} color="white" strokeWidth={2} />
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
                          <Icon name="DollarSign" size={16} />
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
                        <Icon name="HelpCircle" size={20} />
                        <span>{currentLanguage === 'hi' ? 'रिफंड सहायता' : 'Refund Support'}</span>
                      </h3>
                      <p className="text-text-secondary">
                        {currentLanguage === 'hi' 
                          ? 'रिफंड अनुरोध या प्रश्नों के लिए हमसे संपर्क करें:'
                          : 'For refund requests or questions, contact us:'
                        }
                      </p>
                      <div className="mt-4 space-y-2">
                        <p className="text-primary font-medium">support@creatorbazaar.com</p>
                        <p className="text-text-secondary">
                          {currentLanguage === 'hi' ? 'औसत प्रतिक्रिया समय: 24 घंटे' : 'Average response time: 24 hours'}
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

export default RefundsPage;
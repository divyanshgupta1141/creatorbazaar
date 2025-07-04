import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MobileNavigation from '../../components/ui/MobileNavigation';
import HeroSection from './components/HeroSection';
import WhyCreatorsChoose from './components/WhyCreatorsChoose';
import ProductCategories from './components/ProductCategories';
import ProcessSteps from './components/ProcessSteps';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FloatingFeedback from './components/FloatingFeedback';
import Footer from './components/Footer';

const Homepage = () => {
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

  const pageTitle = currentLanguage === 'hi' 
    ? 'CreatorBazaar - भारतीय रचनाकारों का डिजिटल मार्केटप्लेस' 
    : 'CreatorBazaar - Digital Marketplace for Indian Creators';

  const pageDescription = currentLanguage === 'hi' 
    ? 'भारतीय रचनाकारों के लिए डिजिटल उत्पाद बेचने का सबसे आसान तरीका। UPI के साथ तुरंत पेमेंट पाएं। एक बार अपलोड करें, हमेशा के लिए बेचें।' 
    : 'The easiest way for Indian creators to sell digital products. Get paid instantly with UPI. Upload once, sell forever.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="digital marketplace, indian creators, UPI payments, sell digital products, creator economy, online selling" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://creatorbazaar.com" />
        <meta property="og:image" content="https://creatorbazaar.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://creatorbazaar.com/twitter-image.jpg" />
        <link rel="canonical" href="https://creatorbazaar.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "CreatorBazaar",
            "description": pageDescription,
            "url": "https://creatorbazaar.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://creatorbazaar.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header />
        
        <main className="pt-16 pb-20 md:pb-0">
          <HeroSection currentLanguage={currentLanguage} />
          <WhyCreatorsChoose currentLanguage={currentLanguage} />
          <ProductCategories currentLanguage={currentLanguage} />
          <ProcessSteps currentLanguage={currentLanguage} />
          <StatsSection currentLanguage={currentLanguage} />
          <TestimonialsSection currentLanguage={currentLanguage} />
        </main>

        <Footer currentLanguage={currentLanguage} />
        <FloatingFeedback currentLanguage={currentLanguage} />
        <MobileNavigation />
      </div>
    </>
  );
};

export default Homepage;
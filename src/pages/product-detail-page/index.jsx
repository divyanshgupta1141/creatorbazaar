import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProductHeader from './components/ProductHeader';
import ProductDescription from './components/ProductDescription';
import PricingCard from './components/PricingCard';
import CreatorInfo from './components/CreatorInfo';
import PaymentModal from './components/PaymentModal';
import SuccessModal from './components/SuccessModal';
import RelatedProducts from './components/RelatedProducts';
import Breadcrumb from './components/Breadcrumb';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock product data
  const mockProduct = {
    id: id || "1",
    title: "Complete Digital Marketing Course 2024",
    creator: "Priya Sharma",
    description: `Master digital marketing with this comprehensive course covering all essential topics.\n\nWhat you'll learn:\n• SEO and Content Marketing strategies\n• Social Media Marketing across platforms\n• Google Ads and Facebook Ads management\n• Email Marketing automation\n• Analytics and performance tracking\n• Conversion optimization techniques\n\nThis course includes:\n✓ 50+ video lessons (8+ hours)\n✓ Downloadable templates and checklists\n✓ Real-world case studies\n✓ Certificate of completion\n✓ Lifetime access to updates\n\nPerfect for entrepreneurs, marketing professionals, and anyone looking to grow their online presence. All strategies are tested and proven to work in the Indian market.`,
    price: 1999,
    fileType: "pdf",
    fileSize: 25600000, // 25.6 MB
    views: 15420,
    rating: 4.8,
    uploadDate: "2024-01-15",
    tags: ["Digital Marketing", "SEO", "Social Media", "Google Ads", "Email Marketing"],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  };

  const mockCreator = {
    name: "Priya Sharma",
    title: "Digital Marketing Expert & Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Digital marketing consultant with 8+ years of experience helping businesses grow online. Founder of two successful e-commerce brands and mentor to 500+ entrepreneurs.",
    rating: 4.9,
    totalProducts: 12,
    followers: 8500,
    totalSales: 2340,
    responseTime: "< 2hrs",
    joinedYear: "2019",
    badges: ["Verified", "Top Seller", "Expert"]
  };

  const mockRelatedProducts = [
    {
      id: "2",
      title: "Social Media Content Calendar Template",
      creator: "Rahul Gupta",
      price: 499,
      fileType: "pdf",
      views: 3200,
      rating: 4.6
    },
    {
      id: "3", 
      title: "Email Marketing Automation Guide",
      creator: "Sneha Patel",
      price: 799,
      fileType: "pdf",
      views: 2100,
      rating: 4.7
    },
    {
      id: "4",
      title: "Google Ads Mastery Video Course",
      creator: "Amit Kumar",
      price: 2499,
      fileType: "mp4",
      views: 5600,
      rating: 4.9
    },
    {
      id: "5",
      title: "SEO Toolkit & Templates Bundle",
      creator: "Kavya Singh",
      price: 1299,
      fileType: "zip",
      views: 4300,
      rating: 4.5
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const handlePurchase = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsSuccessModalOpen(true);
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/product-detail-page/${productId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gray-200 rounded-xl h-48"></div>
                  <div className="bg-gray-200 rounded-xl h-64"></div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-200 rounded-xl h-96"></div>
                  <div className="bg-gray-200 rounded-xl h-64"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{mockProduct.title} - CreatorBazaar</title>
        <meta name="description" content={mockProduct.description.substring(0, 160)} />
        <meta property="og:title" content={mockProduct.title} />
        <meta property="og:description" content={mockProduct.description.substring(0, 160)} />
        <meta property="og:image" content={mockProduct.thumbnail} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={mockProduct.price} />
        <meta property="product:price:currency" content="INR" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": mockProduct.title,
            "description": mockProduct.description,
            "image": mockProduct.thumbnail,
            "offers": {
              "@type": "Offer",
              "price": mockProduct.price,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock"
            },
            "brand": {
              "@type": "Brand",
              "name": "CreatorBazaar"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": mockProduct.rating,
              "reviewCount": Math.floor(mockProduct.views * 0.1)
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb product={mockProduct} currentLanguage={currentLanguage} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <ProductHeader 
                  product={mockProduct} 
                  currentLanguage={currentLanguage} 
                />
                
                <ProductDescription 
                  product={mockProduct} 
                  currentLanguage={currentLanguage} 
                />
                
                {/* Mobile Pricing Card */}
                <div className="lg:hidden">
                  <PricingCard 
                    product={mockProduct}
                    currentLanguage={currentLanguage}
                    onPurchase={handlePurchase}
                  />
                </div>
                
                <RelatedProducts 
                  products={mockRelatedProducts}
                  currentLanguage={currentLanguage}
                  onProductClick={handleRelatedProductClick}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Desktop Pricing Card */}
                <div className="hidden lg:block">
                  <PricingCard 
                    product={mockProduct}
                    currentLanguage={currentLanguage}
                    onPurchase={handlePurchase}
                  />
                </div>
                
                <CreatorInfo 
                  creator={mockCreator}
                  currentLanguage={currentLanguage}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          product={mockProduct}
          currentLanguage={currentLanguage}
          onPaymentSuccess={handlePaymentSuccess}
        />

        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          product={mockProduct}
          currentLanguage={currentLanguage}
        />
      </div>
    </>
  );
};

export default ProductDetailPage;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShareableLinks = ({ product, currentLanguage }) => {
  const [copiedLink, setCopiedLink] = useState('');
  const [showQR, setShowQR] = useState(false);

  const productUrl = `https://creatorbazaar.com/p/${product.id}`;
  const shortUrl = `https://cb.in/${product.id}`;

  const shareLinks = [
    {
      platform: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`Check out this amazing product: ${product.title} - ${shortUrl}`)}`
    },
    {
      platform: 'Twitter',
      icon: 'Twitter',
      color: 'text-blue-500',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out "${product.title}" on CreatorBazaar`)}&url=${encodeURIComponent(shortUrl)}`
    },
    {
      platform: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
    },
    {
      platform: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-700',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`
    },
    {
      platform: 'Telegram',
      icon: 'Send',
      color: 'text-blue-500',
      url: `https://t.me/share/url?url=${encodeURIComponent(shortUrl)}&text=${encodeURIComponent(product.title)}`
    }
  ];

  const handleCopyLink = async (link, type) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(type);
      setTimeout(() => setCopiedLink(''), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  const generateNewLink = () => {
    // Simulate generating new shareable link
    const newId = Math.random().toString(36).substr(2, 8);
    const newUrl = `https://cb.in/${newId}`;
    handleCopyLink(newUrl, 'new');
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-md">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold text-text-primary">
          {currentLanguage === 'hi' ? 'साझा करने योग्य लिंक' : 'Shareable Links'}
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          {currentLanguage === 'hi' ?'अपने उत्पाद को साझा करें और बिक्री बढ़ाएं' :'Share your product and boost sales'
          }
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Primary Product Link */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            {currentLanguage === 'hi' ? 'मुख्य उत्पाद लिंक' : 'Primary Product Link'}
          </h3>
          
          <div className="flex items-center space-x-2 p-3 bg-background-secondary rounded-lg border border-border">
            <Icon name="Link" size={16} className="text-text-secondary flex-shrink-0" />
            <input
              type="text"
              value={productUrl}
              readOnly
              className="flex-1 bg-transparent text-sm text-text-primary focus:outline-none"
            />
            <Button
              variant={copiedLink === 'primary' ? 'success' : 'outline'}
              size="sm"
              iconName={copiedLink === 'primary' ? 'Check' : 'Copy'}
              onClick={() => handleCopyLink(productUrl, 'primary')}
            >
              {copiedLink === 'primary' 
                ? (currentLanguage === 'hi' ? 'कॉपी हुआ!' : 'Copied!')
                : (currentLanguage === 'hi' ? 'कॉपी करें' : 'Copy')
              }
            </Button>
          </div>
        </div>

        {/* Short Link */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            {currentLanguage === 'hi' ? 'छोटा लिंक' : 'Short Link'}
          </h3>
          
          <div className="flex items-center space-x-2 p-3 bg-background-secondary rounded-lg border border-border">
            <Icon name="Zap" size={16} className="text-accent flex-shrink-0" />
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 bg-transparent text-sm text-text-primary focus:outline-none"
            />
            <Button
              variant={copiedLink === 'short' ? 'success' : 'outline'}
              size="sm"
              iconName={copiedLink === 'short' ? 'Check' : 'Copy'}
              onClick={() => handleCopyLink(shortUrl, 'short')}
            >
              {copiedLink === 'short' 
                ? (currentLanguage === 'hi' ? 'कॉपी हुआ!' : 'Copied!')
                : (currentLanguage === 'hi' ? 'कॉपी करें' : 'Copy')
              }
            </Button>
          </div>
          
          <p className="text-xs text-text-secondary mt-2">
            {currentLanguage === 'hi' ?'मोबाइल शेयरिंग के लिए बेहतर' :'Better for mobile sharing'
            }
          </p>
        </div>

        {/* QR Code Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">
              {currentLanguage === 'hi' ? 'QR कोड' : 'QR Code'}
            </h3>
            <Button
              variant="outline"
              size="sm"
              iconName="QrCode"
              onClick={() => setShowQR(!showQR)}
            >
              {showQR 
                ? (currentLanguage === 'hi' ? 'छुपाएं' : 'Hide')
                : (currentLanguage === 'hi' ? 'दिखाएं' : 'Show')
              }
            </Button>
          </div>
          
          {showQR && (
            <div className="flex flex-col items-center p-6 bg-background-secondary rounded-lg border border-border">
              <div className="w-32 h-32 bg-white rounded-lg border-2 border-border flex items-center justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="QrCode" size={48} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-text-secondary text-center">
                {currentLanguage === 'hi' ?'मोबाइल से स्कैन करें' :'Scan with mobile device'
                }
              </p>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                className="mt-3"
              >
                {currentLanguage === 'hi' ? 'डाउनलोड करें' : 'Download QR'}
              </Button>
            </div>
          )}
        </div>

        {/* Social Media Sharing */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            {currentLanguage === 'hi' ? 'सोशल मीडिया पर साझा करें' : 'Share on Social Media'}
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {shareLinks.map((link) => (
              <button
                key={link.platform}
                onClick={() => handleSocialShare(link.url)}
                className="flex flex-col items-center p-3 bg-background-secondary hover:bg-primary-50 rounded-lg border border-border hover:border-primary transition-all duration-200 group"
              >
                <Icon 
                  name={link.icon} 
                  size={24} 
                  className={`${link.color} group-hover:scale-110 transition-transform duration-200`}
                />
                <span className="text-xs text-text-secondary group-hover:text-primary mt-1">
                  {link.platform}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Link Analytics */}
        <div className="bg-background-secondary rounded-lg p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            {currentLanguage === 'hi' ? 'लिंक एनालिटिक्स' : 'Link Analytics'}
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">
                {product.linkClicks?.toLocaleString('en-IN') || '0'}
              </div>
              <div className="text-xs text-text-secondary">
                {currentLanguage === 'hi' ? 'कुल क्लिक्स' : 'Total Clicks'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">
                {product.uniqueVisitors?.toLocaleString('en-IN') || '0'}
              </div>
              <div className="text-xs text-text-secondary">
                {currentLanguage === 'hi' ? 'यूनीक विज़िटर्स' : 'Unique Visitors'}
              </div>
            </div>
          </div>
        </div>

        {/* Generate New Link */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={generateNewLink}
            fullWidth
          >
            {currentLanguage === 'hi' ? 'नया लिंक जेनरेट करें' : 'Generate New Link'}
          </Button>
          <p className="text-xs text-text-secondary mt-2 text-center">
            {currentLanguage === 'hi' ?'नया लिंक बनाने से पुराने लिंक निष्क्रिय हो जाएंगे' :'Generating new link will deactivate old links'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareableLinks;
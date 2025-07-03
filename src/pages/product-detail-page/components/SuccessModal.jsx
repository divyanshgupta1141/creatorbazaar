import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, product, currentLanguage }) => {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const downloadUrl = `https://creatorBazaar.com/download/${product.id}`;

  const handleDownload = () => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = product.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {currentLanguage === 'hi' ? 'भुगतान सफल!' : 'Payment Successful!'}
          </h2>
          <p className="text-text-secondary mb-6">
            {currentLanguage === 'hi' ?'आपका ऑर्डर पूरा हो गया है। अब आप अपना उत्पाद डाउनलोड कर सकते हैं।' :'Your order is complete. You can now download your product.'
            }
          </p>

          {/* Product Info */}
          <div className="bg-primary-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-text-primary mb-2">{product.title}</h3>
            <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={14} />
                <span>{product.fileType.toUpperCase()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Download" size={14} />
                <span>{(product.fileSize / (1024 * 1024)).toFixed(1)} MB</span>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <Button
            variant="primary"
            fullWidth
            onClick={handleDownload}
            iconName="Download"
            iconPosition="left"
            className="mb-4 text-lg py-4"
          >
            {currentLanguage === 'hi' ? 'अभी डाउनलोड करें' : 'Download Now'}
          </Button>

          {/* Additional Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
              <Icon name="Mail" size={14} />
              <span>
                {currentLanguage === 'hi' ?'डाउनलोड लिंक आपके ईमेल पर भेजा गया है' :'Download link sent to your email'
                }
              </span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
              <Icon name="Clock" size={14} />
              <span>
                {currentLanguage === 'hi' ?'लिंक 30 दिन तक वैध है' :'Link valid for 30 days'
                }
              </span>
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-text-secondary"
          >
            {currentLanguage === 'hi' ? 'बंद करें' : 'Close'}
          </Button>

          {/* Auto close notice */}
          <p className="text-xs text-text-tertiary mt-4">
            {currentLanguage === 'hi' ?'यह विंडो 5 सेकंड में अपने आप बंद हो जाएगी' :'This window will close automatically in 5 seconds'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
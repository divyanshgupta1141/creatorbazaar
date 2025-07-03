import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ product, onDelete, onSave, onPreview, currentLanguage }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onDelete(product.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePreview = () => {
    // Open product preview in new tab
    const previewUrl = `/product-detail-page?id=${product.id}`;
    window.open(previewUrl, '_blank');
    onPreview && onPreview();
  };

  return (
    <>
      <div className="bg-surface rounded-xl border border-border shadow-md">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-text-primary">
            {currentLanguage === 'hi' ? 'क्रियाएं' : 'Actions'}
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            {currentLanguage === 'hi' ?'अपने उत्पाद को प्रबंधित करें' :'Manage your product'
            }
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* Primary Actions */}
          <div className="space-y-3">
            <Button
              variant="primary"
              iconName="Eye"
              iconPosition="left"
              onClick={handlePreview}
              fullWidth
              className="justify-center"
            >
              {currentLanguage === 'hi' ? 'उत्पाद पूर्वावलोकन' : 'Preview Product'}
            </Button>

            <Button
              variant="success"
              iconName="Save"
              iconPosition="left"
              onClick={onSave}
              fullWidth
              className="justify-center"
            >
              {currentLanguage === 'hi' ? 'परिवर्तन सहेजें' : 'Save Changes'}
            </Button>
          </div>

          {/* Secondary Actions */}
          <div className="pt-4 border-t border-border space-y-3">
            <Button
              variant="outline"
              iconName="Copy"
              iconPosition="left"
              onClick={() => {
                const productUrl = `https://creatorbazaar.com/p/${product.id}`;
                navigator.clipboard.writeText(productUrl);
              }}
              fullWidth
              className="justify-center"
            >
              {currentLanguage === 'hi' ? 'लिंक कॉपी करें' : 'Copy Link'}
            </Button>

            <Button
              variant="outline"
              iconName="Share2"
              iconPosition="left"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: product.title,
                    text: product.description,
                    url: `https://creatorbazaar.com/p/${product.id}`
                  });
                }
              }}
              fullWidth
              className="justify-center"
            >
              {currentLanguage === 'hi' ? 'साझा करें' : 'Share Product'}
            </Button>

            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={() => {
                // Simulate file download
                const link = document.createElement('a');
                link.href = '#';
                link.download = product.fileName;
                link.click();
              }}
              fullWidth
              className="justify-center"
            >
              {currentLanguage === 'hi' ? 'फ़ाइल डाउनलोड करें' : 'Download File'}
            </Button>
          </div>

          {/* Status Toggle */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
              <div>
                <div className="text-sm font-medium text-text-primary">
                  {currentLanguage === 'hi' ? 'उत्पाद स्थिति' : 'Product Status'}
                </div>
                <div className="text-xs text-text-secondary">
                  {product.status === 'active' 
                    ? (currentLanguage === 'hi' ? 'उत्पाद सक्रिय है' : 'Product is active')
                    : (currentLanguage === 'hi' ? 'उत्पाद निष्क्रिय है' : 'Product is inactive')
                  }
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={product.status === 'active'}
                  onChange={(e) => {
                    const newStatus = e.target.checked ? 'active' : 'inactive';
                    onSave({ ...product, status: newStatus });
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="pt-4 border-t border-error-200">
            <div className="bg-error-50 rounded-lg p-4 border border-error-200">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-error-800">
                    {currentLanguage === 'hi' ? 'खतरनाक क्षेत्र' : 'Danger Zone'}
                  </h4>
                  <p className="text-xs text-error-700 mt-1">
                    {currentLanguage === 'hi' ?'उत्पाद को हटाने से सभी डेटा स्थायी रूप से मिट जाएगा।' :'Deleting product will permanently remove all data.'
                    }
                  </p>
                  <Button
                    variant="danger"
                    size="sm"
                    iconName="Trash2"
                    iconPosition="left"
                    onClick={() => setShowDeleteModal(true)}
                    className="mt-3"
                  >
                    {currentLanguage === 'hi' ? 'उत्पाद हटाएं' : 'Delete Product'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-error-50 rounded-full flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-error-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">
                    {currentLanguage === 'hi' ? 'उत्पाद हटाएं' : 'Delete Product'}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {currentLanguage === 'hi' ? 'यह क्रिया पूर्ववत नहीं की जा सकती' : 'This action cannot be undone'}
                  </p>
                </div>
              </div>

              <div className="bg-error-50 rounded-lg p-4 border border-error-200 mb-6">
                <p className="text-sm text-error-800">
                  {currentLanguage === 'hi' 
                    ? `क्या आप वाकई "${product.title}" को हटाना चाहते हैं? यह सभी संबंधित डेटा, बिक्री रिकॉर्ड और एनालिटिक्स को स्थायी रूप से मिटा देगा।`
                    : `Are you sure you want to delete "${product.title}"? This will permanently remove all associated data, sales records, and analytics.`
                  }
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="danger"
                  loading={isDeleting}
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={handleDeleteConfirm}
                  className="flex-1"
                >
                  {isDeleting 
                    ? (currentLanguage === 'hi' ? 'हटाया जा रहा है...' : 'Deleting...')
                    : (currentLanguage === 'hi' ? 'हां, हटाएं' : 'Yes, Delete')
                  }
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                  className="flex-1"
                >
                  {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionButtons;
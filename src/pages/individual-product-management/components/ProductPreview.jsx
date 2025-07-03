import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProductPreview = ({ product, currentLanguage }) => {
  const getFileIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'mp4':
        return 'Video';
      case 'zip':
        return 'Archive';
      default:
        return 'File';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-md overflow-hidden">
      {/* Product Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-text-primary mb-2 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-text-secondary text-sm line-clamp-3">
              {product.description}
            </p>
          </div>
          <div className="ml-4 text-right">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </div>
            <div className="text-xs text-text-secondary mt-1">
              {currentLanguage === 'hi' ? 'मूल्य' : 'Price'}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center space-x-2">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            product.status === 'active' ?'bg-success-50 text-success-700 border border-success-200' :'bg-warning-50 text-warning-700 border border-warning-200'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-1 ${
              product.status === 'active' ? 'bg-success-500' : 'bg-warning-500'
            }`} />
            {product.status === 'active' 
              ? (currentLanguage === 'hi' ? 'सक्रिय' : 'Active')
              : (currentLanguage === 'hi' ? 'निष्क्रिय' : 'Inactive')
            }
          </div>
          <div className="text-xs text-text-secondary">
            {currentLanguage === 'hi' ? 'अपडेट:' : 'Updated:'} {product.updatedAt}
          </div>
        </div>
      </div>

      {/* File Information */}
      <div className="p-6 bg-background-secondary">
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          {currentLanguage === 'hi' ? 'फ़ाइल जानकारी' : 'File Information'}
        </h3>
        
        <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg border border-border">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon 
                name={getFileIcon(product.fileType)} 
                size={20} 
                className="text-primary"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-text-primary truncate">
              {product.fileName}
            </div>
            <div className="text-xs text-text-secondary mt-1">
              {product.fileType?.toUpperCase()} • {formatFileSize(product.fileSize)}
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200">
              <Icon name="Download" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Preview Image */}
      {product.previewImage && (
        <div className="p-6 border-t border-border">
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            {currentLanguage === 'hi' ? 'पूर्वावलोकन' : 'Preview'}
          </h3>
          <div className="aspect-video bg-background-secondary rounded-lg overflow-hidden border border-border">
            <Image
              src={product.previewImage}
              alt={`Preview of ${product.title}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="p-6 border-t border-border bg-background-secondary">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary">
              {product.totalViews?.toLocaleString('en-IN') || '0'}
            </div>
            <div className="text-xs text-text-secondary">
              {currentLanguage === 'hi' ? 'व्यूज' : 'Views'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary">
              {product.totalSales || '0'}
            </div>
            <div className="text-xs text-text-secondary">
              {currentLanguage === 'hi' ? 'बिक्री' : 'Sales'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success-600">
              {formatPrice(product.totalRevenue || 0)}
            </div>
            <div className="text-xs text-text-secondary">
              {currentLanguage === 'hi' ? 'आय' : 'Revenue'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
import React from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, currentLanguage, onProductClick }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getFileTypeIcon = (fileType) => {
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

  return (
    <div className="bg-surface rounded-xl p-6 shadow-lg border border-border">
      <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center space-x-2">
        <Icon name="Grid3x3" size={20} />
        <span>{currentLanguage === 'hi' ? 'संबंधित उत्पाद' : 'Related Products'}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-background rounded-lg p-4 border border-border hover:border-primary-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
            onClick={() => onProductClick(product.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon 
                  name={getFileTypeIcon(product.fileType)} 
                  size={20} 
                  className="text-primary"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-1">
                  {product.title}
                </h4>
                <p className="text-sm text-text-secondary mb-2">
                  {product.creator}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-text-tertiary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{product.views.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-primary">
                    {formatPrice(product.price)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button
          variant="outline"
          iconName="ArrowRight"
          iconPosition="right"
        >
          {currentLanguage === 'hi' ? 'और देखें' : 'View More'}
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;
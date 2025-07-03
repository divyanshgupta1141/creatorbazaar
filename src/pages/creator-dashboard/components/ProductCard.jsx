import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const ProductCard = ({ product, onEdit, onDelete, onToggleStatus, onCopyLink }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'mp4': case'video':
        return 'Video';
      case 'zip':
        return 'Archive';
      default:
        return 'File';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success-50';
      case 'draft':
        return 'text-warning bg-warning-50';
      case 'inactive':
        return 'text-error bg-error-50';
      default:
        return 'text-text-secondary bg-background-secondary';
    }
  };

  const getStatusText = (status) => {
    if (currentLanguage === 'hi') {
      switch (status) {
        case 'active':
          return 'सक्रिय';
        case 'draft':
          return 'मसौदा';
        case 'inactive':
          return 'निष्क्रिय';
        default:
          return status;
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-sm hover:shadow-md spring-transition glow-effect overflow-hidden">
      {/* Product Image/Icon */}
      <div className="relative h-48 bg-background-secondary overflow-hidden">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
            <Icon 
              name={getFileIcon(product.type)} 
              size={48} 
              className="text-primary opacity-60"
            />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
          {getStatusText(product.status)}
        </div>

        {/* Actions Menu */}
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setShowActions(!showActions)}
            className="w-8 h-8 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-text-secondary hover:text-primary spring-transition"
          >
            <Icon name="MoreVertical" size={16} />
          </button>
          
          {showActions && (
            <div className="absolute top-10 right-0 bg-surface border border-border rounded-lg shadow-lg py-1 z-10 min-w-[140px]">
              <button
                onClick={() => {
                  onEdit(product);
                  setShowActions(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:text-primary hover:bg-primary-50 flex items-center space-x-2"
              >
                <Icon name="Edit" size={14} />
                <span>{currentLanguage === 'hi' ? 'संपादित करें' : 'Edit'}</span>
              </button>
              <button
                onClick={() => {
                  onCopyLink(product);
                  setShowActions(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:text-primary hover:bg-primary-50 flex items-center space-x-2"
              >
                <Icon name="Link" size={14} />
                <span>{currentLanguage === 'hi' ? 'लिंक कॉपी करें' : 'Copy Link'}</span>
              </button>
              <button
                onClick={() => {
                  onToggleStatus(product);
                  setShowActions(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-text-secondary hover:text-primary hover:bg-primary-50 flex items-center space-x-2"
              >
                <Icon name={product.status === 'active' ? 'Pause' : 'Play'} size={14} />
                <span>
                  {product.status === 'active' 
                    ? (currentLanguage === 'hi' ? 'रोकें' : 'Pause')
                    : (currentLanguage === 'hi' ? 'सक्रिय करें' : 'Activate')
                  }
                </span>
              </button>
              <hr className="my-1 border-border" />
              <button
                onClick={() => {
                  onDelete(product);
                  setShowActions(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-error hover:bg-error-50 flex items-center space-x-2"
              >
                <Icon name="Trash2" size={14} />
                <span>{currentLanguage === 'hi' ? 'हटाएं' : 'Delete'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-text-primary line-clamp-2 flex-1">
            {product.title}
          </h3>
          <div className="ml-2 flex items-center space-x-1 text-text-secondary">
            <Icon name={getFileIcon(product.type)} size={16} />
            <span className="text-xs uppercase font-medium">{product.type}</span>
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing and Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-primary">
            {formatCurrency(product.price)}
          </div>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{product.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ShoppingCart" size={14} />
              <span>{product.sales}</span>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ? 'कुल आय:' : 'Total Revenue:'}
          </span>
          <span className="font-semibold text-success">
            {formatCurrency(product.revenue)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
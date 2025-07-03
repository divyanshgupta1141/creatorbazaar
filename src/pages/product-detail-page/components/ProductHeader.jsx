import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductHeader = ({ product, currentLanguage }) => {
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

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-lg border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="User" size={16} />
              <span>{product.creator}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={16} />
              <span>{product.views.toLocaleString('en-IN')} {currentLanguage === 'hi' ? 'व्यू' : 'views'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-primary-50 px-3 py-2 rounded-lg">
          <Icon name={getFileTypeIcon(product.fileType)} size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary uppercase">{product.fileType}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={16} />
            <span>{formatFileSize(product.fileSize)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} />
            <span>{new Date(product.uploadDate).toLocaleDateString('en-IN')}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm text-success font-medium">
            {currentLanguage === 'hi' ? 'सत्यापित' : 'Verified'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
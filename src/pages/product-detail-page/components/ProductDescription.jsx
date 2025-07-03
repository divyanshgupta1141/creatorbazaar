import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductDescription = ({ product, currentLanguage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;
  const shouldTruncate = product.description.length > maxLength;

  const displayDescription = shouldTruncate && !isExpanded 
    ? product.description.substring(0, maxLength) + '...'
    : product.description;

  return (
    <div className="bg-surface rounded-xl p-6 shadow-lg border border-border">
      <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
        <Icon name="FileText" size={20} />
        <span>{currentLanguage === 'hi' ? 'विवरण' : 'Description'}</span>
      </h2>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-text-secondary leading-relaxed whitespace-pre-line">
          {displayDescription}
        </p>
        
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-primary hover:text-primary-600 font-medium text-sm flex items-center space-x-1 transition-colors duration-200"
          >
            <span>
              {isExpanded 
                ? (currentLanguage === 'hi' ? 'कम दिखाएं' : 'Show Less')
                : (currentLanguage === 'hi' ? 'और पढ़ें' : 'Read More')
              }
            </span>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent-50 text-accent-700 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
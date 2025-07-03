import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Breadcrumb = ({ product, currentLanguage }) => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    {
      label: currentLanguage === 'hi' ? 'होम' : 'Home',
      path: '/homepage',
      icon: 'Home'
    },
    {
      label: currentLanguage === 'hi' ? 'उत्पाद' : 'Products',
      path: '/homepage',
      icon: 'Package'
    },
    {
      label: product.title,
      path: null,
      icon: null,
      current: true
    }
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-text-tertiary" />
          )}
          {item.current ? (
            <span className="text-text-primary font-medium truncate max-w-xs">
              {item.label}
            </span>
          ) : (
            <button
              onClick={() => navigate(item.path)}
              className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
            >
              {item.icon && <Icon name={item.icon} size={14} />}
              <span>{item.label}</span>
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
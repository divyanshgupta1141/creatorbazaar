import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const navItems = [
    {
      id: 'home',
      label: currentLanguage === 'hi' ? 'होम' : 'Home',
      icon: 'Home',
      path: '/homepage'
    },
    {
      id: 'explore',
      label: currentLanguage === 'hi' ? 'खोजें' : 'Explore',
      icon: 'Search',
      path: '/explore'
    },
    {
      id: 'upload',
      label: currentLanguage === 'hi' ? 'अपलोड' : 'Upload',
      icon: 'Plus',
      path: '/product-upload'
    },
    {
      id: 'dashboard',
      label: currentLanguage === 'hi' ? 'डैशबोर्ड' : 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/creator-dashboard'
    },
    {
      id: 'support',
      label: currentLanguage === 'hi' ? 'सहायता' : 'Support',
      icon: 'HelpCircle',
      path: '/help'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border safe-area-bottom md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.path)}
            className={`mobile-nav-item ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            <Icon 
              name={item.icon} 
              size={20} 
              className={location.pathname === item.path ? 'text-primary' : 'text-text-secondary'}
            />
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
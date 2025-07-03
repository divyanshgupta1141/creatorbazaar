import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const EarningsSummary = () => {
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

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    } else {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
  };

  const earningsData = [
    {
      id: 1,
      title: currentLanguage === 'hi' ? 'कुल आय' : 'Total Revenue',
      amount: 2847500,
      change: 12.5,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success-50',
      iconColor: 'text-success'
    },
    {
      id: 2,
      title: currentLanguage === 'hi' ? 'मासिक बिक्री' : 'Monthly Sales',
      amount: 485600,
      change: 8.3,
      icon: 'ShoppingCart',
      color: 'text-primary',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary'
    },
    {
      id: 3,
      title: currentLanguage === 'hi' ? 'सक्रिय उत्पाद' : 'Active Products',
      amount: 24,
      change: 4.2,
      icon: 'Package',
      color: 'text-accent',
      bgColor: 'bg-accent-50',
      iconColor: 'text-accent',
      isCount: true
    },
    {
      id: 4,
      title: currentLanguage === 'hi' ? 'औसत बिक्री' : 'Average Sale',
      amount: 1250,
      change: -2.1,
      icon: 'BarChart3',
      color: 'text-warning',
      bgColor: 'bg-warning-50',
      iconColor: 'text-warning'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {earningsData.map((item) => (
        <div
          key={item.id}
          className="bg-surface rounded-xl p-6 border border-border shadow-sm hover:shadow-md spring-transition glow-effect"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={item.icon} size={24} className={item.iconColor} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              item.change >= 0 ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={item.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{Math.abs(item.change)}%</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-text-primary">
              {item.isCount ? item.amount : formatCurrency(item.amount)}
            </h3>
            <p className="text-sm text-text-secondary font-medium">
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EarningsSummary;
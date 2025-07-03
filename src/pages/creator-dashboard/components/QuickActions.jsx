import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const navigate = useNavigate();
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

  const quickActions = [
    {
      id: 'upload',
      title: currentLanguage === 'hi' ? 'नया उत्पाद अपलोड करें' : 'Upload New Product',
      description: currentLanguage === 'hi' ? 'अपना अगला डिजिटल उत्पाद जोड़ें' : 'Add your next digital product',
      icon: 'Upload',
      color: 'bg-primary text-primary-foreground',
      hoverColor: 'hover:bg-primary-600',
      action: () => navigate('/product-upload')
    },
    {
      id: 'manage',
      title: currentLanguage === 'hi' ? 'उत्पाद प्रबंधित करें' : 'Manage Products',
      description: currentLanguage === 'hi' ? 'अपने उत्पादों को संपादित करें और अपडेट करें' : 'Edit and update your products',
      icon: 'Settings',
      color: 'bg-accent text-accent-foreground',
      hoverColor: 'hover:bg-accent-600',
      action: () => navigate('/individual-product-management')
    },
    {
      id: 'share',
      title: currentLanguage === 'hi' ? 'प्रोफाइल साझा करें' : 'Share Profile',
      description: currentLanguage === 'hi' ? 'अपना क्रिएटर प्रोफाइल साझा करें' : 'Share your creator profile',
      icon: 'Share2',
      color: 'bg-success text-success-foreground',
      hoverColor: 'hover:bg-success-600',
      action: () => {
        const profileUrl = `${window.location.origin}/creator/profile`;
        navigator.clipboard.writeText(profileUrl);
        alert(currentLanguage === 'hi' ?'प्रोफाइल लिंक कॉपी हो गया!' :'Profile link copied!'
        );
      }
    },
    {
      id: 'analytics',
      title: currentLanguage === 'hi' ? 'विस्तृत एनालिटिक्स' : 'Detailed Analytics',
      description: currentLanguage === 'hi' ? 'गहरी अंतर्दृष्टि और रिपोर्ट देखें' : 'View deep insights and reports',
      icon: 'BarChart3',
      color: 'bg-warning text-warning-foreground',
      hoverColor: 'hover:bg-warning-600',
      action: () => {
        alert(currentLanguage === 'hi' ?'विस्तृत एनालिटिक्स जल्द आ रहा है!' :'Detailed analytics coming soon!'
        );
      }
    }
  ];

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary-50 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-secondary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            {currentLanguage === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
          </h2>
          <p className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ?'अपने व्यवसाय को तेज़ी से बढ़ाएं' :'Accelerate your business growth'
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`${action.color} ${action.hoverColor} rounded-lg p-4 text-left spring-transition glow-effect group`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 spring-transition">
                <Icon name={action.icon} size={18} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
              <Icon name="ArrowRight" size={16} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 spring-transition" />
            </div>
          </button>
        ))}
      </div>

      {/* Additional Tips */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
            <div>
              <h3 className="font-medium text-primary mb-1">
                {currentLanguage === 'hi' ? 'प्रो टिप' : 'Pro Tip'}
              </h3>
              <p className="text-sm text-primary opacity-80">
                {currentLanguage === 'hi' ?'नियमित रूप से नए उत्पाद अपलोड करने से आपकी दृश्यता और बिक्री बढ़ती है।' :'Regular product uploads increase your visibility and sales potential.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
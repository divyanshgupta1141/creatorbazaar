import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
      navigate('/homepage');
    } else {
      navigate('/authentication-modal');
    }
  };

  const navigationItems = [
    { 
      label: currentLanguage === 'hi' ? 'होम' : 'Home', 
      path: '/homepage',
      icon: 'Home'
    },
    { 
      label: currentLanguage === 'hi' ? 'अपलोड' : 'Upload', 
      path: '/product-upload',
      icon: 'Upload',
      requiresAuth: true
    },
    { 
      label: currentLanguage === 'hi' ? 'डैशबोर्ड' : 'Dashboard', 
      path: '/creator-dashboard',
      icon: 'LayoutDashboard',
      requiresAuth: true
    },
    { 
      label: currentLanguage === 'hi' ? 'उत्पाद प्रबंधन' : 'Manage Products', 
      path: '/individual-product-management',
      icon: 'Package',
      requiresAuth: true
    }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    !item.requiresAuth || isAuthenticated
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-[25px] border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('/homepage')}
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:shadow-glow transition-shadow duration-200">
                <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary tracking-tight">
                  CreatorBazaar
                </span>
                <span className="text-xs text-text-secondary -mt-1 hidden sm:block">
                  {currentLanguage === 'hi' ? 'रचनाकारों का बाज़ार' : 'Creator Marketplace'}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {filteredNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 spring-transition touch-target ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-text-secondary hover:text-primary hover:bg-primary-50 glow-effect'
                }`}
              >
                <Icon name={item.icon} size={16} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-surface border border-border rounded-lg px-3 py-2 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer spring-transition"
              >
                <option value="en">EN</option>
                <option value="hi">हिं</option>
              </select>
              <Icon 
                name="ChevronDown" 
                size={14} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-text-secondary"
              />
            </div>

            {/* Auth Button */}
            <Button
              variant={isAuthenticated ? "outline" : "primary"}
              onClick={handleAuthAction}
              iconName={isAuthenticated ? "LogOut" : "LogIn"}
              iconPosition="left"
              className="spring-transition glow-effect"
            >
              {isAuthenticated 
                ? (currentLanguage === 'hi' ? 'लॉग आउट' : 'Logout')
                : (currentLanguage === 'hi' ? 'लॉग इन' : 'Login')
              }
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200 touch-target"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface/98 backdrop-blur-[25px] border-t border-border shadow-lg animate-slide-down">
          <div className="px-4 py-4 space-y-2">
            {filteredNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200 spring-transition touch-target ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-text-secondary hover:text-primary hover:bg-primary-50'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            ))}
            
            <div className="pt-4 border-t border-border mt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-text-secondary">
                  {currentLanguage === 'hi' ? 'भाषा' : 'Language'}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                      currentLanguage === 'en' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange('hi')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                      currentLanguage === 'hi' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                    }`}
                  >
                    हिं
                  </button>
                </div>
              </div>
              
              <Button
                variant={isAuthenticated ? "outline" : "primary"}
                onClick={handleAuthAction}
                iconName={isAuthenticated ? "LogOut" : "LogIn"}
                iconPosition="left"
                fullWidth
                className="spring-transition"
              >
                {isAuthenticated 
                  ? (currentLanguage === 'hi' ? 'लॉग आउट' : 'Logout')
                  : (currentLanguage === 'hi' ? 'लॉग इन' : 'Login')
                }
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // If user is authenticated and on public pages, redirect to dashboard
    if (authStatus && location.pathname === '/') {
      navigate('/dashboard');
    }

    // Initialize dark mode from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    // Apply dark mode to document immediately
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
      navigate('/');
    } else {
      navigate('/authentication-modal');
    }
  };

  const navigationItems = [
    { 
      label: 'Home', 
      path: '/',
      icon: 'Home'
    },
    { 
      label: 'Explore', 
      path: '/explore',
      icon: 'Search'
    },
    { 
      label: 'Upload', 
      path: '/product-upload',
      icon: 'Upload',
      requiresAuth: true
    },
    { 
      label: 'Dashboard', 
      path: '/dashboard',
      icon: 'LayoutDashboard',
      requiresAuth: true
    }
  ];

  const filteredNavItems = navigationItems.filter(item => 
    !item.requiresAuth || isAuthenticated
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-[25px] border-b border-border shadow-sm transition-colors duration-300">
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
                  Creator Marketplace
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
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-50 transition-all duration-200 touch-target"
              aria-label="Toggle dark mode"
            >
              <Icon name={isDarkMode ? "Sun" : "Moon"} size={20} />
            </button>

            {/* Auth Button */}
            <Button
              variant={isAuthenticated ? "outline" : "primary"}
              onClick={handleAuthAction}
              iconName={isAuthenticated ? "LogOut" : "LogIn"}
              iconPosition="left"
              className="spring-transition glow-effect"
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200 touch-target"
              aria-label="Toggle dark mode"
            >
              <Icon name={isDarkMode ? "Sun" : "Moon"} size={20} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200 touch-target"
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
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
              <Button
                variant={isAuthenticated ? "outline" : "primary"}
                onClick={handleAuthAction}
                iconName={isAuthenticated ? "LogOut" : "LogIn"}
                iconPosition="left"
                fullWidth
                className="spring-transition"
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
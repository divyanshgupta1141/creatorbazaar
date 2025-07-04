import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import { isAuthenticated, logoutUser } from '../../utils/authUtils';

const DashboardLayout = ({ children, currentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Check authentication before rendering
  useLayoutEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
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

  const handleLogout = () => {
    logoutUser();
    navigate('/homepage');
  };

  const sidebarItems = [
    { icon: 'Home', label: currentLanguage === 'hi' ? 'होम' : 'Home', path: '/creator-dashboard', key: 'home' },
    { icon: 'Package', label: currentLanguage === 'hi' ? 'उत्पाद' : 'Products', path: '/dashboard/products', key: 'products' },
    { icon: 'Upload', label: currentLanguage === 'hi' ? 'अपलोड' : 'Upload', path: '/dashboard/upload', key: 'upload' },
    { icon: 'Users', label: currentLanguage === 'hi' ? 'सहयोगी' : 'Collaborators', path: '/dashboard/collaborators', key: 'collaborators' },
    { icon: 'Mail', label: currentLanguage === 'hi' ? 'ईमेल' : 'Emails', path: '/dashboard/emails', key: 'emails' },
    { icon: 'DollarSign', label: currentLanguage === 'hi' ? 'बिक्री' : 'Sales', path: '/dashboard/sales', key: 'sales' },
    { icon: 'BarChart3', label: currentLanguage === 'hi' ? 'एनालिटिक्स' : 'Analytics', path: '/dashboard/analytics', key: 'analytics' },
    { icon: 'Settings', label: currentLanguage === 'hi' ? 'सेटिंग्स' : 'Settings', path: '/dashboard/settings', key: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`} style={{ backgroundColor: '#005F65' }}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center space-x-2" onClick={() => navigate('/dashboard')}>
            <div className="w-8 h-8 bg-gradient-to-br from-highlight to-accent rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-lg font-bold text-white">CreatorBazaar</div>
              <div className="text-xs text-white/60 -mt-1">
                {currentLanguage === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = currentPage === item.key || location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 min-h-[44px] ${
                    isActive
                      ? 'bg-highlight text-black font-semibold shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon name={item.icon} size={20} strokeWidth={2} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 min-h-[44px]"
          >
            <Icon name="LogOut" size={20} />
            <span className="font-medium">{currentLanguage === 'hi' ? 'लॉग आउट' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Icon name="Menu" size={24} />
          </button>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              <Icon name={isDarkMode ? "Sun" : "Moon"} size={20} />
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="text-gray-900 text-sm hidden sm:block font-medium">
                {localStorage.getItem('userName') || 'Creator'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
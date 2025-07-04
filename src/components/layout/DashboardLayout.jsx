import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const DashboardLayout = ({ children, currentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
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
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/homepage');
  };

  const sidebarItems = [
    { icon: 'Home', label: 'Home', path: '/creator-dashboard', key: 'home' },
    { icon: 'Package', label: 'Products', path: '/dashboard/products', key: 'products' },
    { icon: 'Upload', label: 'Upload', path: '/product-upload', key: 'upload' },
    { icon: 'Users', label: 'Collaborators', path: '/dashboard/collaborators', key: 'collaborators' },
    { icon: 'Mail', label: 'Emails', path: '/dashboard/emails', key: 'emails' },
    { icon: 'DollarSign', label: 'Sales', path: '/dashboard/sales', key: 'sales' },
    { icon: 'BarChart3', label: 'Analytics', path: '/dashboard/analytics', key: 'analytics' },
    { icon: 'Settings', label: 'Settings', path: '/dashboard/settings', key: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-primary-600">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-highlight rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-lg font-bold text-white">CreatorBazaar</div>
              <div className="text-xs text-white/60 -mt-1">Dashboard</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-white/60 hover:text-white"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = currentPage === item.key || (currentPage === 'home' && item.key === 'home') || location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 touch-target ${
                    isActive
                      ? 'bg-highlight text-black font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-primary-600'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-primary-600 transition-colors duration-200 touch-target"
          >
            <Icon name="LogOut" size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-dark-surface border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-white/60 hover:text-white"
          >
            <Icon name="Menu" size={24} />
          </button>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 touch-target"
              aria-label="Toggle dark mode"
            >
              <Icon name={isDarkMode ? "Sun" : "Moon"} size={20} />
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="text-white text-sm hidden sm:block">
                {localStorage.getItem('userName') || 'Creator'}
              </span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-dark-bg">
          <div className="container mx-auto px-6 py-8">
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
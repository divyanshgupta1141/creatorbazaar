import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Create auth context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      const userEmail = localStorage.getItem('userEmail');
      const userName = localStorage.getItem('userName');
      
      setIsAuthenticated(authStatus);
      
      if (authStatus && userEmail) {
        setUser({
          email: userEmail,
          name: userName || 'User',
        });
      } else {
        setUser(null);
      }
      
      setLoading(false);
    };

    // Listen for storage events (for multi-tab support)
    window.addEventListener('storage', checkAuth);
    
    // Check auth on mount
    checkAuth();
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Handle redirects based on auth status
  useEffect(() => {
    if (loading) return;

    const path = location.pathname;
    
    // If user is authenticated and trying to access public auth pages
    if (isAuthenticated && (path === '/login' || path === '/signup' || path === '/authentication-modal')) {
      navigate('/dashboard');
    }
    
    // If user is not authenticated and trying to access protected routes
    if (!isAuthenticated && path.startsWith('/dashboard')) {
      navigate('/login', { state: { from: path } });
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  // Login function
  const login = (userData) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', userData.email);
    if (userData.name) {
      localStorage.setItem('userName', userData.name);
    }
    localStorage.setItem('authTimestamp', Date.now().toString());
    
    setIsAuthenticated(true);
    setUser(userData);
    
    // Redirect to dashboard or intended page
    const from = location.state?.from || '/dashboard';
    navigate(from);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('authTimestamp');
    
    setIsAuthenticated(false);
    setUser(null);
    
    navigate('/');
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
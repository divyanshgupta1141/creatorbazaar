import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, isDashboardRoute, isPublicRoute } from '../utils/authUtils';

/**
 * ProtectedRoute - Component to protect routes based on authentication status
 * @param {object} props Component props
 * @param {React.ReactNode} props.children Child components
 * @returns {React.ReactNode} Protected route component
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authenticated = isAuthenticated();
  const isDashboard = isDashboardRoute(location.pathname);
  const isPublic = isPublicRoute(location.pathname);

  useEffect(() => {
    // When route changes, check if we need to redirect
    if (authenticated && isPublic) {
      // Authenticated users accessing public pages should be redirected to dashboard
      console.log('Authenticated user accessing public route, redirecting to dashboard');
    } else if (!authenticated && isDashboard) {
      // Unauthenticated users accessing dashboard should be redirected to login
      console.log('Unauthenticated user accessing dashboard route, redirecting to login');
    }
  }, [location.pathname, authenticated, isDashboard, isPublic]);

  // Handle redirection logic
  if (authenticated && isPublic) {
    // Redirect authenticated users from public pages to dashboard
    return <Navigate to="/dashboard" replace />;
  } else if (!authenticated && isDashboard) {
    // Redirect unauthenticated users from dashboard to login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Allow access to login and register pages regardless of auth status
  if (location.pathname === '/login' || location.pathname === '/signup' || 
      location.pathname === '/authentication-modal') {
    return children;
  }

  // For any other route, render children
  return children;
};

export default ProtectedRoute;
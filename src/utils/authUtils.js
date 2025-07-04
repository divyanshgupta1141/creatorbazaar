/**
 * AuthUtils - Authentication utility functions
 */

/**
 * Check if user is authenticated
 * @returns {boolean} Authentication status
 */
export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

/**
 * Authenticate user
 * @param {object} userData User data to store
 */
export const authenticateUser = (userData = {}) => {
  localStorage.setItem('isAuthenticated', 'true');
  if (userData.email) localStorage.setItem('userEmail', userData.email);
  if (userData.name) localStorage.setItem('userName', userData.name);
  if (userData.phone) localStorage.setItem('userPhone', userData.phone);
  localStorage.setItem('authTimestamp', Date.now().toString());
};

/**
 * Logout user
 */
export const logoutUser = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('userPhone');
  localStorage.removeItem('authTimestamp');
};

/**
 * Get user data
 * @returns {object} User data
 */
export const getUserData = () => {
  if (!isAuthenticated()) return null;
  
  return {
    email: localStorage.getItem('userEmail'),
    name: localStorage.getItem('userName'),
    phone: localStorage.getItem('userPhone'),
  };
};

/**
 * Check if route is a dashboard route
 * @param {string} pathname Route path
 * @returns {boolean} Is dashboard route
 */
export const isDashboardRoute = (pathname) => {
  return pathname.startsWith('/dashboard') || 
         pathname === '/creator-dashboard' || 
         pathname === '/individual-product-management';
};

/**
 * Check if route is a public route
 * @param {string} pathname Route path
 * @returns {boolean} Is public route
 */
export const isPublicRoute = (pathname) => {
  const publicRoutes = [
    '/',
    '/homepage',
    '/pricing',
    '/help',
    '/contact',
    '/terms',
    '/privacy',
    '/refunds',
    '/explore',
    '/marketplace'
  ];
  
  return publicRoutes.includes(pathname) || 
         pathname.startsWith('/category/') ||
         pathname.startsWith('/product/') || 
         pathname.startsWith('/p/');
};
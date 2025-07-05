import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import AuthProvider from "./components/AuthProvider";
// Add your imports here
import { Navigate } from "react-router-dom";
import Homepage from "pages/homepage";
import LoginPage from "pages/login";
import SignupPage from "pages/signup";
import CreateProductPage from "pages/create-product";
import AuthenticationModal from "pages/authentication-modal";
import ProductDetailPage from "pages/product-detail-page";
import ProductUpload from "pages/product-upload";
import CreatorDashboard from "pages/creator-dashboard";
import IndividualProductManagement from "pages/individual-product-management";
import UploadPage from "pages/dashboard/upload";
import ProductsPage from "pages/dashboard/products";
import CollaboratorsPage from "pages/dashboard/collaborators";
import EmailsPage from "pages/dashboard/emails";
import SalesPage from "pages/dashboard/sales";
import AnalyticsPage from "pages/dashboard/analytics";
import SettingsPage from "pages/dashboard/settings";
import PricingPage from "pages/pricing";
import HelpPage from "pages/help";
import ContactPage from "pages/contact";
import ExplorePage from "pages/explore";
import TermsPage from "pages/terms";
import PrivacyPage from "pages/privacy";
import RefundsPage from "pages/refunds";
import NotFound from "pages/NotFound";

// Auth Guard component to protect routes
const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Redirect component for authenticated users
const RedirectIfAuthenticated = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your routes here */}
            {/* Public Routes */}
            <Route path="/" element={<RedirectIfAuthenticated><Homepage /></RedirectIfAuthenticated>} />
            <Route path="/login" element={<RedirectIfAuthenticated><LoginPage /></RedirectIfAuthenticated>} />
            <Route path="/signup" element={<RedirectIfAuthenticated><SignupPage /></RedirectIfAuthenticated>} />
            <Route path="/authentication-modal" element={<AuthenticationModal />} />
            <Route path="/product-detail-page" element={<ProductDetailPage />} />
            <Route path="/product-detail-page/:id" element={<ProductDetailPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/marketplace" element={<ExplorePage />} />
            <Route path="/category/:slug" element={<ExplorePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refunds" element={<RefundsPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<AuthGuard><CreatorDashboard /></AuthGuard>} />
            <Route path="/dashboard/upload" element={<AuthGuard><UploadPage /></AuthGuard>} />
            <Route path="/dashboard/products" element={<AuthGuard><ProductsPage /></AuthGuard>} />
            <Route path="/dashboard/collaborators" element={<AuthGuard><CollaboratorsPage /></AuthGuard>} />
            <Route path="/dashboard/emails" element={<AuthGuard><EmailsPage /></AuthGuard>} />
            <Route path="/dashboard/sales" element={<AuthGuard><SalesPage /></AuthGuard>} />
            <Route path="/dashboard/analytics" element={<AuthGuard><AnalyticsPage /></AuthGuard>} />
            <Route path="/dashboard/settings" element={<AuthGuard><SettingsPage /></AuthGuard>} />
            <Route path="/individual-product-management" element={<AuthGuard><IndividualProductManagement /></AuthGuard>} />
            <Route path="/product-upload" element={<AuthGuard><ProductUpload /></AuthGuard>} />
            <Route path="/upload-product" element={<AuthGuard><ProductUpload /></AuthGuard>} />
            <Route path="/create-product" element={<AuthGuard><CreateProductPage /></AuthGuard>} />
            <Route path="/checkout" element={<AuthGuard><ProductDetailPage /></AuthGuard>} />
            <Route path="/creator/:username" element={<AuthGuard><CreatorDashboard /></AuthGuard>} />
            
            {/* Legacy routes redirects */}
            <Route path="/homepage" element={<Navigate to="/" replace />} />
            <Route path="/creator-dashboard" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
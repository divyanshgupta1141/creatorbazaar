import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import LoginPage from "pages/login";
import SignupPage from "pages/signup";
import CreateProductPage from "pages/create-product";
import AuthenticationModal from "pages/authentication-modal";
import ProductDetailPage from "pages/product-detail-page";
import ProductUpload from "pages/product-upload";
import CreatorDashboard from "pages/creator-dashboard";
import IndividualProductManagement from "pages/individual-product-management";
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

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/authentication-modal" element={<AuthenticationModal />} />
        <Route path="/product-detail-page" element={<ProductDetailPage />} />
        <Route path="/product-detail-page/:id" element={<ProductDetailPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/product-upload" element={<ProductUpload />} />
        <Route path="/upload-product" element={<ProductUpload />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/dashboard" element={<CreatorDashboard />} />
        <Route path="/dashboard/products" element={<ProductsPage />} />
        <Route path="/dashboard/collaborators" element={<CollaboratorsPage />} />
        <Route path="/dashboard/emails" element={<EmailsPage />} />
        <Route path="/dashboard/sales" element={<SalesPage />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/individual-product-management" element={<IndividualProductManagement />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/marketplace" element={<ExplorePage />} />
        <Route path="/category/:slug" element={<ExplorePage />} />
        <Route path="/checkout" element={<ProductDetailPage />} />
        <Route path="/creator/:username" element={<CreatorDashboard />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/refunds" element={<RefundsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
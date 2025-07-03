import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import AuthenticationModal from "pages/authentication-modal";
import ProductDetailPage from "pages/product-detail-page";
import ProductUpload from "pages/product-upload";
import CreatorDashboard from "pages/creator-dashboard";
import IndividualProductManagement from "pages/individual-product-management";
import ExplorePage from "pages/explore";
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
        <Route path="/authentication-modal" element={<AuthenticationModal />} />
        <Route path="/product-detail-page" element={<ProductDetailPage />} />
        <Route path="/product-detail-page/:id" element={<ProductDetailPage />} />
        <Route path="/product-upload" element={<ProductUpload />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/individual-product-management" element={<IndividualProductManagement />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
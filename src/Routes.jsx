import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import TemplateGallery from './pages/template-gallery';
import TemplateDetails from './pages/template-details';
import UserAccountDashboard from './pages/user-account-dashboard';
import CustomRequestForm from './pages/custom-request-form';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CustomRequestForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/template-gallery" element={<TemplateGallery />} />
        <Route path="/template-details" element={<TemplateDetails />} />
        <Route path="/user-account-dashboard" element={<UserAccountDashboard />} />
        <Route path="/custom-request-form" element={<CustomRequestForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

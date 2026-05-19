import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import ProjectCaseStudy from './pages/ProjectCaseStudy';
import AuthPage from './pages/AuthPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy-load the large Browse page so the portfolio JSON only loads when needed
const BrowsePage = lazy(() => import('./pages/BrowsePage'));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/"                    element={<LandingPage />} />
          <Route path="/browse"              element={<Suspense fallback={null}><BrowsePage /></Suspense>} />
          <Route path="/explore"             element={<ExplorePage />} />
          <Route path="/projects/:slug"      element={<ProjectCaseStudy />} />
          <Route path="/pricing"             element={<PricingPage />} />
          <Route path="/auth"                element={<AuthPage />} />
          <Route path="/checkout"            element={<CheckoutPage />} />
          <Route path="/checkout/success"    element={<CheckoutSuccess />} />
          <Route path="/dashboard"           element={<DashboardPage />} />
          <Route path="/about"               element={<AboutPage />} />
          <Route path="*"                    element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';

import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { BookingPage } from './pages/BookingPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { GuestDashboardPage } from './pages/GuestDashboardPage';
import { HostDashboardPage } from './pages/HostDashboardPage';
import { AuthPage } from './pages/AuthPage';

// Scroll to top helper on navigation
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

export function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-neutral-800 antialiased font-sans selection:bg-brand-coral selection:text-white">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/book/:propertyId" element={<BookingPage />} />
              <Route
                path="/booking/confirmation/:bookingId"
                element={<BookingConfirmationPage />}
              />
              <Route path="/trips" element={<GuestDashboardPage />} />
              <Route path="/host" element={<HostDashboardPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </div>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

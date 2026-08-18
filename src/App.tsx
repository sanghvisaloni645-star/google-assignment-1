import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickAddModal } from './components/QuickAddModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AnalyticsDebugPanel } from './components/AnalyticsDebugPanel';
import { ToastNotification } from './components/ToastNotification';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useStore();

  const renderCurrentView = () => {
    if (currentRoute === '/') {
      return <HomePage />;
    }
    if (currentRoute === '/shop/new') {
      return <ShopPage pageType="new" />;
    }
    if (currentRoute === '/shop/apparel') {
      return <ShopPage pageType="apparel" />;
    }
    if (currentRoute === '/shop/apparel/headgear') {
      return <ShopPage pageType="headgear" />;
    }
    if (currentRoute.startsWith('/product/')) {
      const productId = currentRoute.replace('/product/', '');
      return <ProductDetailPage productId={productId} />;
    }
    if (currentRoute === '/cart') {
      return <CartPage />;
    }
    if (currentRoute === '/checkout') {
      return <CheckoutPage />;
    }
    if (currentRoute === '/order-success') {
      return <OrderSuccessPage />;
    }

    // Default fallback to HomePage
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans selection:bg-amber-300 selection:text-stone-950">
      {/* Global Sticky Navigation */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Global Interactive Drawers & Overlays */}
      <QuickAddModal />
      <CartDrawer />
      <SearchModal />
      <AnalyticsDebugPanel />
      <ToastNotification />

      {/* Global Minimalist Footer (Hidden in checkout to minimize abandonment friction) */}
      {currentRoute !== '/checkout' && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

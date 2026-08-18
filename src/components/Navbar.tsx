import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { RoutePath } from '../types';
import {
  ShoppingBag,
  Search,
  Heart,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Activity,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsSearchOpen,
    setIsDebugOpen,
    ga4Events,
    utmParams
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; path: RoutePath; badge?: string }[] = [
    { label: 'New Arrivals', path: '/shop/new', badge: 'Hot' },
    { label: 'Apparel', path: '/shop/apparel' },
    { label: 'Headgear', path: '/shop/apparel/headgear', badge: 'West Coast' },
    { label: 'All Products', path: '/shop/new' }
  ];

  const handleNavClick = (path: RoutePath) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top Campaign Marquee / Announcement Bar */}
      <div className="bg-stone-900 text-stone-100 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-400 text-stone-950 uppercase tracking-wider">
              Drop 01
            </span>
            <span className="font-medium text-stone-200">
              West Coast Essentials: Free Express Shipping to CA & TX on orders $50+
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-stone-400 text-[11px]">
            {/* Quick UTM campaign badge */}
            <button
              onClick={() => setIsDebugOpen(true)}
              className="flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition-colors cursor-pointer"
              title="Click to inspect UTM attribution & GA4 events"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>UTM: {utmParams.utm_source || 'direct'} / {utmParams.utm_campaign || 'west_coast'}</span>
            </button>

            <button
              onClick={() => setIsDebugOpen(true)}
              className="flex items-center gap-1 hover:text-white transition-colors bg-stone-800 px-2 py-0.5 rounded border border-stone-700 cursor-pointer"
            >
              <Activity className="w-3 h-3 text-blue-400" />
              <span>GA4 Telemetry ({ga4Events.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Mobile menu button & Brand Logo */}
          <div className="flex items-center gap-3 lg:gap-8">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-stone-700 hover:text-stone-950 lg:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Google Merchandise Store Logo */}
            <div
              onClick={() => handleNavClick('/')}
              className="cursor-pointer group flex items-center gap-2.5 select-none"
            >
              {/* Google 4-Color Mark */}
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-stone-900 tracking-tight text-base sm:text-lg">
                    Google
                  </span>
                  <span className="text-stone-500 font-light text-base sm:text-lg">
                    Merch Store
                  </span>
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-stone-400 group-hover:text-stone-600 transition-colors -mt-1">
                  West Coast Essentials
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 ml-4">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.path;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.path)}
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer ${
                      isActive
                        ? 'text-stone-950 font-semibold bg-stone-100'
                        : 'text-stone-600 hover:text-stone-950 hover:bg-stone-50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-stone-900 text-white rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-stone-900 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Search catalog"
              title="Search products (e.g. Nano Banana Tee)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => handleNavClick('/shop/new')}
              className="relative p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-full transition-colors cursor-pointer hidden sm:flex"
              aria-label="View Wishlist"
              title="Wishlist items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-3 sm:px-4 py-2 rounded-full font-medium text-sm transition-transform active:scale-95 cursor-pointer shadow-sm"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="font-semibold">{cartCount}</span>
              <span className="hidden sm:inline text-xs text-stone-300">Bag</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[105px] bottom-0 bg-stone-950/60 backdrop-blur-sm z-50">
          <div className="bg-white border-b border-stone-200 p-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Collections & Drops
              </p>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className="w-full flex items-center justify-between py-3 text-left text-base font-semibold text-stone-900 border-b border-stone-100 hover:text-blue-600"
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-400 text-stone-950 rounded">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsDebugOpen(true);
                }}
                className="w-full flex items-center justify-between p-3 bg-stone-100 rounded-lg text-xs font-medium text-stone-700"
              >
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>GA4 & UTM Telemetry Panel</span>
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

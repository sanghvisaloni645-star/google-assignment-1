import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, UTMParams, GA4Event, Order, ShippingInfo, RoutePath, ProductColor } from '../types';
import { PRODUCTS } from '../data/products';

interface StoreContextType {
  // Navigation & Route
  currentRoute: RoutePath;
  navigateTo: (path: RoutePath) => void;
  
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Quick Add Modal
  quickAddProduct: Product | null;
  setQuickAddProduct: (product: Product | null) => void;

  // Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Analytics & Debug
  utmParams: UTMParams;
  setUtmParams: (params: UTMParams) => void;
  ga4Events: GA4Event[];
  trackGA4Event: (
    eventName: GA4Event['eventName'],
    parameters?: Record<string, any>
  ) => void;
  clearGA4Events: () => void;
  isDebugOpen: boolean;
  setIsDebugOpen: (open: boolean) => void;

  // Toast
  toast: {
    visible: boolean;
    title: string;
    message: string;
    item?: CartItem;
  } | null;
  hideToast: () => void;

  // Promo Code
  promoCode: string;
  discountPercentage: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };

  // Orders
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (shippingInfo: ShippingInfo, paymentMethod: Order['paymentMethod']) => Order;

  // Recently Viewed
  recentViewedIds: string[];
  addRecentView: (productId: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const DEFAULT_UTM: UTMParams = {
  utm_source: 'meta',
  utm_medium: 'paid_social',
  utm_campaign: 'west_coast_essentials',
  utm_content: 'nano_banana_carousel',
  utm_term: 'california_lookalike'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Parse Initial Route from window location
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(() => {
    const path = window.location.pathname as RoutePath;
    if (path && (path.startsWith('/shop') || path.startsWith('/product') || path === '/cart' || path === '/checkout' || path === '/order-success')) {
      return path;
    }
    return '/';
  });

  // UTM Parameters (Read from URL or localStorage or default)
  const [utmParams, setUtmParamsState] = useState<UTMParams>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const source = searchParams.get('utm_source');
    if (source) {
      const parsed: UTMParams = {
        utm_source: source,
        utm_medium: searchParams.get('utm_medium') || 'direct',
        utm_campaign: searchParams.get('utm_campaign') || 'west_coast_essentials',
        utm_content: searchParams.get('utm_content') || '',
        utm_term: searchParams.get('utm_term') || ''
      };
      localStorage.setItem('gms_utm_params', JSON.stringify(parsed));
      return parsed;
    }
    const saved = localStorage.getItem('gms_utm_params');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_UTM;
  });

  const setUtmParams = useCallback((params: UTMParams) => {
    setUtmParamsState(params);
    localStorage.setItem('gms_utm_params', JSON.stringify(params));
  }, []);

  // GA4 Event Stream
  const [ga4Events, setGa4Events] = useState<GA4Event[]>(() => {
    const saved = localStorage.getItem('gms_ga4_events');
    if (saved) {
      try {
        return JSON.parse(saved).slice(-30);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const trackGA4Event = useCallback((
    eventName: GA4Event['eventName'],
    parameters: Record<string, any> = {}
  ) => {
    const newEvent: GA4Event = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      eventName,
      parameters: {
        ...parameters,
        ...utmParams
      }
    };
    setGa4Events(prev => {
      const updated = [newEvent, ...prev].slice(0, 50);
      localStorage.setItem('gms_ga4_events', JSON.stringify(updated));
      return updated;
    });
  }, [utmParams]);

  const clearGA4Events = useCallback(() => {
    setGa4Events([]);
    localStorage.removeItem('gms_ga4_events');
  }, []);

  // Cart State (Persisted)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('gms_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    // Seed initial cart item for demo convenience (Nano Banana Tee)
    const initialProduct = PRODUCTS.find(p => p.id === 'nano-banana-tee') || PRODUCTS[0];
    return [
      {
        id: `${initialProduct.id}-L-${initialProduct.colors[0].name}`,
        product: initialProduct,
        size: 'L',
        color: initialProduct.colors[0],
        quantity: 1
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('gms_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist State (Persisted)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('gms_wishlist');
    return saved ? JSON.parse(saved) : ['nano-banana-tee', 'google-pixel-retro-5panel-cap'];
  });

  useEffect(() => {
    localStorage.setItem('gms_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Orders State (Persisted)
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gms_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(() => {
    const saved = localStorage.getItem('gms_current_order');
    return saved ? JSON.parse(saved) : null;
  });

  // Recently Viewed Product IDs
  const [recentViewedIds, setRecentViewedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('gms_recent_views');
    return saved ? JSON.parse(saved) : ['nano-banana-tee', 'google-pixel-retro-5panel-cap', 'google-heritage-heavyweight-hoodie'];
  });

  const addRecentView = useCallback((productId: string) => {
    setRecentViewedIds(prev => {
      const filtered = prev.filter(id => id !== productId);
      const updated = [productId, ...filtered].slice(0, 8);
      localStorage.setItem('gms_recent_views', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDebugOpen, setIsDebugOpen] = useState(false);

  // Toast
  const [toast, setToast] = useState<{
    visible: boolean;
    title: string;
    message: string;
    item?: CartItem;
  } | null>(null);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const applyPromoCode = useCallback((code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WESTCOAST10' || clean === 'GOOGLE10' || clean === 'SAVE10') {
      setPromoCode(clean);
      setDiscountPercentage(0.10); // 10% off
      return { success: true, message: '10% discount applied to your order!' };
    }
    if (clean === 'FREESHIP' || clean === 'WESTCOAST') {
      setPromoCode(clean);
      setDiscountPercentage(0.15); // 15% off
      return { success: true, message: '15% West Coast VIP discount applied!' };
    }
    return { success: false, message: 'Invalid promotional code. Try WESTCOAST10' };
  }, []);

  // Routing Handler
  const navigateTo = useCallback((path: RoutePath) => {
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update browser URL without reload to support shareable URLs & UTM persistence
    const search = new URLSearchParams(window.location.search);
    if (!search.has('utm_source') && utmParams.utm_source) {
      search.set('utm_source', utmParams.utm_source);
      search.set('utm_medium', utmParams.utm_medium);
      search.set('utm_campaign', utmParams.utm_campaign);
    }
    const query = search.toString() ? `?${search.toString()}` : '';
    window.history.pushState({}, '', `${path}${query}`);
  }, [utmParams]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as RoutePath;
      setCurrentRoute(path || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Cart Helpers
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50.00;

  const addToCart = useCallback((product: Product, size: string, color: ProductColor, quantity = 1) => {
    const itemKey = `${product.id}-${size}-${color.name}`;
    let addedItem: CartItem;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        addedItem = updated[existingIndex];
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemKey,
          product,
          size,
          color,
          quantity
        };
        addedItem = newItem;
        return [...prev, newItem];
      }
    });

    // GA4 Event tracking
    trackGA4Event('add_to_cart', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity,
      item_category: product.category,
      item_subcategory: product.subcategory,
      size,
      color: color.name
    });

    // Toast feedback
    setToast({
      visible: true,
      title: 'Added to Cart ✓',
      message: `${quantity}x ${product.name} (${size})`,
      item: {
        id: itemKey,
        product,
        size,
        color,
        quantity
      }
    });

    // Auto dismiss toast after 4s
    setTimeout(() => {
      setToast(curr => (curr?.title === 'Added to Cart ✓' ? null : curr));
    }, 4000);
  }, [trackGA4Event]);

  const removeFromCart = useCallback((itemId: string) => {
    const item = cart.find(i => i.id === itemId);
    if (item) {
      trackGA4Event('remove_from_cart', {
        item_id: item.product.id,
        item_name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      });
    }
    setCart(prev => prev.filter(i => i.id !== itemId));
  }, [cart, trackGA4Event]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Wishlist Helpers
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      return updated;
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  // Order Placement
  const placeOrder = useCallback((
    shippingInfo: ShippingInfo,
    paymentMethod: Order['paymentMethod']
  ): Order => {
    const subtotal = cartSubtotal;
    const discount = subtotal * discountPercentage;
    const shippingCost = shippingInfo.shippingMethod === 'express' ? 9.99 : (subtotal >= freeShippingThreshold ? 0 : 5.99);
    const tax = (subtotal - discount) * 0.0825; // 8.25% CA/TX avg tax
    const total = Number((subtotal - discount + shippingCost + tax).toFixed(2));

    const newOrder: Order = {
      id: `GMS-WC-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal,
      discount,
      shippingCost,
      tax,
      total,
      shippingInfo,
      paymentMethod,
      utmAttribution: { ...utmParams },
      status: 'processing',
      estimatedDelivery: shippingInfo.shippingMethod === 'express' ? '1-2 Business Days' : '3-5 Business Days'
    };

    // Track Purchase GA4 Event
    trackGA4Event('purchase', {
      transaction_id: newOrder.id,
      value: newOrder.total,
      currency: 'USD',
      tax: newOrder.tax,
      shipping: newOrder.shippingCost,
      coupon: promoCode || undefined,
      payment_type: paymentMethod,
      shipping_tier: shippingInfo.shippingMethod,
      items: newOrder.items.map(item => ({
        item_id: item.product.id,
        item_name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        item_category: item.product.category,
        item_variant: `${item.size} / ${item.color.name}`
      }))
    });

    setOrders(prev => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('gms_orders', JSON.stringify(updated));
      return updated;
    });

    setCurrentOrder(newOrder);
    localStorage.setItem('gms_current_order', JSON.stringify(newOrder));

    // Clear cart after successful checkout
    clearCart();

    return newOrder;
  }, [cart, cartSubtotal, discountPercentage, freeShippingThreshold, promoCode, utmParams, trackGA4Event, clearCart]);

  return (
    <StoreContext.Provider
      value={{
        currentRoute,
        navigateTo,
        cart,
        cartCount,
        cartSubtotal,
        freeShippingThreshold,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickAddProduct,
        setQuickAddProduct,
        isSearchOpen,
        setIsSearchOpen,
        utmParams,
        setUtmParams,
        ga4Events,
        trackGA4Event,
        clearGA4Events,
        isDebugOpen,
        setIsDebugOpen,
        toast,
        hideToast,
        promoCode,
        discountPercentage,
        applyPromoCode,
        orders,
        currentOrder,
        placeOrder,
        recentViewedIds,
        addRecentView
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

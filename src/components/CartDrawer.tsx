import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
    navigateTo,
    trackGA4Event
  } = useStore();

  if (!isCartOpen) return null;

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleCheckoutClick = () => {
    trackGA4Event('begin_checkout', {
      value: cartSubtotal,
      currency: 'USD',
      num_items: cartCount,
      items: cart.map(i => ({
        item_id: i.product.id,
        item_name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        size: i.size
      }))
    });
    setIsCartOpen(false);
    navigateTo('/checkout');
  };

  const handleViewCartClick = () => {
    trackGA4Event('view_cart', {
      value: cartSubtotal,
      currency: 'USD',
      num_items: cartCount
    });
    setIsCartOpen(false);
    navigateTo('/cart');
  };

  const handleExpressPay = (provider: 'apple_pay' | 'google_pay') => {
    trackGA4Event('begin_checkout', {
      value: cartSubtotal,
      currency: 'USD',
      num_items: cartCount,
      express_provider: provider
    });
    setIsCartOpen(false);
    navigateTo('/checkout');
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-panel"
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h2 className="text-lg font-bold text-stone-900">Your Bag</h2>
            <span className="text-xs font-semibold px-2 py-0.5 bg-stone-100 text-stone-700 rounded-full">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-stone-50 px-5 py-3 border-b border-stone-200">
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            <span className="flex items-center gap-1.5 text-stone-800">
              <Truck className="w-4 h-4 text-emerald-600" />
              {amountNeededForFreeShipping === 0 ? (
                <span className="font-bold text-emerald-600">You unlocked FREE Express Shipping! 🎉</span>
              ) : (
                <span>
                  Add <strong className="text-stone-950">${amountNeededForFreeShipping.toFixed(2)}</strong> for Free Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] text-stone-500 font-semibold">{freeShippingProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                amountNeededForFreeShipping === 0 ? 'bg-emerald-500' : 'bg-stone-900'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List / Empty State */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-stone-900">
                  Your cart is waiting for something good.
                </h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Discover West Coast Essentials drops, organic tees, and iconic Google merch.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('/shop/new');
                }}
                className="py-2.5 px-5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                Shop New Arrivals
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 pb-4 border-b border-stone-100 last:border-0"
              >
                {/* Item Thumbnail */}
                <div
                  className="w-20 h-20 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200 cursor-pointer"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo(`/product/${item.product.id}`);
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className="text-sm font-semibold text-stone-900 hover:text-blue-600 cursor-pointer leading-tight"
                        onClick={() => {
                          setIsCartOpen(false);
                          navigateTo(`/product/${item.product.id}`);
                        }}
                      >
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-stone-500 mt-0.5">
                      Size: <span className="font-medium text-stone-700">{item.size}</span> • Color: <span className="font-medium text-stone-700">{item.color.name}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-stone-200 rounded-md bg-stone-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold text-stone-900 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Line Total */}
                    <span className="text-sm font-bold text-stone-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Express Checkout & CTAs */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3.5">
            {/* Subtotal */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Shipping & taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            {/* Express Checkout Options */}
            <div className="space-y-2 pt-1">
              <p className="text-[10px] uppercase tracking-wider font-bold text-stone-400 text-center">
                Express Checkout
              </p>
              <div className="grid grid-cols-2 gap-2">
                {/* Google Pay simulation */}
                <button
                  type="button"
                  onClick={() => handleExpressPay('google_pay')}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl font-medium text-xs text-stone-800 shadow-xs transition-colors cursor-pointer"
                >
                  <span className="font-bold">G</span> Pay
                </button>

                {/* Apple Pay simulation */}
                <button
                  type="button"
                  onClick={() => handleExpressPay('apple_pay')}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-black hover:bg-stone-800 text-white rounded-xl font-medium text-xs shadow-xs transition-colors cursor-pointer"
                >
                   Pay
                </button>
              </div>
            </div>

            {/* Main Checkout Button */}
            <button
              type="button"
              onClick={handleCheckoutClick}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-xl shadow-md transition-transform active:scale-98 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* View Full Cart Page Link */}
            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <button
                type="button"
                onClick={handleViewCartClick}
                className="hover:text-stone-900 underline underline-offset-2"
              >
                View Full Bag & Promo Code
              </button>
              <span className="flex items-center gap-1 text-[11px] text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                Guaranteed Safe Checkout
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle2,
  ChevronLeft,
  Lock
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
    navigateTo,
    trackGA4Event,
    promoCode,
    discountPercentage,
    applyPromoCode
  } = useStore();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const discountAmount = cartSubtotal * discountPercentage;
  const shippingCost = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 5.99;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.0825;
  const grandTotal = cartSubtotal - discountAmount + shippingCost + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const result = applyPromoCode(inputCode);
    setPromoMessage({ text: result.message, success: result.success });
  };

  const handleProceedToCheckout = () => {
    trackGA4Event('begin_checkout', {
      value: grandTotal,
      currency: 'USD',
      num_items: cartCount
    });
    navigateTo('/checkout');
  };

  const handleExpressCheckout = (provider: string) => {
    trackGA4Event('begin_checkout', {
      value: grandTotal,
      currency: 'USD',
      num_items: cartCount,
      express_provider: provider
    });
    navigateTo('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div id="cart-page-empty" className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900">
          Your cart is waiting for something good.
        </h1>
        <p className="text-sm text-stone-500 max-w-sm mt-2 mb-6">
          Fresh West Coast drops, organic heavyweight fleece, and iconic Google merchandise.
        </p>
        <button
          type="button"
          onClick={() => navigateTo('/shop/new')}
          className="py-3 px-8 bg-stone-950 hover:bg-stone-800 text-white font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          SHOP NEW ARRIVALS
        </button>
      </div>
    );
  }

  return (
    <div id="cart-page-root" className="min-h-screen bg-stone-50 text-stone-900 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950">
              Shopping Bag
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag
            </p>
          </div>
          <button
            onClick={() => navigateTo('/shop/new')}
            className="text-xs font-semibold text-stone-600 hover:text-stone-950 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Continue Shopping
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Tracker Banner */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="flex items-center gap-2 text-stone-900">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  {amountNeededForFreeShipping === 0
                    ? '🎉 You unlocked FREE Express Shipping to CA & TX!'
                    : `Add $${amountNeededForFreeShipping.toFixed(2)} more for FREE Express Shipping`}
                </span>
                <span className="text-stone-500 font-mono">{freeShippingProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    amountNeededForFreeShipping === 0 ? 'bg-emerald-500' : 'bg-stone-950'
                  }`}
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 divide-y divide-stone-100 shadow-xs">
              {cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 sm:gap-6">
                  {/* Image */}
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200 cursor-pointer"
                    onClick={() => navigateTo(`/product/${item.product.id}`)}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className="font-bold text-stone-900 text-sm sm:text-base hover:text-blue-600 cursor-pointer leading-tight"
                          onClick={() => navigateTo(`/product/${item.product.id}`)}
                        >
                          {item.product.name}
                        </h3>
                        <span className="text-sm sm:text-base font-bold text-stone-950">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-stone-500 mt-1">
                        Size: <strong className="text-stone-800">{item.size}</strong> • Color: <strong className="text-stone-800">{item.color.name}</strong>
                      </p>
                      <p className="text-[11px] text-emerald-600 font-medium mt-0.5">
                        In stock • Ready for dispatch
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 text-xs font-bold transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-stone-900 min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 text-xs font-bold transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-stone-400 hover:text-red-600 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Summary & Checkout Box */}
          <div className="lg:col-span-4 space-y-4">
            {/* Express Checkout Fast Lane */}
            <div className="bg-stone-900 text-white p-5 rounded-2xl shadow-md space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block text-center">
                Express Checkout
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleExpressCheckout('google_pay')}
                  className="py-2.5 bg-white hover:bg-stone-100 text-stone-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="font-extrabold text-blue-600">G</span> Pay
                </button>
                <button
                  type="button"
                  onClick={() => handleExpressCheckout('apple_pay')}
                  className="py-2.5 bg-black hover:bg-stone-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-stone-700 transition-colors cursor-pointer"
                >
                   Pay
                </button>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
                Order Summary
              </h2>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Promo code (e.g. WESTCOAST10)"
                    className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs uppercase font-medium placeholder:normal-case focus:outline-none focus:border-stone-900"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] font-medium ${
                      promoMessage.success ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
                {promoCode && (
                  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    <Tag className="w-3 h-3" />
                    <span>Applied: <strong>{promoCode}</strong> ({(discountPercentage * 100).toFixed(0)}% OFF)</span>
                  </div>
                )}
              </form>

              {/* Pricing Breakdown */}
              <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({(discountPercentage * 100).toFixed(0)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-stone-900">
                    {shippingCost === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (CA/TX 8.25%)</span>
                  <span className="font-semibold text-stone-900">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-stone-950 pt-3 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Primary Proceed CTA */}
              <button
                type="button"
                id="cart-proceed-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-stone-950 hover:bg-stone-800 text-white font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-300" />
                <span>CHECKOUT — ${grandTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ADDRESS_SUGGESTIONS } from '../data/addresses';
import { ShippingInfo, Order } from '../types';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Truck,
  CreditCard,
  Building,
  Sparkles,
  MapPin,
  AlertCircle
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    freeShippingThreshold,
    discountPercentage,
    promoCode,
    placeOrder,
    navigateTo,
    trackGA4Event
  } = useStore();

  // Progressive Steps: 'contact' | 'shipping' | 'payment'
  const [currentStep, setCurrentStep] = useState<'contact' | 'shipping' | 'payment'>('contact');

  // Form State
  const [email, setEmail] = useState('shopper@example.com');
  const [phone, setPhone] = useState('(310) 555-0192');
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Rivera');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('credit_card');

  // Address Autocomplete UI State
  const [addressQuery, setAddressQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<typeof ADDRESS_SUGGESTIONS>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Card Inputs (Demo)
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('123');

  // Calculations
  const discountAmount = cartSubtotal * discountPercentage;
  const shippingFee = shippingMethod === 'express' ? 9.99 : (cartSubtotal >= freeShippingThreshold ? 0 : 5.99);
  const taxAmount = (cartSubtotal - discountAmount) * 0.0825;
  const totalAmount = cartSubtotal - discountAmount + shippingFee + taxAmount;

  // If cart is empty and user lands on checkout, redirect to /cart
  useEffect(() => {
    if (cart.length === 0) {
      navigateTo('/cart');
    }
  }, [cart, navigateTo]);

  // Autocomplete filter
  const handleAddressInputChange = (val: string) => {
    setAddress(val);
    setAddressQuery(val);
    if (val.trim().length > 1) {
      const matches = ADDRESS_SUGGESTIONS.filter((s) =>
        s.label.toLowerCase().includes(val.toLowerCase()) ||
        s.address.toLowerCase().includes(val.toLowerCase()) ||
        s.city.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (s: (typeof ADDRESS_SUGGESTIONS)[0]) => {
    setAddress(s.address);
    setCity(s.city);
    setState(s.state);
    setZip(s.zip);
    setShowSuggestions(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;
    trackGA4Event('begin_checkout', { email, phone });
    setCurrentStep('shipping');
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !city || !state || !zip) return;
    trackGA4Event('add_shipping_info', {
      shipping_tier: shippingMethod,
      city,
      state,
      zip
    });
    setCurrentStep('payment');
  };

  const handlePlaceFinalOrder = (e: React.FormEvent) => {
    e.preventDefault();
    trackGA4Event('add_payment_info', {
      payment_type: paymentMethod,
      value: totalAmount
    });

    const shippingInfo: ShippingInfo = {
      email,
      phone,
      firstName,
      lastName,
      address,
      apartment,
      city,
      state,
      zip,
      shippingMethod
    };

    placeOrder(shippingInfo, paymentMethod);
    navigateTo('/order-success');
  };

  const handleExpressCheckoutInstant = (provider: 'apple_pay' | 'google_pay') => {
    // Quick autofill preset for one-click express payment simulation
    const expressShipping: ShippingInfo = {
      email: 'express.shopper@gmail.com',
      phone: '(415) 800-2910',
      firstName: 'Jordan',
      lastName: 'Taylor',
      address: '340 Main Street',
      apartment: 'Suite 400',
      city: 'Venice',
      state: 'CA',
      zip: '90291',
      shippingMethod: 'standard'
    };

    trackGA4Event('add_payment_info', {
      payment_type: provider,
      express_checkout: true
    });

    placeOrder(expressShipping, provider);
    navigateTo('/order-success');
  };

  return (
    <div id="checkout-root" className="min-h-screen bg-stone-100 text-stone-900 pb-20">
      {/* Top Checkout Header */}
      <div className="bg-white border-b border-stone-200 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
            </div>
            <span className="font-bold text-stone-900 text-base">Google Merch Store</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure 256-bit Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Flow Form (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            {/* SECTION 18: Express Checkout (Promoted above manual fields) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Instant Express Checkout
                </span>
                <span className="text-[11px] text-stone-500 font-medium">1-Click Fast Track</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Google Pay */}
                <button
                  type="button"
                  id="checkout-gpay-btn"
                  onClick={() => handleExpressCheckoutInstant('google_pay')}
                  className="py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer"
                >
                  <span className="text-blue-400 font-extrabold">G</span>
                  <span>Pay</span>
                </button>

                {/* Apple Pay */}
                <button
                  type="button"
                  id="checkout-applepay-btn"
                  onClick={() => handleExpressCheckoutInstant('apple_pay')}
                  className="py-3 px-4 bg-black hover:bg-stone-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer border border-stone-700"
                >
                  <span> Pay</span>
                </button>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-stone-200" />
                <span className="flex-shrink mx-4 text-xs font-bold text-stone-400 uppercase tracking-wider">
                  OR continue with standard checkout
                </span>
                <div className="flex-grow border-t border-stone-200" />
              </div>
            </div>

            {/* SECTION 21: Progressive Step Indicator */}
            <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-500">
              <button
                onClick={() => setCurrentStep('contact')}
                className={`flex items-center gap-1.5 ${
                  currentStep === 'contact' ? 'text-stone-950 font-bold' : 'text-emerald-600'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">
                  1
                </span>
                <span>Contact</span>
              </button>
              <ChevronRight className="w-4 h-4 text-stone-300" />

              <button
                onClick={() => setCurrentStep('shipping')}
                className={`flex items-center gap-1.5 ${
                  currentStep === 'shipping'
                    ? 'text-stone-950 font-bold'
                    : currentStep === 'payment'
                    ? 'text-emerald-600'
                    : 'text-stone-400'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Shipping</span>
              </button>
              <ChevronRight className="w-4 h-4 text-stone-300" />

              <button
                onClick={() => (address ? setCurrentStep('payment') : null)}
                className={`flex items-center gap-1.5 ${
                  currentStep === 'payment' ? 'text-stone-950 font-bold' : 'text-stone-400'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px]">
                  3
                </span>
                <span>Payment</span>
              </button>
            </div>

            {/* STEP 1: CONTACT INFORMATION */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <span>1. Contact Information</span>
                  {currentStep !== 'contact' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </h3>
                {currentStep !== 'contact' && (
                  <button
                    onClick={() => setCurrentStep('contact')}
                    className="text-xs text-blue-600 font-semibold hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 'contact' ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone Number (SMS updates) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(310) 555-0192"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded accent-stone-950"
                    />
                    <span>Keep me updated on West Coast drops and exclusive promotions</span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3 bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Continue to Shipping Address
                  </button>
                </form>
              ) : (
                <p className="text-xs text-stone-600">
                  {email} • {phone}
                </p>
              )}
            </div>

            {/* STEP 2: SHIPPING ADDRESS & METHOD (WITH SECTION 20 AUTOFILL) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <span>2. Shipping Address & Delivery</span>
                  {currentStep === 'payment' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </h3>
                {currentStep === 'payment' && (
                  <button
                    onClick={() => setCurrentStep('shipping')}
                    className="text-xs text-blue-600 font-semibold hover:underline"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 'shipping' ? (
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>

                  {/* Address Field with Autocomplete Dropdown */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-stone-700">
                        Street Address *
                      </label>
                      <span className="text-[11px] text-blue-600 flex items-center gap-1 font-medium">
                        <Sparkles className="w-3 h-3" /> Auto-suggest enabled (type &ldquo;123 Main&rdquo;)
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => handleAddressInputChange(e.target.value)}
                        placeholder="Start typing your address (e.g. 123 Main Street)"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                      <MapPin className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>

                    {/* Autocomplete suggestions popup */}
                    {showSuggestions && filteredSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-stone-300 rounded-xl shadow-xl z-30 divide-y divide-stone-100 max-h-48 overflow-y-auto">
                        {filteredSuggestions.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectSuggestion(s)}
                            className="w-full text-left px-3.5 py-2.5 hover:bg-stone-100 text-xs text-stone-800 flex items-center gap-2 cursor-pointer"
                          >
                            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{s.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Apartment / Suite */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Apartment, suite, unit (optional)
                    </label>
                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Apt 4B"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Los Angeles"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="CA"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="90012"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                      />
                    </div>
                  </div>

                  {/* Shipping Method Options */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-stone-900 mb-2">
                      Delivery Speed
                    </label>
                    <div className="space-y-2">
                      <label
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                          shippingMethod === 'standard'
                            ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === 'standard'}
                            onChange={() => setShippingMethod('standard')}
                            className="accent-stone-950"
                          />
                          <div>
                            <span className="font-bold text-xs text-stone-900 block">
                              Standard Regional Dispatch (3-5 Business Days)
                            </span>
                            <span className="text-[11px] text-stone-500">
                              Dispatched from Los Angeles / Austin Hub
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-stone-900">
                          {cartSubtotal >= freeShippingThreshold ? (
                            <strong className="text-emerald-600">FREE</strong>
                          ) : (
                            '$5.99'
                          )}
                        </span>
                      </label>

                      <label
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                          shippingMethod === 'express'
                            ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            checked={shippingMethod === 'express'}
                            onChange={() => setShippingMethod('express')}
                            className="accent-stone-950"
                          />
                          <div>
                            <span className="font-bold text-xs text-stone-900 block">
                              Priority Express Overnight (1-2 Business Days)
                            </span>
                            <span className="text-[11px] text-stone-500">
                              Guaranteed same-day packing & air dispatch
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-stone-900">$9.99</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Continue to Payment
                  </button>
                </form>
              ) : currentStep === 'payment' ? (
                <div className="text-xs text-stone-600 space-y-1">
                  <p className="font-semibold text-stone-900">
                    {firstName} {lastName}
                  </p>
                  <p>
                    {address} {apartment && `, ${apartment}`}, {city}, {state} {zip}
                  </p>
                  <p className="text-stone-500">
                    Method: {shippingMethod === 'express' ? 'Priority Express ($9.99)' : 'Standard Dispatch'}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-stone-400">Complete contact step first</p>
              )}
            </div>

            {/* STEP 3: PAYMENT METHOD (DEMO / SIMULATION) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-bold text-stone-900 text-base flex items-center justify-between">
                  <span>3. Payment Method</span>
                  <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                    Demo Simulation Mode
                  </span>
                </h3>
              </div>

              {currentStep === 'payment' ? (
                <form onSubmit={handlePlaceFinalOrder} className="space-y-5">
                  <div className="space-y-2">
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer ${
                        paymentMethod === 'credit_card'
                          ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                          : 'border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'credit_card'}
                          onChange={() => setPaymentMethod('credit_card')}
                          className="accent-stone-950"
                        />
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-stone-700" />
                          <span className="font-bold text-xs text-stone-900">Credit / Debit Card</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-stone-400 font-mono">
                        <span>VISA</span>
                        <span>•</span>
                        <span>MC</span>
                        <span>•</span>
                        <span>AMEX</span>
                      </div>
                    </label>

                    {paymentMethod === 'credit_card' && (
                      <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 animate-in fade-in">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                            Card Number (Demo)
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={cardExp}
                              onChange={(e) => setCardExp(e.target.value)}
                              className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                              Security Code (CVC)
                            </label>
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-900"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Prototype Notice:</strong> No actual charges will be incurred. Clicking &ldquo;Place Order&rdquo; will generate an authentic simulated order confirmation with GA4 purchase telemetry.
                    </span>
                  </div>

                  <button
                    type="submit"
                    id="place-order-submit-btn"
                    className="w-full py-4 bg-stone-950 hover:bg-stone-800 text-white font-extrabold text-sm rounded-xl shadow-xl transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-amber-300" />
                    <span>PLACE ORDER — ${totalAmount.toFixed(2)}</span>
                  </button>
                </form>
              ) : (
                <p className="text-xs text-stone-400">Complete shipping details first</p>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary Sticky Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4 sticky top-24">
              <h2 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
                Items in Order ({cart.length})
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-0 right-0 bg-stone-900 text-white text-[10px] font-bold w-4 h-4 rounded-bl flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {item.size} • {item.color.name}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-stone-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Line Items */}
              <div className="space-y-2 pt-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Promo Discount ({promoCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-stone-900">
                    {shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (CA/TX 8.25%)</span>
                  <span className="font-semibold text-stone-900">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-stone-950 pt-2 border-t border-stone-200">
                  <span>Total Due</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl text-[11px] text-stone-500 space-y-1">
                <div className="flex items-center gap-1 text-stone-700 font-medium">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free 30-day returns on all West Coast items</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

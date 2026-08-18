import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, RotateCcw, Lock, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-sm">
      {/* Top Value Propositions / Trust Grid */}
      <div className="border-b border-stone-800 py-10 bg-stone-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center md:items-start gap-3.5 justify-center md:justify-start">
              <div className="p-2.5 bg-stone-800 text-amber-400 rounded-xl shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">Express Regional Shipping</h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  1-2 day dispatch from Los Angeles & Austin fulfillment hubs.
                </p>
              </div>
            </div>

            <div className="flex items-center md:items-start gap-3.5 justify-center md:justify-start">
              <div className="p-2.5 bg-stone-800 text-emerald-400 rounded-xl shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">100% Official Merchandise</h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  Direct from Google Store. Authentic quality guaranteed.
                </p>
              </div>
            </div>

            <div className="flex items-center md:items-start gap-3.5 justify-center md:justify-start">
              <div className="p-2.5 bg-stone-800 text-blue-400 rounded-xl shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">Hassle-Free 30-Day Returns</h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  Pre-printed return labels included with every order.
                </p>
              </div>
            </div>

            <div className="flex items-center md:items-start gap-3.5 justify-center md:justify-start">
              <div className="p-2.5 bg-stone-800 text-purple-400 rounded-xl shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">Secure Express Checkout</h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  Instant Apple Pay, Google Pay, and 256-bit encrypted card payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Col 1: Brand & Campaign Story */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
              </div>
              <span className="font-bold text-white tracking-tight text-lg">
                Google Merch Store
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              <strong className="text-stone-200">West Coast Essentials: Direct-to-Style</strong>.
              Engineered in Silicon Valley, styled for everyday streets. High-converting direct-to-consumer apparel and headgear drops.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm pt-2">
              <span className="text-xs font-semibold text-stone-200 block">
                Get early drop access & 10% off your next order:
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-medium animate-in fade-in">
                  ✓ Use code <strong className="text-white">WESTCOAST10</strong> at checkout for 10% off!
                </p>
              )}
            </form>
          </div>

          {/* Col 2: Shop */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              Collections
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('/shop/new')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals Drop
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/shop/apparel')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Apparel & Heavyweight Fleece
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/shop/apparel/headgear')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Headgear & Caps
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/shop/new')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nano Banana Drop
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              Customer Care
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('/cart')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <span className="text-stone-400 hover:text-stone-200 cursor-pointer">
                  Shipping Policy (CA & TX Expedited)
                </span>
              </li>
              <li>
                <span className="text-stone-400 hover:text-stone-200 cursor-pointer">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="text-stone-400 hover:text-stone-200 cursor-pointer">
                  Sizing Guide (US Standard)
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Prototype Note */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              Direct-to-Style Redesign
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <span>Google Merchandise Store Prototype</span>
              </li>
              <li>
                <span>Built for GA4 Conversion Optimization</span>
              </li>
              <li>
                <span>Mobile-First DTC Architecture</span>
              </li>
              <li>
                <span className="text-amber-400 font-mono text-[11px]">
                  Ref: shop.merch.google
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Google LLC. All rights reserved. Google Merchandise Store redesign prototype.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">California Supply Chains Act</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { currentOrder, orders, navigateTo, utmParams } = useStore();

  const order = currentOrder || orders[0] || {
    id: 'GMS-WC-782910',
    date: new Date().toISOString(),
    items: [],
    subtotal: 34.00,
    discount: 0,
    shippingCost: 0,
    tax: 2.81,
    total: 36.81,
    shippingInfo: {
      email: 'shopper@example.com',
      phone: '(310) 555-0192',
      firstName: 'Alex',
      lastName: 'Rivera',
      address: '123 Main Street',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90012',
      shippingMethod: 'standard'
    },
    paymentMethod: 'credit_card',
    utmAttribution: utmParams,
    status: 'processing',
    estimatedDelivery: '3-5 Business Days'
  };

  useEffect(() => {
    // Fire festive celebration confetti on order confirmation
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  return (
    <div id="order-success-root" className="min-h-screen bg-stone-50 text-stone-900 pb-20">
      {/* Top Banner */}
      <div className="bg-white border-b border-stone-200 py-10 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Order Placed Successfully
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
            ORDER CONFIRMED
          </h1>

          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Thanks for your order, <strong className="text-stone-900">{order.shippingInfo.firstName}</strong>! We&apos;ve sent a confirmation to <span className="font-semibold text-stone-800">{order.shippingInfo.email}</span>.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-800 font-mono text-xs font-bold rounded-xl border border-stone-300">
            <span>Order Reference: #{order.id}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left 2 Cols: Order details & Products */}
          <div className="md:col-span-2 space-y-6">
            {/* Fulfillment Status Banner */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-sm text-stone-900">Delivery Status</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                  Preparing for Dispatch
                </span>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl text-xs space-y-1">
                <div className="flex justify-between text-stone-700">
                  <span>Estimated Delivery:</span>
                  <strong className="text-stone-950">{order.estimatedDelivery}</strong>
                </div>
                <div className="flex justify-between text-stone-700">
                  <span>Origin Fulfillment Center:</span>
                  <span className="font-medium text-stone-900">Los Angeles, CA Distribution Hub</span>
                </div>
              </div>
            </div>

            {/* Purchased Items */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-stone-900 border-b border-stone-100 pb-3">
                Items in This Order ({order.items.length || 1})
              </h3>

              <div className="divide-y divide-stone-100">
                {order.items.length > 0 ? (
                  order.items.map((item) => (
                    <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 flex gap-3.5 items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl bg-stone-100 border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          Size: {item.size} • Color: {item.color.name} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-stone-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-3 flex gap-3.5 items-center">
                    <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center text-stone-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900">Nano Banana Tee</p>
                      <p className="text-[11px] text-stone-500">Size: L • Vintage Washed Black • Qty: 1</p>
                    </div>
                    <span className="text-xs font-bold text-stone-900 ml-auto">$34.00</span>
                  </div>
                )}
              </div>

              {/* Totals Summary */}
              <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-stone-950 text-sm pt-2 border-t border-stone-200">
                  <span>Total Paid</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Address & Campaign Attribution Card */}
          <div className="space-y-6">
            {/* Delivery Address Card */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <MapPin className="w-4 h-4 text-stone-700" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-stone-900">
                  Shipping Destination
                </h3>
              </div>

              <div className="text-xs text-stone-700 space-y-1">
                <p className="font-bold text-stone-950">
                  {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                </p>
                <p>{order.shippingInfo.address}</p>
                {order.shippingInfo.apartment && <p>{order.shippingInfo.apartment}</p>}
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}
                </p>
                <p className="text-stone-500 pt-1">{order.shippingInfo.phone}</p>
              </div>
            </div>

            {/* Campaign Attribution Verification Badge */}
            <div className="bg-stone-900 text-stone-200 p-5 rounded-2xl border border-stone-800 space-y-2.5 text-xs font-mono">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Preserved Campaign Attribution
              </span>
              <div className="space-y-1 text-[11px] text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-500">Source:</span>
                  <span className="text-emerald-400 font-bold">{order.utmAttribution.utm_source || 'meta'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Campaign:</span>
                  <span className="text-amber-300">{order.utmAttribution.utm_campaign || 'west_coast_essentials'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Medium:</span>
                  <span>{order.utmAttribution.utm_medium || 'paid_social'}</span>
                </div>
              </div>
            </div>

            {/* Continue Shopping CTA */}
            <button
              type="button"
              onClick={() => navigateTo('/shop/new')}
              className="w-full py-3.5 px-6 bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>CONTINUE SHOPPING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

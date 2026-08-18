import React from 'react';
import { useStore } from '../context/StoreContext';
import { Check, X, ArrowRight, ShoppingBag } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast, hideToast, setIsCartOpen, navigateTo } = useStore();

  if (!toast || !toast.visible) return null;

  return (
    <div
      id="toast-notification"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-stone-900 text-white rounded-2xl shadow-2xl border border-stone-700/80 p-4 animate-in slide-in-from-bottom-5 duration-300 backdrop-blur-md"
    >
      <div className="flex items-start gap-3">
        {/* Item preview image or green check */}
        {toast.item ? (
          <img
            src={toast.item.product.image}
            alt={toast.item.product.name}
            className="w-12 h-12 object-cover rounded-lg bg-stone-800 shrink-0 border border-stone-700"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Check className="w-5 h-5" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {toast.title}
            </h4>
            <button
              onClick={hideToast}
              className="text-stone-400 hover:text-stone-100 p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-sm font-semibold text-stone-100 truncate mt-0.5">
            {toast.message}
          </p>

          <div className="flex items-center gap-2 mt-2.5">
            <button
              type="button"
              onClick={() => {
                hideToast();
                setIsCartOpen(true);
              }}
              className="flex-1 py-1.5 px-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>View Bag</span>
            </button>

            <button
              type="button"
              onClick={() => {
                hideToast();
                navigateTo('/checkout');
              }}
              className="flex-1 py-1.5 px-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Checkout</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

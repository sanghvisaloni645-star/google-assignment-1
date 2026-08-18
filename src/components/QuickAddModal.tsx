import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Check, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const QuickAddModal: React.FC = () => {
  const {
    quickAddProduct,
    setQuickAddProduct,
    addToCart,
    setIsCartOpen,
    navigateTo
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState(quickAddProduct?.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (quickAddProduct) {
      setSelectedSize(quickAddProduct.sizes[0] || 'M');
      setSelectedColor(quickAddProduct.colors[0]);
      setQuantity(1);
      setJustAdded(false);
    }
  }, [quickAddProduct]);

  if (!quickAddProduct) return null;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(quickAddProduct, selectedSize, selectedColor, quantity);
    setJustAdded(true);
  };

  const handleViewCart = () => {
    setQuickAddProduct(null);
    setIsCartOpen(true);
  };

  const handleDirectCheckout = () => {
    setQuickAddProduct(null);
    navigateTo('/checkout');
  };

  const handleClose = () => {
    setQuickAddProduct(null);
  };

  return (
    <div
      id="quick-add-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        id="quick-add-modal"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {justAdded ? (
          /* Post-Add Success Confirmation State */
          <div className="p-6 sm:p-8 text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Added to Bag
              </span>
              <h3 className="text-xl font-bold text-stone-900">
                {quickAddProduct.name}
              </h3>
              <p className="text-sm text-stone-500 mt-1">
                Size: <span className="font-semibold text-stone-800">{selectedSize}</span> • Color: <span className="font-semibold text-stone-800">{selectedColor?.name}</span> • Qty: {quantity}
              </p>
              <p className="text-lg font-bold text-stone-900 mt-2">
                ${(quickAddProduct.price * quantity).toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleDirectCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl transition-transform active:scale-98 cursor-pointer shadow-md"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleViewCart}
                className="w-full py-2.5 px-6 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-sm rounded-xl transition-colors cursor-pointer"
              >
                View Shopping Bag
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 py-1"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Selection State */
          <div className="p-6 space-y-5">
            {/* Header: Product Preview */}
            <div className="flex items-start gap-4 pr-6">
              <div className="relative w-20 h-20 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                <img
                  src={quickAddProduct.image}
                  alt={quickAddProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                  Quick Add
                </span>
                <h3 className="font-bold text-stone-900 text-base leading-tight">
                  {quickAddProduct.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-stone-900">
                    ${quickAddProduct.price.toFixed(2)}
                  </span>
                  {quickAddProduct.originalPrice && (
                    <span className="text-xs text-stone-400 line-through">
                      ${quickAddProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-stone-700">
                  Color: <span className="text-stone-900 font-normal">{selectedColor?.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                {quickAddProduct.colors.map((color) => {
                  const isSelected = selectedColor?.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-stone-950 scale-110 shadow-sm'
                          : 'border-transparent hover:border-stone-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className={`w-3.5 h-3.5 ${color.hex === '#ffffff' || color.hex === '#f5f5f4' ? 'text-stone-900' : 'text-white'}`} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-stone-700">Select Size:</span>
                <span className="text-[11px] text-stone-400">True to size (US)</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {quickAddProduct.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 text-sm font-semibold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold text-stone-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 text-sm font-semibold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-stone-950 hover:bg-stone-800 text-white font-semibold rounded-xl shadow-md transition-transform active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Add to Bag — ${(quickAddProduct.price * quantity).toFixed(2)}</span>
                </button>
              </div>

              {/* Free shipping & guarantee trust point */}
              <div className="flex items-center justify-center gap-3 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Official Google Merchandise
                </span>
                <span>•</span>
                <span>Fast CA & TX Delivery</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

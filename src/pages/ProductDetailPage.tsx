import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product, ProductColor } from '../types';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Zap,
  Heart,
  ChevronRight,
  Sparkles,
  Info,
  Check
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const {
    addToCart,
    navigateTo,
    isInWishlist,
    toggleWishlist,
    trackGA4Event,
    recentViewedIds,
    addRecentView
  } = useStore();

  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    setSelectedImage(product.gallery[0] || product.image);
    setSelectedSize(product.sizes[0] || 'M');
    setSelectedColor(product.colors[0]);
    setQuantity(1);
    addRecentView(product.id);

    trackGA4Event('view_item', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      item_category: product.category,
      item_subcategory: product.subcategory
    });
  }, [product, addRecentView, trackGA4Event]);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('/checkout');
  };

  // Recommended products in same category
  const recommended = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isBestSeller)
  ).slice(0, 4);

  return (
    <div id="pdp-root" className="min-h-screen bg-white text-stone-900 pb-28 lg:pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-stone-50 border-b border-stone-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-stone-500">
            <button onClick={() => navigateTo('/')} className="hover:text-stone-900">
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <button
              onClick={() =>
                navigateTo(product.category === 'headgear' ? '/shop/apparel/headgear' : '/shop/apparel')
              }
              className="hover:text-stone-900 capitalize"
            >
              {product.category}
            </button>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-stone-900 font-semibold truncate max-w-xs">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main PDP Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Big Main Image */}
            <div className="relative aspect-4/3 sm:aspect-square w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isNew && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-stone-900 text-white uppercase tracking-wider shadow-md">
                    <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                    New Drop
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-stone-950 uppercase tracking-wider shadow-md">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Wishlist toggle */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 rounded-full shadow-md backdrop-blur-md transition-colors"
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-stone-900 shadow-md scale-102'
                      : 'border-transparent hover:border-stone-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Conversion Buy Box */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header & Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                  {product.subcategory}
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-stone-800 ml-1">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewCount} verified reviews)</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-stone-600">
                {product.tagline}
              </p>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-extrabold text-stone-950">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-stone-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded">
                  In Stock & Ready
                </span>
              </div>
            </div>

            {/* Color Selector */}
            <div className="pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-semibold text-stone-800">
                  Color: <strong className="text-stone-950">{selectedColor.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-stone-950 scale-110 shadow-sm'
                          : 'border-transparent hover:border-stone-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className={`w-4 h-4 ${color.hex === '#ffffff' || color.hex === '#f5f5f4' ? 'text-stone-900' : 'text-white'}`} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector with Size Guide */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-semibold text-stone-800">
                  Select Size: <strong className="text-stone-950">{selectedSize}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-stone-500 hover:text-stone-900 underline underline-offset-2 flex items-center gap-1"
                >
                  <Info className="w-3 h-3" /> Sizing Guide
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-stone-950 text-white border-stone-950 shadow-sm'
                          : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Sizing Modal Info */}
              {showSizeGuide && (
                <div className="mt-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1 animate-in fade-in">
                  <p className="font-bold text-stone-900">Standard DTC Sizing Matrix</p>
                  <p>• Model is 6&apos;1&quot; (185cm) wearing size Large.</p>
                  <p>• Engineered for a modern relaxed streetwear drape.</p>
                </div>
              )}
            </div>

            {/* Quantity and Primary Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 h-12">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 text-stone-600 hover:bg-stone-200 text-base font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-bold text-stone-900 min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 text-stone-600 hover:bg-stone-200 text-base font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Primary CTA: ADD TO CART */}
                <button
                  type="button"
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 h-12 px-6 bg-stone-950 hover:bg-stone-800 text-white font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>ADD TO BAG — ${(product.price * quantity).toFixed(2)}</span>
                </button>
              </div>

              {/* Secondary CTA: BUY NOW */}
              <button
                type="button"
                id="pdp-buy-now-btn"
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm rounded-xl shadow-md transition-transform active:scale-98 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-stone-950" />
                <span>BUY NOW (Instant Express Checkout)</span>
              </button>
            </div>

            {/* Trust and Fulfillment Matrix */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">California & Texas Express Dispatch</span>
                  <p className="text-stone-500 text-[11px]">
                    Orders placed before 2 PM PST ship same-day from Los Angeles hub.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <RotateCcw className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">30-Day Easy Returns</span>
                  <p className="text-stone-500 text-[11px]">
                    Free returns & exchanges on all unworn items.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">Official Google Merch Guarantee</span>
                  <p className="text-stone-500 text-[11px]">
                    100% authentic Google brand merchandise.
                  </p>
                </div>
              </div>
            </div>

            {/* Description & Technical Features */}
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-stone-900 text-sm">Product Specifications</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {product.description}
              </p>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Products Carousel */}
        <div className="mt-20 pt-12 border-t border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-950">You May Also Like</h2>
            <button
              onClick={() => navigateTo('/shop/new')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              Explore Collection
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {recommended.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Mobile CTA Bar (Section 16 Mandate) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3.5 z-40 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-stone-900 block truncate max-w-[140px]">
            {product.name}
          </span>
          <span className="text-xs text-stone-500">
            {selectedSize} • ${(product.price * quantity).toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95"
        >
          <ShoppingBag className="w-4 h-4 text-amber-300" />
          <span>ADD TO BAG — ${(product.price * quantity).toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

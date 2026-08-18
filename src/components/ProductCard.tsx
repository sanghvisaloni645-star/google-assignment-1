import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Star, ShoppingBag, Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { navigateTo, setQuickAddProduct, toggleWishlist, isInWishlist, trackGA4Event, addRecentView } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const inWishlist = isInWishlist(product.id);

  const handleCardClick = () => {
    addRecentView(product.id);
    trackGA4Event('view_item', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      item_category: product.category,
      item_subcategory: product.subcategory,
      collection: product.collection
    });
    navigateTo(`/product/${product.id}`);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickAddProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
        {/* Product Image with Hover Flip */}
        <img
          src={isHovered ? product.secondaryImage || product.image : product.image}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isNew && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-900 text-white tracking-wider uppercase shadow-sm">
              <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
              New Drop
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 tracking-wider uppercase shadow-sm">
              Best Seller
            </span>
          )}
          {product.inventory <= 25 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-semibold bg-red-600 text-white shadow-sm">
              Only {product.inventory} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
            inWishlist
              ? 'bg-red-50 text-red-600'
              : 'bg-white/80 text-stone-600 hover:text-stone-950 hover:bg-white'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-red-600' : ''}`} />
        </button>

        {/* Quick Add Hover Overlay (Desktop slide up / Mobile always accessible) */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex justify-center z-10 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
          <span className="uppercase tracking-wider font-semibold text-[10px] text-stone-400">
            {product.subcategory}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-stone-700">{product.rating}</span>
            <span className="text-stone-400 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="font-semibold text-stone-900 text-sm sm:text-base leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Tagline / Subtitle */}
        <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 mb-2">
          {product.tagline}
        </p>

        {/* Color swatches & Price footer */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-stone-100">
          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-stone-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Color Dots */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((col) => (
              <span
                key={col.name}
                className="w-2.5 h-2.5 rounded-full border border-stone-300"
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[9px] text-stone-400 font-medium">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

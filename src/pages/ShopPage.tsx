import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FilterState, Product } from '../types';
import {
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Check,
  ChevronDown,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface ShopPageProps {
  pageType: 'new' | 'apparel' | 'headgear' | 'all';
}

export const ShopPage: React.FC<ShopPageProps> = ({ pageType }) => {
  const { navigateTo } = useStore();

  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('featured');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Page Header Details based on PRD
  const pageMeta = useMemo(() => {
    switch (pageType) {
      case 'new':
        return {
          title: 'NEW ARRIVALS',
          subtitle: 'Fresh drops designed for everyday style.',
          badge: 'West Coast Drop 01'
        };
      case 'headgear':
        return {
          title: 'HEADGEAR',
          subtitle: 'Top off your look with everyday essentials.',
          badge: 'California & Texas Edition'
        };
      case 'apparel':
        return {
          title: 'APPAREL',
          subtitle: 'Heavyweight loopback fleece, tees, and tech windbreakers.',
          badge: 'Organic & Premium'
        };
      default:
        return {
          title: 'ALL PRODUCTS',
          subtitle: 'Explore the complete Google Merchandise Store catalog.',
          badge: 'Full Collection'
        };
    }
  }, [pageType]);

  // Available subcategories depending on pageType
  const subcategories = useMemo(() => {
    if (pageType === 'headgear') return ['all', 'caps', 'beanies'];
    if (pageType === 'apparel') return ['all', 'tees', 'hoodies', 'jackets'];
    return ['all', 'tees', 'hoodies', 'caps', 'beanies', 'jackets'];
  }, [pageType]);

  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Primary page type filtering
    if (pageType === 'new') {
      list = list.filter((p) => p.isNew || p.collection === 'west-coast-essentials');
    } else if (pageType === 'apparel') {
      list = list.filter((p) => p.category === 'apparel');
    } else if (pageType === 'headgear') {
      list = list.filter((p) => p.category === 'headgear');
    }

    // Subcategory filter
    if (selectedSubcategory !== 'all') {
      list = list.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Size filter
    if (selectedSize !== 'all') {
      list = list.filter((p) => p.sizes.includes(selectedSize) || p.sizes.includes('One Size Fits All'));
    }

    // In Stock Only
    if (inStockOnly) {
      list = list.filter((p) => p.inventory > 0);
    }

    // Price Filter
    list = list.filter((p) => p.price <= maxPrice);

    // Sorting
    switch (sortBy) {
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'best-selling':
        list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewCount - a.reviewCount);
        break;
      case 'featured':
      default:
        // Keep natural curated ranking with nano banana first
        break;
    }

    return list;
  }, [pageType, selectedSubcategory, selectedSize, inStockOnly, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedSubcategory('all');
    setSelectedSize('all');
    setInStockOnly(false);
    setMaxPrice(150);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedSubcategory !== 'all' || selectedSize !== 'all' || inStockOnly || maxPrice < 150;

  return (
    <div id="shop-page-root" className="min-h-screen bg-stone-50 text-stone-900 pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-stone-200 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5" /> {pageMeta.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
              {pageMeta.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-1.5">
              {pageMeta.subtitle}
            </p>
          </div>

          {/* Quick Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 no-scrollbar">
            {subcategories.map((sub) => {
              const active = selectedSubcategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-stone-950 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {sub === 'all' ? 'All Types' : sub}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Controls Bar: Sort, Filter Drawer Trigger & Result Count */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 shadow-xs hover:bg-stone-50 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-600" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>

            <span className="text-xs font-medium text-stone-500">
              Showing <strong className="text-stone-900">{filteredProducts.length}</strong> items
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-stone-500 font-medium">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 py-2 pl-3 pr-8 shadow-xs focus:outline-none focus:border-stone-900 cursor-pointer"
              >
                <option value="featured">Featured Drop</option>
                <option value="newest">Newest First</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap pt-4">
            <span className="text-xs text-stone-500 font-medium">Active filters:</span>
            {selectedSubcategory !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full">
                Type: {selectedSubcategory}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSubcategory('all')} />
              </span>
            )}
            {selectedSize !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full">
                Size: {selectedSize}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSize('all')} />
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 text-xs bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full">
                In Stock Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setInStockOnly(false)} />
              </span>
            )}
            {maxPrice < 150 && (
              <span className="inline-flex items-center gap-1 text-xs bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full">
                Under ${maxPrice}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(150)} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2 ml-1"
            >
              Reset all
            </button>
          </div>
        )}

        {/* Layout: Desktop Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                  Filter Catalog
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-stone-400 hover:text-stone-900"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-stone-700">
                  <span>Max Price</span>
                  <span className="font-bold text-stone-950">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-stone-950 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>$20</span>
                  <span>$150</span>
                </div>
              </div>

              {/* Sizes Grid */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-700 block">Size</span>
                <div className="grid grid-cols-4 gap-1.5">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        selectedSize === s
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {s === 'all' ? 'All' : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-2 border-t border-stone-100">
                <label className="flex items-center justify-between text-xs font-semibold text-stone-800 cursor-pointer">
                  <span>In-Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded accent-stone-950 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Product Grid Area (2-col mobile, 3-col tablet, 4-col desktop) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">No products match your filters</h3>
                  <p className="text-xs text-stone-500 mt-1">Try resetting price or size selections.</p>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-5 flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="font-bold text-stone-900 text-base">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-stone-700">
                  <span>Max Price: ${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="150"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-stone-950"
                />
              </div>

              {/* Size Filter */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-700 block">Size</span>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-semibold rounded-lg border ${
                        selectedSize === s
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      {s === 'all' ? 'All' : s}
                    </button>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-stone-800">
                  <span>In-Stock Only</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded accent-stone-950"
                  />
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 space-y-2">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-stone-900 text-white font-semibold text-xs rounded-xl"
              >
                View {filteredProducts.length} Items
              </button>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2 text-stone-500 text-xs font-medium text-center"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

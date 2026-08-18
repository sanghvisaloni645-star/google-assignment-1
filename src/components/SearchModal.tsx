import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, setQuickAddProduct, trackGA4Event } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Nano Banana Tee',
    'Pixel 5-Panel Cap',
    'Heavyweight Hoodie',
    'DeepMind Beanie',
    'Windbreaker',
    'Venice Beach',
    'Bucket Hat'
  ];

  const searchResults = searchQuery.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q)
        );
      });

  const handleSelectProduct = (productId: string) => {
    setIsSearchOpen(false);
    navigateTo(`/product/${productId}`);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: (typeof PRODUCTS)[0]) => {
    e.stopPropagation();
    setIsSearchOpen(false);
    setQuickAddProduct(product);
  };

  return (
    <div
      id="search-modal-overlay"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        id="search-modal-container"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-stone-200 bg-stone-50">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, collections, headgear, apparel..."
            className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-base sm:text-lg font-medium focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="text-xs font-semibold px-2.5 py-1 text-stone-600 hover:text-stone-950 bg-stone-200 hover:bg-stone-300 rounded-md transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags / Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {searchQuery.trim() === '' ? (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Trending Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 hover:text-stone-900 rounded-full transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Category Jump */}
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                  Browse by Category
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('/shop/new');
                    }}
                    className="p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/70 transition-colors"
                  >
                    <p className="text-xs font-bold text-stone-900">New Arrivals</p>
                    <p className="text-[10px] text-stone-500">Fresh West Coast Drops</p>
                  </button>

                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('/shop/apparel');
                    }}
                    className="p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/70 transition-colors"
                  >
                    <p className="text-xs font-bold text-stone-900">Apparel</p>
                    <p className="text-[10px] text-stone-500">Tees, Hoodies & Shells</p>
                  </button>

                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('/shop/apparel/headgear');
                    }}
                    className="p-3 text-left rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/70 transition-colors"
                  >
                    <p className="text-xs font-bold text-stone-900">Headgear</p>
                    <p className="text-[10px] text-stone-500">Caps, Beanies & Buckets</p>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                <span>
                  Found <strong className="text-stone-900">{searchResults.length}</strong> results for &ldquo;{searchQuery}&rdquo;
                </span>
              </div>

              {searchResults.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <p className="text-sm font-semibold text-stone-700">No matching products found</p>
                  <p className="text-xs text-stone-400">Try searching for &ldquo;banana&rdquo;, &ldquo;tee&rdquo;, or &ldquo;cap&rdquo;</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer group border border-transparent hover:border-stone-200"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-lg bg-stone-100"
                        />
                        <div>
                          <p className="text-xs uppercase font-bold text-stone-400">
                            {product.subcategory}
                          </p>
                          <h4 className="text-sm font-semibold text-stone-900 group-hover:text-blue-600">
                            {product.name}
                          </h4>
                          <p className="text-xs font-bold text-stone-800">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg shadow-sm"
                        >
                          Quick Add
                        </button>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Zap,
  TrendingUp,
  Flame,
  Layers
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, trackGA4Event, setQuickAddProduct } = useStore();

  useEffect(() => {
    trackGA4Event('view_promotion', {
      promotion_id: 'promo_west_coast_essentials',
      promotion_name: 'West Coast Essentials Launch',
      creative_name: 'hero_direct_to_style',
      creative_slot: 'homepage_hero'
    });
  }, [trackGA4Event]);

  const handleHeroCta = (path: '/shop/new' | '/shop/apparel/headgear', label: string) => {
    trackGA4Event('select_promotion', {
      promotion_id: 'promo_west_coast_essentials',
      promotion_name: 'West Coast Essentials Launch',
      creative_slot: 'homepage_hero',
      cta_label: label
    });
    navigateTo(path);
  };

  // Trending Products (4-8 items with Nano Banana Tee at top)
  const trendingProducts = [
    PRODUCTS.find((p) => p.id === 'nano-banana-tee')!,
    PRODUCTS.find((p) => p.id === 'google-pixel-retro-5panel-cap')!,
    PRODUCTS.find((p) => p.id === 'google-heritage-heavyweight-hoodie')!,
    PRODUCTS.find((p) => p.id === 'deepmind-neural-knit-beanie')!,
    PRODUCTS.find((p) => p.id === 'chrome-cloudbreak-windbreaker')!,
    PRODUCTS.find((p) => p.id === 'android-bugdroid-dad-cap')!,
    PRODUCTS.find((p) => p.id === 'google-maps-venice-beach-crewneck')!,
    PRODUCTS.find((p) => p.id === 'sunset-corduroy-bucket-hat')!
  ].filter(Boolean);

  // Best Selling Apparel
  const apparelProducts = PRODUCTS.filter((p) => p.category === 'apparel').slice(0, 4);

  // Headgear Essentials
  const headgearProducts = PRODUCTS.filter((p) => p.category === 'headgear').slice(0, 4);

  const nanoBanana = PRODUCTS.find((p) => p.id === 'nano-banana-tee')!;

  return (
    <div id="homepage-root" className="min-h-screen bg-stone-50 text-stone-900">
      {/* SECTION 8: Above-the-Fold Campaign Hero (Direct, Conversion-Focused) */}
      <section className="relative overflow-hidden bg-white border-b border-stone-200">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-white to-stone-50/50 pointer-events-none" />
        <div className="absolute -top-24 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              {/* Campaign Drop Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-semibold tracking-wide uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>West Coast Drop 01 • Live Now</span>
              </div>

              {/* Exact PRD Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 leading-[1.08]">
                WEST COAST <br />
                <span className="text-stone-800">ESSENTIALS</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-normal">
                Fresh fits. Iconic gear. Ready for wherever you&apos;re headed.
              </p>

              {/* Primary & Secondary CTAs (High Contrast, Immediate Action) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  type="button"
                  id="hero-cta-new-arrivals"
                  onClick={() => handleHeroCta('/shop/new', 'SHOP NEW ARRIVALS')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-7 bg-stone-950 hover:bg-stone-800 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>SHOP NEW ARRIVALS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  id="hero-cta-headgear"
                  onClick={() => handleHeroCta('/shop/apparel/headgear', 'SHOP HEADGEAR')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-6 bg-stone-100 hover:bg-stone-200 text-stone-900 font-semibold text-sm rounded-xl border border-stone-300 transition-colors cursor-pointer"
                >
                  <span>SHOP HEADGEAR</span>
                </button>
              </div>

              {/* Instant Trust Points */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-stone-500 pt-3">
                <span className="flex items-center gap-1.5 font-medium text-stone-700">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  Same-Day CA & TX Dispatch
                </span>
                <span className="hidden sm:inline text-stone-300">•</span>
                <span className="flex items-center gap-1.5 font-medium text-stone-700">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Official Google Merch
                </span>
                <span className="hidden sm:inline text-stone-300">•</span>
                <span className="text-stone-600">
                  Free Express on $50+
                </span>
              </div>
            </div>

            {/* Right Hero Feature Card: The Iconic Nano Banana Tee */}
            <div className="lg:col-span-5">
              <div className="relative bg-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-stone-800 overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                    <Flame className="w-3.5 h-3.5" /> Hero Drop Centerpiece
                  </span>
                  <span className="text-xs font-mono text-stone-400">100% Organic</span>
                </div>

                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-800 mb-4 cursor-pointer" onClick={() => navigateTo(`/product/${nanoBanana.id}`)}>
                  <img
                    src={nanoBanana.image}
                    alt={nanoBanana.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2.5 left-2.5 bg-stone-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold text-white">
                    Drop Rate: 98% Positive
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                      {nanoBanana.name}
                    </h3>
                    <p className="text-xs text-stone-400">
                      Vintage washed heavy cotton • Micro-embroidered
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-bold text-white">${nanoBanana.price.toFixed(2)}</span>
                    <span className="block text-[11px] text-stone-400 line-through">${nanoBanana.originalPrice?.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setQuickAddProduct(nanoBanana)}
                    className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-stone-950" />
                    <span>Quick Add — ${nanoBanana.price.toFixed(2)}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo(`/product/${nanoBanana.id}`)}
                    className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Direct Product Grid — "Trending Now" (Above/At Fold Product Discovery) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Direct to Style</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              TRENDING NOW
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              The pieces everyone&apos;s adding to cart.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/shop/new')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900 hover:text-blue-600 group transition-colors"
          >
            <span>View All New Drops ({PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-col on mobile, 3-col on tablet, 4-col on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {trendingProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>
      </section>

      {/* SECTION 11: "SHOP YOUR STYLE" 3-Card Category Grid */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              SHOP YOUR STYLE
            </h2>
            <p className="text-sm text-stone-600 mt-1.5">
              Targeted collections built for daily wear, mild Pacific winters, and sunny California days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category 1: New Arrivals */}
            <div
              onClick={() => navigateTo('/shop/new')}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
                alt="New Arrivals"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                  Collection Drop
                </span>
                <h3 className="text-2xl font-bold tracking-tight">
                  NEW ARRIVALS
                </h3>
                <p className="text-xs text-stone-300 mt-1 mb-4">
                  Fresh drops designed for everyday style.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold bg-white text-stone-950 px-4 py-2 rounded-xl group-hover:bg-amber-300 transition-colors w-fit">
                  <span>Shop New</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Category 2: Apparel */}
            <div
              onClick={() => navigateTo('/shop/apparel')}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80"
                alt="Apparel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">
                  Heavyweight Fleeces & Tees
                </span>
                <h3 className="text-2xl font-bold tracking-tight">
                  APPAREL
                </h3>
                <p className="text-xs text-stone-300 mt-1 mb-4">
                  75.9% of total revenue favorites. Built to last.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold bg-white text-stone-950 px-4 py-2 rounded-xl group-hover:bg-amber-300 transition-colors w-fit">
                  <span>Shop Apparel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Category 3: Headgear */}
            <div
              onClick={() => navigateTo('/shop/apparel/headgear')}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80"
                alt="Headgear"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  Caps, Beanies & Buckets
                </span>
                <h3 className="text-2xl font-bold tracking-tight">
                  HEADGEAR
                </h3>
                <p className="text-xs text-stone-300 mt-1 mb-4">
                  Top off your look with everyday essentials.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold bg-white text-stone-950 px-4 py-2 rounded-xl group-hover:bg-amber-300 transition-colors w-fit">
                  <span>Shop Headgear</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best-Selling Apparel Collection Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              High-Intent Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
              BEST-SELLING APPAREL
            </h2>
          </div>
          <button
            onClick={() => navigateTo('/shop/apparel')}
            className="text-sm font-semibold text-stone-900 hover:text-blue-600 flex items-center gap-1"
          >
            <span>See All Apparel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
          {apparelProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Headgear Spotlight */}
      <section className="bg-white border-t border-stone-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                California & Texas Favorites
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
                WEST COAST HEADGEAR
              </h2>
            </div>
            <button
              onClick={() => navigateTo('/shop/apparel/headgear')}
              className="text-sm font-semibold text-stone-900 hover:text-emerald-600 flex items-center gap-1"
            >
              <span>Explore Headgear</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
            {headgearProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Editorial Feature (DTC Storytelling with zero friction) */}
      <section className="bg-stone-950 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct to Your Door</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            West Coast style, straight to your door.
          </h2>

          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto font-light">
            Every garment in the West Coast Essentials line is engineered with heavyweight durable fabrics, clean minimalist branding, and express regional dispatch for zero-wait styling.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => navigateTo('/shop/new')}
              className="py-3.5 px-8 bg-white hover:bg-stone-100 text-stone-950 font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore The Full Drop</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: 'apparel' | 'headgear' | 'accessories';
  subcategory: 'tees' | 'hoodies' | 'jackets' | 'caps' | 'beanies' | 'accessories';
  image: string;
  secondaryImage: string;
  gallery: string[];
  description: string;
  features: string[];
  sizes: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  inventory: number;
  collection: 'west-coast-essentials' | 'heritage' | 'creator-series' | 'core';
}

export interface CartItem {
  id: string; // unique item instance id: productId-size-color
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

export interface GA4Event {
  id: string;
  timestamp: string;
  eventName:
    | 'view_promotion'
    | 'select_promotion'
    | 'view_item'
    | 'add_to_cart'
    | 'remove_from_cart'
    | 'view_cart'
    | 'begin_checkout'
    | 'add_shipping_info'
    | 'add_payment_info'
    | 'purchase';
  parameters: Record<string, any>;
}

export interface AddressSuggestion {
  address: string;
  city: string;
  state: string;
  zip: string;
  label: string;
}

export interface ShippingInfo {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  shippingMethod: 'standard' | 'express';
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  shippingInfo: ShippingInfo;
  paymentMethod: 'apple_pay' | 'google_pay' | 'credit_card';
  utmAttribution: UTMParams;
  status: 'processing' | 'shipped' | 'delivered';
  estimatedDelivery: string;
}

export type RoutePath =
  | '/'
  | '/shop/new'
  | '/shop/apparel'
  | '/shop/apparel/headgear'
  | `/product/${string}`
  | '/cart'
  | '/checkout'
  | '/order-success';

export interface FilterState {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  inStockOnly?: boolean;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'best-selling';
}

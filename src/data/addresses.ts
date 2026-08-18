import { AddressSuggestion } from '../types';

export const ADDRESS_SUGGESTIONS: AddressSuggestion[] = [
  {
    address: '123 Main Street',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90012',
    label: '123 Main Street, Los Angeles, CA 90012'
  },
  {
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    label: '123 Main Street, San Francisco, CA 94105'
  },
  {
    address: '123 Main Street',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    label: '123 Main Street, Austin, TX 78701'
  },
  {
    address: '340 Main Street',
    city: 'Venice',
    state: 'CA',
    zip: '90291',
    label: '340 Main St (Google Venice), Venice, CA 90291'
  },
  {
    address: '1600 Amphitheatre Parkway',
    city: 'Mountain View',
    state: 'CA',
    zip: '94043',
    label: '1600 Amphitheatre Pkwy, Mountain View, CA 94043'
  },
  {
    address: '500 W 2nd Street',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    label: '500 W 2nd St, Austin, TX 78701'
  },
  {
    address: '345 Spear Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    label: '345 Spear St, San Francisco, CA 94105'
  },
  {
    address: '789 Congress Avenue',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    label: '789 Congress Ave, Austin, TX 78701'
  },
  {
    address: '450 West 33rd Street',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    label: '450 W 33rd St, New York, NY 10001'
  },
  {
    address: '601 N 34th Street',
    city: 'Seattle',
    state: 'WA',
    zip: '98103',
    label: '601 N 34th St, Seattle, WA 98103'
  },
  {
    address: '1000 Main Street',
    city: 'Houston',
    state: 'TX',
    zip: '77002',
    label: '1000 Main St, Houston, TX 77002'
  },
  {
    address: '1900 Pacific Avenue',
    city: 'Dallas',
    state: 'TX',
    zip: '75201',
    label: '1900 Pacific Ave, Dallas, TX 75201'
  },
  {
    address: '401 B Street',
    city: 'San Diego',
    state: 'CA',
    zip: '92101',
    label: '401 B St, San Diego, CA 92101'
  }
];

export const CAMPAIGN_PRESETS = [
  {
    name: 'Meta Ads (Instagram Carousel - CA Lookalike)',
    source: 'meta',
    medium: 'paid_social',
    campaign: 'west_coast_essentials',
    content: 'nano_banana_carousel',
    term: 'california_lookalike',
    targetRoute: '/shop/new'
  },
  {
    name: 'Google Search (Headgear Intent - Texas)',
    source: 'google',
    medium: 'cpc',
    campaign: 'west_coast_essentials',
    content: 'headgear_search_ad',
    term: 'google_merch_caps_texas',
    targetRoute: '/shop/apparel/headgear'
  },
  {
    name: 'Klaviyo Retargeting (Cart Recovery 10% Off)',
    source: 'klaviyo',
    medium: 'email',
    campaign: 'abandoned_cart_flow',
    content: 'discount_code_save10',
    term: 'cart_abandoners_7d',
    targetRoute: '/cart'
  },
  {
    name: 'Organic Search / Direct',
    source: 'direct',
    medium: 'none',
    campaign: 'organic',
    content: 'homepage',
    term: 'google_merchandise_store',
    targetRoute: '/'
  }
];

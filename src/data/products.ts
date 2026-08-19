import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'nano-banana-tee',
    name: 'Nano Banana Tee',
    tagline: 'The viral West Coast drop. 100% organic heavyweight cotton.',
    price: 34.00,
    originalPrice: 42.00,
    category: 'apparel',
    subcategory: 'tees',
    image: '/src/assets/images/google_gemini_tee_1787107323843.jpg',
    secondaryImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    gallery: [
      '/src/assets/images/google_gemini_tee_1787107323843.jpg',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The star of the West Coast Essentials collection. Featuring a custom micro-embroidered yellow Nano Banana badge on ultra-soft 240 GSM combed cotton. Boxy modern streetwear fit with dropped shoulders and double-needle collar.',
    features: [
      '240 GSM heavyweight combed organic cotton',
      'Micro-embroidered West Coast Banana emblem at left chest',
      'Subtle Google logo hem tab in signature 4-color stitching',
      'Pre-shrunk vintage wash for immediate lived-in comfort',
      'Ethically crafted in Los Angeles, CA'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Vintage Washed Black', hex: '#1c1917' },
      { name: 'Pacific Sand Cream', hex: '#e7e5e4' },
      { name: 'Venice Moss Green', hex: '#3f6212' }
    ],
    rating: 4.9,
    reviewCount: 312,
    isNew: true,
    isBestSeller: true,
    inventory: 48,
    collection: 'west-coast-essentials'
  },
  {
    id: 'google-pixel-retro-5panel-cap',
    name: 'Google Pixel Retro 5-Panel Cap',
    tagline: 'Low profile nylon ripstop with quick-adjust buckle.',
    price: 32.00,
    category: 'headgear',
    subcategory: 'caps',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Designed for coastal breezes and city exploration. Constructed from water-repellent micro-ripstop with breathable side mesh eyelets and an archival Google Pixel retro rubberized patch.',
    features: [
      'Water-resistant recycled nylon taslan weave',
      'Flexible soft-structure brim with anti-glare underbill',
      'Reflective rear webbing cinch strap with YKK clasp',
      'Interior moisture-wicking antimicrobial headband'
    ],
    sizes: ['One Size Fits All'],
    colors: [
      { name: 'Onyx Black', hex: '#18181b' },
      { name: 'Bay Mist Olive', hex: '#44403c' },
      { name: 'Glacier Blue', hex: '#38bdf8' }
    ],
    rating: 4.8,
    reviewCount: 184,
    isNew: true,
    isBestSeller: true,
    inventory: 64,
    collection: 'west-coast-essentials'
  },
  {
    id: 'google-heritage-heavyweight-hoodie',
    name: 'Heritage Heavyweight Pullover Hoodie',
    tagline: '450 GSM French Terry fleece. Ultimate everyday warmth.',
    price: 88.00,
    originalPrice: 110.00,
    category: 'apparel',
    subcategory: 'hoodies',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The definitive California hoodie. Cut from custom-milled 450 GSM loopback cotton fleece. Featuring a double-layer hood without drawstrings for a modern, clean silhouette and tonal Google heritage debossing.',
    features: [
      '450 GSM ultra-dense loopback French Terry',
      'Seamless double-walled hood with ribbed crossover neck',
      'Hidden internal zippered tech stash pocket in kangaroo pouch',
      'Heavy ribbed side gussets for enhanced mobility'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Heather Mist Grey', hex: '#9ca3af' },
      { name: 'Deep Midnight Charcoal', hex: '#111827' },
      { name: 'Sunset Terracotta', hex: '#9a3412' }
    ],
    rating: 5.0,
    reviewCount: 429,
    isNew: false,
    isBestSeller: true,
    inventory: 35,
    collection: 'heritage'
  },
  {
    id: 'deepmind-neural-knit-beanie',
    name: 'Google DeepMind Neural Knit Beanie',
    tagline: 'Superfine Merino wool blend with geometric neural ribbing.',
    price: 28.00,
    category: 'headgear',
    subcategory: 'beanies',
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1618354691438-25bc04584c03?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618354691438-25bc04584c03?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Spun from itch-free Australian merino wool and recycled poly. Engineered with a subtle algorithmic micro-rib weave inspired by neural lattice architectures.',
    features: [
      '50% Australian Extra-fine Merino, 50% Recycled Spun Yarn',
      'Reversible cuff with metallic woven DeepMind logo label',
      'Snug fit that molds comfortably to your head shape'
    ],
    sizes: ['One Size Fits All'],
    colors: [
      { name: 'Deep Sea Navy', hex: '#0f172a' },
      { name: 'Fog White Oat', hex: '#f5f5f4' },
      { name: 'Signal Tangerine', hex: '#ea580c' }
    ],
    rating: 4.9,
    reviewCount: 147,
    isNew: true,
    isBestSeller: true,
    inventory: 82,
    collection: 'west-coast-essentials'
  },
  {
    id: 'chrome-cloudbreak-windbreaker',
    name: 'Chrome Cloudbreak Tech Windbreaker',
    tagline: 'Ultralight packable shell with weather-resistant DWR finish.',
    price: 96.00,
    category: 'apparel',
    subcategory: 'jackets',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Engineered for rapid San Francisco fog roll-ins and Austin rain showers. Packs into its own interior pocket with an integrated carabiner clip. Features micro-perforated underarm venting and subtle Chrome prism accents.',
    features: [
      '100% Recycled ripstop with durable water repellent (DWR)',
      'Self-stowing pocket system with bungee harness',
      'Aquaguard YKK matte coated zippers',
      'Adjustable drop-tail hem with locking cinch toggles'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Matte Silicon Grey', hex: '#374151' },
      { name: 'Coastline Teal', hex: '#0e7490' },
      { name: 'Off-White Phantom', hex: '#f3f4f6' }
    ],
    rating: 4.7,
    reviewCount: 96,
    isNew: true,
    isBestSeller: false,
    inventory: 24,
    collection: 'west-coast-essentials'
  },
  {
    id: 'android-bugdroid-dad-cap',
    name: 'Android 3D Embroidered Dad Cap',
    tagline: 'Unstructured 6-panel washed twill with brass slide closure.',
    price: 29.00,
    category: 'headgear',
    subcategory: 'caps',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Vintage-washed 100% cotton chino twill featuring the new dimensional 3D Android Bugdroid bot embroidered in tonal relief on the center front.',
    features: [
      'Custom garment-dyed cotton chino with soft crown',
      'Embossed antique brass rear slide buckle and tuck-in strap',
      'Pre-curved visor with 8 rows of contrast stitching'
    ],
    sizes: ['One Size Fits All'],
    colors: [
      { name: 'Forest Bugdroid Green', hex: '#15803d' },
      { name: 'Washed Stone Khaki', hex: '#d6d3d1' },
      { name: 'Washed Black', hex: '#262626' }
    ],
    rating: 4.9,
    reviewCount: 220,
    isNew: false,
    isBestSeller: true,
    inventory: 58,
    collection: 'core'
  },
  {
    id: 'google-maps-venice-beach-crewneck',
    name: 'Google Maps Venice Beach Crewneck',
    tagline: 'Relaxed drop-shoulder fleece with topographical coordinates.',
    price: 74.00,
    category: 'apparel',
    subcategory: 'hoodies',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Celebrating California skate and surf culture. Features subtle heat-transferred geographic coordinates of Google Los Angeles / Venice Beach with high-density gradient map pin graphic.',
    features: [
      '380 GSM brushed fleece backing for cloud-soft interior',
      'Drop-shoulder boxy silhouette with reinforced ribbed cuffs',
      'Coordinates: 33.9939° N, 118.4799° W (Venice, CA)'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Venice Sand Dune', hex: '#e7e5e4' },
      { name: 'Pacific Dusk Indigo', hex: '#1e293b' }
    ],
    rating: 4.8,
    reviewCount: 163,
    isNew: true,
    isBestSeller: false,
    inventory: 41,
    collection: 'west-coast-essentials'
  },
  {
    id: 'youtube-creator-oversized-tee',
    name: 'YouTube Creator Studio Oversized Tee',
    tagline: 'Heavy 280 GSM jersey. High-density play button graphic.',
    price: 36.00,
    category: 'apparel',
    subcategory: 'tees',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Crafted for creators and dreamers. Extra heavyweight cotton jersey drape with dropped shoulders, wide sleeves, and a rubberized tactile Play Button emblem at the nape.',
    features: [
      '280 GSM supreme grade heavyweight jersey',
      'Wide streetwear rib collar that retains structure after 100+ washes',
      'Rubberized matte gloss YouTube badge on rear neck'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Studio Jet Black', hex: '#171717' },
      { name: 'Creator Crimson', hex: '#dc2626' },
      { name: 'Pure White', hex: '#ffffff' }
    ],
    rating: 4.9,
    reviewCount: 278,
    isNew: false,
    isBestSeller: true,
    inventory: 52,
    collection: 'creator-series'
  },
  {
    id: 'sunset-corduroy-bucket-hat',
    name: 'Bay Area Sunset Corduroy Bucket Hat',
    tagline: 'Wide-wale cotton corduroy with 360-degree shade brim.',
    price: 35.00,
    category: 'headgear',
    subcategory: 'caps',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Chunky 8-wale textured cotton corduroy in sun-faded coastal tones. Finished with an embroidered mini Google logo pin and breathable interior cotton sweatband.',
    features: [
      '8-wale heavyweight textured cotton corduroy',
      'Stitched 2.25 inch downward sloping sun brim',
      'Interior taped seams with custom Google Merch labels'
    ],
    sizes: ['S/M', 'L/XL'],
    colors: [
      { name: 'Golden Hour Rust', hex: '#b45309' },
      { name: 'Santa Cruz Navy', hex: '#1e3a8a' },
      { name: 'Bone White', hex: '#fafaf9' }
    ],
    rating: 4.8,
    reviewCount: 112,
    isNew: true,
    isBestSeller: false,
    inventory: 38,
    collection: 'west-coast-essentials'
  },
  {
    id: 'gemini-gradient-tech-jacket',
    name: 'Gemini Iridescent Tech Shell Jacket',
    tagline: 'Prismatic color-shift fabric with waterproof sealed seams.',
    price: 135.00,
    originalPrice: 160.00,
    category: 'apparel',
    subcategory: 'jackets',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'High-tech meets high-fashion. Inspired by the AI frontier, this jacket features a subtle refractive iridescent sheen that shifts between Google blue and violet under direct sunlight. Fully seam-taped with magnetic storm flap.',
    features: [
      '10,000mm waterproof / 10,000g breathability rating',
      'Fidlock magnetic snap closures on main storm baffle',
      'Laser-cut ventilation eyelets on side panels',
      'Internal device pocket with cable routing port'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Gemini Nebula Violet', hex: '#4f46e5' },
      { name: 'Cyber Titanium', hex: '#52525b' }
    ],
    rating: 5.0,
    reviewCount: 88,
    isNew: true,
    isBestSeller: true,
    inventory: 19,
    collection: 'west-coast-essentials'
  },
  {
    id: 'google-classic-rainbow-stitch-tee',
    name: 'Classic 4-Color Rainbow Stitch Pocket Tee',
    tagline: 'Clean minimal chest pocket with Google iconic micro-embroidery.',
    price: 32.00,
    category: 'apparel',
    subcategory: 'tees',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The understated icon. Clean 100% Pima cotton with a reinforced left chest pocket outlined with Google trademark 4-color bartack stitches (Blue, Red, Yellow, Green).',
    features: [
      '100% Peruvian Long-staple Pima Cotton',
      'Signature 4-color bartack corner pocket reinforcement',
      'Silk-soft finish that gets softer with every wash'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Crisp White', hex: '#ffffff' },
      { name: 'Washed Charcoal', hex: '#334155' },
      { name: 'Venice Heather', hex: '#cbd5e1' }
    ],
    rating: 4.9,
    reviewCount: 395,
    isNew: false,
    isBestSeller: true,
    inventory: 70,
    collection: 'core'
  },
  {
    id: 'mountain-view-vintage-washed-cap',
    name: 'Mountain View Campus Washed Cap',
    tagline: 'Relaxed curved brim with Google HQ heritage typography.',
    price: 30.00,
    category: 'headgear',
    subcategory: 'caps',
    image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'An homage to Google headquarters at 1600 Amphitheatre Pkwy. Enzyme-washed pigment cotton with vintage chain-stitch typography across the crown.',
    features: [
      'Pigment garment dyed 100% heavy cotton canvas',
      'Chain-stitch embroidered vintage script',
      'Metal tri-glide slider strap for custom fit'
    ],
    sizes: ['One Size Fits All'],
    colors: [
      { name: 'Washed Navy', hex: '#1e293b' },
      { name: 'California Clay', hex: '#c2410c' },
      { name: 'Sage Green', hex: '#4d7c0f' }
    ],
    rating: 4.8,
    reviewCount: 154,
    isNew: false,
    isBestSeller: true,
    inventory: 45,
    collection: 'heritage'
  }
];

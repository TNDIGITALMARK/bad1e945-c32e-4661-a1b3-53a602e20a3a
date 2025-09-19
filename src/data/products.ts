import { Product, Review } from '@/types';

export const products: Product[] = [
  // Earrings
  {
    id: 'earrings-moonlight-fern-necklace',
    name: 'Moonlight Fern Necklace',
    description: 'Delicate sterling silver necklace featuring handcrafted fern leaves that catch the light like morning dew. Each piece is unique, celebrating the organic beauty of nature.',
    price: 78,
    originalPrice: 98,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608748010899-18330cf6b3ab?w=800&h=800&fit=crop'
    ],
    category: 'necklaces',
    materials: ['Sterling Silver', 'Natural Patina'],
    colors: ['Silver', 'Antique Bronze'],
    inStock: true,
    stockQuantity: 12,
    rating: 4.8,
    reviewCount: 24,
    featured: true,
    isOnSale: true,
    tags: ['nature', 'botanical', 'handcrafted', 'delicate'],
    specifications: {
      'Chain Length': '18 inches',
      'Pendant Size': '1.2 x 0.8 inches',
      'Material': 'Sterling Silver',
      'Closure': 'Lobster Clasp'
    }
  },
  {
    id: 'earrings-desert-rose-hoops',
    name: 'Desert Rose Hoops',
    description: 'Elegant rose gold hoops inspired by desert blooms, featuring subtle texture that mimics sand patterns. Perfect for everyday elegance or special occasions.',
    price: 92,
    images: [
      'https://images.unsplash.com/photo-1635767798374-3347517763bb?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&h=800&fit=crop'
    ],
    category: 'earrings',
    materials: ['Rose Gold Fill', '14k Rose Gold'],
    colors: ['Rose Gold'],
    inStock: true,
    stockQuantity: 8,
    rating: 4.9,
    reviewCount: 18,
    featured: true,
    isOnSale: false,
    tags: ['hoops', 'rose gold', 'desert', 'elegant'],
    specifications: {
      'Diameter': '1.5 inches',
      'Width': '2mm',
      'Material': '14k Rose Gold Fill',
      'Closure': 'Hinged'
    }
  },
  {
    id: 'earrings-forest-whisper-studs',
    name: 'Forest Whisper Studs',
    description: 'Tiny leaf studs that capture the essence of a quiet forest. Hand-hammered texture gives each pair unique character, like no two leaves are alike.',
    price: 45,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=800&fit=crop'
    ],
    category: 'earrings',
    materials: ['Sterling Silver', 'Gold Fill'],
    colors: ['Silver', 'Gold'],
    inStock: true,
    stockQuantity: 20,
    rating: 4.7,
    reviewCount: 35,
    featured: false,
    isOnSale: false,
    tags: ['studs', 'minimalist', 'forest', 'everyday'],
    specifications: {
      'Size': '0.5 x 0.3 inches',
      'Material': 'Sterling Silver',
      'Backing': 'Butterfly Clutch'
    }
  },
  // Necklaces
  {
    id: 'necklaces-cascade-pendant',
    name: 'Cascade Pendant',
    description: 'A flowing pendant that mimics water cascading over river rocks. The organic curves and hammered texture create movement and catch light beautifully.',
    price: 134,
    images: [
      'https://images.unsplash.com/photo-1603561596112-db1e8c0e5d11?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608748010899-18330cf6b3ab?w=800&h=800&fit=crop'
    ],
    category: 'necklaces',
    materials: ['Sterling Silver', 'Oxidized Silver'],
    colors: ['Silver', 'Dark Silver'],
    inStock: true,
    stockQuantity: 6,
    rating: 4.9,
    reviewCount: 12,
    featured: true,
    isOnSale: false,
    tags: ['statement', 'water', 'organic', 'unique'],
    specifications: {
      'Chain Length': '20 inches',
      'Pendant Size': '2.5 x 1.8 inches',
      'Material': 'Sterling Silver',
      'Chain Style': 'Cable Chain'
    }
  },
  {
    id: 'necklaces-sage-branch-collar',
    name: 'Sage Branch Collar',
    description: 'A sophisticated collar necklace featuring interconnected sage branches. This statement piece brings the tranquility of an herb garden to your wardrobe.',
    price: 156,
    originalPrice: 185,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop'
    ],
    category: 'necklaces',
    materials: ['Brass', 'Silver Plate'],
    colors: ['Antique Brass', 'Silver'],
    inStock: true,
    stockQuantity: 4,
    rating: 4.8,
    reviewCount: 9,
    featured: true,
    isOnSale: true,
    tags: ['collar', 'statement', 'botanical', 'sage'],
    specifications: {
      'Length': '16 inches',
      'Width': '2.5 inches at center',
      'Material': 'Brass with Silver Plating',
      'Closure': 'Hook and Eye'
    }
  },
  // Bracelets
  {
    id: 'bracelets-river-stone-cuff',
    name: 'River Stone Cuff',
    description: 'Smooth, organic cuff inspired by river stones worn smooth by time and water. The open design makes it adjustable and comfortable for all-day wear.',
    price: 89,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1603561596112-db1e8c0e5d11?w=800&h=800&fit=crop'
    ],
    category: 'bracelets',
    materials: ['Sterling Silver', 'Copper'],
    colors: ['Silver', 'Copper'],
    inStock: true,
    stockQuantity: 15,
    rating: 4.6,
    reviewCount: 22,
    featured: false,
    isOnSale: false,
    tags: ['cuff', 'organic', 'river', 'adjustable'],
    specifications: {
      'Width': '0.75 inches',
      'Opening': '1 inch',
      'Material': 'Sterling Silver',
      'Finish': 'Brushed Satin'
    }
  },
  {
    id: 'bracelets-vine-wrap',
    name: 'Vine Wrap Bracelet',
    description: 'Delicate vine-like bracelet that wraps around the wrist like morning glory vines. Features tiny leaves and an organic, flowing design.',
    price: 67,
    images: [
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1635767798374-3347517763bb?w=800&h=800&fit=crop'
    ],
    category: 'bracelets',
    materials: ['Gold Fill', 'Sterling Silver'],
    colors: ['Gold', 'Silver'],
    inStock: true,
    stockQuantity: 11,
    rating: 4.8,
    reviewCount: 16,
    featured: false,
    isOnSale: false,
    tags: ['vine', 'wrap', 'delicate', 'botanical'],
    specifications: {
      'Length': 'Adjustable 6.5-8 inches',
      'Width': '0.25 inches',
      'Material': 'Gold Filled Wire',
      'Closure': 'Wrap Style'
    }
  },
  // Rings
  {
    id: 'rings-thorn-band',
    name: 'Thorn Band Ring',
    description: 'Elegant band featuring subtle thorn-like texture that catches light beautifully. Inspired by rose stems, this ring represents both beauty and strength.',
    price: 78,
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1608748010899-18330cf6b3ab?w=800&h=800&fit=crop'
    ],
    category: 'rings',
    materials: ['Sterling Silver', '14k Gold'],
    colors: ['Silver', 'Gold'],
    inStock: true,
    stockQuantity: 18,
    rating: 4.7,
    reviewCount: 28,
    featured: false,
    isOnSale: false,
    tags: ['band', 'thorn', 'textured', 'stackable'],
    specifications: {
      'Width': '3mm',
      'Material': 'Sterling Silver',
      'Finish': 'Oxidized Texture',
      'Sizes': '4-10 available'
    }
  },
  {
    id: 'rings-forest-floor-cocktail',
    name: 'Forest Floor Cocktail Ring',
    description: 'Statement cocktail ring featuring an organic, moss-like texture that evokes the forest floor. A bold piece that brings nature to your fingertips.',
    price: 124,
    originalPrice: 145,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop'
    ],
    category: 'rings',
    materials: ['Brass', 'Patina Finish'],
    colors: ['Antique Brass', 'Green Patina'],
    inStock: true,
    stockQuantity: 7,
    rating: 4.9,
    reviewCount: 11,
    featured: true,
    isOnSale: true,
    tags: ['cocktail', 'statement', 'forest', 'textured'],
    specifications: {
      'Face Size': '1.2 x 0.8 inches',
      'Band Width': '2mm',
      'Material': 'Brass with Natural Patina',
      'Sizes': '6-9 available'
    }
  }
];

export const reviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'earrings-moonlight-fern-necklace',
    userId: 'user-1',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Absolutely stunning!',
    content: 'This necklace is even more beautiful in person. The craftsmanship is incredible and I get compliments every time I wear it.',
    helpful: 12,
    verified: true,
    createdAt: new Date('2024-01-15'),
    images: []
  },
  {
    id: 'rev-2',
    productId: 'earrings-desert-rose-hoops',
    userId: 'user-2',
    userName: 'Emma L.',
    rating: 5,
    title: 'Perfect everyday hoops',
    content: 'These hoops are the perfect size and weight. The rose gold is beautiful and they go with everything.',
    helpful: 8,
    verified: true,
    createdAt: new Date('2024-01-20'),
    images: []
  },
  {
    id: 'rev-3',
    productId: 'necklaces-cascade-pendant',
    userId: 'user-3',
    userName: 'Maya K.',
    rating: 5,
    title: 'Unique and gorgeous',
    content: 'I love how this pendant moves and catches the light. It is a true work of art that I treasure.',
    helpful: 6,
    verified: true,
    createdAt: new Date('2024-01-10'),
    images: []
  }
];

// Helper functions for filtering and sorting
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getOnSaleProducts = () => {
  return products.filter(product => product.isOnSale);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getReviewsForProduct = (productId: string) => {
  return reviews.filter(review => review.productId === productId);
};

export const getAllCategories = () => {
  return ['earrings', 'necklaces', 'bracelets', 'rings'];
};

export const getAllMaterials = () => {
  const materials = new Set<string>();
  products.forEach(product => {
    product.materials.forEach(material => materials.add(material));
  });
  return Array.from(materials).sort();
};

export const getAllColors = () => {
  const colors = new Set<string>();
  products.forEach(product => {
    product.colors.forEach(color => colors.add(color));
  });
  return Array.from(colors).sort();
};

export const getPriceRange = () => {
  const prices = products.map(product => product.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};
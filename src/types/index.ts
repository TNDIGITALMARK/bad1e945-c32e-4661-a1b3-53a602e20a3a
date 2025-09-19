export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  materials: string[];
  colors: string[];
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isOnSale: boolean;
  tags: string[];
  specifications: {
    [key: string]: string;
  };
}

export type ProductCategory = 'earrings' | 'necklaces' | 'bracelets' | 'rings';

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
  createdAt: Date;
  images?: string[];
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  addresses: Address[];
  wishlist: string[];
  orders: Order[];
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface FilterOptions {
  categories: ProductCategory[];
  priceRange: {
    min: number;
    max: number;
  };
  materials: string[];
  colors: string[];
  inStock: boolean;
  onSale: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export type SortBy = 'newest' | 'price-low' | 'price-high' | 'rating' | 'popular';
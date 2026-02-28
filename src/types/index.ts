// ─── Product ────────────────────────────────────────────────────────────────

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  inStock: boolean;
  priceModifier?: number; // + or - from base price
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number; // original price for sale items
  currency: string;
  images: ProductImage[];
  category: ProductCategory;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  sku: string;
  variants?: {
    label: string;
    options: ProductVariant[];
  }[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  createdAt: string;
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>; // { "Size": "M", "Color": "Black" }
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

// ─── User / Auth ─────────────────────────────────────────────────────────────

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  addresses: Address[];
  wishlist: string[]; // product ids
  createdAt: string;
}

// ─── Order ───────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  product: Product;
  quantity: number;
  priceAtPurchase: number;
  selectedVariants?: Record<string, string>;
}

export interface Order {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

// ─── Filters / Search ────────────────────────────────────────────────────────

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  tags?: string[];
  sortBy?: "price-asc" | "price-desc" | "newest" | "rating" | "popular";
  search?: string;
}

// ─── UI ──────────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "new" | "sale";
export type InputSize = "sm" | "md" | "lg";

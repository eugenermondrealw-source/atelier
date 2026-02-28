"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import type { Cart, CartItem, Product } from "@/types";
import { generateCartItemId } from "@/lib/utils";

// ─── State ────────────────────────────────────────────────────────────────────

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number; selectedVariants?: Record<string, string> }
  | { type: "REMOVE_ITEM"; itemId: string }
  | { type: "UPDATE_QUANTITY"; itemId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" };

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 12;

function calculateCart(items: CartItem[]): Omit<Cart, "items"> {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, shipping, tax, total, itemCount };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const variantKey = JSON.stringify(action.selectedVariants ?? {});
      const existingIndex = state.items.findIndex(
        (i) => i.product.id === action.product.id && JSON.stringify(i.selectedVariants ?? {}) === variantKey
      );
      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + action.quantity,
        };
        return { ...state, items: updatedItems };
      }
      const newItem: CartItem = {
        id: generateCartItemId(),
        product: action.product,
        quantity: action.quantity,
        selectedVariants: action.selectedVariants,
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.itemId) };

    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.itemId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.itemId ? { ...i, quantity: action.quantity } : i
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface CartContextValue {
  cart: Cart;
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, selectedVariants?: Record<string, string>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const cart: Cart = { items: state.items, ...calculateCart(state.items) };

  const addItem = useCallback(
    (product: Product, quantity = 1, selectedVariants?: Record<string, string>) =>
      dispatch({ type: "ADD_ITEM", product, quantity, selectedVariants }),
    []
  );
  const removeItem = useCallback(
    (itemId: string) => dispatch({ type: "REMOVE_ITEM", itemId }),
    []
  );
  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => dispatch({ type: "UPDATE_QUANTITY", itemId, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const openCart = useCallback(() => dispatch({ type: "OPEN_CART" }), []);
  const closeCart = useCallback(() => dispatch({ type: "CLOSE_CART" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);

  return (
    <CartContext.Provider value={{ cart, isOpen: state.isOpen, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

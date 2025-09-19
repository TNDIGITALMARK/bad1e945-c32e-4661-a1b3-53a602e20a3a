'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Cart, CartItem, Product } from '@/types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; selectedColor?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_IS_OPEN'; payload: { isOpen: boolean } }
  | { type: 'LOAD_CART'; payload: { cart: Cart } };

const calculateTotals = (items: CartItem[]): Omit<Cart, 'items'> => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 75 ? 0 : 8.99; // Free shipping over $75
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    totalItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
};

const cartReducer = (state: Cart & { isOpen: boolean }, action: CartAction): Cart & { isOpen: boolean } => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, selectedColor } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.productId === product.id && item.selectedColor === selectedColor
      );

      let newItems: CartItem[];

      if (existingItemIndex !== -1) {
        // Update existing item
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          productId: product.id,
          product,
          quantity,
          selectedColor,
          addedAt: new Date(),
        };
        newItems = [...state.items, newItem];
      }

      const totals = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }

    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload;
      const newItems = state.items.filter(item => item.productId !== productId);
      const totals = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const newItems = state.items.filter(item => item.productId !== productId);
        const totals = calculateTotals(newItems);

        return {
          ...state,
          items: newItems,
          ...totals,
        };
      }

      const newItems = state.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      const totals = calculateTotals(newItems);

      return {
        ...state,
        items: newItems,
        ...totals,
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        totalItems: 0,
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
      };
    }

    case 'SET_IS_OPEN': {
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };
    }

    case 'LOAD_CART': {
      return {
        ...action.payload.cart,
        isOpen: state.isOpen,
      };
    }

    default:
      return state;
  }
};

const initialCart: Cart & { isOpen: boolean } = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  isOpen: false,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('earrings-things-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: { cart: parsedCart } });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartToSave = {
      items: state.items,
      totalItems: state.totalItems,
      subtotal: state.subtotal,
      shipping: state.shipping,
      tax: state.tax,
      total: state.total,
    };
    localStorage.setItem('earrings-things-cart', JSON.stringify(cartToSave));
  }, [state.items, state.totalItems, state.subtotal, state.shipping, state.tax, state.total]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity, selectedColor }
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setIsOpen = (isOpen: boolean) => {
    dispatch({ type: 'SET_IS_OPEN', payload: { isOpen } });
  };

  const contextValue: CartContextType = {
    cart: {
      items: state.items,
      totalItems: state.totalItems,
      subtotal: state.subtotal,
      shipping: state.shipping,
      tax: state.tax,
      total: state.total,
    },
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isOpen: state.isOpen,
    setIsOpen,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
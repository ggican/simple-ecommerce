'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import store2 from 'store2';

export interface CartItem {
  id: number;
  name: string;
  favorite?: string;
  category: string;
  price: number;
  image: string;
  promotion: number;
  quantity: number;
}

type CartContextData = {
  cart: CartItem[];
  addToCart: (value: CartItem) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  calculateTotalPrice: (value: CartItem[]) => number;
  calculateTotalQuantity: (value: CartItem[]) => number;
};

const CartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartStorage: CartItem[] = store2.get('cart') || [];

  useEffect(() => {
    setCart(cartStorage);
    return () => {};
  }, []);

  const addToCart = (product: CartItem) => {
    let cart = store2.get('cart') || [];
    const existingItem = cart.find((item: CartItem) => item.id === product.id);

    if (existingItem) {
      cart = cart.map((item: CartItem) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    store2.set('cart', cart);
    setCart(cart);
    toast.success(`${product.name} added to cart!`, {
      position: 'bottom-right',
    });
  };

  const removeFromCart = (id: number) => {
    let cart = store2.get('cart') || [];
    cart = cart.filter((item: CartItem) => item.id !== id);
    store2.set('cart', cart);
    setCart(cart);
    toast.info(`Item removed from cart!`, {
      position: 'bottom-right',
    });
  };

  const decreaseQuantity = (id: number) => {
    let cart = store2.get('cart') || [];
    const existingItem = cart.find((item: CartItem) => item.id === id);

    if (existingItem && existingItem.quantity > 1) {
      cart = cart.map((item: CartItem) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
    } else {
      cart = cart.filter((item: CartItem) => item.id !== id);
    }

    store2.set('cart', cart);
    setCart(cart);
    toast.info(`Item quantity updated!`, {
      position: 'bottom-right',
    });
  };

  const calculateTotalQuantity = (cartItems: CartItem[]): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = (cartItems: CartItem[]): number => {
    return cartItems.reduce((total, item) => {
      const priceAfterDiscount =
        item.price - (item.promotion / 100) * item.price;
      return total + priceAfterDiscount * item.quantity;
    }, 0);
  };
  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        decreaseQuantity: decreaseQuantity,
        calculateTotalPrice: calculateTotalPrice,
        calculateTotalQuantity: calculateTotalQuantity,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };

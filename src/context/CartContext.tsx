"use client";

import { useCreateCartMutation, useDeleteCartMutation, useGetCartQuery, useUpdateCartMutation } from "@/redux/api/cartApi";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export type CartItem = {
  variantId: string;
  quantity: number;
};

type CartContextType = {
  effectiveCart: CartItem[];
  cartCount: number;
  addToCart: (variantId: string, maxQuantity: number) => void;
  increaseItem: (variantId: string, maxQuantity?: number) => void;
  decreaseItem: (variantId: string) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const CART_KEY = "cart-items";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const userInfo = useAuth();
  const isLoggedIn = !!userInfo?.role;
  const hasMergedRef = useRef(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [createCart] = useCreateCartMutation();
  const [updateCartItem] = useUpdateCartMutation();
  const [deleteCartItem] = useDeleteCartMutation();
  const { data: serverCart = [], refetch } = useGetCartQuery(
    undefined,
    { skip: !isLoggedIn }
  );
  const effectiveCart = isLoggedIn ? serverCart : cart;

  // Reset merge flag when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      hasMergedRef.current = false;
    }
  }, [isLoggedIn]);

  // GUEST: Load cart from storage
  useEffect(() => {
    if (isLoggedIn) return;
    const raw = localStorage.getItem(CART_KEY);
    if (raw) setCart(JSON.parse(raw));
  }, [isLoggedIn]);

  // GUEST: Persist cart
  useEffect(() => {
    if (isLoggedIn) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, isLoggedIn]);

  // LOGIN: Merge guest cart → server
  useEffect(() => {
    if (!isLoggedIn || hasMergedRef.current) return;

    const raw = localStorage.getItem(CART_KEY);
    if (!raw) {
      hasMergedRef.current = true;
      return;
    }

    const items: CartItem[] = JSON.parse(raw);
    if (items.length === 0) {
      hasMergedRef.current = true;
      return;
    }

    hasMergedRef.current = true;

    createCart(items)
      .unwrap()
      .then(async () => {
        localStorage.removeItem(CART_KEY);
        setCart([]);
        await refetch();
      })
      .catch((error) => {
        console.error('Failed to merge cart:', error);
        hasMergedRef.current = false;
      });
  }, [isLoggedIn, createCart, refetch]);

  // ---------------------------- ACTIONS ----------------------------
  
  const addToCart = async (variantId: string, maxQuantity: number) => {
    if (isLoggedIn) {
      try {
        await createCart([{ variantId, quantity: 1 }]).unwrap();
        await refetch();
        toast.success('Added to cart');
      } catch (error) {
        console.error('Failed to add to cart:', error);
        toast.error('Failed to add to cart');
      }
      return;
    }
    
    setCart((prev) => {
      const existing = prev.find((i) => i.variantId === variantId);
      if (existing) {
        if (existing.quantity >= maxQuantity) {
          toast.info('Maximum quantity reached');
          return prev;
        }
        toast.success('Quantity updated');
        return prev.map((i) =>
          i.variantId === variantId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success('Added to cart');
      return [...prev, { variantId, quantity: 1 }];
    });
  };

  const increaseItem = async (variantId: string, maxQuantity?: number) => {
    if (isLoggedIn) {
      const item = serverCart.find((i: CartItem) => i.variantId === variantId);
      if (!item) return;
      
      if (maxQuantity && item.quantity >= maxQuantity) {
        toast.info('Maximum quantity reached');
        return;
      }
      
      try {
        await updateCartItem({
          variantId,
          quantity: 1,
        }).unwrap();
        await refetch();
      } catch (error) {
        console.error('Failed to update cart:', error);
        toast.error('Failed to update cart');
      }
      return;
    }
    
    setCart((prev) =>
      prev.map((i) => {
        if (i.variantId === variantId) {
          if (maxQuantity && i.quantity >= maxQuantity) {
            toast.info('Maximum quantity reached');
            return i;
          }
          return { ...i, quantity: i.quantity + 1 };
        }
        return i;
      })
    );
  };

  const decreaseItem = async (variantId: string) => {
    if (isLoggedIn) {
      const item = serverCart.find((i: CartItem) => i.variantId === variantId);
      if (!item) return;
      
      try {
        if (item.quantity <= 1) {
          await deleteCartItem(variantId).unwrap();
        } else {
          await updateCartItem({
            variantId,
            quantity: -1,
          }).unwrap();
        }
        await refetch();
      } catch (error) {
        console.error('Failed to update cart:', error);
        toast.error('Failed to update cart');
      }
      return;
    }
    
    setCart((prev) =>
      prev
        .map((i) =>
          i.variantId === variantId ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = async (variantId: string) => {
    if (isLoggedIn) {
      try {
        await deleteCartItem(variantId).unwrap();
        await refetch();
        toast.success('Item removed from cart');
      } catch (error) {
        console.error('Failed to remove item:', error);
        toast.error('Failed to remove item');
      }
      return;
    }
    
    setCart((prev) => prev.filter((i) => i.variantId !== variantId));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    if (isLoggedIn) {
      // For logged-in users, the backend clears the cart after order creation
      // So we just need to refetch to sync the empty cart
      refetch();
    } else {
      // For guest users, clear localStorage
      setCart([]);
      localStorage.removeItem(CART_KEY);
    }
  };

  // Calculate cart count safely
  const cartCount = effectiveCart.reduce((sum: number, item: CartItem) => {
    return sum + (item?.quantity || 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        effectiveCart,
        cartCount,
        addToCart,
        increaseItem,
        decreaseItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

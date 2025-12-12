import React, { useState, useCallback, useEffect } from "react";
import { CartContext } from "./CartContext";
import supabase from "../utils/supabase";
import { useAuth } from "../hooks/useAuthHook";

export const CartProvider = ({ children }) => {
  const { user, authReady } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  /* ----------------------------------------------------
      LOAD CART — ONLY WHEN USER IS LOGGED IN
  ------------------------------------------------------ */
  useEffect(() => {
    if (!authReady) return;

    const loadCart = async () => {
      try {
        if (!user) {
          // user logout → empty cart
          setCartItems([]);
          setSelectedItems([]);
          setLoading(false);
          return;
        }

        // user logged in → load from Supabase
        const { data, error } = await supabase
          .from("user_carts")
          .select("cart_items, selected_items")
          .eq("user_id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error loading cart:", error);
        }

        if (data) {
          setCartItems(data.cart_items || []);
          setSelectedItems(data.selected_items || []);
        } else {
          // no cart exists yet
          setCartItems([]);
          setSelectedItems([]);
        }
      } catch (err) {
        console.error("Error loading cart:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  /* ----------------------------------------------------
      SAVE CART TO SUPABASE — ONLY WHEN LOGGED IN
  ------------------------------------------------------ */
  useEffect(() => {
    const saveCart = async () => {
      if (!user || loading) return;

      try {
        const { data: existingCart } = await supabase
          .from("user_carts")
          .select("id")
          .eq("user_id", user.id)
          .single();

        if (existingCart) {
          await supabase
            .from("user_carts")
            .update({
              cart_items: cartItems,
              selected_items: selectedItems,
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", user.id);
        } else {
          await supabase.from("user_carts").insert({
            user_id: user.id,
            cart_items: cartItems,
            selected_items: selectedItems,
          });
        }
      } catch (err) {
        console.error("Error saving cart:", err);
      }
    };

    saveCart();
  }, [cartItems, selectedItems, user, loading]);

  /* ----------------------------------------------------
      RESTRICT ADD TO CART (only logged in)
  ------------------------------------------------------ */
  const addToCart = useCallback(
    (item) => {
      if (!user) {
        setShowLogin(true);
        return false; // ⬅️ Tambahkan ini
      }

      setCartItems((prev) => {
        const exists = prev.find((i) => i.id === item.id);

        if (exists) {
          return prev.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          );
        }

        return [...prev, { ...item, quantity: item.quantity || 1 }];
      });

      return true; // ⬅️ Return success
    },
    [user]
  );

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback(
    (itemId, qty) => {
      if (qty <= 0) {
        removeFromCart(itemId);
        return;
      }

      setCartItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: qty } : i))
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    setSelectedItems([]);
  }, []);

  /* ----------------------------------------------------
      SELECTED ITEMS & TOTALS
  ------------------------------------------------------ */
  const toggleSelectItem = useCallback((id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const selectAllItems = useCallback(() => {
    setSelectedItems(cartItems.map((i) => i.id));
  }, [cartItems]);

  const clearSelectedItems = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const getSelectedTotal = useCallback(
    () =>
      cartItems
        .filter((i) => selectedItems.includes(i.id))
        .reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cartItems, selectedItems]
  );

  const SHIPPING_FEE = 25000;
  const MIN_FREE_SHIPPING = 100000;

  const getShippingFee = useCallback(() => {
    if (selectedItems.length === 0) return 0;

    const total = getSelectedTotal();
    return total < MIN_FREE_SHIPPING ? SHIPPING_FEE : 0;
  }, [selectedItems, getSelectedTotal]);

  const getFinalTotal = useCallback(() => {
    if (selectedItems.length === 0) return 0;

    const subtotal = getSelectedTotal();
    const shipping = getShippingFee();
    const tax = Math.round((subtotal + shipping) * 0.1);

    return subtotal + shipping + tax;
  }, [selectedItems, getSelectedTotal, getShippingFee]);

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        selectedItems,
        toggleSelectItem,
        selectAllItems,
        clearSelectedItems,
        getSelectedTotal,
        getShippingFee,
        getFinalTotal,
        getTotalItems,
        showLogin,
        setShowLogin,
        showRegister,
        setShowRegister,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

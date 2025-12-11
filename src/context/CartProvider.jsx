import React, { useState, useCallback, useEffect } from "react";
import { CartContext } from "./CartContext";
import supabase from "../utils/supabase";
import { useAuth } from "../hooks/useAuthHook";
import LoginRequiredModal from "../components/LoginRequiredModal";

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Load cart from Supabase or localStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (user) {
          // Load from Supabase if user is authenticated
          const { data, error } = await supabase
            .from("user_carts")
            .select("cart_items, selected_items")
            .eq("user_id", user.id)
            .single();

          if (error && error.code !== "PGRST116") {
            console.error("Error loading cart from Supabase:", error);
          }

          if (data) {
            setCartItems(data.cart_items || []);
            setSelectedItems(data.selected_items || []);
          } else {
            // First time user - initialize from localStorage if exists
            const savedCart = localStorage.getItem("cartItems");
            const savedSelected = localStorage.getItem("selectedItems");
            setCartItems(savedCart ? JSON.parse(savedCart) : []);
            setSelectedItems(savedSelected ? JSON.parse(savedSelected) : []);
          }
        } else {
          // Load from localStorage for guest users
          const savedCart = localStorage.getItem("cartItems");
          const savedSelected = localStorage.getItem("selectedItems");
          setCartItems(savedCart ? JSON.parse(savedCart) : []);
          setSelectedItems(savedSelected ? JSON.parse(savedSelected) : []);
        }
      } catch (err) {
        console.error("Error loading cart:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Save cart to Supabase when user is authenticated
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
          // Update existing cart
          await supabase
            .from("user_carts")
            .update({
              cart_items: cartItems,
              selected_items: selectedItems,
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", user.id);
        } else {
          // Create new cart
          await supabase.from("user_carts").insert({
            user_id: user.id,
            cart_items: cartItems,
            selected_items: selectedItems,
          });
        }
      } catch (err) {
        console.error("Error saving cart to Supabase:", err);
      }
    };

    saveCart();
  }, [cartItems, selectedItems, user, loading]);

  // Save to localStorage as backup for guest users
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
  }, [cartItems, selectedItems, user]);

  const addToCart = useCallback(
    (item) => {
      if (!user) {
        setShowLoginModal(true);
        return false; // ⬅ TANPA LOGIN: GAGAL
      }

      setCartItems((prevItems) => {
        const existing = prevItems.find((i) => i.id === item.id);
        if (existing) {
          return prevItems.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          );
        }
        return [...prevItems, { ...item, quantity: item.quantity || 1 }];
      });

      return true; // ⬅ BERHASIL
    },
    [user]
  );

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback(
    (itemId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
      } else {
        setCartItems((prevItems) =>
          prevItems.map((i) => (i.id === itemId ? { ...i, quantity } : i))
        );
      }
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const toggleSelectItem = useCallback((itemId) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  }, []);

  const selectAllItems = useCallback(() => {
    const allIds = cartItems.map((item) => item.id);
    setSelectedItems(allIds);
  }, [cartItems]);

  const clearSelectedItems = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const getSelectedTotal = useCallback(() => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems, selectedItems]);

  const getSelectedQuantity = useCallback(() => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems, selectedItems]);

  const SHIPPING_FEE = 25000; // Rp 25,000
  const MIN_FREE_SHIPPING = 100000; // Rp 100,000

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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        selectedItems,
        toggleSelectItem,
        selectAllItems,
        clearSelectedItems,
        getSelectedTotal,
        getSelectedQuantity,
        getShippingFee,
        getFinalTotal,
      }}
    >
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          setShowLoginModal(false);
          window.location.href = "/login";
        }}
      />
      {children}
    </CartContext.Provider>
  );
};

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTrash, FaCheck } from "react-icons/fa";
import { useCart } from "../hooks/useCart";

const cartStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cart-container { animation: fadeInUp 0.6s ease-out; }
  .cart-item { animation: fadeInUp 0.6s ease-out; transition: all 0.3s ease; }
  .cart-item.selected { background-color: #f0f9f7; border-color: #007E6E; }
  .cart-item:hover { transform: translateY(-4px); box-shadow: 0 8px 16px rgba(0, 126, 110, 0.1); }
  .quantity-btn { transition: all 0.2s ease; }
  .quantity-btn:hover { background-color: #005d52; color: white; }
  .checkbox-item { cursor: pointer; accent-color: #007E6E; }
`;

const Cart = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState(null);
  const [fading, setFading] = useState(false);

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    selectedItems,
    toggleSelectItem,
    selectAllItems,
    clearSelectedItems,
    getSelectedTotal,
    getSelectedQuantity,
    getShippingFee,
    getFinalTotal,
  } = useCart();
  const cart = cartItems;

  const handleDeleteClick = (itemId, itemName) => {
    setDeleteConfirm({ itemId, itemName });
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      removeFromCart(deleteConfirm.itemId);
      setDeleteConfirm(null);
    }
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) return;

    const totalQuantity = getSelectedQuantity();
    const totalPrice = getSelectedTotal();

    // Tampilkan notifikasi dulu
    setNotification(
      `Checkout successful! ${totalQuantity} items (Rp ${totalPrice.toLocaleString(
        "id-ID"
      )}) - Thank you for your order!`
    );
    setFading(false);

    // Baru mulai animasi fade
    setTimeout(() => setFading(true), 2000);

    // Hapus notifikasi
    setTimeout(() => setNotification(null), 2500);

    // Baru hapus item dari cart SETELAH notifikasi muncul
    setTimeout(() => {
      selectedItems.forEach((itemId) => removeFromCart(itemId));
      clearSelectedItems(); // kosongkan selected items juga
    }, 500); // kasih delay kecil agar UI tidak rerender terlalu cepat
  };

  if (cart.length === 0) {
    return (
      <>
        <style>{cartStyles}</style>
        <div className="w-full px-1 sm:px-10 mx-auto">
          <div className="min-h-screen py-12">
            <div className="text-center py-20">
              <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
                <FaShoppingCart size={60} className="text-gray-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-[#007E6E] hover:bg-[#005d52] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{cartStyles}</style>
      <div className="w-full px-4 sm:px-10 mx-auto py-8 sm:py-12">
        <div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {getTotalItems()} items in your cart
            </p>
          </div>

          <div className="mb-6 flex gap-4">
            <button
              onClick={selectAllItems}
              className="px-4 py-2 bg-[#007E6E] hover:bg-[#005d52] text-white rounded-lg font-semibold transition"
            >
              Select All
            </button>
            <button
              onClick={clearSelectedItems}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition"
            >
              Deselect All
            </button>
            {selectedItems.length > 0 && (
              <div className="ml-auto flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {getSelectedQuantity()} item
                  {getSelectedQuantity() !== 1 ? "s" : ""} selected
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:flex-1 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className={`cart-item bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 ${
                    selectedItems.includes(item.id) ? "selected" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                    className="checkbox-item w-5 h-5 rounded mt-1 shrink-0"
                  />
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-[#007E6E] font-semibold text-lg">
                          Rp {new Intl.NumberFormat("id-ID").format(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteClick(item.id, item.name)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-sm">Quantity:</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="quantity-btn bg-gray-200 text-gray-800 font-bold py-1 px-3 rounded-lg"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="quantity-btn bg-gray-200 text-gray-800 font-bold py-1 px-3 rounded-lg"
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 text-sm">
                        Subtotal:{" "}
                        <span className="font-bold text-[#007E6E]">
                          Rp{" "}
                          {new Intl.NumberFormat("id-ID").format(
                            item.price * item.quantity
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-96 bg-linear-to-br from-[#007E6E] to-[#005d52] rounded-2xl p-6 sm:p-8 text-white sticky top-20 lg:top-24 h-fit">
              <h2 className="text-2xl font-bold mb-6">
                {selectedItems.length > 0
                  ? "Checkout Summary"
                  : "Order Summary"}
              </h2>

              {selectedItems.length > 0 && (
                <div className="mb-6 pb-6 border-b border-white/20">
                  <p className="text-sm text-white/80 mb-2">Selected Items</p>
                  <p className="text-2xl font-bold">
                    {getSelectedQuantity()} items selected
                  </p>
                </div>
              )}

              {selectedItems.length > 0 && (
                <>
                  <div className="flex justify-between mb-4 pb-4 border-b border-white/20">
                    <span>Subtotal ({getSelectedQuantity()} items)</span>
                    <span className="font-semibold">
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        getSelectedTotal()
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between mb-4 pb-4 border-b border-white/20">
                    <span>Shipping</span>
                    <span
                      className={`font-semibold ${
                        getShippingFee() === 0 ? "text-green-500" : ""
                      }`}
                    >
                      {getShippingFee() === 0 ? (
                        "FREE"
                      ) : (
                        <>
                          Rp{" "}
                          {new Intl.NumberFormat("id-ID").format(
                            getShippingFee()
                          )}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between mb-6 pb-6 border-b border-white/20">
                    <span>Tax (10%)</span>
                    <span className="font-semibold">
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        Math.round(
                          (getSelectedTotal() + getShippingFee()) * 0.1
                        )
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-bold">
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(getFinalTotal())}
                    </span>
                  </div>
                </>
              )}
              <button
                onClick={handleProceedToCheckout}
                disabled={selectedItems.length === 0}
                className={`w-full font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition ${
                  selectedItems.length > 0
                    ? "bg-white text-[#007E6E] hover:bg-gray-100"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                <FaCheck size={18} /> Proceed to Checkout
              </button>
              <p className="text-sm text-gray-200 text-center mt-6">
                ✓ Free shipping on orders over Rp 100.000
              </p>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40">
            <div className="modal-content bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
              <div className="bg-linear-to-r from-red-500 to-red-600 p-6 text-white">
                <h2 className="text-2xl font-bold">Delete Item?</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-[#007E6E]">
                    {deleteConfirm.itemName}
                  </span>{" "}
                  from your cart?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <FaTrash size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Notification */}
      {notification && (
        <div
          className={`fixed inset-0 z-[999] flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-2xl font-semibold text-center max-w-md">
            {notification}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { useCart } from "../hooks/useCart";
import { FaShoppingCart } from "react-icons/fa";
import { useDiscount } from "../context/DiscountContext";
import Login from "./Login";
import Register from "./Register";

const shopStyles = `
.product-card {
  opacity: 0;
  transform: translateY(15px) scale(0.95);
  transition: all 0.6s ease-out;
}
.product-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.product-card-hover:hover .overlay {
  opacity: 1;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
`;

function Shop() {
  const { addToCart } = useCart();
  const { discounts } = useDiscount();

  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFruit, setSelectedFruit] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [hoveredId, setHoveredId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [fading, setFading] = useState(false);
  const [visibleCards, setVisibleCards] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Fetch fruits
  useEffect(() => {
    async function fetchFruits() {
      const { data, error } = await supabase.from("fruits").select("*");
      if (error) console.error(error);
      else setFruits(data);
      setLoading(false);
    }
    fetchFruits();
  }, []);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll("[data-fruit-id]");
    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, [fruits]);

  // Show notification with fade out
  const showNotification = (msg) => {
    setNotification(msg);
    setFading(false); // reset fading
    setTimeout(() => setFading(true), 2000); // mulai fade out setelah 2 detik
    setTimeout(() => setNotification(null), 2500); // hapus notification setelah fade selesai
  };

  const applyDiscountedPrice = (fruit) => {
    return discounts[fruit.name] ?? fruit.price;
  };

  const handleQuickAddToCart = (fruit) => {
    const success = addToCart({ ...fruit, quantity: 1 });
    if (!success) return;

    showNotification(
      `${fruit.name} added to cart! (${applyDiscountedPrice(
        fruit
      ).toLocaleString("id-ID")} each)`
    );
  };

  const handleAddToCart = (fruit) => {
    const success = addToCart({ ...fruit, quantity });
    if (!success) return;

    showNotification(
      `${fruit.name} x${quantity} added to cart! (${applyDiscountedPrice(
        fruit
      ).toLocaleString("id-ID")} each)`
    );

    setSelectedFruit(null);
    setQuantity(1);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#007E6E]"></div>
          <p className="text-gray-600 mt-4">Loading products...</p>
        </div>
      </div>
    );

  return (
    <>
      <style>{shopStyles}</style>

      {/* Notification Modal with Fade Out */}
      {notification && (
        <div
          className={`notification fixed inset-0 z-40 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="bg-green-500 text-white px-8 py-5 rounded-lg shadow-2xl flex items-center gap-3">
            <div className="text-3xl">✓</div>
            <div>
              <p className="font-semibold text-lg">{notification}</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full px-4 sm:px-10 mx-auto pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 pb-12 mb-14 md:mb-20">
          {fruits.map((fruit, idx) => (
            <div
              key={fruit.id}
              id={`fruit-${fruit.id}`}
              data-fruit-id={fruit.id}
              className={`product-card product-card-hover bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer group loaded-${
                (idx % 12) + 1
              } ${visibleCards[`fruit-${fruit.id}`] ? "visible" : ""}`}
              onMouseEnter={() => setHoveredId(fruit.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedFruit(fruit)}
            >
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                <img
                  src={fruit.image_url}
                  alt={fruit.name}
                  className="w-full h-full scale-110 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                {hoveredId === fruit.id && (
                  <div className="absolute inset-0 bg-[#007E6E] bg-opacity-40 flex flex-col items-center justify-center gap-3 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => setSelectedFruit(fruit)}
                      className="bg-white text-[#007E6E] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
                    >
                      <FaShoppingCart size={18} /> View Details
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {fruit.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {fruit.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#007E6E]">
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(
                      applyDiscountedPrice(fruit)
                    )}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAddToCart(fruit);
                    }}
                    className="bg-[#007E6E] text-white p-2 rounded-lg hover:bg-[#005d52] transition-colors duration-200"
                  >
                    <FaShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedFruit && (
        <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/40">
          <div className="modal-content bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-linear-to-r from-[#007E6E] to-[#005d52] p-6 text-white flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedFruit.name}</h2>
              <button
                onClick={() => {
                  setSelectedFruit(null);
                  setQuantity(1);
                }}
                className="text-white hover:text-gray-200 transition-colors duration-200 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <img
                src={selectedFruit.image_url}
                alt={selectedFruit.name}
                className="w-full h-56 object-contain scale-120 rounded-xl mb-4"
              />
              <p className="text-gray-700 text-sm mb-4">
                {selectedFruit.description}
              </p>
              <p className="text-gray-600 text-sm mb-3">Price</p>
              <p className="text-3xl font-bold text-[#007E6E]">
                Rp{" "}
                {new Intl.NumberFormat("id-ID").format(
                  applyDiscountedPrice(selectedFruit)
                )}
              </p>

              <div className="mb-6 mt-4">
                <p className="text-gray-600 text-sm mb-3">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-12 text-center font-semibold text-gray-800 border border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-[#007E6E] focus:ring-1 focus:ring-[#007E6E] bg-white"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedFruit(null);
                    setQuantity(1);
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddToCart(selectedFruit)}
                  className="flex-1 bg-[#007E6E] hover:bg-[#005d52] text-white font-bold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          switchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          switchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}

export default Shop;

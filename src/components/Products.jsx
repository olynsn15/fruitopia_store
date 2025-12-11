import React, { useState, useEffect, useRef } from "react";
import supabase from "../utils/supabase";
import { useCart } from "../hooks/useCart";
import { useDiscount } from "../context/DiscountContext";

const productCardStyles = `
@keyframes productSlideIn {
  from { opacity: 0; transform: scale(0.9) translateY(15px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.product-card-animate {
  opacity: 0;
  animation: productSlideIn 0.6s ease-out forwards;
}

.product-scroll-animate {
  opacity: 0;
  transform: scale(0.95) translateY(15px);
  transition: all 0.6s ease-out;
}

.product-scroll-animate.visible {
  opacity: 1;
  transform: scale(1) translateY(0);
}
`;

const Products = ({ onNotification = () => {} }) => {
  const { addToCart } = useCart();
  const { discounts } = useDiscount();
  const [productData, setProductData] = useState([]);
  const [animatingCards, setAnimatingCards] = useState({});
  const [visibleOnScroll, setVisibleOnScroll] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("fruits")
        .select("image_url, name, price, id")
        .in("id", [1, 2, 3, 4, 5, 6, 7, 8]); // tetap 8 produk
      if (!error && data) setProductData(data);
    };
    fetchProducts();
  }, []);

  // Initial animation
  useEffect(() => {
    productData.forEach((product, index) => {
      setTimeout(() => {
        setAnimatingCards((prev) => ({ ...prev, [product.id]: true }));
      }, index * 100);
    });
  }, [productData]);

  // Scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const productId = entry.target.dataset.productId;
            setVisibleOnScroll((prev) => ({ ...prev, [productId]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = containerRef.current?.querySelectorAll("[data-product-id]");
    cards?.forEach((card) => observer.observe(card));

    return () => cards?.forEach((card) => observer.unobserve(card));
  }, [productData]);

  const showNotification = (msg) => {
    if (typeof onNotification === 'function') {
      onNotification(msg);
    }
  };

  const getPrice = (product) => {
    if (product.name === "Pineapple" && discounts["Pineapple"]) {
      return discounts["Pineapple"];
    }
    return product.price;
  };

  return (
    <>
      <style>{productCardStyles}</style>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-screen-2xl my-12 sm:my-14 md:my-20">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 max-w-[600px] mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            Our Products
          </h1>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg">
            Explore our wide range of fresh and delicious fruits, handpicked for you.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8"
        >
          {productData.map((item) => (
            <div
              key={item.id}
              data-product-id={item.id}
              className={`product-scroll-animate ${
                animatingCards[item.id] ? "" : "opacity-0"
              } ${visibleOnScroll[item.id] ? "visible" : ""}`}
            >
              <div className="relative w-full h-50 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-50 h-50 object-cover rounded transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-full group-hover:translate-y-0 transition-all duration-300 bg-[#007E6E] bg-opacity-85 backdrop-blur-sm space-y-3 rounded-2xl sm:rounded-3xl">
                  <button
                    onClick={() => {
                      addToCart({ ...item, quantity: 1 });
                      showNotification(
                        `${item.name} added to cart! (Rp ${getPrice(
                          item
                        ).toLocaleString("id-ID")} each)`
                      );
                    }}
                    className="text-[#007E6E] font-bold py-2 sm:py-3 px-6 sm:px-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="mt-4 sm:mt-5">
                <h2 className="font-bold text-lg sm:text-xl text-black">
                  {item.name}
                </h2>
                <p className="text-[#007E6E] font-semibold text-sm sm:text-base mt-1">
                  Rp {new Intl.NumberFormat("id-ID").format(getPrice(item))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default Products;

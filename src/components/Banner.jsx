import React from "react";
import { useAuth } from "../hooks/useAuthHook";
import { useDiscount } from "../context/DiscountContext";

const Banner = ({ data, onLoginRequired = () => {}, onNotification = () => {} }) => {
  const { user } = useAuth();
  const { applyDiscount } = useDiscount();

  const handleClaim = () => {
    if (!user) {
      if (typeof onLoginRequired === 'function') {
        onLoginRequired();
      }
      return;
    }

    applyDiscount("Pineapple", 25, 18000);

    // Tampilkan notifikasi via callback
    if (typeof onNotification === 'function') {
      onNotification("Pineapple discount claimed!");
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-1 md:px-2 max-w-screen-2xl">
      <div
        style={{ backgroundColor: data.bgColor }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-black rounded-2xl sm:rounded-3xl"
      >
        {/* Konten banner */}
        <div className="p-4 sm:p-6 md:p-8">
          <p className="text-sm">{data.discount}</p>
          <h1 className="uppercase text-4xl lg:text-7xl font-bold">
            {data.title}
          </h1>
          <p className="text-sm">{data.date}</p>
        </div>
        <div className="h-full flex items-center">
          <img
            src={data.image}
            className="scale-125 w-[250px] md:w-[340px] mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] object-contain"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-4 sm:p-6 md:p-8">
          <p className="font-bold text-xl">{data.title2}</p>
          <p className="text-3xl sm:text-5xl font-bold">{data.title3}</p>
          <p className="text-sm tracking-wide leading-5">{data.title4}</p>
          <div>
            <button
              onClick={handleClaim}
              className="px-4 py-2 text-lg font-semibold border border-[#007E6E] text-[#007E6E] rounded-full transition-all duration-300 hover:bg-[#007E6E] hover:text-white"
            >
              Claim Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Banner;

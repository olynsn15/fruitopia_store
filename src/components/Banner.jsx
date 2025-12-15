import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = ({ data }) => {
  const navigate = useNavigate();

  const handleGoToShop = () => {
    navigate("/shop");
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-screen-2xl w-full">
      <div
        style={{ backgroundColor: data.bgColor }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center text-black rounded-2xl sm:rounded-3xl overflow-hidden"
      >
        {/* Konten banner */}
        <div className="p-3 sm:p-4 md:p-6 lg:p-8 min-w-0">
          <p className="text-xs sm:text-sm truncate">{data.discount}</p>
          <h1 className="uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold break-words">
            {data.title}
          </h1>
          <p className="text-xs sm:text-sm truncate">{data.date}</p>
        </div>
        <div className="h-full flex items-center justify-center hidden md:flex">
          <img
            src={data.image}
            className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] object-contain"
            alt="banner"
          />
        </div>
        <div className="flex flex-col justify-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-6 lg:p-8 min-w-0">
          <p className="font-bold text-base sm:text-lg md:text-xl truncate">{data.title2}</p>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold break-words">{data.title3}</p>
          <p className="text-xs sm:text-sm tracking-wide leading-4 line-clamp-2">{data.title4}</p>
          <div>
            <button
              onClick={handleGoToShop}
              className="px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base font-semibold border border-[#007E6E] text-[#007E6E] rounded-full transition-all duration-300 hover:bg-[#007E6E] hover:text-white whitespace-nowrap"
            >
              Go to Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

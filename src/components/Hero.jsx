import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Apple from '../assets/apple.png'
import Durian from '../assets/durian.png'
import Pomegranate from '../assets/pomegranate.png'
import Pineapple from '../assets/pineapple.png'

const HeroData = [
  {
    id: 111,
    img: Apple,
    subtitle: 'Best Buy',
    title: 'Fresh',
    title2: 'Apple'
  },
  {
    id: 222,
    img: Durian,
    subtitle: 'Best Buy',
    title: 'Fresh',
    title2: 'Durian'
  },
  {
    id: 333,
    img: Pomegranate,
    subtitle: 'Best Buy',
    title: 'Fresh',
    title2: 'Pomegranate'
  },
  {
    id: 444,
    img: Pineapple,
    subtitle: 'Best Buy',
    title: 'Fresh',
    title2: 'Pineapple'
  }
]

const Hero = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    cssEase: 'ease-in-out',
    pauseOnHover: true,
    pauseOnFocus: true,
    autoplay: true
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-screen-2xl">
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl min-h-[480px] sm:min-h-[550px] md:min-h-[650px] bg-gradient-to-br from-[#d4eee0] via-[#c8e6d8] to-[#b8dfd0] flex justify-center items-center shadow-lg">
        <div className="container pb-6 sm:pb-8 md:pb-0 px-0">
          <Slider {...settings}>
            {HeroData.map((data) => (
              <div key={data.id} className="py-4 sm:py-6 md:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 sm:gap-6 md:gap-8 px-3 sm:px-4 md:px-6">
                  {/* Content Section */}
                  <div className="flex flex-col justify-center gap-2 sm:gap-3 md:gap-4 pl-0 sm:pl-6 md:pl-10 pt-4 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                    <span className="text-xs sm:text-sm md:text-base uppercase tracking-widest font-bold text-[#007E6E] opacity-80">
                      {data.subtitle}
                    </span>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                        {data.title}
                      </h1>
                      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase font-black text-[#007E6E]">
                        {data.title2}
                      </h2>
                    </div>
                    
                    <div className="flex justify-center sm:justify-start mt-3 sm:mt-4 md:mt-6">
                      <Link
                        to="/shop"
                        className="inline-block px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-3 text-sm sm:text-base md:text-lg font-bold bg-[#007E6E] text-white rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-[#005d52] hover:shadow-lg hover:scale-105 active:scale-95"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="order-1 sm:order-2 flex justify-center items-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#007E6E] rounded-full opacity-5 blur-2xl"></div>
                      <img
                        src={data.img}
                        alt={data.title2}
                        className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] object-contain mx-auto drop-shadow-lg relative z-20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Hero
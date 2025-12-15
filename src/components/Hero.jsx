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
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-screen-2xl w-full">
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-gradient-to-br from-[#d4eee0] via-[#c8e6d8] to-[#b8dfd0] flex justify-center items-center shadow-lg">
        <div className="w-full pb-4 sm:pb-6 md:pb-0 px-0">
          <Slider {...settings}>
            {HeroData.map((data) => (
              <div key={data.id} className="py-4 sm:py-6 md:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4 md:px-6">
                  {/* Content Section */}
                  <div className="flex flex-col justify-center gap-2 sm:gap-3 md:gap-4 pl-0 sm:pl-4 md:pl-6 pt-4 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10 min-w-0">
                    <span className="text-xs sm:text-sm md:text-base uppercase tracking-widest font-bold text-[#007E6E] opacity-80 truncate">
                      {data.subtitle}
                    </span>
                    
                    <div className="space-y-1 sm:space-y-2">
                      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black break-words">
                        {data.title}
                      </h1>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-black text-[#007E6E] break-words">
                        {data.title2}
                      </h2>
                    </div>
                    
                    <div className="flex justify-center sm:justify-start mt-3 sm:mt-4 md:mt-6">
                      <Link
                        to="/shop"
                        className="inline-block px-4 sm:px-5 md:px-6 py-2 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base font-bold bg-[#007E6E] text-white rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-[#005d52] hover:shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>

                  {/* Image Section */}
                  <div className="order-1 sm:order-2 flex justify-center items-center min-w-0">
                    <div className="relative w-full flex justify-center">
                      <div className="absolute inset-0 bg-[#007E6E] rounded-full opacity-5 blur-2xl"></div>
                      <img
                        src={data.img}
                        alt={data.title2}
                        className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px] object-contain mx-auto drop-shadow-lg relative z-20 flex-shrink-0"
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
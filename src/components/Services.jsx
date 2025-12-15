import React, { useState, useEffect, useRef } from 'react'
import {
  FaCarSide,
  FaHeadphonesAlt,
  FaWallet,
  FaCheckCircle
} from 'react-icons/fa'

const cardAnimationStyles = `
  @keyframes cardSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card-animate {
    opacity: 0;
    animation: cardSlideIn 0.6s ease-out forwards;
  }

  .card-scroll-animate {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out;
  }

  .card-scroll-animate.visible {
    opacity: 1;
    transform: translateY(0);
  }
`

const ServiceData = [
  {
    id: 111,
    icon: <FaCarSide className="text-4xl md:text-5xl text-[#007E6E]"/>,
    title: 'Fresh Delivery',
    desc: 'Fresh fruits delivered directly to your doorstep'
  },
  {
    id: 222,
    icon: <FaCheckCircle className="text-4xl md:text-5xl text-[#007E6E]"/>,
    title: 'Quality Guarantee',
    desc: 'Fruits always in the best and highest quality'
  },
  {
    id: 333,
    icon: <FaHeadphonesAlt className="text-4xl md:text-5xl text-[#007E6E]"/>,
    title: 'Customer Support',
    desc: 'Customer support ready to assist you anytime'
  },
  {
    id: 444,
    icon: <FaWallet className="text-4xl md:text-5xl text-[#007E6E]"/>,
    title: 'Secure Payment',
    desc: 'Secure and trusted payment process'
  },
]

const Services = () => {
  const [animatingCards, setAnimatingCards] = useState({})
  const [visibleOnScroll, setVisibleOnScroll] = useState({})
  const containerRef = useRef(null)

  // Initial load animation
  useEffect(() => {
    ServiceData.forEach((data, index) => {
      setTimeout(() => {
        setAnimatingCards(prev => ({ ...prev, [data.id]: true }))
      }, index * 150) // 150ms stagger antara card
    })
  }, [])

  // Scroll animation setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId
            setVisibleOnScroll(prev => ({ ...prev, [cardId]: true }))
          }
        })
      },
      { threshold: 0.2 }
    )

    const cards = containerRef.current?.querySelectorAll('[data-card-id]')
    cards?.forEach(card => observer.observe(card))

    return () => {
      cards?.forEach(card => observer.unobserve(card))
    }
  }, [])

  return(
    <>
      <style>{cardAnimationStyles}</style>
      <div ref={containerRef} className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-screen-2xl my-8 sm:my-12 md:my-16 lg:my-20 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 gap-y-6 sm:gap-y-8 md:gap-y-10 justify-center">
          {
            ServiceData.map((data) => (
              <div
                key={data.id}
                data-card-id={data.id}
                className={`flex flex-col items-center sm:flex-col gap-3 sm:gap-4 px-2 sm:px-3 md:px-4 text-center sm:text-center card-scroll-animate ${
                  animatingCards[data.id] ? '' : 'opacity-0'
                } ${visibleOnScroll[data.id] ? 'visible' : ''}`}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl text-[#007E6E] flex-shrink-0">
                  {data.icon.props.children}
                </div>
                <div className="min-w-0">
                  <h1 className="text-base sm:text-lg md:text-xl lg:text-xl font-bold break-words">
                    {data.title}
                  </h1>
                  <h1 className="text-gray-400 text-xs sm:text-sm md:text-base line-clamp-2">
                    {data.desc}
                  </h1>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Services
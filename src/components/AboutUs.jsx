import React, { useState, useEffect } from 'react'

// Hook untuk deteksi element saat scroll
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleElements((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-scroll-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return visibleElements;
};

// CSS untuk animasi
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
  }

  .fade-in-up.active {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .slide-in-down {
    animation: slideInDown 0.6s ease-out forwards;
  }

  .slide-in-left {
    opacity: 0;
  }

  .slide-in-left.active {
    animation: slideInLeft 0.8s ease-out forwards;
  }

  .slide-in-right {
    opacity: 0;
  }

  .slide-in-right.active {
    animation: slideInRight 0.8s ease-out forwards;
  }

  .scale-in {
    opacity: 0;
  }

  .scale-in.active {
    animation: scaleIn 0.8s ease-out forwards;
  }

  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.3s; }
  .stagger-3 { animation-delay: 0.5s; }
`;

const AboutUs = () => {
  const visibleElements = useScrollAnimation();
  return (
    <>
      <style>{styles}</style>
      <div className="w-full mx-auto">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-[#007E6E] to-[#005A50] text-white py-12 sm:py-16 px-4 sm:px-10 slide-in-down">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 fade-in-up stagger-1">About Fruitopia</h1>
            <p className="text-base sm:text-lg text-green-100 fade-in-up stagger-2">
              Bringing Fresh, Healthy Fruits Directly to Your Door
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 sm:px-10 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-0">
            {/* Our Story */}
            <section 
              id="story-section"
              className={`mb-16 fade-in-up ${visibleElements["story-section"] ? "active" : ""}`}
              data-scroll-animate
            >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Fruitopia was founded with a simple mission: to make fresh, high-quality fruits accessible to everyone. We believe that eating healthy shouldn't be complicated or expensive.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Starting from a small local market, we've grown into a trusted fruit delivery service, serving thousands of customers who share our passion for healthy living and sustainability.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Every fruit we deliver is carefully selected and inspected to ensure you receive only the best quality produce. Our commitment to excellence is reflected in every order.
                </p>
              </div>
              <div className={`bg-linear-to-br from-green-100 to-blue-100 rounded-lg p-8 scale-in ${visibleElements["story-section"] ? "active" : ""}`} style={{ animationDelay: "0.3s" }}>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#007E6E] mb-2 fade-in-up" style={{ animationDelay: "0.4s" }}>5000+</p>
                  <p className="text-gray-700 font-semibold mb-4">Happy Customers</p>
                  <p className="text-4xl font-bold text-[#007E6E] mb-2 fade-in-up" style={{ animationDelay: "0.5s" }}>100%</p>
                  <p className="text-gray-700 font-semibold mb-4">Fresh Guarantee</p>
                  <p className="text-4xl font-bold text-[#007E6E] mb-2 fade-in-up" style={{ animationDelay: "0.6s" }}>24/7</p>
                  <p className="text-gray-700 font-semibold">Fast Delivery</p>
                </div>
              </div>
            </div>
          </section>

            {/* Our Values */}
            <section 
              id="values-section"
              className={`mb-16 fade-in-up ${visibleElements["values-section"] ? "active" : ""}`}
              data-scroll-animate
            >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 fade-in-up" style={{ animationDelay: "0.1s" }}>Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`bg-white border-l-4 border-[#007E6E] p-6 rounded-lg shadow slide-in-left ${visibleElements["values-section"] ? "active" : ""}`} style={{ animationDelay: "0.2s" }}>
                <h3 className="text-xl font-semibold text-[#007E6E] mb-3">Quality First</h3>
                <p className="text-gray-600">
                  We source only the freshest fruits from trusted local and international suppliers. Every piece is inspected for quality and taste.
                </p>
              </div>
              <div className={`bg-white border-l-4 border-[#007E6E] p-6 rounded-lg shadow fade-in-up ${visibleElements["values-section"] ? "active" : ""}`} style={{ animationDelay: "0.3s" }}>
                <h3 className="text-xl font-semibold text-[#007E6E] mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to sustainable farming practices and eco-friendly packaging to protect our planet for future generations.
                </p>
              </div>
              <div className={`bg-white border-l-4 border-[#007E6E] p-6 rounded-lg shadow slide-in-right ${visibleElements["values-section"] ? "active" : ""}`} style={{ animationDelay: "0.4s" }}>
                <h3 className="text-xl font-semibold text-[#007E6E] mb-3">Customer Care</h3>
                <p className="text-gray-600">
                  Your satisfaction is our top priority. We provide friendly customer support and a satisfaction guarantee on all orders.
                </p>
              </div>
            </div>
          </section>

            {/* Why Choose Us */}
            <section 
              id="why-section"
              className={`mb-16 fade-in-up ${visibleElements["why-section"] ? "active" : ""}`}
              data-scroll-animate
            >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 fade-in-up" style={{ animationDelay: "0.1s" }}>Why Choose Fruitopia?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`flex gap-4 slide-in-left ${visibleElements["why-section"] ? "active" : ""}`} style={{ animationDelay: "0.2s" }}>
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#007E6E] text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fresh & Organic</h3>
                  <p className="text-gray-600">Carefully selected fresh fruits picked at peak ripeness</p>
                </div>
              </div>

              <div className={`flex gap-4 slide-in-right ${visibleElements["why-section"] ? "active" : ""}`} style={{ animationDelay: "0.2s" }}>
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#007E6E] text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                  <p className="text-gray-600">Same-day delivery available in selected areas</p>
                </div>
              </div>

              <div className={`flex gap-4 slide-in-left ${visibleElements["why-section"] ? "active" : ""}`} style={{ animationDelay: "0.3s" }}>
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#007E6E] text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Affordable Prices</h3>
                  <p className="text-gray-600">Competitive pricing without compromising on quality</p>
                </div>
              </div>

              <div className={`flex gap-4 slide-in-right ${visibleElements["why-section"] ? "active" : ""}`} style={{ animationDelay: "0.3s" }}>
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#007E6E] text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Secure Payment</h3>
                  <p className="text-gray-600">Multiple payment options with secure transactions</p>
                </div>
              </div>

              <div className={`flex gap-4 slide-in-left ${visibleElements["why-section"] ? "active" : ""}`} style={{ animationDelay: "0.4s" }}>
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#007E6E] text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Customer Support</h3>
                  <p className="text-gray-600">24/7 dedicated customer service team</p>
                </div>
              </div>

              <div className={`flex gap-4 slide-in-right ${visibleElements["why-section"] ? "active" : ""}`} style={{ animationDelay: "0.4s" }}>
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#007E6E] text-white font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Satisfaction Guarantee</h3>
                  <p className="text-gray-600">100% satisfaction guarantee on all orders</p>
                </div>
              </div>
            </div>
          </section>

            {/* Our Team */}
            <section 
              id="team-section"
              className={`mb-16 fade-in-up ${visibleElements["team-section"] ? "active" : ""}`}
              data-scroll-animate
            >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 fade-in-up" style={{ animationDelay: "0.1s" }}>Our Team</h2>
            <p className={`text-gray-600 text-lg mb-8 fade-in-up ${visibleElements["team-section"] ? "active" : ""}`} style={{ animationDelay: "0.2s" }}>
              Our dedicated team of fruit experts, logistics specialists, and customer service professionals work tirelessly to bring you the best experience possible.
            </p>
            <div className={`bg-linear-to-r from-[#007E6E]/5 to-blue-50 p-8 rounded-lg slide-in-left ${visibleElements["team-section"] ? "active" : ""}`} style={{ animationDelay: "0.3s" }}>
              <p className="text-gray-700 text-center text-lg">
                With years of experience in the agricultural and retail industry, we understand what it takes to deliver exceptional quality and service. Join our growing community of fruit lovers!
              </p>
            </div>
          </section>

            {/* Call to Action */}
            <section 
              id="cta-section"
              className={`text-center py-12 bg-linear-to-r from-[#007E6E] to-[#005A50] rounded-lg text-white scale-in ${visibleElements["cta-section"] ? "active" : ""}`}
              data-scroll-animate
            >
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Fresh?</h2>
            <p className="text-lg mb-6">
              Start your healthy lifestyle journey with Fruitopia today!
            </p>
            <a
              href="/shop"
              className="inline-block bg-white text-[#007E6E] font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
            >
              Browse Our Fruits
            </a>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs

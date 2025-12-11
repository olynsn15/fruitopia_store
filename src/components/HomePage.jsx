import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Services from "./Services";
import Banner from "./Banner";
import Products from "./Products";
import Login from "./Login";
import Register from "./Register";
import Pineapple from "../assets/pineapple.png";

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

const BannerData = {
  discount: "25% OFF",
  title: "Fresh Pineapple",
  date: "Limited time offer",
  image: Pineapple,
  title2: "Premium Fruit Selection",
  title3: "Winter Freshness Sale",
  title4:
    "Discover our sweetest and juiciest pineapples. Limited stock available",
  bgColor: "#FFF7D5",
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
  .stagger-4 { animation-delay: 0.7s; }
`;

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [notification, setNotification] = useState(null);
  const [fading, setFading] = useState(false);
  const visibleElements = useScrollAnimation();

  useEffect(() => {
    // Trigger animasi setelah component mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className="w-full px-4 sm:px-10 mx-auto">
        <div
          className={`${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
        >
          <div className="slide-in-down stagger-1">
            <Hero />
          </div>

          <div
            id="services-section"
            data-scroll-animate
            className={`fade-in-up stagger-2 ${
              visibleElements["services-section"] ? "active" : ""
            }`}
          >
            <Services />
          </div>

          <div
            id="banner-section"
            data-scroll-animate
            className={`slide-in-left stagger-3 ${
              visibleElements["banner-section"] ? "active" : ""
            }`}
          >
            <Banner 
              data={BannerData} 
              onLoginRequired={() => setShowLogin(true)}
              onNotification={(msg) => {
                setNotification(msg);
                setFading(false);
                setTimeout(() => setFading(true), 2000);
                setTimeout(() => setNotification(null), 2500);
              }}
            />
          </div>

          <div
            id="products-section"
            data-scroll-animate
            className={`scale-in stagger-4 ${
              visibleElements["products-section"] ? "active" : ""
            }`}
          >
            <Products 
              onLoginRequired={() => setShowLogin(true)}
              onNotification={(msg) => {
                setNotification(msg);
                setFading(false);
                setTimeout(() => setFading(true), 2000);
                setTimeout(() => setNotification(null), 2500);
              }}
            />
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      {notification && (
        <div
          className={`fixed inset-0 z-40 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
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
};

export default HomePage;

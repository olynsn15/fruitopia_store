import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "../hooks/useAuthHook";
import { useCart } from "../hooks/useCart";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const MenuLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Shop", link: "/shop" },
  { id: 3, name: "Testimonials", link: "/testimonials" },
  { id: 4, name: "About Us", link: "/about-us" },
];

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogout = async () => {
    await logout();
    setShowProfile(false);
  };

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase();
  };

  const visibleMenuLinks = MenuLinks;

  return (
    <>
      <nav className="bg-white sticky top-0 z-50 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto px-0 max-w-screen-2xl">
          <div className="flex items-center justify-between py-4 w-full">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 sm:gap-4 shrink-0">
              <img src={Logo} alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
              <span className="font-black tracking-widest text-lg sm:text-2xl uppercase">
                FRUITOPIA
              </span>
            </a>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-6">
                {visibleMenuLinks.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      className={`relative font-medium text-sm pb-1 transition-all duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all after:duration-200 ${
                        location.pathname === item.link
                          ? "text-[#007E6E] after:w-full after:bg-[#007E6E]"
                          : "text-black hover:text-[#007E6E] after:w-0 after:bg-[#007E6E] hover:after:w-full"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section - Cart, Profile, Burger Menu */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Cart Icon */}
              <button
                onClick={handleCartClick}
                title="Shopping Cart"
                className="text-2xl hover:text-[#007E6E] transition relative"
                aria-label="Cart"
              >
                <FiShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Profile Icon - Show for authenticated users on all devices */}
              {isAuthenticated && (
                <button
                  onClick={() => setShowProfile(true)}
                  className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-[#007E6E] text-white font-bold flex items-center justify-center hover:bg-[#006456] transition text-xs sm:text-sm shadow-md hover:shadow-lg"
                  title={user?.name}
                >
                  {getInitials()}
                </button>
              )}

              {/* Auth Buttons - Only show on desktop for non-authenticated users */}
              {!isAuthenticated && (
                <div className="hidden sm:flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-gray-200 text-black border border-[#007E6E] rounded-md text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#a5c1bd] transition whitespace-nowrap"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => setShowRegister(true)}
                    className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#007E6E] text-white rounded-md text-xs sm:text-sm font-semibold tracking-wide hover:bg-[#006456] transition whitespace-nowrap"
                  >
                    Register
                  </button>
                </div>
              )}

              {/* Burger Menu Button - Mobile/Tablet Only */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden text-2xl hover:text-[#007E6E] transition"
                aria-label="Menu"
              >
                <GiHamburgerMenu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu - Appears below navbar */}
          {showMobileMenu && (
            <div className="lg:hidden border-t border-gray-200 py-4 mb-2">
              <ul className="flex flex-col gap-4">
                {visibleMenuLinks.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.link}
                      className={`font-medium text-sm transition-all duration-200 inline-block pb-1 ${
                        location.pathname === item.link
                          ? "text-[#007E6E] border-b-2 border-[#007E6E]"
                          : "text-black hover:text-[#007E6E]"
                      }`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile Auth Section - Only show login/register for non-authenticated users */}
              {!isAuthenticated && (
                <div className="mt-4 pt-4 border-t border-gray-200 sm:hidden flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2 bg-gray-200 text-black border border-[#007E6E] rounded-md text-sm font-semibold hover:bg-[#a5c1bd] transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowRegister(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-2 bg-[#007E6E] text-white rounded-md text-sm font-semibold hover:bg-[#006456] transition"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

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

      {/* User Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              <MdClose />
            </button>

            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-[#007E6E] text-white font-bold flex items-center justify-center text-2xl mb-4">
                {getInitials()}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                Profile
              </h2>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <p className="px-4 py-3 bg-gray-100 rounded-md text-gray-900 font-medium">
                  {user?.name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <p className="px-4 py-3 bg-gray-100 rounded-md text-gray-900 font-medium">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

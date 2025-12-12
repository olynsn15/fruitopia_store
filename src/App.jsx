import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Testimonials from "./components/Testimonials";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";

import AuthProvider from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;

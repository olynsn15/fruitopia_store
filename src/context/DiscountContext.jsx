import { createContext, useState, useContext } from "react";

const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {
  const [discounts, setDiscounts] = useState({}); // { Pineapple: 75000 }

  const applyDiscount = (productName, discountPercent, basePrice) => {
    const discountedPrice = Math.round(basePrice * (1 - discountPercent / 100));
    setDiscounts((prev) => ({ ...prev, [productName]: discountedPrice }));
  };

  return (
    <DiscountContext.Provider value={{ discounts, applyDiscount }}>
      {children}
    </DiscountContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDiscount = () => useContext(DiscountContext);

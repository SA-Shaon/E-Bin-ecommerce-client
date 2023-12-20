import { createContext, useContext, useState } from "react";

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const contextInfo = {
    cart,
    setCart,
  };
  return (
    <cartContext.Provider value={contextInfo}>{children}</cartContext.Provider>
  );
};
const useCart = () => useContext(cartContext);

export { useCart, CartProvider };

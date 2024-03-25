import { createContext, useContext, useEffect, useState } from "react";

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) setCart(JSON.parse(existingCart));
  }, []);

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

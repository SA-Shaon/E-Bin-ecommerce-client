import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/auth";
import { SearchProvider } from "../context/search";
import { CartProvider } from "../context/cart";
import Footer from "../components/footer/Footer";
import MenuLg from "../components/nav/MenuLg";

const Main = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <Toaster></Toaster>
          <MenuLg />
          <Outlet></Outlet>
          <Footer />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
};

export default Main;

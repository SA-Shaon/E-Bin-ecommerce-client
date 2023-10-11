import { Outlet } from "react-router-dom";
import Menu from "../components/nav/Menu";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/auth";
import { SearchProvider } from "../context/search";

const Main = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <Toaster></Toaster>
        <Menu />
        <Outlet></Outlet>
      </SearchProvider>
    </AuthProvider>
  );
};

export default Main;

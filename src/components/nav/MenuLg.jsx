import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { BsPersonSlash, BsSearch, BsCart2 } from "react-icons/bs";
import "./menulg.css";
import Search from "../forms/Search";
import { Badge } from "antd";

const MenuLg = () => {
  //context
  const { auth, setAuth } = useAuth();
  const { cart } = useCart();

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({ ...auth, user: null, token: "" });
    toast.success("Successfully logged Out.");
  };
  return (
    <div className="menuLg sticky-top">
      <ul className="nav d-flex justify-content-between  align-items-center  bg-light px-3">
        <li className="nav-item">
          <NavLink
            to="/"
            className="nav-link d-flex justify-content-between  align-items-center"
          >
            <img
              className="me-2"
              src="https://i.ibb.co/r4dQhXH/logo.png"
              alt=""
            />
            <img src="https://i.ibb.co/NxczK88/Funiro.png" alt="" />
          </NavLink>
        </li>
        <li className="nav-item ">
          <NavLink className="me-5 nav-btn" to="/">
            Home
          </NavLink>
          <NavLink className="me-5 nav-btn" to="/shop">
            Shop
          </NavLink>
          <NavLink className="me-5 nav-btn" to="/about">
            About
          </NavLink>
          <NavLink className=" nav-btn" to="/contact">
            Contact
          </NavLink>
        </li>
        <li className="nav-item d-flex justify-content-between  align-items-center">
          {!auth?.user && (
            <NavLink to="/login" className="me-4">
              <BsPersonSlash style={{ fontSize: "25px" }} />
            </NavLink>
          )}
          {auth?.user && (
            <div className="user-container">
              <div
                className="me-4 profileImg"
                style={{ width: "45px", height: "45px" }}
              >
                <img
                  className="h-100 w-100"
                  style={{ borderRadius: "50%" }}
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                />
              </div>
              <div className="user-dropdown">
                <li className="user-item">
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin/products" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="user-item">
                  <button
                    className="nav-link"
                    style={{ color: "#b88e2f" }}
                    onClick={logout}
                  >
                    LogOut
                  </button>
                </li>
              </div>
            </div>
          )}
          <div className="me-4 pointer search-container p-100">
            <BsSearch style={{ fontSize: "25px" }} />
            <div className="search-dropdown">
              <div className="search-item d-flex justify-content-between  align-items-center">
                <Search />
              </div>
            </div>
          </div>
          <div className="me-4">
            <Badge
              count={cart?.length}
              offset={[-1, 0]}
              showZero
              color="#b88e2f"
            >
              <NavLink to="/cart">
                <BsCart2 className=" nav-btn" style={{ fontSize: "25px" }} />
              </NavLink>
            </Badge>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MenuLg;

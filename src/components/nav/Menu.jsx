import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import Search from "../forms/Search";
import useCategories from "../../hooks/useCategory";
import { Badge } from "antd";
import { useCart } from "../../context/cart";

const Menu = () => {
  //context
  const { auth, setAuth } = useAuth();
  const { cart } = useCart();

  // hook
  const categories = useCategories();

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({ ...auth, user: null, token: "" });
    toast.success("Successfully logged Out.");
  };
  return (
    <>
      <ul className="nav d-flex justify-content-between align-items-center shadow-sm px-3 sticky-top bg-light">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            {({ isActive, isPending }) => (
              <span className={isActive ? "link-danger" : ""}>Home</span>
            )}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/shop" className="nav-link">
            {({ isActive, isPending }) => (
              <span className={isActive ? "link-danger" : ""}>Shop</span>
            )}
          </NavLink>
        </li>
        <Badge count={cart?.length} offset={[-1, 10]} showZero>
          <li className="nav-item">
            <NavLink to="/cart" className="nav-link">
              {({ isActive, isPending }) => (
                <span className={isActive ? "link-danger" : ""}>Cart</span>
              )}
            </NavLink>
          </li>
        </Badge>

        <div className="dropdown">
          <a
            className=" dropdown-toggle"
            role="button"
            id="dropdownMenuLink"
            aria-expanded="false"
            data-bs-toggle="dropdown"
          >
            Categories
          </a>
          <ul
            className="dropdown-menu"
            style={{ height: "300px", overflow: "scroll" }}
          >
            <NavLink to={`/categories`} className="nav-link dropdown-item">
              All Categories
            </NavLink>
            {categories?.map((c) => (
              <li key={c._id}>
                <NavLink
                  to={`/category/${c.slug}`}
                  className="nav-link dropdown-item"
                >
                  {c.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <Search />
        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                {({ isActive, isPending }) => (
                  <span className={isActive ? "link-danger" : ""}>LogIn</span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                {({ isActive, isPending }) => (
                  <span className={isActive ? "link-danger" : ""}>
                    Register
                  </span>
                )}
              </NavLink>
            </li>
          </>
        ) : (
          // <div className="dropdown">
          //   <li>
          //     <a
          //       className="nav-link pointer dropdown-toggle"
          //       data-bs-toggle="dropdown"
          //     >
          //       {auth?.user?.name}
          //     </a>
          //   </li>
          // </div>
          <div className="dropdown">
            <a
              className="btn btn-secondary dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {auth?.user?.name.toUpperCase()}
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <NavLink
                  to={`/dashboard/${
                    auth?.user?.role === 1 ? "admin/products" : "user"
                  }`}
                  className="nav-link dropdown-item"
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <button className="nav-link dropdown-item" onClick={logout}>
                  LogOut
                </button>
              </li>
            </ul>
          </div>
        )}
      </ul>
    </>
  );
};

export default Menu;

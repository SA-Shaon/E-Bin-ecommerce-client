import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import Search from "../forms/Search";

const Menu = () => {
  const { auth, setAuth } = useAuth();

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({ ...auth, user: null, token: "" });
    toast.success("Successfully logged Out.");
  };
  return (
    <>
      <ul className="nav d-flex justify-content-between align-items-center shadow-sm px-3">
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
              {auth?.user?.name}
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

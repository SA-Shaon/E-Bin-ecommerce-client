import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
  let { auth, loader } = useAuth();
  let location = useLocation();
  const navigate = useNavigate();

  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/admin-check`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      // const { data } = async () => await axios.get("/auth-check");
      // console.log(data);
      if (data?.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token, ok]);
  if (loader || !ok) {
    return <Loading />;
  }
  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    if (ok) {
      return children;
    } else {
      toast.error("You can't access Admin Dashboard.");
      navigate("/dashboard/user");
    }
  }
};

export default AdminRoute;

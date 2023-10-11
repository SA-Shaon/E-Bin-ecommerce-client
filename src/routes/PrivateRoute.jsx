import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  let { auth, loader } = useAuth();
  let location = useLocation();

  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/auth-check`,
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
  }
  return children;
};

export default PrivateRoute;

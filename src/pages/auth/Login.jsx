import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //hook
  const { auth, setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API}/login`, {
        email,
        password,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Login successfully.");
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Login failed. Try again.");
    }
  };
  return (
    <div>
      <Jumbotron title="Login"></Jumbotron>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
              />
              <button className="btn btn-primary">Submit</button>
              <Link to={"/register"} className=" ms-2">
                <button type="button" className="btn btn-danger">
                  Not a User?
                </button>
              </Link>
            </form>
          </div>
          <div className="mt-5">
            <p>admin = Email: shaon@gmail.com | pw: 123456 </p>
            <p>User = Email: xyz@gmail.com | pw: 123456 </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

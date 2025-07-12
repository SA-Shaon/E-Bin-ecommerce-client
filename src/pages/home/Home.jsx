import { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import ProductCard from "../../components/cards/ProductCard";
import {
  BsCartCheck,
  BsHeadset,
  BsPatchCheck,
  BsLightning,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const Home = () => {
  // state
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products`);
      setProducts(data?.slice(0, 12));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Header section  */}
      <section className="home-header-bg">
        <div className="home-header-text">
          <p>
            <b>New Arrival</b>
          </p>
          <h3>
            Discover Our <br />
            New Collection
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <Link to={"/shop"}>
            <button className="home-btn">BUY NOW</button>
          </Link>
        </div>
      </section>

      {/*Top category section */}
      <section className="container home-top-category py-5">
        <h4>Browse The Range</h4>
        <p className="text-color-primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className="row row-cols-1 row-cols-md-3 g-4 pt-4">
          <div className="col">
            <div className="card" style={{ height: "400px" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src="https://i.ibb.co/Hs8Sxyc/Main-product37-768x864.jpg"
                alt=""
              />
            </div>
            <h5 className="pt-2">
              <b>Cookies </b>
            </h5>
          </div>
          <div className="col">
            <div className="card" style={{ height: "400px" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src="https://i.ibb.co/0VBTXkJG/Main-product35-768x864.jpg"
                alt=""
              />
            </div>
            <h5 className="pt-2">
              <b>Dried fruit snacks</b>
            </h5>
          </div>
          <div className="col">
            <div className="card" style={{ height: "400px" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src="https://i.ibb.co/CpYZt0S0/Main-product40-768x864.jpg"
                alt=""
              />
            </div>
            <h5 className="pt-2">
              <b>Potato chips</b>
            </h5>
          </div>
        </div>
      </section>

      {/* products section  */}
      <div className="container">
        <h3 className="text-center ">Our Products</h3>
        <p className="text-center text-color-primary">
          Quality is our identity
        </p>
        <h5 className="p-3 my-2  text-color-primary">New Arrivals</h5>
        <div className="row g-3">
          {products?.map((p) => (
            <div key={p._id} className="col-xl-3 col-lg-4 col-md-6">
              <ProductCard key={p._id} p={p} />
            </div>
          ))}
        </div>
        <div className="text-center p-5">
          <Link to="/shop">
            <button className="home-btn2 ">Continue Shoping</button>
          </Link>
        </div>
      </div>

      <section className="identity my-5 p-5">
        <div className="">
          <div className="row g-3">
            <div className="col-md-3 col-6 d-flex align-items-center  justify-content-center">
              <BsLightning style={{ fontSize: "40px" }} />
              <div className="ms-3">
                <h6 style={{ marginBottom: "0px" }}>High Quality</h6>
                <small style={{ color: "gray" }}>
                  crafted from top materials
                </small>
              </div>
            </div>
            <div className="col-md-3 col-6 d-flex align-items-center justify-content-center">
              <BsPatchCheck style={{ fontSize: "40px" }} />
              <div className="ms-3">
                <h6 style={{ marginBottom: "0px" }}>Qarranty Protection</h6>
                <small style={{ color: "gray" }}>Over 2 years</small>
              </div>
            </div>
            <div className="col-md-3 col-6 d-flex align-items-center justify-content-center">
              <BsCartCheck style={{ fontSize: "40px" }} />
              <div className="ms-3">
                <h6 style={{ marginBottom: "0px" }}>Enjoy Discount</h6>
                <small style={{ color: "gray" }}>Order over 150 $</small>
              </div>
            </div>
            <div className="col-md-3 col-6 d-flex align-items-center justify-content-center">
              <BsHeadset style={{ fontSize: "40px" }} />
              <div className="ms-3">
                <h6 style={{ marginBottom: "0px" }}>24 / 7 Support</h6>
                <small style={{ color: "gray" }}>Dedicated support</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

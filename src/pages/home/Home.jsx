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
  // const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    // getTotal();
  }, []);

  // useEffect(() => {
  //   if (page === 1) return;
  //   loadMore();
  // }, [page]);

  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API}/products-count`
  //     );
  //     setTotal(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/list-products/${1}`
      );
      setProducts(data?.slice(0, 4));
    } catch (err) {
      console.log(err);
    }
  };

  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API}/list-products/${page}`
  //     );
  //     setProducts([...products, ...data]);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };

  // const arr = [...products];
  // const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));
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
          <button className="home-btn">BUY NOW</button>
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
                src="https://i.ibb.co/m5hWM90/Dining.png"
                alt=""
              />
            </div>
            <h5 className="pt-2">
              <b>Dining</b>
            </h5>
          </div>
          <div className="col">
            <div className="card" style={{ height: "400px" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src="https://i.ibb.co/YRmnp56/Living.png"
                alt=""
              />
            </div>
            <h5 className="pt-2">
              <b>Living</b>
            </h5>
          </div>
          <div className="col">
            <div className="card" style={{ height: "400px" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src="https://i.ibb.co/7CsVdw7/Bedroom.png"
                alt=""
              />
            </div>
            <h5 className="pt-2">
              <b>Bedroom</b>
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
            <div key={p._id} className="col-lg-3 col-12 col-md-4">
              <ProductCard key={p._id} p={p} />
            </div>
          ))}
        </div>
        <div className="text-center p-5">
          {/* {products && products.length < total && (
            <button
              className="home-btn2 "
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading.." : "Load more"}
            </button>
          )} */}
          <Link to="/shop">
            <button className="home-btn2 ">Continue Shoping</button>
          </Link>
        </div>
      </div>

      <section className="explore-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-4 mx-auto">
              <div className="justify-center my-4">
                <h5>
                  50+ Beautiful rooms <br /> inspiration
                </h5>
                <p>
                  Our designer already made a lot of beautiful prototipe of
                  rooms that inspire you
                </p>

                <button className="home-btn">Explore More</button>
              </div>
            </div>

            <div className="col-12 col-md-8 my-5">
              <div className="row g-3">
                <div className="col-12 col-md-6" style={{ height: "500px" }}>
                  <img
                    className="h-100 w-100"
                    src="https://i.ibb.co/Fmh4710/Rectangle-24.png"
                    alt=""
                  />
                </div>
                <div className="col-12 col-md-6" style={{ height: "500px" }}>
                  <img
                    className="h-100 w-100"
                    src=" https://i.ibb.co/kg5yLDx/Rectangle-25.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallary section  */}
      <section>
        <div className="mt-5">
          <p className="text-center">Share your setup with</p>
          <h4 style={{ color: " #b88e2f" }} className="text-center">
            #FuniroFurniture
          </h4>
        </div>
        <div className="container">
          <div className="row ">
            <div className="col-12 col-md-4">
              <div className="row">
                <div className="col-3">
                  <img
                    style={{ height: "90%" }}
                    src="https://i.ibb.co/6mc5PJ3/Rectangle-36.png"
                    alt=""
                  />
                </div>
                <div className="col-9 m-auto">
                  <img
                    style={{ width: "100%" }}
                    src="https://i.ibb.co/26WfLB4/Rectangle-38.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-4">
                  <img
                    className="w-100 h-100"
                    src="https://i.ibb.co/hM8NF3k/Rectangle-37.png"
                    alt=""
                  />
                </div>
                <div className="col-8 m-auto">
                  <img
                    className="w-100"
                    src="https://i.ibb.co/sQC8KpD/Rectangle-39.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 m-auto">
              <img
                className="w-100"
                src="https://i.ibb.co/s6TMJGz/Rectangle-40.png"
                alt=""
              />
            </div>
            <div className="col-12 col-md-4">
              <div className="row">
                <div className="col-6 ">
                  <img
                    className="w-100"
                    src="https://i.ibb.co/ykXv4sf/Rectangle-43.png"
                    alt=""
                  />
                </div>
                <div className="col-6 m-auto">
                  <img
                    style={{ width: "100%" }}
                    src="https://i.ibb.co/nbPzLQJ/Rectangle-45.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-6">
                  <img
                    className="w-100"
                    src="https://i.ibb.co/p0N5GYX/Rectangle-41.png"
                    alt=""
                  />
                </div>
                <div className="col-6 m-auto">
                  <img
                    className="w-100"
                    src="https://i.ibb.co/9HCwkyw/Rectangle-44.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                <h6 style={{ marginBottom: "0px" }}>Free shipping</h6>
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

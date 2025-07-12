import { Badge } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCheck,
  FaDiagramProject,
  FaDollarSign,
  FaRegClock,
  FaRocket,
  FaTimeline,
  FaWarehouse,
} from "react-icons/fa6";
import moment from "moment";
import { useAuth } from "../context/auth";
import Payment from "../components/payment/Payment";

const ProductView = () => {
  // context
  // const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { slug } = useParams();

  const [product, setProduct] = useState({});
  // const [related, setRelated] = useState([]);

  useEffect(() => {
    if (slug) loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/product/${slug}`
      );
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xl-9 col-lg-8 col-md-7 ">
          <div className="card mb-3">
            <Badge.Ribbon text={`${product?.sold} sold`} color="red">
              <Badge.Ribbon
                text={`${
                  product?.quantity >= 1
                    ? `${product?.quantity - product?.sold} In stock`
                    : "Out of Stock"
                }`}
                placement="start"
                color="green"
              >
                <img
                  className="card-img-top"
                  src={`${import.meta.env.VITE_API}/product/photo/${
                    product?._id
                  }`}
                  alt={product?.name}
                  style={{ height: "500px", width: "100%" }}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>
            <div className="card-body">
              <h1 className="fw-bold"> {product?.name} </h1>
              <p className="card-text lead">{product?.description}</p>
            </div>

            <div className="d-flex justify-conten-between lead p-5 bg-light fw-bold">
              <div>
                <p>
                  <FaDollarSign /> Price:
                  {product?.price?.toLocaleString("bn-BD", {
                    style: "currency",
                    currency: "BDT",
                  })}
                </p>

                <p>
                  <FaDiagramProject /> Category: {product?.category?.name}
                </p>

                <p>
                  <FaRegClock /> Added: {moment(product.createdAt).fromNow()}
                </p>

                <p>
                  {product?.quantity > 0 ? <FaCheck /> : <FaTimeline />}{" "}
                  {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>

                <p>
                  <FaWarehouse /> Available {product?.quantity - product?.sold}
                </p>
                <p>
                  <FaRocket /> Sold {product?.sold}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-5">
          <div className="mt-5">
            <h4>Your Payment</h4>
            <hr />
            <h6 className="mb-4">
              Total:
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h6>
            {auth?.user?.address ? (
              <>
                <Payment price={product?.price} machine={product?.machine} />
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  ""
                ) : (
                  <button
                    className="btn btn-outline-danger mt-3"
                    onClick={() => navigate("/login")}
                  >
                    Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

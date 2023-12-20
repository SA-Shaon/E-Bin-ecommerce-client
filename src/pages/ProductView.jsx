import { Badge } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import ProductCard from "../components/cards/ProductCard";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductView = () => {
  // context
  const { cart, setCart } = useCart();

  const { slug } = useParams();

  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (slug) loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/product/${slug}`
      );
      setProduct(data);
      loadRelatedProducts(data._id, data.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRelatedProducts = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API
        }/related-products/${productId}/${categoryId}`
      );
      setRelated(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
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
                  <FaDollarSign /> Price:{" "}
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

            <button
              style={{ borderBottomRightRadius: "5px" }}
              className="btn btn-outline-primary col card-button"
              onClick={() => {
                setCart([...cart, product]);
                toast.success("Added to Cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="col-md-3">
          <h3 className="text-center">Related Products</h3> <hr />
          {related?.map((p) => (
            <ProductCard p={p} key={p._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;

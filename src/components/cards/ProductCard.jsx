import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import moment from "moment";
import "./pCard.css";

const ProductCard = ({ p }) => {
  //context
  const { cart, setCart } = useCart();

  const navigate = useNavigate();
  return (
    <div className="card mb-4">
      <Badge.Ribbon text={`${p?.sold} sold`} color="red">
        <Badge.Ribbon
          text={`${
            p?.quantity >= 1
              ? `${p?.quantity - p?.sold} In stock`
              : "Out of Stock"
          }`}
          placement="start"
          color="green"
        >
          <div className="bg-primary" style={{ height: "250px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={`${import.meta.env.VITE_API}/product/photo/${p?._id}`}
              alt={p?.name}
            />
          </div>
        </Badge.Ribbon>
      </Badge.Ribbon>
      <div className="card-body">
        <h6 style={{ color: "#b88e2f" }}> {p?.name?.substring(0, 15)} </h6>
        <b className="fw-blod">
          {p?.price?.toLocaleString("bn-BD", {
            style: "currency",
            currency: "BDT",
          })}
        </b>
        <div className="mb-2">
          <small style={{ color: "gray" }}>
            createdAt: {moment(p?.createdAt).fromNow()}
          </small>
        </div>
        <p className="card-text">{p?.description?.substring(0, 60)}...</p>
      </div>
      <div className="d-flex ">
        <button
          style={{ borderBottomLeftRadius: "5px" }}
          className="pCard-btn w-50"
          onClick={() => navigate(`/product/${p?.slug}`)}
        >
          View Product
        </button>
        <button
          style={{ borderBottomRightRadius: "5px" }}
          className="pCard-btn2 w-50 "
          onClick={() => {
            setCart([...cart, p]);
            localStorage.setItem("cart", JSON.stringify([...cart, p]));
            toast.success("Added to Cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

import moment from "moment";
import { Badge } from "antd";

const ProductCard = ({ p }) => {
  return (
    <div className="card mb-3 hoverable">
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
          <img
            className="card-img-top"
            src={`${import.meta.env.VITE_API}/product/photo/${p?._id}`}
            alt={p?.name}
            style={{ height: "300px", objectFit: "cover" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>
      <div className="card-body">
        <h5> {p?.name} </h5>
        <h4 className="fw-blod">
          {p?.price?.toLocaleString("bn-BD", {
            style: "currency",
            currency: "BDT",
          })}
        </h4>
        <p className="card-text">{p?.description?.substring(0, 60)}...</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          style={{ borderBottomLeftRadius: "5px" }}
          className="btn btn-primary col card-button"
        >
          View Product
        </button>
        <button
          style={{ borderBottomRightRadius: "5px" }}
          className="btn btn-outline-primary col card-button"
        >
          Add to Cart
        </button>
      </div>
      {/* <p>{moment(p?.createdAt).fromNow()}</p>
      <p>Sold: {p?.sold}</p> */}
    </div>
  );
};

export default ProductCard;

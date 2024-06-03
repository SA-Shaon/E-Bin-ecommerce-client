import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  //context
  const { cart, setCart } = useCart();
  const { auth } = useAuth();
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item.name === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handlePurchase = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/order/newTransaction`,
        {
          cart,
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        setCart([]);
        localStorage.removeItem("cart");
        navigate("/dashboard/user/orders");
        toast.success("Purchased Successful.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subTitle={
          cart?.length > 1
            ? `You have ${cart?.length} items in the cart. ${
                auth?.token ? " " : " Please login to checkout."
              }`
            : "Your cart is fully empty"
        }
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length > 0 ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <button
                    onClick={() => navigate("/shop")}
                    className="btn btn-primary"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cart?.length > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {cart?.map((p, index) => (
                <div
                  key={index}
                  className="card mb-3"
                  style={{ maxWidth: "540" }}
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${import.meta.env.VITE_API}/product/photo/${
                          p?._id
                        }`}
                        alt={p.name}
                        style={{
                          height: "150px",
                          width: "150px",
                          objectFit: "cover",
                          marginLeft: "-12px",
                          borderTopRightRadius: "0px",
                        }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p?.name}</h5>
                        <p className="card-text">{`${p?.description.substring(
                          0,
                          50
                        )}...`}</p>

                        <div className="d-flex justify-content-between">
                          <p className="card-text">
                            <small className="text-muted">
                              Listed {moment(p.createdAt).fromNow()}
                            </small>
                          </p>

                          <p
                            className="text-danger mb-2 pointer"
                            onClick={() => removeFromCart(p._id)}
                          >
                            Remove
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <h4>Your cart summary</h4>
              Total / Address / Payments
              <hr />
              <h6>Total: {cartTotal()}</h6>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <hr />
                    <h4>Address:</h4>
                    <h5>{auth?.user?.address}</h5>
                  </div>
                  <button className="btn btn-outline-warning">
                    Update address
                  </button>
                  <button
                    className="btn btn-outline-success ms-2"
                    onClick={handlePurchase}
                  >
                    Purchase
                  </button>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Add delivery address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-danger mt-3"
                      onClick={() =>
                        navigate("/login", {
                          state: { from: location },
                        })
                      }
                    >
                      Login to checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

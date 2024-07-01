import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { auth } = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: auth.user.name,
        email: auth.user.email,
        address: auth.user.address,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/create-intent`,
        { price },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      const { paymentIntent } = await stripe.confirmCardPayment(
        data?.clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: auth.user.name,
              email: auth.user.email,
              address: auth.user.address,
            },
          },
        }
      );

      if (paymentIntent.error) {
        toast.error(paymentIntent?.error);
      } else {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API}/order/newTransaction`,
            {
              cart,
              paymentIntent,
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
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={cardElementOptions} />
      <button
        className="btn btn-outline-success mt-4"
        type="submit"
        disabled={!stripe || !elements}
      >
        Purchase
      </button>
    </form>
  );
};
export default CheckoutForm;

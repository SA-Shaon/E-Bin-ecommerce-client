import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_Gateway_PK}`);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
};

const Payment = ({ price }) => {
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm price={price} />
    </Elements>
  );
};

export default Payment;

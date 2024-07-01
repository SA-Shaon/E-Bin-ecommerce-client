import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";

const UserOrders = () => {
  // context
  const { auth } = useAuth();
  //state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/orders`);
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h4 className="p-3 mt-2 mb-2 bg-light">Orders</h4>

      {orders?.map((o, i) => {
        return (
          <div key={i} className="border shadow bg-light rounded-4 mb-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Ordered</th>
                  <th scope="col">TransactionID</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <td>{o?.status} </td>
                  <td>{o?.buyer?.name}</td>
                  <td> {moment(o?.createdAt).fromNow()} </td>
                  <td> {o?.paymentIntent?.id ?? "Unpaid"} </td>
                  <td>{o?.products?.length} products</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default UserOrders;

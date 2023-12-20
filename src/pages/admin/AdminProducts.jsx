import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import moment from "moment";

const AdminProducts = () => {
  // Contex
  const { auth } = useAuth();

  // State
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="col-md-9">
      {products?.map((p) => (
        <Link
          className="text-decoration-none"
          key={p._id}
          to={`/dashboard/admin/product/update/${p.slug}`}
        >
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4  d-flex justify-content-center align-items-center">
                <img
                  style={{ maxHeight: "300px" }}
                  src={`${import.meta.env.VITE_API}/product/photo/${p._id}`}
                  alt={p.name}
                  className="img img-fluid rounded-start object-fit-cover"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title text-primary">{p.name}</h3>
                  <p className="card-text ">
                    {p.description.substring(0, 260)}...
                  </p>
                  <div className="card-text ">
                    <small className="text-muted">
                      {moment(p.createdAt).format("MMMM Do YYYY, h::mm:ss a")}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminProducts;

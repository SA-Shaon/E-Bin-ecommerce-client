import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const AdminProductUpdate = () => {
  // contex
  const { auth } = useAuth();

  // Hook
  const navigate = useNavigate();
  const param = useParams();

  // state
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setphoto] = useState(null);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [shipping, setshipping] = useState(true);
  const [quantity, setquantity] = useState("");
  const [id, setId] = useState("");

  const loadCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/categories`
      );
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  // category Options
  const options = [];
  categories.map((c) => {
    options.push({
      value: c._id,
      label: c.name,
    });
  });

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/product/${param.slug}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        setname(data.name);
        setdescription(data.description);
        setprice(data.price);
        setshipping(data.shipping);
        setquantity(data.quantity);
        setCategory(data.category._id);
        setId(data._id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadProduct();
  }, []);
  useEffect(() => {
    loadCategories();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      photo && productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      productData.append("price", price);
      // console.log([...productData]);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/product/${id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is Updated `);
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product created failed.Try again.");
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let answre = window.confirm("Are you sure want to delete this product?");
      if (!answre) return;
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/product/${id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is Deleted `);
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product delete failed.Try again.");
    }
  };

  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-light">Update Product.</div>

      {photo ? (
        <div className="text-center">
          <img
            src={URL.createObjectURL(photo)}
            alt="Product photo"
            className="img img-responsive"
            height="200px"
          />
        </div>
      ) : (
        <div className="text-center">
          <img
            src={`${import.meta.env.VITE_API}/product/photo/${id}?${Math.floor(
              Math.random() * 100
            )}`}
            alt="Product photo"
            className="img img-responsive"
            height="200px"
          />
        </div>
      )}

      <div className="pt-2">
        <label
          className="btn btn-outline-secondary col-12 mb-3"
          htmlFor="photo"
        >
          {photo ? photo.name : "Upload Photo"}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => setphoto(e.target.files[0])}
            id="photo"
            hidden
          />
        </label>
      </div>
      <input
        type="text"
        name=""
        className="form-control p-2 mb-3"
        placeholder="Write a name"
        value={name}
        onChange={(e) => setname(e.target.value)}
        id=""
      />
      <textarea
        type="text"
        name=""
        className="form-control p-2 mb-3"
        placeholder="Write a Description"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        id=""
      />

      <input
        type="number"
        name=""
        className="form-control p-2 mb-3"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setprice(e.target.value)}
        id=""
      />

      <Select
        showSearch
        value={category}
        options={options}
        bordered={false}
        size="large"
        className="form-select mb-3"
        placeholder="Choose category"
        onChange={(value) => setCategory(value)}
      />
      <Select
        showSearch
        value={shipping}
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        bordered={false}
        size="large"
        className="form-select mb-3"
        placeholder="Choose Shipping"
        onChange={(value) => setshipping(value)}
      />

      <input
        type="number"
        name=""
        min="1"
        className="form-control p-2 mb-3"
        placeholder="Enter quantity"
        value={quantity}
        onChange={(e) => setquantity(e.target.value)}
        id=""
      />
      <div className="d-flex justify-content-between">
        <button onClick={handleUpdate} className="btn btn-primary mb-5">
          Update
        </button>
        <button onClick={handleDelete} className="btn btn-danger mb-5">
          Delete
        </button>
      </div>
    </>
  );
};

export default AdminProductUpdate;

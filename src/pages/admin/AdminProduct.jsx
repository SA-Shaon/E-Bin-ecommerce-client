import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminProduct = () => {
  // contex
  const { auth } = useAuth();

  // Hook
  const navigate = useNavigate();

  // state
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setphoto] = useState(null);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [shipping, setshipping] = useState(true);
  const [quantity, setquantity] = useState("");

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
  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      productData.append("price", price);
      console.log([...productData]);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/product`,
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
        toast.success(`${data.name} is created `);
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product created failed.Try again.");
    }
  };

  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-light">Create Product.</div>

      {photo && (
        <div className="text-center">
          <img
            src={URL.createObjectURL(photo)}
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
        options={options}
        bordered={false}
        size="large"
        className="form-select mb-3"
        placeholder="Choose category"
        onChange={(value) => setCategory(value)}
      />
      <Select
        showSearch
        defaultValue="Yes"
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
      <button onClick={handleSubmit} className="btn btn-primary mb-5">
        Submit
      </button>
    </>
  );
};

export default AdminProduct;

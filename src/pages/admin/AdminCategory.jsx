import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";

const AdminCategory = () => {
  // context
  const { auth } = useAuth();
  // state
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

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

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("post this category", name);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/category`,
        { name },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is created`);
        setName("");
        loadCategories();
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Create category failed. Try again");
    }
  };

  const handleUpate = async (e) => {
    e.preventDefault();
    try {
      // console.log("post this category", updatedName);
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is updated`);
        setUpdatedName("");
        setSelected(null);
        loadCategories();
        setVisible(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Create category failed. Try again");
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/category/${selected._id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is deleted successfully`);
        setUpdatedName("");
        setSelected(null);
        loadCategories();
        setVisible(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Create category failed. Try again");
    }
  };
  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-light">Manage Category</div>

      <CategoryForm
        value={name}
        setValue={setName}
        handleSubmit={handleSubmit}
      />
      <hr />
      <div className="col">
        {categories?.map((category) => (
          <button
            key={category._id}
            className="btn btn-outline-primary m-3"
            onClick={() => {
              setVisible(true);
              setSelected(category);
              setUpdatedName(category.name);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      <Modal
        centered
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <CategoryForm
          value={updatedName}
          setValue={setUpdatedName}
          handleSubmit={handleUpate}
          buttonText="Update"
          handleDelete={handleDelete}
        />
      </Modal>
    </>
  );
};

export default AdminCategory;

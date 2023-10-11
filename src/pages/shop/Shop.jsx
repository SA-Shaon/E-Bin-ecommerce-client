import { useEffect, useState } from "react";
import axios from "axios";
import Jumbotron from "../../components/cards/Jumbotron";
import ProductCard from "../../components/cards/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "../../prices";
import Loading from "../../routes/Loading";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    loadFilteredProducts();
  }, [checked, radio]);

  const loadFilteredProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/filtered-products`,
        {
          checked,
          radio,
        }
      );
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API}/products`);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);
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
  const handleCheck = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c != id);
    }
    setChecked(all);
  };
  return (
    <>
      <Jumbotron title="Hello World" subTitle="Welcome to React E-commerce" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h4 className="p-3 my-2 bg-light text-center">
              Filter by Categories
            </h4>
            <div className="row p-5">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h4 className="p-3 my-2 bg-light text-center">Filter by Price</h4>
            <div className="row p-5">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="p-5 pt-0">
              <button
                className="btn btn-outline-secondary col-12"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {loading ? (
              <Loading />
            ) : (
              <>
                <h4 className="p-3 my-2 bg-light text-center">
                  {products?.length} Products
                </h4>

                <div
                  className="row"
                  style={{ height: "80vh", overflow: "scroll" }}
                >
                  {products?.map((p) => (
                    <div className="col-md-4" key={p._id}>
                      <ProductCard p={p} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

import { useEffect, useState } from "react";
import axios from "axios";
import Jumbotron from "../../components/cards/Jumbotron";
import ProductCard from "../../components/cards/ProductCard";
import { Checkbox, Radio } from "antd";
import { prices } from "../../prices";
import Loading from "../../routes/Loading";
import "./shop.css";
import { BiSlider } from "react-icons/bi";
import ReactPaginate from "react-paginate";

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

  const itemsPerPage = 8;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <Jumbotron title="Hello World" subTitle="Welcome to React E-commerce" />
      {/* shop section  */}
      <section className="shop">
        <div className="shop-menu py-2">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="d-flex filter">
              <BiSlider style={{ fontSize: "25px" }} className="pointer" />
              <div className="ms-3 pointer">Fileter</div>

              <div className="filter-menu ">
                <div className=" d-md-flex">
                  <div style={{ width: "50%" }}>
                    <h6 className=" ">Filter by Categories</h6>
                    <div className="row">
                      {categories?.map((c) => (
                        <Checkbox
                          key={c._id}
                          onChange={(e) => handleCheck(e.target.checked, c._id)}
                        >
                          {c.name}
                        </Checkbox>
                      ))}
                    </div>
                  </div>

                  <div style={{ width: "50%" }}>
                    <h6 className="  ">Filter by Price</h6>
                    <div className="row">
                      <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                        {prices?.map((p) => (
                          <div key={p._id}>
                            <Radio value={p.array}>{p.name}</Radio>
                          </div>
                        ))}
                      </Radio.Group>
                    </div>
                  </div>
                </div>

                <div className=" mt-2">
                  <button
                    className="btn btn-outline-secondary col-12"
                    onClick={() => window.location.reload()}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h4>Total: {products?.length} Products</h4>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-3">
        <div className="row">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="row">
                {currentItems?.map((p) => (
                  <div className="col-md-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <ReactPaginate
          previousLabel="<<"
          nextLabel=">>"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active outline-0"
        />
      </div>
    </>
  );
};

export default Shop;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";

const CategoryView = () => {
  //state
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  // hooks
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadProductByCategory();
  }, [params?.slug]);

  const loadProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products-by-category/${params.slug}`
      );
      setCategory(data.category);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={category.name}
        subTitle={`${products.length} products found in ${category.name}`}
      />
      <div className="row mt-3">
        {products?.map((p) => (
          <div key={p._id} className="col-md-3">
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryView;

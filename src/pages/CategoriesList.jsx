import { Link } from "react-router-dom";
import Jumbotron from "../components/cards/Jumbotron";
import useCategories from "../hooks/useCategory";

const CategoriesList = () => {
  const categories = useCategories();
  return (
    <>
      <Jumbotron title="Categories" subTitle="List of all categories" />
      <div className="container overflow-hidden">
        <div className="row gx-5 gy-5 mt-3 mb-5">
          {categories?.map((c) => (
            <div className="col-md-6" key={c._id}>
              <Link to={`/category/${c.slug}`}>
                <button className="btn btn-light col-12 text-primary p-3">
                  {c.name}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesList;

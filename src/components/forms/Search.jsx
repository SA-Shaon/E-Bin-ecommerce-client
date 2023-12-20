import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import "./search.css";

const Search = () => {
  // hooks
  const { values, setValues } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/products/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="search"
        style={{ borderRadius: "0px" }}
        className="search-input"
        placeholder="Search"
        onChange={(e) => {
          setValues({ ...values, keyword: e.target.value });
        }}
        value={values.keyword}
      />

      <button
        className="search-btn ms-2 d-flex justify-content-between  align-items-center"
        type="submit"
        style={{ borderRadius: "0px" }}
      >
        Search
      </button>
    </form>
  );
};

export default Search;

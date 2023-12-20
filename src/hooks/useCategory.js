import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

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
  return categories;
}

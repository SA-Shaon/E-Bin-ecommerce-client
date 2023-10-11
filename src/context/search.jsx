import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: "",
    results: [],
  });

  const contextInfo = {
    values,
    setValues,
  };
  return (
    <SearchContext.Provider value={contextInfo}>
      {children}
    </SearchContext.Provider>
  );
};
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };

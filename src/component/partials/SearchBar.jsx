import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  search,
  handleSearch,
  handleChange,
  loading,
  result,
  store,
  url,
}) => {
  return (
    <form onSubmit={(e) => handleSearch(e, search, url)}>
      <div className="pb-2 flex">
        <input
          type="search"
          placeholder="Search here..."
          className="rounded-tr-none rounded-br-none border-r-0"
          ref={search}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="btn-action-table rounded-tl-none rounded-bl-none border-l-0 bg-primary text-white border-primary"
        >
          <FaSearch />
        </button>
      </div>
      {store.isSearch && (
        <p>Result: {loading ? "Searching..." : !loading && result.length}</p>
      )}
    </form>
  );
};

export default SearchBar;

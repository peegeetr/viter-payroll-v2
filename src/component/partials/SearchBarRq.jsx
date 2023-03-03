import React from "react";
import { FaSearch } from "react-icons/fa";
import { setIsSearch } from "../../store/StoreAction";

const SearchBarRq = ({
  search,
  dispatch,
  store,
  result,
  isFetching,
  setOnSearch,
  onSearch,
}) => {
  const handleChange = (e) => {
    if (e.target.value === "") {
      setOnSearch(!onSearch);
      dispatch(setIsSearch(false));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        let val = search.current.value;
        if (val === "") return;
        setOnSearch(!onSearch);
        dispatch(setIsSearch(true));
      }}
    >
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
        <p>Result: {isFetching ? "Searching..." : result?.[0].count}</p>
      )}
    </form>
  );
};

export default SearchBarRq;

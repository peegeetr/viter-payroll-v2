import React from "react";
import ButtonSpinner from "./spinners/ButtonSpinner";

const Loadmore = ({ handleLoad, loading, totalResult, result }) => {
  if (totalResult === result.length && totalResult > 0 && result.length > 0) {
    return <div className="my-6 p-1.5">End of list.</div>;
  }
  if (result.length > 0) {
    return (
      <button
        type="button"
        disabled={loading}
        onClick={handleLoad}
        className="h-full relative my-6 text-white p-1.5 rounded-full w-36 bg-gradient-to-t from-secondary to-primary hover:bg-gradient-to-r hover:from-primary hover:to-secondary disabled:opacity-50 disabled:hover:bg-primary disabled:hover:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span>
            <ButtonSpinner />
          </span>
        ) : (
          <span>Load more</span>
        )}
      </button>
    );
  } else {
    return null;
  }
};

export default Loadmore;

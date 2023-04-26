import React from "react";
import { FaHeart } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import { getUserType } from "../../../helpers/functions-general.jsx";

const PagibigLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link to={`${link}/settings/pagibig`} className="w-full py-1">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaHeart />
          </span>
          <span className="font-bold">Pag-Ibig</span>
        </div>
        <p className="ml-[35px] my-0">
          Assign values for employee and employer contribution amount.
        </p>
      </Link>

      <Link
        to={`${link}/settings/pagibig`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default PagibigLink;

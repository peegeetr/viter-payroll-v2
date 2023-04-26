import React from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";

const RatesLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);

  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link to={`${link}/settings/rates`} className="w-full py-1">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaHandHoldingUsd />
          </span>
          <span className=" font-bold">Rates</span>
        </div>
        <p className="ml-[35px] my-0">
          Reference list for different types of rates for Holidays, Overtime,
          and Rest days.
        </p>
      </Link>

      <Link
        to={`${link}/settings/rates`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default RatesLink;

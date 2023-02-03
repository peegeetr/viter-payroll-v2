import React from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { devNavUrl, UrlAdmin } from "../../../helpers/functions-general";

const RatesLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  return (
    <div
      className="group flex items-center justify-between border-b border-solid border-gray-300"
      onClick={() => dispatch(setStartIndex(0))}
    >
      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/rates`}
        className="w-full py-4"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaHandHoldingUsd />
          </span>
          <span className="text-base font-bold">Rates</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every account are can perform in
          the system.
        </p>
      </Link>

      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/rates`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default RatesLink;
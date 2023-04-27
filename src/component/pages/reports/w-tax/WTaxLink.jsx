import React from "react";
import { GiBookPile } from "react-icons/gi";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";

const WTaxLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link to={`${link}/reports/wtax`} className="w-full py-1">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <GiBookPile />
          </span>
          <span className=" font-bold">WTax</span>
        </div>
        <p className="ml-[35px] my-0">Generate employee tax report.</p>
      </Link>

      <Link
        to={`${link}/reports/wtax`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default WTaxLink;

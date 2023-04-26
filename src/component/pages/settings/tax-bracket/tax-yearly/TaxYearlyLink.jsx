import React from "react";
import { BsCalendar2MonthFill } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import { getUserType } from "../../../../helpers/functions-general";

const TaxYearlyLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link to={`${link}/settings/tax-bracket/yearly`} className="w-full py-1">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <BsCalendar2MonthFill />
          </span>
          <span className=" font-bold">Yearly Tax</span>
        </div>
        <p className="ml-[35px] my-0">Yearly tax bracket for employee.</p>
      </Link>

      <Link
        to={`${link}/settings/tax-bracket/yearly`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default TaxYearlyLink;

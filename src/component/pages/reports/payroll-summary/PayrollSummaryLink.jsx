import React from "react";
import { GiReceiveMoney } from "react-icons/gi";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType, UrlSystem } from "../../../helpers/functions-general";

const PayrollSummaryLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link to={`${link}/reports/summary`} className="w-full py-1">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <GiReceiveMoney />
          </span>
          <span className=" font-bold">Payroll Summary</span>
        </div>
        <p className="ml-[35px] my-0">
          Generate employee wages and deductions report.
        </p>
      </Link>

      <Link
        to={`${link}/reports/summary`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default PayrollSummaryLink;

import React from "react";
import { FaUserCog } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../store/StoreContext";
import {
  devNavUrl,
  getUrlParam,
  getUserType,
  UrlAdmin,
} from "../../../helpers/functions-general";

const PayrollDetailsLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const eid = getUrlParam().get("employeeid");
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link
        to={`${link}/employee/details/payroll?employeeid=${eid}`}
        className="w-full py-1"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaUserCog />
          </span>
          <span className="font-bold">Payroll Details</span>
        </div>
        <p className="ml-[35px] my-0">Manage employee payroll information.</p>
      </Link>

      <Link
        to={`${link}/employee/details/payroll?employeeid=${eid}`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default PayrollDetailsLink;

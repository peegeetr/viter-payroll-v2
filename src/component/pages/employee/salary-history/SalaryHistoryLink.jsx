import React from "react";
import { HiUserGroup } from "react-icons/hi";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../store/StoreContext";
import { getUrlParam, getUserType } from "../../../helpers/functions-general";

const SalaryHistoryLink = () => {
  const employeeid = getUrlParam().get("employeeid");
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link
        to={`${link}/employee/details/salary-history?employeeid=${employeeid}`}
        className="w-full py-1"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <HiUserGroup />
          </span>
          <span className=" font-bold">Salary History</span>
        </div>
        <p className="ml-[35px] my-0">Manage employee salary history.</p>
      </Link>

      <Link
        to={`${link}/employee/details/salary-history`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default SalaryHistoryLink;

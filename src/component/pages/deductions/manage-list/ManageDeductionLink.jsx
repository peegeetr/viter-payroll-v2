import React from "react";
import { FaUserCog } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../store/StoreContext";
import {
  devNavUrl,
  getUserType,
  UrlAdmin,
} from "../../../helpers/functions-general";

const ManageDeductionLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link to={`${link}/deductions/manage`} className="w-full py-1">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaUserCog />
          </span>
          <span className=" font-bold">Manage List</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every account are can perform in
          the system.
        </p>
      </Link>

      <Link
        to={`${link}/deductions/manage`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default ManageDeductionLink;

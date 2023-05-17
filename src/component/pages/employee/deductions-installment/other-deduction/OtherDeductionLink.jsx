import React from "react";
import { HiUserGroup } from "react-icons/hi";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  getUrlParam,
  getUserType,
} from "../../../../helpers/functions-general";
import { setStartIndex } from "../../../../../store/StoreAction";

const OtherDeductionLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const eid = getUrlParam().get("employeeid");
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300 ">
      <Link
        to={`${link}/employee/details/deduction-installment/other-deduction?employeeid=${eid}`}
        className="w-full py-1 "
        onClick={() => dispatch(setStartIndex(0))}
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <HiUserGroup />
          </span>
          <span className="font-bold">Other Deduction</span>
        </div>
        <p className="ml-8 my-0">Manage other deduction information.</p>
      </Link>

      <Link
        to={`${link}/employee/details/deduction-installment/other-deduction?employeeid=${eid}`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default OtherDeductionLink;

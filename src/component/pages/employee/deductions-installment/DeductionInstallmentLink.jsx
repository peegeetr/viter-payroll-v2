import React from "react";
import { MdWork } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import {
  devNavUrl,
  getUrlParam,
  getUserType,
} from "../../../helpers/functions-general";

const DeductionInstallmentLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const eid = getUrlParam().get("employeeid");
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300 ">
      <Link
        to={`${link}/employee/details/deduction-installment?employeeid=${eid}`}
        className="w-full py-1 "
        onClick={() => dispatch(setStartIndex(0))}
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <MdWork />
          </span>
          <span className="font-bold">Deductions Installment</span>
        </div>
        <p className="ml-8 my-0">
          Manage the basic information, address and contact information of
          employee.
        </p>
      </Link>

      <Link
        to={`${link}/employee/details/deduction-installment?employeeid=${eid}`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default DeductionInstallmentLink;

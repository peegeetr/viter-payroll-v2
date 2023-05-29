import React from "react";
import { Link } from "react-router-dom";
import { FaListUl } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  getUrlParam,
  getUserType,
} from "../../../../helpers/functions-general";

const DeductionInstallmentList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const eid = getUrlParam().get("employeeid");
  const link = getUserType(store.credentials.data.role_is_developer === 1);

  return (
    <>
      <div className="group flex items-center justify-between border-b border-solid border-gray-300 pt-4">
        <Link
          to={`${link}/employee/details/deduction-installment/optional-deduction/mp2?employeeid=${eid}`}
          className="w-full p-1 "
        >
          <div className="flex items-center">
            <span className="text-lg mr-4">
              <FaListUl />
            </span>
            <span className="font-bold">Pag-ibig mp2</span>
          </div>
          <p className="ml-8 my-0">
            Display list of deduction installment pag-ibig mp2.
          </p>
        </Link>

        <Link
          to={`${link}/employee/details/deduction-installment/optional-deduction/mp2?employeeid=${eid}`}
          className="btn-action-table group-hover:bg-primary group-hover:text-white"
        >
          <SlArrowRight className="inline" />
        </Link>
      </div>

      <div className="group flex items-center justify-between border-b border-solid border-gray-300 pt-4">
        <Link
          to={`${link}/employee/details/deduction-installment/optional-deduction/pagibig-loan?employeeid=${eid}`}
          className="w-full p-1 "
        >
          <div className="flex items-center">
            <span className="text-lg mr-4">
              <FaListUl />
            </span>
            <span className="font-bold">Pagibig Loan</span>
          </div>
          <p className="ml-8 my-0">
            Display list of deduction installment Pagibig Loan.
          </p>
        </Link>

        <Link
          to={`${link}/employee/details/deduction-installment/optional-deduction/pagibig-loan?employeeid=${eid}`}
          className="btn-action-table group-hover:bg-primary group-hover:text-white"
        >
          <SlArrowRight className="inline" />
        </Link>
      </div>
      <div className="group flex items-center justify-between border-b border-solid border-gray-300 pt-4">
        <Link
          to={`${link}/employee/details/deduction-installment/optional-deduction/sss-loan?employeeid=${eid}`}
          className="w-full p-1 "
        >
          <div className="flex items-center">
            <span className="text-lg mr-4">
              <FaListUl />
            </span>
            <span className="font-bold">SSS Loan</span>
          </div>
          <p className="ml-8 my-0">
            Display list of deduction installment SSS Loan.
          </p>
        </Link>

        <Link
          to={`${link}/employee/details/deduction-installment/optional-deduction/sss-loan?employeeid=${eid}`}
          className="btn-action-table group-hover:bg-primary group-hover:text-white"
        >
          <SlArrowRight className="inline" />
        </Link>
      </div>
    </>
  );
};

export default DeductionInstallmentList;

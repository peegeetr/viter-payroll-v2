import React from "react";
import { FaListUl } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import {
  getUrlParam,
  getUserType,
} from "../../../../helpers/functions-general";
import ModalAddFCATuition from "./ModalAddFCATuition";
import ModalAddFWCTithes from "./ModalAddFWCTithes";

const OtherDeductionList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const eid = getUrlParam().get("employeeid");
  const link = getUserType(store.credentials.data.role_is_developer === 1);

  return (
    <>
      <div className="group flex items-center justify-between border-b border-solid border-gray-300 pt-4">
        <Link
          to={`${link}/employee/details/deduction-installment/other-deduction/fca-tuition?employeeid=${eid}`}
          className="w-full p-1 "
        >
          <div className="flex items-center">
            <span className="text-lg mr-4">
              <FaListUl />
            </span>
            <span className="font-bold">FCA Tuition</span>
          </div>
          <p className="ml-8 my-0">
            Display list of deduction installment FCA Tuition.
          </p>
        </Link>

        <Link
          to={`${link}/employee/details/deduction-installment/other-deduction/fca-tuition?employeeid=${eid}`}
          className="btn-action-table group-hover:bg-primary group-hover:text-white"
        >
          <SlArrowRight className="inline" />
        </Link>
      </div>
      <div className="group flex items-center justify-between border-b border-solid border-gray-300 pt-4">
        <Link
          to={`${link}/employee/details/deduction-installment/other-deduction/fwc-tithes?employeeid=${eid}`}
          className="w-full p-1 "
        >
          <div className="flex items-center">
            <span className="text-lg mr-4">
              <FaListUl />
            </span>
            <span className="font-bold">FWC Tithes</span>
          </div>
          <p className="ml-8 my-0">
            Display list of deduction installment FWC Tithes.
          </p>
        </Link>

        <Link
          to={`${link}/employee/details/deduction-installment/other-deduction/fwc-tithes?employeeid=${eid}`}
          className="btn-action-table group-hover:bg-primary group-hover:text-white"
        >
          <SlArrowRight className="inline" />
        </Link>
      </div>
      {store.isAdd && <ModalAddFCATuition item={itemEdit} />}
      {store.isRestore && <ModalAddFWCTithes item={itemEdit} />}
    </>
  );
};

export default OtherDeductionList;

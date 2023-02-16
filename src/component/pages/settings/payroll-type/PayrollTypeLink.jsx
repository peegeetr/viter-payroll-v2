import React from "react";
import { FaUser } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { devNavUrl, UrlAdmin } from "../../../helpers/functions-general.jsx";

const PayrollTypeLink = () => {
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/payroll-type`}
        className="w-full py-1"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <GiWallet />
          </span>
          <span className="font-bold">Payroll Type</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every account are can perform in
          the system.
        </p>
      </Link>

      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/payroll-type`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default PayrollTypeLink;

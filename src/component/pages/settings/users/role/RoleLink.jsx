import React from "react";
import { FaUsersCog } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { devNavUrl, UrlAdmin } from "../../../../helpers/functions-general";

const RoleLink = () => {
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/users/role`}
        className="w-full py-4"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaUsersCog />
          </span>
          <span className="text-base font-bold">Roles</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every account are can perform in
          the system.
        </p>
      </Link>

      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/users/role`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default RoleLink;

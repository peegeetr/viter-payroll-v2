import React from "react";
import { FaUser } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { devNavUrl, UrlAdmin } from "../../../../helpers/functions-general";

const OtherUserLink = () => {
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/users/other`}
        className="w-full py-4"
      >
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaUser />
          </span>
          <span className="text-base font-bold">Other users</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every account are can perform in
          the system.
        </p>
      </Link>

      <Link
        to={`${devNavUrl}/${UrlAdmin}/settings/users/other`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default OtherUserLink;

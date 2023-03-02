import React from "react";
import { FaUser } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import { getUserType } from "../../../../helpers/functions-general";

const OtherUserLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  return (
    <div className="group flex items-center justify-between border-b border-solid border-gray-300">
      <Link to={`${link}/settings/users/other`} className="w-full py-1">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaUser />
          </span>
          <span className="font-bold">Other users</span>
        </div>
        <p className="ml-[35px] my-0">
          Manage what actions and capabilities every account are can perform in
          the system.
        </p>
      </Link>

      <Link
        to={`${link}/settings/users/other`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default OtherUserLink;

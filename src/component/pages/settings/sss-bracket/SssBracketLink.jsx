import React from "react";
import { FaUserShield } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";

const SssBracketLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);

  return (
    <div
      className="group flex items-center justify-between border-b border-solid border-gray-300"
      onClick={() => dispatch(setStartIndex(0))}
    >
      <Link to={`${link}/settings/sss-bracket`} className="w-full py-1">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <FaUserShield />
          </span>
          <span className="font-bold">SSS Bracket</span>
        </div>
        <p className="ml-[35px] my-0">
          Reference bracket for employee and employer contribution amount.
        </p>
      </Link>

      <Link
        to={`${link}/settings/sss-bracket`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default SssBracketLink;

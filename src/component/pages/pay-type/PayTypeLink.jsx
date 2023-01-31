import React from "react";
import {
  FaArchive,
  FaCheck,
  FaEdit,
  FaHistory,
  FaList,
  FaTrash,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { BiListPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { setStartIndex } from "../../../store/StoreAction";
import { devNavUrl, UrlAdmin } from "../../helpers/functions-general";

const PayTypeLink = () => {
  return (
    <li className="py-2">
      <div
        className="group flex items-center justify-between border-b border-solid border-gray-300"
        onClick={() => dispatch(setStartIndex(0))}
      >
        <Link
          to={`${devNavUrl}/${UrlAdmin}/settings/users`}
          className="w-full py-4"
        >
          <div className="flex items-center">
            <span className="text-lg mr-3">
              <BiListPlus className="text-2xl" />
            </span>
            <span className="text-base font-bold">Users</span>
          </div>
          <p className="ml-[35px] my-0">
            Manage what actions and capabilities every account are can perform
            in the system.
          </p>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to={`${devNavUrl}/${UrlAdmin}/settings/users`}
            className="btn-action-table tooltip-action-table"
            data-tooltip="View"
          >
            <FaList className="inline" />
          </Link>

          <button
            to={`${devNavUrl}/${UrlAdmin}/employees/details`}
            type="button"
            className="btn-action-table tooltip-action-table"
            data-tooltip="Edit"
          >
            <FaEdit />
          </button>
          <button
            type="button"
            className="btn-action-table tooltip-action-table"
            data-tooltip="Archive"
          >
            <FaArchive />
          </button>
          <button
            type="button"
            className="btn-action-table tooltip-action-table"
            data-tooltip="Restore"
          >
            <FaHistory />
          </button>
          <button
            type="button"
            className="btn-action-table tooltip-action-table"
            data-tooltip="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </li>
  );
};

export default PayTypeLink;

import React from "react";
import {
  FaArchive,
  FaClipboardList,
  FaEdit,
  FaHistory,
  FaList,
  FaTrash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { setIsAdd, setStartIndex } from "../../../store/StoreAction";
import { devNavUrl, UrlAdmin } from "../../helpers/functions-general";

const PayTypeLink = ({ setItemEdit }) => {
  const handleEdit = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <li className="py-2">
        <div className="group flex items-center justify-between border-b border-solid border-gray-300 ">
          <Link
            to={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
            className="w-full py-4"
            onClick={() => dispatch(setStartIndex(0))}
          >
            <div className="flex items-center">
              <span className="text-lg mr-4">
                <FaClipboardList />
              </span>
              <span className="text-base font-bold">Wages</span>
            </div>
            <p className="ml-[35px] my-0">
              Manage what actions and capabilities every account are can perform
              in the system.
            </p>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              to={`${devNavUrl}/${UrlAdmin}/pay-type/pay-item`}
              className="btn-action-table tooltip-action-table group-hover:bg-primary group-hover:text-white"
              data-tooltip="View"
              onClick={() => dispatch(setStartIndex(0))}
            >
              <FaList className="inline " />
            </Link>

            <button
              to={`${devNavUrl}/${UrlAdmin}/employees/details`}
              type="button"
              className="btn-action-table tooltip-action-table"
              data-tooltip="Edit"
              onClick={handleEdit}
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
    </>
  );
};

export default PayTypeLink;

import React from "react";
import { FaArchive, FaEdit, FaTrash } from "react-icons/fa";
import { setIsAdd, setIsConfirm } from "../../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../../store/StoreContext.jsx";
import ModalConfirm from "../../../../partials/modals/ModalConfirm.jsx";
import NoData from "../../../../partials/NoData.jsx";
import ServerError from "../../../../partials/ServerError.jsx";
import TableSpinner from "../../../../partials/spinners/TableSpinner.jsx";
import ModalTaxSemi from "./ModalAddTaxSemi.jsx";
const TaxSemiList = ({ setItemEdit, item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [dataItem, setData] = React.useState(null);

  const handleDelete = (item) => {
    dispatch(setIsConfirm(true));
    setId(item);
    setData(dataItem);
    setDel(true);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Range From</th>
              <th>Range To</th>
              <th>Less Amount</th>
              <th>Rate % </th>
              <th>Addt'l Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>x</td>
              <td>vvvv</td>
              <td>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="btn-action-table tooltip-action-table"
                    data-tooltip="Edit"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className="btn-action-table tooltip-action-table"
                    data-tooltip="Archive"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>

            <tr className="text-center ">
              <td colSpan="100%" className="p-10">
                <ServerError />
              </td>
            </tr>

            <tr className="text-center ">
              <td colSpan="100%" className="p-10">
                {/* {loading &&  <TableSpinner />} */}

                <NoData />
              </td>
            </tr>
            {/* )} */}
          </tbody>
        </table>
      </div>

      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/user-systems/active/${id}`}
          msg={"Are you sure you want to remove this data"}
          //   item={`"${dataItem.user_system_email}"`}
          item=""
        />
      )}
    </>
  );
};

export default TaxSemiList;

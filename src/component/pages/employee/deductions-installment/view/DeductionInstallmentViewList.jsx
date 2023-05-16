import React from "react";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { FaTrash } from "react-icons/fa";
import {
  devApiUrl,
  formatDate,
  getUrlParam,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import Status from "../../../../partials/status/Status";
import {
  getEndOfInstallment,
  getNumberOfMonths,
  getPayItemName,
} from "../functions-deductions-installment";
import {
  setError,
  setIsRestore,
  setMessage,
} from "../../../../../store/StoreAction";
import ModalDeleteRestoreRq from "../../../../partials/modals/ModalDeleteRestoreRq";
import { StoreContext } from "../../../../../store/StoreContext";

const DeductionInstallmentViewList = ({ paytypeId, payItem }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const eid = getUrlParam().get("employeeid");
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  let counter = 1;
  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: employeeInstallmentAll,
  } = useQueryData(
    `${devApiUrl}/v1/employees-installment/all-by-employee/${paytypeId}/${eid}`, // endpoint
    "get", // method
    `employeeInstallmentAll${paytypeId}` // key
  );

  const handleDelete = (item) => {
    if (draft?.count > 0) {
      dispatch(setError(true));
      dispatch(setMessage("Payroll has ongoing draft. Adding is not allowed."));
      return;
    }
    dispatch(setIsRestore(true));
    setId(item.employee_installment_aid);
    setData(item);
    setDel(true);
  };

  // use if not loadmore button undertime
  const { data: draft } = useQueryData(
    `${devApiUrl}/v1/payroll/list`, // endpoint
    "get", // method
    "draft" // key
  );
  console.log(employeeInstallmentAll);

  return (
    <>
      <div className=" overflow-x-auto pt-4 pb-2 z-0">
        <table>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="min-w-[10rem]">Pay Type</th>
              <th className="min-w-[10rem]">Start Date</th>
              <th className="min-w-[10rem]">End Date</th>
              <th className="min-w-[8rem] text-right pr-4">Amount</th>
              <th className="min-w-[10rem] text-right pr-4">
                Number of Months
              </th>
              <th>Status</th>
              {eid !== null && <th className="text-right pr-4">Action</th>}
            </tr>
          </thead>
          <tbody>
            {(isLoading || employeeInstallmentAll?.data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {isLoading && <TableSpinner />}
                  <NoData />
                </td>
              </tr>
            )}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {employeeInstallmentAll?.data.map((item, key) => {
              return (
                <tr key={key}>
                  <td className="text-center">{counter++}.</td>
                  <td>
                    {getPayItemName(
                      payItem,
                      item.employee_installment_paytype_id
                    )}
                  </td>
                  <td className="">
                    {formatDate(item.employee_installment_start_date)}
                  </td>
                  <td>{formatDate(item.employee_installment_end_date)}</td>
                  <td className="text-right pr-4">
                    &#8369;{" "}
                    {numberWithCommas(
                      Number(item.employee_installment_amount).toFixed(2)
                    )}
                  </td>
                  <td className="text-right pr-4">{`${getNumberOfMonths(
                    item.employee_installment_start_date
                  )} /
                  ${item.employee_installment_number_of_months}`}</td>

                  <td>
                    {item.employee_installment_status === "0" ? (
                      <Status text="ongoing" />
                    ) : item.employee_installment_status === "1" ? (
                      <Status text="stop" />
                    ) : item.employee_installment_status === "2" ? (
                      <Status />
                    ) : (
                      ""
                    )}
                  </td>
                  {eid !== null && (
                    <td className="text-right pr-4">
                      <button
                        type="button"
                        className="btn-action-table tooltip-action-table"
                        data-tooltip="Delete"
                        onClick={() => {
                          handleDelete(item);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {store.isRestore && (
        <ModalDeleteRestoreRq
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/employees-installment/${id}`}
          msg={"Are you sure to delete "}
          item={getPayItemName(
            payItem,
            dataItem.employee_installment_paytype_id
          )}
          arrKey={`employeeInstallmentAll${paytypeId}`}
        />
      )}
    </>
  );
};

export default DeductionInstallmentViewList;

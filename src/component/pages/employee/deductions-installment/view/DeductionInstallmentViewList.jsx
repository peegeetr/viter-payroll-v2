import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { setIsAdd, setIsRestore } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  formatDate,
  getPayPeriod,
  getUrlParam,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import {
  PagibigMP2Id,
  fcaTutionId,
} from "../../../../helpers/functions-payitemId";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import ModalDeleteRestoreRq from "../../../../partials/modals/ModalDeleteRestoreRq";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import Status from "../../../../partials/status/Status";
import {
  getDeducPayPeriod,
  getPayItemName,
  getReadNumberOfMonths,
} from "../functions-deductions-installment";

const DeductionInstallmentViewList = ({ setItemEdit, paytypeId, payItem }) => {
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
    dispatch(setIsRestore(true));
    setId(item.employee_installment_aid);
    setData(item);
    setDel(true);
  };

  const handleEditMp2 = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  return (
    <>
      <div className="relative overflow-x-auto pt-4 pb-2 z-0">
        <table>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="min-w-[10rem]">Pay Type</th>
              {paytypeId !== PagibigMP2Id && (
                <th className="min-w-[10rem]">Details</th>
              )}
              <th className="min-w-[10rem]">Pay Date</th>
              <th className="min-w-[7rem]">Payroll Date</th>
              <th className="min-w-[8rem] text-right pr-4">Amortization</th>
              {paytypeId !== PagibigMP2Id && paytypeId !== fcaTutionId && (
                <th className="min-w-[8rem] text-right pr-4">Amount</th>
              )}
              <th className="min-w-[10rem] text-right pr-4">
                Number of Months
              </th>
              <th>Status</th>
              {eid !== null && <th className="!w-[5rem] pr-4">Action</th>}
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
                  {paytypeId !== PagibigMP2Id && (
                    <td>{item.employee_installment_details}</td>
                  )}
                  <td className="">
                    {formatDate(item.employee_installment_actual_pay_date)}
                  </td>
                  <td>
                    {`${getDeducPayPeriod(
                      item.employee_installment_start_date,
                      item.employee_installment_end_date
                    )}`}
                  </td>
                  <td className="text-right pr-4">
                    &#8369;{" "}
                    {numberWithCommas(
                      Number(item.employee_installment_amount).toFixed(2)
                    )}
                  </td>
                  {paytypeId !== PagibigMP2Id && paytypeId !== fcaTutionId && (
                    <td className="text-right pr-4">
                      &#8369;{" "}
                      {numberWithCommas(
                        (
                          Number(item.employee_installment_amount) *
                          Number(item.employee_installment_number_of_months)
                        ).toFixed(2)
                      )}
                    </td>
                  )}
                  <td className="text-right pr-4">{`${getReadNumberOfMonths(
                    item.employee_installment_start_date,
                    item.employee_installment_number_of_months
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
                  {((eid !== null &&
                    item.employee_installment_status !== "2") ||
                    store.credentials.data.role_is_developer === 1) && (
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Edit"
                          onClick={() => handleEditMp2(item)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Delete"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </div>
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
          mysqlApiDelete={`${devApiUrl}/v1/employees-installment/${id}`}
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

import React from "react";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import {
  setError,
  setIsAdd,
  setIsConfirm,
  setIsRestore,
  setMessage,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  devNavUrl,
  formatDate,
  getUrlParam,
  getUserType,
  hrisDevApiUrl,
  numberWithCommas,
} from "../../../helpers/functions-general";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import ModalAddMP2 from "./ModalAddMP2";
import ModalAddPagibigLoan from "./ModalAddPagibigLoan";
import ModalAddSSSLoan from "./ModalAddSSSLoan";
import { getNumberOfMonths } from "./functions-deductions-installment";
import {
  PagibigLoanId,
  PagibigMP2Id,
  SSSLoanId,
} from "../../../helpers/functions-payitemId";
import Status from "../../../partials/status/Status";

const DeductionInstallmentList = ({ draft, draftLoading }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const eid = getUrlParam().get("employeeid");
  const link = getUserType(store);

  const handleAddMp2 = () => {
    if (draft?.count > 0) {
      dispatch(setError(true));
      dispatch(setMessage("Payroll has ongoing draft. Adding is not allowed."));
      return;
    }
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const handleEditMp2 = (item) => {
    if (draft?.count > 0) {
      dispatch(setError(true));
      dispatch(
        setMessage("Payroll has ongoing draft. Editing is not allowed.")
      );
      return;
    }
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleAddPgbgLoan = () => {
    if (draft?.count > 0) {
      dispatch(setError(true));
      dispatch(setMessage("Payroll has ongoing draft. Adding is not allowed."));
      return;
    }
    dispatch(setIsRestore(true));
    setItemEdit(null);
  };

  const handleEditPgbgLoan = (item) => {
    if (draft?.count > 0) {
      dispatch(setError(true));
      dispatch(
        setMessage("Payroll has ongoing draft. Editing is not allowed.")
      );
      return;
    }
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };

  const handleAddSssLoan = () => {
    if (draft?.count > 0) {
      dispatch(setError(true));
      dispatch(setMessage("Payroll has ongoing draft. Adding is not allowed."));
      return;
    }
    dispatch(setIsConfirm(true));
    setItemEdit(null);
  };

  const handleEditSssLoan = (item) => {
    if (draft?.count > 0) {
      dispatch(setError(true));
      dispatch(
        setMessage("Payroll has ongoing draft. Editing is not allowed.")
      );
      return;
    }
    dispatch(setIsConfirm(true));
    setItemEdit(item);
  };

  // use if not loadmore button undertime
  const {
    isLoading: isLoadingMP2,
    error: errorMP2,
    data: employeeMP2,
  } = useQueryData(
    `${hrisDevApiUrl}/v1/employees-installment/by-employee/${PagibigMP2Id}/${eid}`, // endpoint
    "get", // method
    "employeeMP2", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  // use if not loadmore button undertime
  const {
    isLoading: isLoadingPagibigLoan,
    error: errorPagibigLoan,
    data: employeePagibigLoan,
  } = useQueryData(
    `${hrisDevApiUrl}/v1/employees-installment/by-employee/${PagibigLoanId}/${eid}`, // endpoint
    "get", // method
    "employeePagibigLoan", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  // use if not loadmore button undertime
  const {
    isLoading: isLoadingSSSLoan,
    error: errorSSSLoan,
    data: employeeSSSLoan,
  } = useQueryData(
    `${hrisDevApiUrl}/v1/employees-installment/by-employee/${SSSLoanId}/${eid}`, // endpoint
    "get", // method
    "employeeSSSLoan", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );
  return (
    <>
      <div className="text-center overflow-x-auto pb-2 z-0 ">
        {employeeMP2?.data.map((item, key) => {
          return (
            <div key={key} className="relative w-full max-w-[650px] pt-5 ">
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>MP2 Details</h4>
                {eid === null || draftLoading ? (
                  ""
                ) : (
                  <div>
                    {item.employee_installment_number_of_months ===
                    getNumberOfMonths(item.employee_installment_start_date) ? (
                      <button
                        type="button"
                        className="tooltip-action-table"
                        data-tooltip="Add"
                        onClick={handleAddMp2}
                      >
                        <FaPlusCircle />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="tooltip-action-table"
                        data-tooltip="Edit"
                        onClick={() => handleEditMp2(item)}
                      >
                        <FaEdit />
                      </button>
                    )}
                    <Link
                      to={`${link}/employee/details/deduction-installment/mp2?employeeid=${eid}`}
                    >
                      <button
                        className="tooltip-action-table"
                        data-tooltip="View Details"
                      >
                        <SlArrowRight />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <div
                key={key}
                className="text-left grid grid-cols-2 md:md:grid-cols-[1fr_1.5fr]  xs:pl-5 pl-2"
              >
                <p className="font-semibold">Start Date</p>
                <p className="pl-2">
                  {formatDate(item.employee_installment_start_date)}
                </p>
                <p className="font-semibold">End Date</p>
                <p className="pl-2">
                  {formatDate(item.employee_installment_end_date)}
                </p>
                <p className="font-semibold">Monthly Amount</p>
                <p className="pl-2">
                  &#8369;{" "}
                  {numberWithCommas(
                    Number(item.employee_installment_amount).toFixed(2)
                  )}
                </p>
                <p className="font-semibold">Number of months</p>
                <p className="pl-2">
                  {`${getNumberOfMonths(item.employee_installment_start_date)} /
                    ${item.employee_installment_number_of_months}`}
                </p>
                <p className="font-semibold">Status</p>
                <p className="pl-2">
                  {item.employee_installment_status === "0" ? (
                    <Status text="stop" />
                  ) : item.employee_installment_status === "1" ? (
                    <Status text="pending" />
                  ) : item.employee_installment_status === "2" ? (
                    <Status />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          );
        })}
        {(isLoadingMP2 || employeeMP2?.data.length === 0) && (
          <>
            <div className="relative w-full max-w-[650px] pt-5 ">
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>MP2 Details</h4>
                {eid === null || draftLoading ? (
                  ""
                ) : (
                  <div>
                    <button
                      type="button"
                      className="tooltip-action-table"
                      data-tooltip="Add"
                      onClick={handleAddMp2}
                    >
                      <FaPlusCircle />
                    </button>
                  </div>
                )}
              </div>
              <div className="relative w-full grid place-items-center">
                {isLoadingMP2 && <TableSpinner />}
                <NoData />
              </div>
            </div>
          </>
        )}
        {errorMP2 && (
          <div className="relative w-full  grid place-items-center">
            <ServerError />
          </div>
        )}

        {employeePagibigLoan?.data.map((item, key) => {
          return (
            <div key={key} className="relative w-full max-w-[650px] pt-5 ">
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>Pagibig Loan Details</h4>
                {eid === null || draftLoading ? (
                  ""
                ) : (
                  <div>
                    {item.employee_installment_number_of_months === "0" ? (
                      <button
                        type="button"
                        className="tooltip-action-table"
                        data-tooltip="Add"
                        onClick={handleAddPgbgLoan}
                      >
                        <FaPlusCircle />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="tooltip-action-table"
                        data-tooltip="Edit"
                        onClick={() => handleEditPgbgLoan(item)}
                      >
                        <FaEdit />
                      </button>
                    )}
                    <Link
                      to={`${link}/employee/details/deduction-installment/pagibig-loan?employeeid=${eid}`}
                    >
                      <button
                        className="tooltip-action-table"
                        data-tooltip="View Details"
                      >
                        <SlArrowRight />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="text-left grid grid-cols-2 md:md:grid-cols-[1fr_1.5fr]  xs:pl-5 pl-2">
                <p className="font-semibold">Start Date</p>
                <p className="pl-2">
                  {formatDate(item.employee_installment_start_date)}
                </p>
                <p className="font-semibold">End Date</p>
                <p className="pl-2">
                  {formatDate(item.employee_installment_end_date)}
                </p>
                <p className="font-semibold">Monthly Amount</p>
                <p className="pl-2">
                  &#8369;{" "}
                  {numberWithCommas(
                    Number(item.employee_installment_amount).toFixed(2)
                  )}
                </p>
                <p className="font-semibold">Number of months</p>
                <p className="pl-2">
                  {`${getNumberOfMonths(item.employee_installment_start_date)} /
                    ${item.employee_installment_number_of_months}`}
                </p>
                <p className="font-semibold">Status</p>
                <p className="pl-2">
                  {item.employee_installment_status === "0" ? (
                    <Status text="stop" />
                  ) : item.employee_installment_status === "1" ? (
                    <Status text="pending" />
                  ) : item.employee_installment_status === "2" ? (
                    <Status />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          );
        })}
        {(isLoadingPagibigLoan || employeePagibigLoan?.data.length === 0) && (
          <>
            <div className="relative w-full max-w-[650px] pt-5 ">
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>Pagibig Loan Details</h4>
                {eid === null || draftLoading ? (
                  ""
                ) : (
                  <div>
                    <button
                      type="button"
                      className="tooltip-action-table"
                      data-tooltip="Add"
                      onClick={handleAddPgbgLoan}
                    >
                      <FaPlusCircle />
                    </button>
                  </div>
                )}
              </div>
              <div className="relative w-full grid place-items-center">
                {isLoadingPagibigLoan && <TableSpinner />}
                <NoData />
              </div>
            </div>
          </>
        )}
        {errorPagibigLoan && (
          <div className="relative w-full  grid place-items-center">
            <ServerError />
          </div>
        )}

        {employeeSSSLoan?.data.map((item, key) => {
          return (
            <div key={key} className="relative w-full max-w-[650px] pt-5 ">
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>SSS Loan Details</h4>
                {eid === null || draftLoading ? (
                  ""
                ) : (
                  <div>
                    {item.employee_installment_number_of_months === "0" ? (
                      <button
                        type="button"
                        className="tooltip-action-table"
                        data-tooltip="Add"
                        onClick={handleAddSssLoan}
                      >
                        <FaPlusCircle />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="tooltip-action-table"
                        data-tooltip="Edit"
                        onClick={() => handleEditSssLoan(item)}
                      >
                        <FaEdit />
                      </button>
                    )}
                    <Link
                      to={`${link}/employee/details/deduction-installment/sss-loan?employeeid=${eid}`}
                    >
                      <button
                        className="tooltip-action-table"
                        data-tooltip="View Details"
                      >
                        <SlArrowRight />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="text-left grid grid-cols-2 md:md:grid-cols-[1fr_1.5fr]  xs:pl-5 pl-2">
                <p className="font-semibold">Start Date</p>
                <p className="pl-2">
                  {formatDate(item.employee_installment_start_date)}
                </p>
                <p className="font-semibold">End Date</p>
                <p className="pl-2">
                  {formatDate(item.employee_installment_end_date)}
                </p>
                <p className="font-semibold">Monthly Amount</p>
                <p className="pl-2">
                  &#8369;{" "}
                  {numberWithCommas(
                    Number(item.employee_installment_amount).toFixed(2)
                  )}
                </p>
                <p className="font-semibold">Number of months</p>
                <p className="pl-2">
                  {`${getNumberOfMonths(item.employee_installment_start_date)} /
                    ${item.employee_installment_number_of_months}`}
                </p>
                <p className="font-semibold">Status</p>
                <p className="pl-2">
                  {item.employee_installment_status === "0" ? (
                    <Status text="stop" />
                  ) : item.employee_installment_status === "1" ? (
                    <Status text="pending" />
                  ) : item.employee_installment_status === "2" ? (
                    <Status />
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
          );
        })}
        {(isLoadingSSSLoan || employeeSSSLoan?.data.length === 0) && (
          <div className="relative w-full max-w-[650px] pt-5 ">
            <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
              <h4>SSS Loan Details</h4>
              {eid === null || draftLoading ? (
                ""
              ) : (
                <div>
                  <button
                    type="button"
                    className="tooltip-action-table"
                    data-tooltip="Add"
                    onClick={handleAddSssLoan}
                  >
                    <FaPlusCircle />
                  </button>
                </div>
              )}
            </div>
            <div className="relative w-full grid place-items-center">
              {isLoadingSSSLoan && <TableSpinner />}
              <NoData />
            </div>
          </div>
        )}
        {errorSSSLoan && (
          <div className="relative w-full  grid place-items-center">
            <ServerError />
          </div>
        )}
      </div>

      {store.isAdd && (
        <ModalAddMP2 item={itemEdit} employeeMP2={employeeMP2?.data} />
      )}
      {store.isRestore && <ModalAddPagibigLoan item={itemEdit} />}
      {store.isConfirm && <ModalAddSSSLoan item={itemEdit} />}
    </>
  );
};

export default DeductionInstallmentList;

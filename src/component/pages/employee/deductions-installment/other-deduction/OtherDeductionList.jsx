import React from "react";
import { FaEdit, FaListUl, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  setError,
  setIsAdd,
  setIsRestore,
  setMessage,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  devApiUrl,
  formatDate,
  getUrlParam,
  getUserType,
  numberWithCommas,
} from "../../../../helpers/functions-general";
import {
  fwcTithesId,
  fcaTutionId,
} from "../../../../helpers/functions-payitemId";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import Status from "../../../../partials/status/Status";
import {
  getNumMonth,
  getNumberOfMonths,
} from "../functions-deductions-installment";
import ModalAddFCATuition from "./ModalAddFCATuition";
import ModalAddFWCTithes from "./ModalAddFWCTithes";

const OtherDeductionList = ({ draft, draftLoading }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const eid = getUrlParam().get("employeeid");
  const link = getUserType(store.credentials.data.role_is_developer === 1);

  const handleAddTuition = () => {
    if (draft?.count > 0) {
      dispatch(setError(true));
      dispatch(setMessage("Payroll has ongoing draft. Adding is not allowed."));
      return;
    }
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const handleEditTuition = (item) => {
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

  const handleAddFwcTithes = () => {
    if (draft?.count > 0) {
      dispatch(setError(true));
      dispatch(setMessage("Payroll has ongoing draft. Adding is not allowed."));
      return;
    }
    dispatch(setIsRestore(true));
    setItemEdit(null);
  };

  const handleEditFwcTithes = (item) => {
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

  // use if not loadmore button undertime
  const {
    isLoading: isLoadingTuition,
    error: errorTuition,
    data: employeeTuition,
  } = useQueryData(
    `${devApiUrl}/v1/employees-installment/by-employee/${fcaTutionId}/${eid}`, // endpoint
    "get", // method
    "employeeTuition" // key
  );

  // use if not loadmore button undertime
  const {
    isLoading: isLoadingFwcTithes,
    error: errorFwcTithes,
    data: employeeFwcTithes,
  } = useQueryData(
    `${devApiUrl}/v1/employees-installment/by-employee/${fwcTithesId}/${eid}`, // endpoint
    "get", // method
    "employeeFwcTithes" // key
  );

  return (
    <>
      <div className="text-center overflow-x-auto pb-2 z-0 ">
        <>
          {employeeTuition?.data.map((item, key) => {
            return (
              <div key={key} className="relative w-full max-w-[650px] pt-5 ">
                <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                  <h4>FCA Tuition Details</h4>
                  {eid === null || draftLoading ? (
                    ""
                  ) : (
                    <div>
                      {item.employee_installment_number_of_months <
                        getNumberOfMonths(
                          item.employee_installment_start_date
                        ) || item.employee_installment_status === "2" ? (
                        <button
                          type="button"
                          className="tooltip-action-table"
                          data-tooltip="Add"
                          onClick={handleAddTuition}
                        >
                          <FaPlusCircle />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="tooltip-action-table"
                          data-tooltip="Edit"
                          onClick={() => handleEditTuition(item)}
                        >
                          <FaEdit />
                        </button>
                      )}
                      <Link
                        target="_blank"
                        to={`${link}/employee/details/deduction-installment/other-deduction/fca-tuition?employeeid=${eid}`}
                      >
                        <button
                          className="tooltip-action-table"
                          data-tooltip="View Details"
                        >
                          <FaListUl />
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
                    {`${formatDate(item.employee_installment_start_date)}`}
                  </p>
                  <p className="font-semibold">End Date</p>
                  <p className="pl-2">
                    {`${formatDate(item.employee_installment_end_date)}`}
                  </p>
                  <p className="font-semibold">Amortization</p>
                  <p className="pl-2">
                    &#8369;{" "}
                    {numberWithCommas(
                      Number(item.employee_installment_amount).toFixed(2)
                    )}
                  </p>
                  <p className="font-semibold">Number of months</p>
                  <p className="pl-2">
                    {`${getNumMonth(
                      getNumberOfMonths(item.employee_installment_start_date),
                      item.employee_installment_number_of_months
                    )} /
                    ${item.employee_installment_number_of_months}`}
                  </p>
                  <p className="font-semibold">Status</p>
                  <p className="pl-2">
                    {item.employee_installment_status === "0" ? (
                      <Status text="ongoing" />
                    ) : item.employee_installment_status === "1" ? (
                      <Status text="stop" />
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
          {(isLoadingTuition || employeeTuition?.data.length === 0) && (
            <>
              <div className="relative w-full max-w-[650px] pt-5 ">
                <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                  <h4>FCA Tuition Details</h4>
                  {eid === null || draftLoading ? (
                    ""
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="tooltip-action-table"
                        data-tooltip="Add"
                        onClick={handleAddTuition}
                      >
                        <FaPlusCircle />
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative w-full grid place-items-center">
                  {isLoadingTuition && <TableSpinner />}
                  <NoData />
                </div>
              </div>
            </>
          )}
          {errorTuition && (
            <div className="relative w-full  grid place-items-center">
              <ServerError />
            </div>
          )}
        </>
        <>
          {employeeFwcTithes?.data.map((item, key) => {
            return (
              <div key={key} className="relative w-full max-w-[650px] pt-5 ">
                <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                  <h4>FWC Tithes Details</h4>
                  {eid === null || draftLoading ? (
                    ""
                  ) : (
                    <div>
                      {item.employee_installment_number_of_months <
                        getNumberOfMonths(
                          item.employee_installment_start_date
                        ) || item.employee_installment_status === "2" ? (
                        <button
                          type="button"
                          className="tooltip-action-table"
                          data-tooltip="Add"
                          onClick={handleAddFwcTithes}
                        >
                          <FaPlusCircle />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="tooltip-action-table"
                          data-tooltip="Edit"
                          onClick={() => handleEditFwcTithes(item)}
                        >
                          <FaEdit />
                        </button>
                      )}
                      <Link
                        target="_blank"
                        to={`${link}/employee/details/deduction-installment/other-deduction/fwc-tithes?employeeid=${eid}`}
                      >
                        <button
                          className="tooltip-action-table"
                          data-tooltip="View Details"
                        >
                          <FaListUl />
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="text-left grid grid-cols-2 md:md:grid-cols-[1fr_1.5fr]  xs:pl-5 pl-2">
                  <p className="font-semibold">Start Date</p>
                  <p className="pl-2">
                    {`${formatDate(item.employee_installment_start_date)}`}
                  </p>
                  <p className="font-semibold">End Date</p>
                  <p className="pl-2">
                    {`${formatDate(item.employee_installment_end_date)}`}
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
                    {`${getNumMonth(
                      getNumberOfMonths(item.employee_installment_start_date),
                      item.employee_installment_number_of_months
                    )} /
                    ${item.employee_installment_number_of_months}`}
                  </p>
                  <p className="font-semibold">Status</p>
                  <p className="pl-2">
                    {item.employee_installment_status === "0" ? (
                      <Status text="ongoing" />
                    ) : item.employee_installment_status === "1" ? (
                      <Status text="stop" />
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
          {(isLoadingFwcTithes || employeeFwcTithes?.data.length === 0) && (
            <>
              <div className="relative w-full max-w-[650px] pt-5 ">
                <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                  <h4>FWC Tithes Details</h4>
                  {eid === null || draftLoading ? (
                    ""
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="tooltip-action-table"
                        data-tooltip="Add"
                        onClick={handleAddFwcTithes}
                      >
                        <FaPlusCircle />
                      </button>
                    </div>
                  )}
                </div>
                <div className="relative w-full grid place-items-center">
                  {isLoadingFwcTithes && <TableSpinner />}
                  <NoData />
                </div>
              </div>
            </>
          )}
          {errorFwcTithes && (
            <div className="relative w-full  grid place-items-center">
              <ServerError />
            </div>
          )}
        </>
      </div>

      {store.isAdd && <ModalAddFCATuition item={itemEdit} />}
      {store.isRestore && <ModalAddFWCTithes item={itemEdit} />}
    </>
  );
};

export default OtherDeductionList;

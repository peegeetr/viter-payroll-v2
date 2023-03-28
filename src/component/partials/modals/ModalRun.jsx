import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { FaQuestionCircle } from "react-icons/fa";
import {
  setError,
  setIsConfirm,
  setMessage,
  setSuccess,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { devApiUrl } from "../../helpers/functions-general";
import {
  diminimisId,
  holidayId,
  nightDiffId,
  pagibigEeId,
  pagibigErId,
  payrollTaxDeductionId,
  philhealthEeId,
  philhealthErId,
  sssEeId,
  sssErId,
} from "../../helpers/functions-payitemId";
import { queryData } from "../../helpers/queryData";
import { runPayroll } from "../../pages/payroll/list/functions-payroll-list";
import ButtonSpinner from "../spinners/ButtonSpinner";

const ModalRun = ({
  pid,
  isPaid,
  employees,
  payrollEarnings,
  payrollDeductions,
  holidays,
  sssBracket,
  semiTax,
  pagibig,
  philhealth,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        isPaid
          ? `${devApiUrl}/v1/payrollList/${pid}`
          : `${devApiUrl}/v1/payrollList/paid/${pid}`,
        "put",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["payrollList"] });
      dispatch(setIsConfirm(false));
      // show success box
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly Done`));
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsConfirm(false));
  };
  // earningsNumInstallmentList,
  // deducNumInstallmentList,
  // console.log("run", runPayroll(employees, payrollEarnings));
  const handleYes = async () => {
    // run payroll
    const run = runPayroll(
      employees,
      payrollEarnings,
      payrollDeductions,
      holidays,
      sssBracket,
      semiTax,
      pagibig,
      philhealth
    );

    let payrollList = run.payrollList;
    let holidayList = run.holidayList;
    let ndList = run.ndList;
    let sssList = run.sssList;
    let pagibigList = run.pagibigList;
    let philhealthList = run.philhealthList;
    let taxList = run.taxList;
    let earningsNumPayList = run.earningsNumInstallmentList;
    let deducNumPayList = run.deducNumInstallmentList;
    let payDeminimisList = run.deminimisList;

    mutation.mutate({
      payrollList: payrollList.length > 0 ? payrollList : 0,
      holidayList: holidayList.length > 0 ? holidayList : 0,
      ndList: ndList.length > 0 ? ndList : 0,
      sssList: sssList.length > 0 ? sssList : 0,
      pagibigList: pagibigList.length > 0 ? pagibigList : 0,
      philhealthList: philhealthList.length > 0 ? philhealthList : 0,
      taxList: taxList.length > 0 ? taxList : 0,
      deminimisList: payDeminimisList.length > 0 ? payDeminimisList : 0,
      earningsNumPayList:
        earningsNumPayList.length > 0 ? earningsNumPayList : 0,
      deducNumPayList: deducNumPayList.length > 0 ? deducNumPayList : 0,
      isPaid: 1,
      payItemTaxId: payrollTaxDeductionId,
      payItemHolidayId: holidayId,
      payItemNightDiffId: nightDiffId,
      payItemSssErId: sssErId,
      payItemNSssEeId: sssEeId,
      payItemPagibigErId: pagibigErId,
      payItemPagibigEeId: pagibigEeId,
      payItemPhilhealthErId: philhealthErId,
      payItemPhilhealthEeId: philhealthEeId,
      payItemDeminimisId: diminimisId,
    });
  };

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-end items-center bg-white p-3 pb-0 rounded-t-2xl"></div>
          <div className="bg-white p-4 rounded-b-2xl text-center ">
            <span className="text-5xl text-red-700 ">
              <FaQuestionCircle className="my-0 mx-auto" />
            </span>
            <span className="text-sm font-bold">
              Are you sure to {isPaid ? "run" : "mark as paid"}
            </span>
            <br />
            <span className="text-sm font-bold break-all">"{pid}"?</span>
            {!isPaid && <p>You can't undo this action.</p>}
            <div className="flex items-center gap-1 pt-5">
              <button
                type="submit"
                className="btn-modal-submit"
                disabled={mutation.isLoading}
                onClick={handleYes}
              >
                {loading ? <ButtonSpinner /> : "Confirm"}
              </button>
              <button
                type="reset"
                className="btn-modal-cancel"
                disabled={mutation.isLoading}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalRun;

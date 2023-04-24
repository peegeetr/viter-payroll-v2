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
import {
  payrollCategory13thMonthId,
  payrollCategoryBonusId,
} from "../../helpers/functions-payroll-category-id";
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
  category13thMonth,
  categoryId,
  // monthlyTax,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        isPaid
          ? `${devApiUrl}/v1/payrollList/paid/${pid}`
          : `${devApiUrl}/v1/payrollList/${pid}`,
        "put",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["payrollList"] });

      // show success box
      if (data.success) {
        dispatch(setIsConfirm(false));
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
      philhealth,
      category13thMonth,
      categoryId
      // monthlyTax
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
    let payBereavementList = run.bereavementList;
    let paybonusList = run.bonusList;
    let payERBonusList = run.eRBonusList;
    let paySeparationPayList = run.separationPayList;
    let payOtherAllowancesList = run.otherAllowancesList;
    let payTuitionList = run.tuitionList;
    let payTithesList = run.tithesList;
    let payOtherDeductionList = run.otherDeductionList;
    let payPagibigLoanList = run.pagibigLoanList;
    let payPagibigMP2List = run.pagibigMP2List;
    let paySSSLoanList = run.sSSLoanList;

    // modal error bonus categorty payroll;
    if (
      payrollList.length === 0 &&
      Number(categoryId) === payrollCategoryBonusId
    ) {
      dispatch(setIsConfirm(false));
      dispatch(setError(true));
      return;
    }

    // modal error 13th month category error
    if (
      payrollList.length === 0 &&
      Number(categoryId) === payrollCategory13thMonthId
    ) {
      dispatch(setIsConfirm(false));
      dispatch(setError(true));
      return;
    }

    mutation.mutate({
      payrollPayList: payrollList.length > 0 ? payrollList : [],
      holidayList: holidayList.length > 0 ? holidayList : [],
      ndList: ndList.length > 0 ? ndList : [],
      sssList: sssList.length > 0 ? sssList : [],
      pagibigList: pagibigList.length > 0 ? pagibigList : [],
      philhealthList: philhealthList.length > 0 ? philhealthList : [],
      taxList: taxList.length > 0 ? taxList : [],
      deminimisList: payDeminimisList.length > 0 ? payDeminimisList : [],
      earningsNumPayList:
        earningsNumPayList.length > 0 ? earningsNumPayList : [],
      deducNumPayList: deducNumPayList.length > 0 ? deducNumPayList : [],
      bereavementList: payBereavementList.length > 0 ? payBereavementList : [],
      bonusList: paybonusList.length > 0 ? paybonusList : [],
      eRBonusList: payERBonusList.length > 0 ? payERBonusList : [],
      separationPayList:
        paySeparationPayList.length > 0 ? paySeparationPayList : [],
      otherAllowancesList:
        payOtherAllowancesList.length > 0 ? payOtherAllowancesList : [],
      tuitionList: payTuitionList.length > 0 ? payTuitionList : [],
      tithesList: payTithesList.length > 0 ? payTithesList : [],
      otherDeductionList:
        payOtherDeductionList.length > 0 ? payOtherDeductionList : [],
      pagibigLoanList: payPagibigLoanList.length > 0 ? payPagibigLoanList : [],
      pagibigMP2List: payPagibigMP2List.length > 0 ? payPagibigMP2List : [],
      sSSLoanList: paySSSLoanList.length > 0 ? paySSSLoanList : [],
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
      categoryBunosId: payrollCategoryBonusId,
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
              Are you sure to {isPaid ? "mark as paid" : "run"}
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
                {mutation.isLoading ? <ButtonSpinner /> : "Confirm"}
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

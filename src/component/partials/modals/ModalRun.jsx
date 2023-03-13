import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FaQuestionCircle, FaTimesCircle } from "react-icons/fa";
import { setIsConfirm, setStartIndex } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { fetchData } from "../../helpers/fetchData";
import { runPayroll } from "../../pages/payroll/list/functions-payroll-list";
import ButtonSpinner from "../spinners/ButtonSpinner";
import { queryData } from "../../helpers/queryData";

const ModalRun = ({
  item,
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
        item
          ? `${devApiUrl}/v1/roles/${item.role_aid}`
          : `${devApiUrl}/v1/roles`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["role"] });
      // show success box
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly ${item ? "updated." : "added."}`));
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  // console.log("run", runPayroll(employees, payrollEarnings));
  const handleYes = async () => {
    // run payroll
    const values = runPayroll(
      employees,
      payrollEarnings,
      payrollDeductions,
      holidays,
      sssBracket,
      semiTax,
      pagibig,
      philhealth
    );

    console.log(values);
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
            <span className="text-sm font-bold">Are you sure to run</span>{" "}
            <br />
            <span className="text-sm font-bold break-all">"{item}"?</span>
            {/* <p>You can't undo this action.</p> */}
            <div className="flex items-center gap-1 pt-5">
              <button
                type="submit"
                className="btn-modal-submit"
                disabled={loading}
                onClick={handleYes}
              >
                {loading ? <ButtonSpinner /> : "Confirm"}
              </button>
              <button
                type="reset"
                className="btn-modal-cancel"
                disabled={loading}
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

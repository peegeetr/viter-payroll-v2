import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { FaQuestionCircle } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import { queryData } from "../../../helpers/queryData";
import { devApiUrl } from "../../../helpers/functions-general";
import {
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";

const ModalEmailAll = ({ categoryId }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`${devApiUrl}/v1/payrollList/email-all/payslip`, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["payrollList-email-all"] });
      // show success box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly Email All`));
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
  const handleYes = async () => {
    // email all payroll
    mutation.mutate({
      payrollPayList: payrollList.length > 0 ? payrollList : [],
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

export default ModalEmailAll;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaQuestionCircle, FaTimesCircle } from "react-icons/fa";
import { setError, setIsRestore, setMessage } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { queryData } from "../../helpers/queryData";
import ButtonSpinner from "../spinners/ButtonSpinner";

const ModalDeleteRestoreRq = ({
  isDel,
  mysqlApiDelete,
  mysqlApiRestore,
  msg,
  item,
  isDeveloper,
  arrKey,
}) => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        isDel ? mysqlApiDelete : mysqlApiRestore,
        isDel ? "delete" : "put",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [arrKey] });
      dispatch(setIsRestore(false));
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleClose = () => {
    dispatch(setIsRestore(false));
  };

  const handleYes = async () => {
    // // mutate data
    mutation.mutate({
      isActive: 1,
      isDraft: 0,
      column_name: item,
      isDeveloper: isDeveloper,
    });
  };

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-end items-center bg-white p-3 pb-0 rounded-t-2xl">
            <button
              type="button"
              className="text-primary text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl text-center ">
            <span className="text-5xl text-red-700 ">
              <FaQuestionCircle className="my-0 mx-auto" />
            </span>
            <span className="text-sm font-bold">{msg} ?</span> <br />
            <span className="text-sm font-bold">{item}</span>
            <p>You can't undo this action.</p>
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

export default ModalDeleteRestoreRq;

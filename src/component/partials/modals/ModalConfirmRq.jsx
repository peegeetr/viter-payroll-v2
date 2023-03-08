import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaQuestionCircle, FaTimesCircle } from "react-icons/fa";
import {
  setIsConfirm,
  setMessage,
  setSuccess,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { getUserType } from "../../helpers/functions-general";
import { queryData } from "../../helpers/queryData";
import ButtonSpinner from "../spinners/ButtonSpinner";

const ModalConfirmRq = ({
  isDel,
  mysqlApiReset,
  mysqlApiArchive,
  msg,
  item,
  isDeveloper,
  arrKey,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const queryClient = useQueryClient();
  let message = isDel
    ? "Reseting your own password will make you automatically logged out."
    : "Suspending your own account will make you unable to login and use the system.";

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(isDel ? mysqlApiReset : mysqlApiArchive, "put", values),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [arrKey] });
      // show success box
      if (isDel === true) {
        dispatch(setSuccess(true));
        dispatch(
          setMessage(`Please check your email to continue resetting password.`)
        );
      }
      dispatch(setIsConfirm(false));
    },
  });

  const handleClose = () => {
    dispatch(setIsConfirm(false));
  };

  const handleYes = async () => {
    // // mutate data
    mutation.mutate({
      isActive: 0,
      email: item,
      isDeveloper: isDeveloper,
    });

    // if reseting your own password
    if (
      (arrKey === "userSystems" || arrKey === "otherUsers") &&
      (store.credentials.data.user_system_email === item ||
        store.credentials.data.user_other_email === item)
    ) {
      localStorage.removeItem("fbsPayroll");
      store.credentials.data.role_is_developer === 1
        ? window.location.replace(`${link}/login`)
        : window.location.replace(`${link}/login`);
      return;
    }
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
            {store.credentials.data.user_system_email === item ||
            store.credentials.data.user_other_email === item ? (
              <span className="text-sm font-bold">
                {message} <br />
                Do you still want to proceed?
              </span>
            ) : (
              <>
                <span className="text-sm font-bold">{msg}</span>
                <br />
                <span className="text-sm font-bold break-all">"{item}" ?</span>
              </>
            )}
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

export default ModalConfirmRq;

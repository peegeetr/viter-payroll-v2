import React from "react";
import { FaQuestionCircle, FaTimesCircle } from "react-icons/fa";
import {
  setIsConfirm,
  setIsFinish,
  setStartIndex,
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { fetchData } from "../../helpers/fetchData";
import { getUserType } from "../../helpers/functions-general";
import ButtonSpinner from "../spinners/ButtonSpinner";

const ModalConfirm = ({
  id,
  isDel,
  mysqlApiReset,
  mysqlApiArchive,
  msg,
  item,
  isDeveloper,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  const [loading, setLoading] = React.useState(false);
  let message = isDel
    ? "Reseting your own password will make you automatically logged out."
    : "Suspending your own account will make you unable to login and use the system.";

  const handleClose = () => {
    dispatch(setIsConfirm(false));
  };

  const handleYes = async () => {
    setLoading(true);
    fetchData(
      setLoading,
      isDel ? mysqlApiReset : mysqlApiArchive,
      {
        isActive: 0,
        email: item,
        isDeveloper: isDeveloper,
      },
      null,
      isDel ? "Please check your email to continue resetting password." : "",
      "",
      dispatch,
      store,
      false,
      false,
      null,
      isDel ? "delete" : "put"
    );
    dispatch(setStartIndex(0));
    // if reseting your own password
    if (
      store.credentials.data.user_system_email === item ||
      store.credentials.data.user_other_email === item
    ) {
      setLoading(true);
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

export default ModalConfirm;

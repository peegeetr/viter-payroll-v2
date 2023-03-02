import React from "react";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import { setIsFinish, setSuccess } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { GetFocus, getUserType } from "../../helpers/functions-general";

const ModalSuccess = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const link = getUserType(store.credentials.data.role_is_developer === 1);
  GetFocus("btnClose");

  const handleClose = () => {
    dispatch(setSuccess(false));

    if (store.isFinish) {
      localStorage.removeItem("fbsPayroll");
      store.credentials.data.role_is_developer === 1
        ? window.location.replace(`${link}/login`)
        : window.location.replace(`${link}/login`);
      dispatch(setIsFinish(false));
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
            <span className="text-5xl text-primary ">
              <FaCheck className="my-0 mx-auto" />
            </span>
            <span className="text-base font-bold">Success!</span>
            <p>{store.message}</p>
            <div className="flex items-center gap-1 pt-5">
              <button
                type="reset"
                id="btnClose"
                className="btn-modal-submit"
                onClick={handleClose}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSuccess;

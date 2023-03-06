import React from "react";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import { setIsAdd, setSuccess } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { GetFocus } from "../../helpers/functions-general";

const ModalSuccess = ({ close }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  GetFocus("btnClose");

  const handleClose = () => {
    dispatch(setSuccess(false));
    close === "close" && dispatch(setIsAdd(false));
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

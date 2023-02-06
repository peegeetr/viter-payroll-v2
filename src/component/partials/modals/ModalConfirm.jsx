import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaQuestionCircle, FaTimesCircle } from "react-icons/fa";
import { setIsConfirm, setStartIndex } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { fetchData } from "../../helpers/fetchData";
import { queryData } from "../../helpers/queryData";
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
  const [loading, setLoading] = React.useState(false);
  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: (values) =>
  //     queryData(isDel ? mysqlApiDelete : mysqlApiArchive, "put", values),
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ["leavetype"] });
  //     dispatch(setIsConfirm(false));
  //   },
  // });

  const handleClose = () => {
    dispatch(setIsConfirm(false));
  };

  const handleYes = async () => {
    // // mutate data
    // mutation.mutate({
    //   isActive: 0,
    // });
    setLoading(true);
    fetchData(
      setLoading,
      isDel ? mysqlApiReset : mysqlApiArchive,
      { isActive: 0, email: item, isDeveloper: isDeveloper },
      null,
      isDel ? "Please check your email to continue resetting password." : "",
      "",
      dispatch,
      store,
      isDel ? true : false,
      false,
      null,
      isDel ? "delete" : "put"
    );
    dispatch(setStartIndex(0));
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
            <span className="text-sm font-bold">{msg}</span> <br />
            <span className="text-sm font-bold break-all">"{item}" ?</span>
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsEdit,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { InputText } from "../../../helpers/FormInputs";
import { devApiUrl, removeComma } from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalEditManageDeduction = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `${devApiUrl}/v1/deduction/update-amount/${item.deduction_aid}`,
        "put",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["deduction"] });
      // console.log(data);
      // show success box
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly updated.`));
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const handleClose = () => {
    dispatch(setIsEdit(false));
  };

  const initVal = {
    deduction_amount: item.deduction_amount,
  };

  const yupSchema = Yup.object({
    deduction_amount: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              Edit Deduction : {item.deduction_payroll_id}
            </h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>

          <div className="bg-white rounded-b-2xl overflow-hidden">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // console.log(values);
                const deduction_amount = removeComma(
                  `${values.deduction_amount}`
                );
                mutation.mutate({ ...values, deduction_amount });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="max-h-[28rem] overflow-y-auto p-4">
                      <div className="grid grid-cols-[6rem_1fr]">
                        <p className="m-0 text-primary font-bold">
                          Payroll ID :{" "}
                        </p>
                        <p className="m-0">{item.deduction_payroll_id}</p>
                      </div>
                      <div className="grid grid-cols-[6rem_1fr]">
                        <p className="m-0 text-primary font-bold">
                          Employee :{" "}
                        </p>
                        <p className="m-0">{item.deduction_employee}</p>
                      </div>
                      <div className="grid grid-cols-[6rem_1fr] my-1">
                        <p className="m-0 text-primary font-bold">
                          Pay Item :{" "}
                        </p>
                        <p className="m-0">{item.payitem_name}</p>
                      </div>
                      <div className="grid grid-cols-[6rem_1fr] ">
                        <p className="m-0 text-primary font-bold">Details : </p>
                        <p className="m-0">{item.deduction_details}</p>
                      </div>
                      <div className="grid grid-cols-[6rem_1fr] my-3">
                        <p className="m-0 text-primary font-bold">Amount : </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="deduction_amount"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 p-4 ">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading && <ButtonSpinner />}
                        Update
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel cursor-pointer"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalEditManageDeduction;

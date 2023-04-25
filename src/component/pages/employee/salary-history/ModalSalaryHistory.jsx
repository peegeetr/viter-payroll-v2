import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../helpers/FormInputs";
import {
  devApiUrl,
  getDateNow,
  getUrlParam,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalSalaryHistory = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const empId = getUrlParam().get("employeeId");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `${devApiUrl}/v1/salary-history/${item.salary_history_aid}`
          : `${devApiUrl}/v1/salary-history`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["salaryHistory"] });
      // show success box
      if (data.success) {
        dispatch(setIsAdd(false));
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
  const initVal = {
    salary_history_employee_id: empId,
    salary_history_salary_amount: item ? item.salary_history_salary_amount : "",
    salary_history_date: item ? item.salary_history_date : getDateNow(),
    salary_history_date_old: item ? item.salary_history_date : "",
  };

  const yupSchema = Yup.object({
    salary_history_salary_amount: Yup.string().required("Required"),
    salary_history_date: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px]  rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Salary History
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
                console.log(values, item);

                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="max-h-[28rem] overflow-y-scroll p-4">
                      <div className="relative mb-6 mt-5">
                        <InputText
                          label="Date of Salary Raise"
                          type="date"
                          name="salary_history_date"
                          disabled={mutation.isLoading}
                        />
                      </div>
                      <div className="relative mb-6 mt-5">
                        <InputText
                          label="Salary Amount"
                          type="text"
                          name="salary_history_salary_amount"
                          disabled={mutation.isLoading}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 p-4">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? <ButtonSpinner /> : "Save"}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel"
                        onClick={handleClose}
                        disabled={mutation.isLoading}
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

export default ModalSalaryHistory;

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
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import {
  getDateNow,
  getUrlParam,
  devApiUrl,
  handleNumOnly,
  removeComma,
} from "../../../../helpers/functions-general";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { getEndOfInstallment } from "../functions-deductions-installment";
import { PagibigMP2Id } from "../../../../helpers/functions-payitemId";

const ModalAddMP2 = ({ item, employeeMP2 }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const eid = getUrlParam().get("employeeid");
  // ModalAddPagibigLoan
  // ModalAddSSSLoan
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `${devApiUrl}/v1/employees-installment/${item.employee_installment_aid}`
          : `${devApiUrl}/v1/employees-installment`,
        item ? "put" : "post",
        values,
        false
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employeeMP2"] });
      // show success box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly ${item ? "Update" : "Add"}`));
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
    employee_installment_start_date: item
      ? item.employee_installment_start_date
      : getDateNow(),
    employee_installment_end_date: "",
    employee_installment_paytype_id: PagibigMP2Id,
    employee_installment_employee_id: eid,
    employee_installment_number_of_months: item
      ? item.employee_installment_number_of_months
      : "",
    employee_installment_amount: item ? item.employee_installment_amount : "",
    employee_installment_status: item ? item.employee_installment_status : "",
  };

  const yupSchema = Yup.object({
    employee_installment_start_date: Yup.string().required("Required"),
    employee_installment_amount: Yup.string().required("Required"),
    employee_installment_number_of_months: Yup.string().required("Required"),
    employee_installment_status: item && Yup.string().required("Required"),
  });
  console.log(employeeMP2);
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} MP2 Details
            </h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>

          <div className="bg-white p-4 rounded-b-2xl overflow-hidden">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // console.log(values);
                const employee_installment_amount = removeComma(
                  `${values.employee_installment_amount}`
                );

                mutation.mutate({
                  ...values,
                  employee_installment_amount,
                });
              }}
            >
              {(props) => {
                props.values.employee_installment_end_date =
                  getEndOfInstallment(
                    props.values.employee_installment_number_of_months,
                    props.values.employee_installment_start_date
                  );
                return (
                  <Form>
                    <div className="relative mb-6 mt-2">
                      <InputText
                        label="Start Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "date")}
                        name="employee_installment_start_date"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="relative mb-6">
                      <InputText
                        label="MP2 Amount"
                        type="text"
                        name="employee_installment_amount"
                        num="num"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6">
                      <InputSelect
                        label="Number of Years"
                        name="employee_installment_number_of_months"
                        disabled={mutation.isLoading}
                      >
                        <option value="" hidden>
                          --
                        </option>
                        <option value="60">5 year</option>
                        <option value="24">2 year</option>
                      </InputSelect>
                    </div>
                    {item && (
                      <div className="relative mb-6">
                        <InputSelect
                          label="Status"
                          name="employee_installment_status"
                          disabled={mutation.isLoading}
                        >
                          <option value="" hidden>
                            --
                          </option>
                          <option value="0">Stop</option>
                          <option value="1">Ongoing</option>
                        </InputSelect>
                      </div>
                    )}
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

export default ModalAddMP2;
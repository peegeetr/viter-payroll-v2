import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setIsConfirm,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputText, InputTextArea } from "../../../../helpers/FormInputs";
import {
  devApiUrl,
  getDateNow,
  getUrlParam,
  removeComma,
} from "../../../../helpers/functions-general";
import { SSSLoanId } from "../../../../helpers/functions-payitemId";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import {
  getDeductionPayrollDateNow,
  getEndOfInstallment,
  getNumberOfMonths,
} from "../functions-deductions-installment";

const ModalAddSSSLoan = ({ item }) => {
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
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [`employeeInstallmentAll${SSSLoanId}`],
      });
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
    employee_installment_actual_pay_date: item
      ? item.employee_installment_actual_pay_date
      : getDateNow(),
    employee_installment_start_date: item
      ? item.employee_installment_start_date
      : getDeductionPayrollDateNow(),
    employee_installment_end_date: "",
    employee_installment_paytype_id: SSSLoanId,
    employee_installment_employee_id: eid,
    employee_installment_number_of_months: item
      ? item.employee_installment_number_of_months
      : "",
    total_month: "",
    employee_installment_amount: item ? item.employee_installment_amount : "",
    employee_installment_status: item ? item.employee_installment_status : "1",
    employee_installment_details: item ? item.employee_installment_details : "",
  };

  const yupSchema = Yup.object({
    employee_installment_start_date: Yup.string().required("Required"),
    employee_installment_amount: Yup.string().required("Required"),
    employee_installment_number_of_months: Yup.string().required("Required"),
    employee_installment_details: Yup.string().required("Required"),
    employee_installment_status: item && Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} SSS Loan Details
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
                const employee_installment_amount = removeComma(
                  `${values.employee_installment_amount}`
                );
                const employee_installment_number_of_months = removeComma(
                  `${values.employee_installment_number_of_months}`
                );
                const employee_installment_status =
                  Number(values.total_month) <
                  Number(employee_installment_number_of_months)
                    ? "0" // ongoing
                    : "2"; // complete
                console.log(
                  values,
                  Number(values.total_month) <
                    Number(employee_installment_number_of_months),
                  Number(values.total_month),
                  Number(employee_installment_number_of_months)
                );
                mutation.mutate({
                  ...values,
                  employee_installment_amount,
                  employee_installment_number_of_months,
                  employee_installment_status,
                });
              }}
            >
              {(props) => {
                props.values.employee_installment_end_date =
                  getEndOfInstallment(
                    props.values.employee_installment_number_of_months,
                    props.values.employee_installment_start_date
                  );
                props.values.total_month = `${getNumberOfMonths(
                  props.values.employee_installment_start_date
                )}`;
                return (
                  <Form>
                    <div className="relative mb-6 mt-2">
                      <InputText
                        label="Pay Start Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "date")}
                        name="employee_installment_actual_pay_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-2">
                      <InputText
                        label="Payroll Start Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "date")}
                        name="employee_installment_start_date"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="relative mb-6">
                      <InputText
                        label="Amortization"
                        type="text"
                        name="employee_installment_amount"
                        num="num"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6">
                      <InputText
                        label="Number of Months"
                        name="employee_installment_number_of_months"
                        type="text"
                        num="num"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6">
                      <InputTextArea
                        label="Details"
                        type="text"
                        name="employee_installment_details"
                        num="num"
                        disabled={mutation.isLoading}
                      />
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

export default ModalAddSSSLoan;

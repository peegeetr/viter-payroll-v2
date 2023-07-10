import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsRestore,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import {
  InputSelect,
  InputText,
  MyCheckbox,
} from "../../../helpers/FormInputs";
import {
  handleNumOnly,
  hrisDevApiUrl,
  removeComma,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalEditPayroll = ({ itemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `${hrisDevApiUrl}/v1/employees/payroll/${itemEdit.employee_aid}`,
        "put",
        values,
        false
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employee"] });
      // show success box
      if (data.success) {
        dispatch(setIsRestore(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly updated`));
      }
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

  const initVal = {
    employee_aid: itemEdit.employee_aid,
    employee_job_payroll_elegibility:
      itemEdit.employee_job_payroll_elegibility === 1 ? true : false,
    employee_job_sss_deduc:
      itemEdit.employee_job_sss_deduc === 1 ? true : false,
    employee_job_pag_ibig_deduc:
      itemEdit.employee_job_pag_ibig_deduc === 1 ? true : false,
    employee_job_phil_health_deduc:
      itemEdit.employee_job_phil_health_deduc === 1 ? true : false,
    employee_job_work_reg_hol:
      itemEdit.employee_job_work_reg_hol === 1 ? true : false,
    employee_job_none_work_reg_hol:
      itemEdit.employee_job_none_work_reg_hol === 1 ? true : false,
    employee_job_deminimis:
      itemEdit.employee_job_deminimis !== ""
        ? itemEdit.employee_job_deminimis
        : 0,
    employee_job_pagibig_amount:
      itemEdit.employee_job_pagibig_amount !== ""
        ? itemEdit.employee_job_pagibig_amount
        : 0,
    employee_job_salary:
      itemEdit.employee_job_salary !== "" ? itemEdit.employee_job_salary : 0,
    employee_job_pay_freq:
      itemEdit.employee_job_pay_freq !== ""
        ? itemEdit.employee_job_pay_freq
        : "sm",
    employee_job_early_13th_month:
      itemEdit.employee_job_early_13th_month === 1 ? true : false,
    employee_job_account_number:
      itemEdit.employee_job_account_number !== ""
        ? itemEdit.employee_job_account_number
        : 0,
    employee_job_starting_pay:
      itemEdit.employee_job_starting_pay !== ""
        ? itemEdit.employee_job_starting_pay
        : 0,
  };

  const yupSchema = Yup.object({
    employee_job_deminimis: Yup.string().required("Required"),
    employee_job_pagibig_amount: Yup.string().required("Required"),
    employee_job_starting_pay: Yup.string().required("Required"),
    employee_job_salary: Yup.string().required("Required"),
    employee_job_account_number: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Payroll Details</h3>
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
                const employee_job_salary = removeComma(
                  `${values.employee_job_salary}`
                );
                const employee_job_deminimis = removeComma(
                  `${values.employee_job_deminimis}`
                );
                const employee_job_pagibig_amount = removeComma(
                  `${values.employee_job_pagibig_amount}`
                );
                const employee_job_starting_pay = removeComma(
                  `${values.employee_job_starting_pay}`
                );
                mutation.mutate({
                  ...values,
                  employee_job_salary,
                  employee_job_deminimis,
                  employee_job_pagibig_amount,
                  employee_job_starting_pay,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="max-h-[28rem] overflow-y-scroll p-4">
                      <div className="relative mb-3 pt-5 flex items-center">
                        <p className="w-1/2 m-0">Payroll Eligibility</p>
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="employee_job_payroll_elegibility"
                            disabled={mutation.isLoading}
                          />
                        </span>
                      </div>
                      <div className="relative mb-3 flex items-center">
                        <p className="w-1/2 m-0">With SSS deduction?</p>
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="employee_job_sss_deduc"
                            disabled={mutation.isLoading}
                          />
                        </span>
                      </div>

                      <div className="relative mb-3 flex items-center">
                        <p className="w-1/2 m-0">With Pag-ibig deduction?</p>
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="employee_job_pag_ibig_deduc"
                            disabled={mutation.isLoading}
                          />
                        </span>
                      </div>

                      <div className="relative mb-3 flex items-center">
                        <p className="w-1/2 m-0">With PhilHealth deduction?</p>
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="employee_job_phil_health_deduc"
                            disabled={mutation.isLoading}
                          />
                        </span>
                      </div>

                      <div className="relative mb-3 flex items-center">
                        <p className="w-1/2 m-0">
                          Work on regular (200%) holiday?
                        </p>
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="employee_job_work_reg_hol"
                            disabled={mutation.isLoading}
                          />
                        </span>
                      </div>

                      <div className="relative mb-3 flex items-center">
                        <p className="w-1/2 m-0">For early 13th month?</p>
                        <span>
                          <MyCheckbox
                            type="checkbox"
                            name="employee_job_early_13th_month"
                            disabled={mutation.isLoading}
                          />
                        </span>
                      </div>

                      <div className="relative mb-5 flex items-center gap-2">
                        <p className="w-full m-0">De Minimis</p>
                        <InputText
                          num="num"
                          type="text"
                          name="employee_job_deminimis"
                          disabled={mutation.isLoading}
                        />
                      </div>

                      <div className="relative mb-5 flex items-center gap-2">
                        <p className="w-full m-0">Pag-ibig addtl. amount</p>
                        <InputText
                          num="num"
                          type="text"
                          name="employee_job_pagibig_amount"
                          disabled={mutation.isLoading}
                        />
                      </div>

                      <div className="relative mb-5 flex items-center gap-2">
                        <p className="w-full m-0">Monthly starting pay</p>
                        <InputText
                          num="num"
                          type="text"
                          name="employee_job_starting_pay"
                          disabled={mutation.isLoading}
                        />
                      </div>

                      <div className="relative mb-5 flex items-center gap-2">
                        <p className="w-full m-0">Monthly salary</p>
                        <InputText
                          num="num"
                          type="text"
                          name="employee_job_salary"
                          disabled={mutation.isLoading}
                        />
                      </div>

                      <div className="relative mb-5 flex items-center gap-2">
                        <p className="w-full m-0">Pay frequency</p>
                        <InputSelect
                          name="employee_job_pay_freq"
                          disabled={mutation.isLoading}
                        >
                          <optgroup label="Pay frequency">
                            <option value="" hidden></option>
                            <option value="m">Monthly</option>
                            <option value="sm">Semi-Monthly</option>
                          </optgroup>
                        </InputSelect>
                      </div>

                      <div className="relative mb-5 flex items-center gap-2">
                        <p className="w-full m-0">Account number</p>
                        <InputText
                          type="text"
                          name="employee_job_account_number"
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

export default ModalEditPayroll;

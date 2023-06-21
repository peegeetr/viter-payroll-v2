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
import {
  devApiUrl,
  getPayPeriod,
  removeComma,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";

const ModalEditPayrollView = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `${devApiUrl}/v1/payrollList/update-amount/${item.payroll_list_aid}`,
        "put",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["payrollList"] });
      // console.log(data);
      // show success box
      if (data.success) {
        dispatch(setIsEdit(false));
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
    payroll_list_sss_er: item.payroll_list_sss_er,
    payroll_list_sss_ee: item.payroll_list_sss_ee,
    payroll_list_pagibig_er: item.payroll_list_pagibig_er,
    payroll_list_pagibig_ee: item.payroll_list_pagibig_ee,
    payroll_list_philhealth_er: item.payroll_list_philhealth_er,
    payroll_list_philhealth_ee: item.payroll_list_philhealth_ee,
    payroll_list_basic_pay: item.payroll_list_basic_pay,
    payroll_list_tax: item.payroll_list_tax,
    payroll_list_gross: item.payroll_list_gross,
    payroll_list_deduction: item.payroll_list_deduction,
    payroll_list_net_pay: item.payroll_list_net_pay,
  };

  const yupSchema = Yup.object({
    payroll_list_sss_er: Yup.string().required("Required"),
    payroll_list_sss_ee: Yup.string().required("Required"),
    payroll_list_pagibig_er: Yup.string().required("Required"),
    payroll_list_pagibig_ee: Yup.string().required("Required"),
    payroll_list_philhealth_er: Yup.string().required("Required"),
    payroll_list_philhealth_ee: Yup.string().required("Required"),
    payroll_list_basic_pay: Yup.string().required("Required"),
    payroll_list_tax: Yup.string().required("Required"),
    payroll_list_gross: Yup.string().required("Required"),
    payroll_list_deduction: Yup.string().required("Required"),
    payroll_list_net_pay: Yup.string().required("Required"),
  });
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Payroll</h3>
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
                const payroll_list_sss_er = removeComma(
                  `${values.payroll_list_sss_er}`
                );
                const payroll_list_sss_ee = removeComma(
                  `${values.payroll_list_sss_ee}`
                );
                const payroll_list_pagibig_er = removeComma(
                  `${values.payroll_list_pagibig_er}`
                );
                const payroll_list_pagibig_ee = removeComma(
                  `${values.payroll_list_pagibig_ee}`
                );
                const payroll_list_philhealth_er = removeComma(
                  `${values.payroll_list_philhealth_er}`
                );
                const payroll_list_philhealth_ee = removeComma(
                  `${values.payroll_list_philhealth_ee}`
                );
                const payroll_list_tax = removeComma(
                  `${values.payroll_list_tax}`
                );
                const payroll_list_basic_pay = removeComma(
                  `${values.payroll_list_basic_pay}`
                );
                const payroll_list_gross = removeComma(
                  `${values.payroll_list_gross}`
                );
                const payroll_list_deduction = removeComma(
                  `${values.payroll_list_deduction}`
                );
                const payroll_list_net_pay = removeComma(
                  `${values.payroll_list_net_pay}`
                );
                mutation.mutate({
                  ...values,
                  payroll_list_sss_er,
                  payroll_list_sss_ee,
                  payroll_list_pagibig_er,
                  payroll_list_pagibig_ee,
                  payroll_list_philhealth_er,
                  payroll_list_philhealth_ee,
                  payroll_list_tax,
                  payroll_list_basic_pay,
                  payroll_list_gross,
                  payroll_list_deduction,
                  payroll_list_net_pay,
                });
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
                        <p className="m-0">{item.payroll_id}</p>
                      </div>
                      <div className="grid grid-cols-[6rem_1fr]">
                        <p className="m-0 text-primary font-bold">
                          Pay Period :{" "}
                        </p>
                        <p className="m-0">
                          {getPayPeriod(
                            item.payroll_start_date,
                            item.payroll_end_date
                          )}
                        </p>
                      </div>
                      <div className="grid grid-cols-[6rem_1fr]">
                        <p className="m-0 text-primary font-bold">
                          Employee :{" "}
                        </p>
                        <p className="m-0">{item.payroll_list_employee_name}</p>
                      </div>

                      {/* sss */}
                      <div className="grid grid-cols-[7rem_1fr] mt-3 items-center">
                        <p className="m-0 text-primary font-bold">SSS ER : </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_sss_er"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-[7rem_1fr] mt-5 items-center">
                        <p className="m-0 text-primary font-bold">SSS EE : </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_sss_ee"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>
                      {/* pagibig */}
                      <div className="grid grid-cols-[7rem_1fr] mt-5 items-center">
                        <p className="m-0 text-primary font-bold">
                          Pagibig ER :{" "}
                        </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_pagibig_er"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-[7rem_1fr] mt-5 items-center">
                        <p className="m-0 text-primary font-bold">
                          Pagibig EE :{" "}
                        </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_pagibig_ee"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>
                      {/* pagibig */}
                      <div className="grid grid-cols-[7rem_1fr] mt-5 items-center">
                        <p className="m-0 text-primary font-bold">
                          PhilHealth ER :{" "}
                        </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_philhealth_er"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-[7rem_1fr] mt-5 items-center">
                        <p className="m-0 text-primary font-bold">
                          PhilHealth EE :{" "}
                        </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_philhealth_ee"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-[7rem_1fr] mt-5 items-center">
                        <p className="m-0 text-primary font-bold">Tax : </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_tax"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-[7rem_1fr] mt-5 items-center">
                        <p className="m-0 text-primary font-bold">
                          Basic pay :{" "}
                        </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_basic_pay"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-[7rem_1fr] mt-5 items-center">
                        <p className="m-0 text-primary font-bold">Gross : </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_gross"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-[7rem_1fr] mt-5 items-center">
                        <p className="m-0 text-primary font-bold">
                          Deduction :{" "}
                        </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_deduction"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-[7rem_1fr] mt-5 items-center">
                        <p className="m-0 text-primary font-bold">Net Pay : </p>
                        <div className="relative">
                          <InputText
                            num="num"
                            name="payroll_list_net_pay"
                            type="text"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 py-4 ">
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

export default ModalEditPayrollView;

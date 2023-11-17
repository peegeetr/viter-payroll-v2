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
} from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import useQueryData from "../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../helpers/FormInputs";
import {
  currentYear,
  devApiUrl,
  hrisDevApiUrl,
} from "../../helpers/functions-general";
import {
  payrollCategory13thMonthId,
  payrollCategoryBonusId,
  payrollCategorySalaryId,
} from "../../helpers/functions-payroll-category-id";
import { queryData } from "../../helpers/queryData";
import ButtonSpinner from "../../partials/spinners/ButtonSpinner";
import { getEmployeeList, getResultEmployeeList } from "./FunctionPayroll";

const ModalAddPayroll = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [is13thMonth, setIs13thMonth] = React.useState(false);

  // use if not loadmore button undertime
  const { isLoading, data: payrollType } = useQueryData(
    `${devApiUrl}/v1/payroll-type`, // endpoint
    "get", // method
    "payrollType" // key
  );

  // use if not loadmore button undertime
  const { data: result } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    "get", // method
    "result", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );

  console.log(result);

  // use if not loadmore button undertime
  const { data: category13thMonth } = useQueryData(
    `${devApiUrl}/v1/payrollList/category/13month/${payrollCategorySalaryId}`, // endpoint
    "get", // method
    "category13thMonth" // key
  );

  console.log(category13thMonth);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `${devApiUrl}/v1/payroll/${item.payroll_aid}`
          : `${devApiUrl}/v1/payroll`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["payroll"] });
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

  const handleCategoryType = async (e) => {
    // // get jobId id
    let categoryId = e.target.value;
    if (Number(categoryId) === payrollCategory13thMonthId) {
      setIs13thMonth(true);
    }
  };
  const initVal = {
    payroll_start_date: item ? item.payroll_start_date : "",
    payroll_end_date: item ? item.payroll_end_date : "",
    payroll_pay_date: item ? item.payroll_pay_date : "",
    payroll_category_type: item
      ? item.payroll_category_type
      : payrollCategorySalaryId,

    payroll_end_date_old: item ? item.payroll_end_date : "",
    payroll_start_date_old: item ? item.payroll_start_date : "",
    payroll_pay_date_old: item ? item.payroll_pay_date : "",
  };

  const yupSchema = Yup.object({
    payroll_start_date: !is13thMonth && Yup.string().required("Required"),
    payroll_end_date: !is13thMonth && Yup.string().required("Required"),
    payroll_pay_date: Yup.string().required("Required"),
    payroll_category_type: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Payroll
            </h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // console.log(values);
                // for 13th month validation only
                if (
                  Number(values.payroll_category_type) ===
                    payrollCategory13thMonthId &&
                  category13thMonth?.data.length === 0
                ) {
                  dispatch(setError(true));
                  dispatch(
                    setMessage(
                      `There is no salary for this year yet to compute 13th month.`
                    )
                  );
                  return;
                }

                const employeeList = getResultEmployeeList(result, values);

                console.log(employeeList);

                mutation.mutate({
                  ...values,
                  employee: employeeList,
                  bonusId: `${payrollCategoryBonusId}`,
                  month13thId: `${payrollCategory13thMonthId}`,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5 ">
                      <InputSelect
                        label="Earning Type"
                        name="payroll_category_type"
                        onChange={handleCategoryType}
                        disabled={mutation.isLoading}
                        onFocus={(e) =>
                          e.target.parentElement.classList.add("focused")
                        }
                      >
                        <optgroup label="Earning Type">
                          {isLoading && <option value="">Loading...</option>}
                          <option value="" hidden></option>
                          {payrollType?.data.map((type, key) => {
                            return (
                              type.payroll_type_active === 1 && (
                                <option key={key} value={type.payroll_type_aid}>
                                  {type.payroll_type_name}
                                </option>
                              )
                            );
                          })}
                        </optgroup>
                      </InputSelect>
                    </div>

                    {Number(props.values.payroll_category_type) !==
                      payrollCategory13thMonthId && (
                      <>
                        <div className="relative mb-5">
                          <InputText
                            label="From"
                            type="text"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "date")}
                            name="payroll_start_date"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="relative mb-5">
                          <InputText
                            label="To"
                            type="text"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "date")}
                            name="payroll_end_date"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </>
                    )}
                    <div className="relative mb-5">
                      <InputText
                        label="Pay Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "date")}
                        name="payroll_pay_date"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <p className="text-primary ml-3 mb-3">
                      Pay period
                      {Number(props.values.payroll_category_type) ===
                        payrollCategory13thMonthId && (
                        <>
                          <span className="text-black">
                            : Jan - Dec {currentYear()}
                          </span>
                        </>
                      )}
                    </p>

                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? (
                          <ButtonSpinner />
                        ) : item ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel cursor-pointer"
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

export default ModalAddPayroll;

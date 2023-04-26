import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { InputSelect } from "../../../helpers/FormInputs";
import {
  devApiUrl,
  formatDate,
  hrisDevApiUrl,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import { getEmployeeDetails } from "./functions-exemptions";

const ModalAddHolidays = ({ item, isPayrollEmpty, employeeName }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isObserved, setIsObserved] = React.useState(
    item ? item.holiday_exemption_is_observe : ""
  );
  const [isWorkOnHoliday, setIsWorkOnHoliday] = React.useState(
    item ? getEmployeeDetails(item, employeeName).isWorkOnHoliday : ""
  );

  console.log(getEmployeeDetails(item, employeeName).isWorkOnHoliday);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `${devApiUrl}/v1/holiday-exemptions/${item.holiday_exemption_aid}`
          : `${devApiUrl}/v1/holiday-exemptions`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["holiday-exemptions"] });
      // show success box
      if (data.success) {
        !item && dispatch(setIsAdd(false));
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

  // use if not loadmore button undertime
  const { data: employeeId, isLoading: loadingEmployee } = useQueryData(
    `${hrisDevApiUrl}/v1/employees/pay`, // endpoint
    "get", // method
    "employeeId", // key
    {}, // formdata
    null, // id key
    false // devKey boolean
  );
  // use if not loadmore button undertime
  const { data: holidayDate, isLoading } = useQueryData(
    `${devApiUrl}/v1/holidays/this-year`, // endpoint
    "get", // method
    "holidayDate" // key
  );

  const handleEmployee = async (e) => {
    // get employee id
    setIsWorkOnHoliday(e.target.options[e.target.selectedIndex].id);
  };

  const handleRateHoliday = async (e) => {
    // get employee id
    let isSpecialHolidayRate = e.target.options[e.target.selectedIndex].id;
    if (isWorkOnHoliday === "0" && isSpecialHolidayRate === "130") {
      setIsObserved("0");
    }
    if (isWorkOnHoliday === "0" && isSpecialHolidayRate === "200") {
      setIsObserved("1");
    }
    if (isWorkOnHoliday === "1") {
      setIsObserved("1");
    }
  };
  const initVal = {
    holiday_exemption_eid: item ? item.holiday_exemption_eid : "",
    holiday_exemption_pr_id: "",
    holiday_exemption_is_observe: item ? item.holiday_exemption_is_observe : "",
    holiday_exemption_holiday_date: item
      ? item.holiday_exemption_holiday_date
      : "",

    holiday_exemption_holiday_date_old: item
      ? item.holiday_exemption_holiday_date
      : "",
  };

  const yupSchema = Yup.object({
    holiday_exemption_eid: Yup.string().required("Required"),
    holiday_exemption_holiday_date: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl ">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Holiday Exemption
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
                mutation.mutate(values);
              }}
            >
              {(props) => {
                props.values.holiday_exemption_is_observe = isObserved;
                props.values.holiday_exemption_pr_id =
                  isPayrollEmpty?.data[0].payroll_id;
                return (
                  <Form>
                    <div className="relative my-5 ">
                      <InputSelect
                        label="Employee"
                        name="holiday_exemption_eid"
                        type="name"
                        onChange={handleEmployee}
                        disabled={loadingEmployee || mutation.isLoading}
                      >
                        <option value="" hidden>
                          {loadingEmployee && "Loading..."}
                        </option>

                        {employeeId?.data.map((eItem, key) => {
                          return (
                            <option
                              key={key}
                              value={eItem.employee_aid}
                              id={eItem.employee_job_none_work_reg_hol}
                            >
                              {`${eItem.employee_lname}, ${eItem.employee_fname}`}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative mb-10">
                      <InputSelect
                        label="Holiday Date"
                        name="holiday_exemption_holiday_date"
                        type="name"
                        onChange={handleRateHoliday}
                        disabled={isLoading || mutation.isLoading}
                      >
                        <option value="" hidden>
                          {isLoading && "Loading..."}
                        </option>

                        {holidayDate?.data.map((hdItem, key) => {
                          return (
                            <option
                              key={key}
                              value={hdItem.holidays_date}
                              id={hdItem.holidays_rate}
                            >
                              {`${hdItem.holidays_name} ${
                                hdItem.holidays_rate
                              }% (${formatDate(hdItem.holidays_date)})`}
                            </option>
                          );
                        })}
                      </InputSelect>
                      {isObserved === "1" || isObserved === 1 ? (
                        <div className="flex items-center absolute mt-4 text-primary">
                          <FaCheck />
                          <p className=" mb-0 ml-2">Will Observed</p>
                        </div>
                      ) : isObserved === "0" || isObserved === 0 ? (
                        <div className="flex items-center absolute mt-4 text-primary">
                          <ImCross />
                          <p className=" mb-0 ml-2">Will Not Observed</p>
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
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

export default ModalAddHolidays;
